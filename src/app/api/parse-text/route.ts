import { NextResponse } from "next/server";
import { generateWithProvider, type AIProvider } from "@/lib/aiProvider";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const user = await User.findOne({ userId }).lean();

    const body = await req.json();
    const { provider, text } = body;

    const aiKeys = user?.aiKeys || {};
    const preferredProvider = provider || user?.preferredProvider || "gemini";

    const providers = [
      { provider: "gemini" as AIProvider, apiKey: aiKeys.gemini || "" },
      { provider: "openai" as AIProvider, apiKey: aiKeys.openai || "" },
    ].filter(e => !!e.apiKey);

    if (preferredProvider) {
      providers.sort((a, b) => (a.provider === preferredProvider ? -1 : b.provider === preferredProvider ? 1 : 0));
    }

    if (providers.length === 0) {
      return NextResponse.json({ error: "An AI API key is required. Add one in Dashboard → Settings." }, { status: 400 });
    }
    if (!text || text.trim().length < 30) {
      return NextResponse.json({ error: "Resume text is too short. Please paste your full resume." }, { status: 400 });
    }

    const prompt = `
You are an expert resume parser. I will provide raw resume text and you must extract all information and return it as a valid JSON object.

Return ONLY a valid JSON object with this exact structure (no markdown, no backticks, no extra text):
{
  "personalInfo": {
    "fullName": "",
    "title": "",
    "email": "",
    "phone": "",
    "address": "",
    "summary": ""
  },
  "experience": [
    {
      "id": "exp_1",
      "company": "",
      "position": "",
      "startDate": "",
      "endDate": "",
      "current": false,
      "description": ""
    }
  ],
  "education": [
    {
      "id": "edu_1",
      "institution": "",
      "degree": "",
      "field": "",
      "startDate": "",
      "endDate": "",
      "gpa": ""
    }
  ],
  "skills": ["skill1", "skill2"],
  "projects": [
    {
      "id": "proj_1",
      "name": "",
      "description": "",
      "technologies": "",
      "link": ""
    }
  ],
  "certifications": [
    {
      "id": "cert_1",
      "name": "",
      "issuer": "",
      "date": "",
      "link": ""
    }
  ],
  "languages": [
    {
      "id": "lang_1",
      "name": "",
      "proficiency": "Fluent"
    }
  ],
  "socialLinks": [
    {
      "id": "link_1",
      "platform": "LinkedIn",
      "url": ""
    }
  ]
}

Rules:
- If a section is not in the resume, return an empty array [] for it.
- For personalInfo fields not found, use empty string "".
- For dates, use format like "Jan 2022" or "2022" or whatever is in the text.
- Generate unique sequential IDs like "exp_1", "exp_2", etc.
- For skills, return as an array of plain strings.
- description for experience should be a newline-separated list of bullet point achievements.
- Detect LinkedIn, GitHub, portfolio links and put them in socialLinks with the right platform name.
- Return ONLY valid JSON, nothing else.

Resume Text:
${text}
        `.trim();

    let lastError = "";

    for (const p of providers) {
      try {
        const responseText = await generateWithProvider(prompt, p.provider, p.apiKey, true);
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error("Could not extract JSON from AI response.");
        }
        const cleaned = jsonMatch[0].trim();
        const parsed = JSON.parse(cleaned);
        return NextResponse.json({ ...parsed, usedProvider: p.provider });
      } catch (err: any) {
        const msg = (err?.message || "").toLowerCase();
        lastError = err?.message || "Unknown error";

        const isQuotaOrNetwork = msg.includes("quota") || msg.includes("429") ||
          msg.includes("rate limit") || msg.includes("too many requests") ||
          msg.includes("timeout") || msg.includes("network");

        if (isQuotaOrNetwork) {
          console.warn(`[parse-text] ${p.provider} quota/network issue, trying next provider:`, err?.message);
          continue;
        }

        // Return on syntax errors or hard errors
        if (err instanceof SyntaxError) {
          return NextResponse.json({ error: "Failed to parse AI response. Please try again." }, { status: 500 });
        }
        return NextResponse.json({ error: msg || "Failed to parse resume" }, { status: 500 });
      }
    }

    return NextResponse.json(
      { error: `All provided AI services failed. Last error: ${lastError}` },
      { status: 500 }
    );

  } catch (error: any) {
    console.error("Resume text parse error:", error);
    return NextResponse.json({ error: error.message || "Failed to parse resume" }, { status: 500 });
  }
}
