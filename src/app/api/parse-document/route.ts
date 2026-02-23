import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const user = await User.findOne({ userId }).lean();
    const aiKeys = user?.aiKeys || {};

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    let apiKey = formData.get("apiKey") as string | null;

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    // Fallback to user DB keys if not in payload (the new way)
    if (!apiKey) {
      if (!aiKeys.gemini && !aiKeys.openai) {
        return NextResponse.json({ error: "No AI API key found. Add a key in Dashboard → Settings." }, { status: 400 });
      }
    }

    let text = "";

    const fileName = file.name.toLowerCase();

    if (fileName.endsWith(".json")) {
      // JSON — parse directly
      const raw = await file.text();
      const json = JSON.parse(raw);
      return NextResponse.json({ resumeData: json, source: "json" });
    }

    if (fileName.endsWith(".docx")) {
      // DOCX — extract text via mammoth
      const mammoth = await import("mammoth");
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (fileName.endsWith(".pdf")) {
      // PDF — extract text using the PDF.js approach (arrayBuffer → text extraction)
      // We'll send the raw text extracted from the file bytes via a simple heuristic
      // Since pdf-parse needs Node.js fs, we use a simpler approach:
      // extract any readable ASCII/UTF-8 text from the PDF binary
      const buffer = Buffer.from(await file.arrayBuffer());
      const raw = buffer.toString("latin1");
      // Extract text between BT (begin text) markers in PDF
      const matches = raw.match(/BT[\s\S]*?ET/g) || [];
      const extracted = matches
        .join(" ")
        .replace(/\(([^)]+)\)/g, "$1")
        .replace(/Tj|TJ|Td|TD|Tf|Tm|T\*/g, " ")
        .replace(/[\x00-\x1F\x7F-\xFF]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      text = extracted.length > 100 ? extracted : buffer.toString("utf-8").replace(/[^\x20-\x7E\n]/g, " ").replace(/\s+/g, " ").trim();
    } else if (fileName.endsWith(".txt")) {
      text = await file.text();
    } else {
      return NextResponse.json({ error: "Unsupported file type. Use PDF, DOCX, TXT, or JSON." }, { status: 400 });
    }

    if (!text || text.length < 30) {
      return NextResponse.json({ error: "Could not extract readable text from this file. Try a different format." }, { status: 422 });
    }

    // Use AI to parse extracted text into resume JSON
    const preferredProvider = user?.preferredProvider || "gemini";
    const providers = [
      { provider: "gemini" as const, apiKey: apiKey || aiKeys.gemini || "" },
      { provider: "openai" as const, apiKey: aiKeys.openai || "" },
    ].filter(e => !!e.apiKey);

    if (preferredProvider) {
      providers.sort((a, b) => (a.provider === preferredProvider ? -1 : b.provider === preferredProvider ? 1 : 0));
    }

    const prompt = `
You are a resume parser. Extract all information from the following resume text and return it as a valid JSON object.

The JSON must exactly follow this structure (omit empty arrays/fields):
{
  "title": "string (e.g. 'Software Engineer Resume')",
  "templateId": "ats",
  "personalInfo": {
    "fullName": "string",
    "title": "string (job title/headline)",
    "email": "string",
    "phone": "string",
    "address": "string",
    "summary": "string"
  },
  "experience": [
    { "id": "1", "jobTitle": "string", "companyName": "string", "startDate": "string", "endDate": "string", "isCurrent": false, "description": "string" }
  ],
  "education": [
    { "id": "1", "degree": "string", "schoolName": "string", "startDate": "string", "endDate": "string" }
  ],
  "skills": [
    { "id": "1", "name": "string" }
  ],
  "projects": [
    { "id": "1", "title": "string", "description": "string", "startDate": "", "endDate": "" }
  ],
  "certifications": [
    { "id": "1", "name": "string", "issuer": "string", "date": "string" }
  ],
  "languages": [
    { "id": "1", "name": "string", "level": "string" }
  ],
  "socialLinks": [
    { "id": "1", "platform": "string", "url": "string" }
  ]
}

Return ONLY valid JSON, no markdown, no explanation.

Resume text:
${text.slice(0, 6000)}
        `;

    let lastError = "";

    // We import generateWithProvider here to avoid breaking edge deployment rules if applicable, 
    // or just use it if already using standard imports
    const { generateWithProvider } = await import("@/lib/aiProvider");

    for (const p of providers) {
      try {
        const responseText = await generateWithProvider(prompt, p.provider, p.apiKey, true);
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error("Could not extract JSON from AI response.");
        }
        const cleaned = jsonMatch[0].trim();
        const parsed = JSON.parse(cleaned);
        return NextResponse.json({ resumeData: parsed, source: "parsed" });
      } catch (err: any) {
        const msg = (err?.message || "").toLowerCase();
        lastError = err?.message || "Unknown error";

        const isQuotaOrNetwork = msg.includes("quota") || msg.includes("429") ||
          msg.includes("rate limit") || msg.includes("too many requests") ||
          msg.includes("timeout") || msg.includes("network");

        if (isQuotaOrNetwork) {
          console.warn(`[parse-document] ${p.provider} quota/network issue, trying next provider:`, err?.message);
          continue;
        }

        // Return on syntax errors or hard errors
        if (err instanceof SyntaxError) {
          return NextResponse.json({ error: "Failed to parse AI response. Please try again." }, { status: 500 });
        }
        return NextResponse.json({ error: msg || "Failed to parse document" }, { status: 500 });
      }
    }

    return NextResponse.json(
      { error: `All provided AI services failed. Last error: ${lastError}` },
      { status: 500 }
    );

  } catch (error: any) {
    console.error("[PARSE_DOCUMENT]", error);
    return NextResponse.json({ error: error.message || "Failed to parse document" }, { status: 500 });
  }
}
