import { NextResponse } from "next/server";
import { generateWithProvider, type AIProvider } from "@/lib/aiProvider";

import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

type ProviderEntry = { provider: AIProvider; apiKey: string };

/** Build ordered list of provider/key pairs to try */
function buildProviderList(providerParam: string, user: any): ProviderEntry[] {
    const aiKeys = user?.aiKeys || {};
    const preferredProvider = providerParam || user?.preferredProvider || "gemini";

    const all: ProviderEntry[] = [
        { provider: "gemini" as AIProvider, apiKey: aiKeys.gemini || "" },
        { provider: "openai" as AIProvider, apiKey: aiKeys.openai || "" },
    ].filter(e => !!e.apiKey) as ProviderEntry[];

    // Sort: preferred provider first
    if (preferredProvider) {
        all.sort((a, b) => (a.provider === preferredProvider ? -1 : b.provider === preferredProvider ? 1 : 0));
    }

    return all;
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();
        const user = await User.findOne({ userId }).lean();

        const body = await req.json();
        const { prompt, currentData, section, currentContent, provider } = body;

        const providers = buildProviderList(provider, user);
        if (providers.length === 0) {
            return NextResponse.json(
                { error: "No AI API key found. Add a key in Dashboard → Settings." },
                { status: 400 }
            );
        }

        // Targeted refinement vs full generation vs generic prompt
        let systemPrompt = "";
        let isJsonMode = false;
        if (section) {
            systemPrompt = `
You are an expert ATS resume writer.
Improve the following ${section} content for a professional resume.
Make it more impactful, use better action verbs, and ensure it is concise.
Maintain a professional tone.

Content to improve:
${currentContent || ""}

Context (Full Resume Data):
${JSON.stringify(currentData, null, 2)}

Return ONLY the improved text. No markdown, no introduction, no surrounding quotes.
            `.trim();
        } else if (prompt && !currentData) {
            // General purpose question (e.g. framer tools, generic predictions without resume context)
            systemPrompt = `
You are an expert career counselor.
${prompt}
Return ONLY the requested output format.
            `.trim();
        } else if (prompt && currentData) {
            // Predict questions / tailor based on resume and job description
            systemPrompt = `
You are an expert recruiter and career counselor.
${prompt}
Resume Data:
${JSON.stringify(currentData, null, 2)}
Return ONLY valid JSON.
            `.trim();
            isJsonMode = true;
        } else {
            systemPrompt = `
You are an expert ATS resume writer and Senior Software Engineer.
Generate comprehensive, professional resume content based on the user's input.
Return a valid JSON object matching the resume data structure.
Make bullet points impactful with strong action verbs and quantifiable achievements.
The JSON must include: personalInfo, experience, education, skills, projects, certifications, languages, socialLinks.
Return ONLY valid JSON, no markdown, no prose.

User Input:
${JSON.stringify(currentData, null, 2)}
${prompt ? `\nAdditional context: ${prompt}` : ""}
            `.trim();
            isJsonMode = true;
        }

        let lastError = "";

        // Try each provider in order — fallback on quota/network errors
        for (const { provider, apiKey } of providers) {
            try {
                const responseText = await generateWithProvider(systemPrompt, provider, apiKey, isJsonMode);

                if (!isJsonMode && !currentData) {
                    // Career framer edge case: Returns plain text, handle parsing failure by wrapping
                    try {
                        const match = responseText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
                        if (match) {
                            const generatedData = JSON.parse(match[0]);
                            return NextResponse.json({ ...generatedData, usedProvider: provider });
                        }
                    } catch (e) {
                        // ignore and fall through
                    }
                    return NextResponse.json({ text: responseText.trim(), usedProvider: provider });
                }

                if (section) {
                    return NextResponse.json({ text: responseText.trim(), usedProvider: provider });
                }

                // Regex to extract JSON block (either object or array)
                const jsonMatch = responseText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
                if (!jsonMatch) {
                    return NextResponse.json({ text: responseText.trim(), usedProvider: provider });
                }

                const cleanedText = jsonMatch[0].trim();
                const generatedData = JSON.parse(cleanedText);
                return NextResponse.json(
                    Array.isArray(generatedData) ? generatedData : { ...generatedData, usedProvider: provider }
                );

            } catch (err: any) {
                const msg = (err?.message || "").toLowerCase();
                lastError = err?.message || "Unknown error";

                // Only fallback on quota/rate-limit errors — not auth failures
                const isQuotaOrNetwork =
                    msg.includes("quota") || msg.includes("429") ||
                    msg.includes("rate limit") || msg.includes("too many requests") ||
                    msg.includes("timeout") || msg.includes("network");

                if (isQuotaOrNetwork) {
                    console.warn(`[generate] ${provider} quota/network issue, trying next provider:`, err?.message);
                    continue;
                }

                // Auth or other hard errors — return immediately
                return NextResponse.json({ error: err?.message || "Generation failed." }, { status: 500 });
            }
        }

        return NextResponse.json(
            { error: `All AI providers failed. Last error: ${lastError}` },
            { status: 500 }
        );

    } catch (error: any) {
        console.error("AI Generation Error:", error);
        return NextResponse.json({ error: error.message || "Failed to generate content" }, { status: 500 });
    }
}
