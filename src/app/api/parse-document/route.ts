import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { parseResumeTextHeuristically } from "@/lib/resumeHeuristicParser";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    let text = "";

    const fileName = file.name.toLowerCase();

    if (fileName.endsWith(".json")) {
      // JSON — parse directly
      const raw = await file.text();
      const json = JSON.parse(raw);
      return NextResponse.json({ resumeData: json, source: "json" });
    }

    if (fileName.endsWith(".pdf")) {
      // Real PDF text extraction via pdf-parse v2 (replaces the old
      // hand-rolled BT/ET marker regex hack, which broke on anything but
      // the simplest uncompressed PDFs).
      const { PDFParse } = await import("pdf-parse");
      const buffer = Buffer.from(await file.arrayBuffer());
      const parser = new PDFParse({ data: buffer });
      const result = await parser.getText();
      text = result.text.trim();
    } else if (fileName.endsWith(".txt")) {
      text = await file.text();
    } else {
      return NextResponse.json({ error: "Unsupported file type. Use PDF, TXT, or JSON." }, { status: 400 });
    }

    if (!text || text.length < 30) {
      return NextResponse.json({ error: "Could not extract readable text from this file. Try a different format." }, { status: 422 });
    }

    // Structure the extracted text with regex/heuristics instead of an AI
    // call — no API key required, but this is a rougher pass than the old
    // AI-based structuring: reliable for contact info and section
    // splitting, best-effort for splitting Experience/Education blocks into
    // clean per-entry {title, company, dates} fields. See
    // resumeHeuristicParser.ts for the trade-off notes.
    const resumeData = parseResumeTextHeuristically(text);
    return NextResponse.json({ resumeData, source: "parsed" });

  } catch (error: any) {
    console.error("[PARSE_DOCUMENT]", error);
    return NextResponse.json({ error: error.message || "Failed to parse document" }, { status: 500 });
  }
}
