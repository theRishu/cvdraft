import { NextResponse } from "next/server";
import { validateProviderKey, type AIProvider } from "@/lib/aiProvider";

export async function POST(req: Request) {
    try {
        const { apiKey, provider = "gemini" } = await req.json();
        if (!apiKey?.trim()) {
            return NextResponse.json({ valid: false, error: "No API key provided." });
        }

        const result = await validateProviderKey(provider as AIProvider, apiKey.trim());
        return NextResponse.json(result);

    } catch (error: any) {
        console.error("[validate-key]", error?.message);
        return NextResponse.json({ valid: false, error: error?.message || "Validation failed." });
    }
}
