import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        const { apiKey, prompt, currentData } = await req.json();

        if (!apiKey) {
            return NextResponse.json({ error: "Gemini API Key is required" }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Use latest stable flash model

        // Construct a highly detailed prompt to instruct the AI to generate a full resume JSON
        const systemPrompt = `
You are an expert ATS (Applicant Tracking System) resume writer and Senior Software Engineer. 
The user is providing you with an optional base set of data or simple resume prompt:
${prompt || "Generate a strong resume."}

Existing Data (if any):
${JSON.stringify(currentData, null, 2)}

Your task is to generate and return a raw JSON object that precisely maps to the following TypeScript interface structure. Complete all fields with high-quality, ATS-optimized, realistic sounding professional content based on the user's prompt. Do NOT wrap the JSON in markdown blocks (like \`\`\`json) or any other text. Return ONLY the raw JSON object.
Ensure experiences sound extremely impactful with metrics where appropriate.

Requirements:
- \`personalInfo\`: fullName, email, phone, location, title, summary
- \`experience\`: array of { id, jobTitle, companyName, startDate, endDate, isCurrent: boolean, location, description (use bullet points or paragraphs) }
- \`education\`: array of { id, schoolName, degree, startDate, endDate, location }
- \`skills\`: array of { id, name } (try to group like "Frontend: React, Next.js", "Backend: Node.js, Go", or "DevOps: AWS, Docker")
- \`projects\`: array of { id, title, description, link, startDate, endDate, technologies: string[] }
- \`certifications\`: array of { id, name, issuer, date }
- \`languages\`: array of { id, name, level (Native, Fluent, etc) }
- \`socialLinks\`: array of { id, platform, url }
- Generate UUIDs (or random strings) for ID fields.
        `;

        const result = await model.generateContent(systemPrompt);
        const responseText = result.response.text();

        // Attempt to clean the text in case Gemini wraps it in markdown despite instructions
        const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();

        const generatedData = JSON.parse(cleanedText);

        return NextResponse.json(generatedData);

    } catch (error: any) {
        console.error("Gemini Generation Error:", error);
        return NextResponse.json({ error: error.message || "Failed to generate resume" }, { status: 500 });
    }
}
