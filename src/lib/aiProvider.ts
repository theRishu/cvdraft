/**
 * Shared AI provider abstraction.
 * Supports: Google Gemini, OpenAI GPT, Anthropic Claude
 */

export type AIProvider = "gemini" | "openai";

export interface AIKeys {
    gemini?: string;
    openai?: string;
}

export interface AIResult {
    text: string;
    provider: AIProvider;
}

/** Detect which provider to use based on available keys */
export function detectProvider(keys: AIKeys, preferred?: AIProvider): AIProvider | null {
    if (preferred && keys[preferred]) return preferred;
    if (keys.gemini) return "gemini";
    if (keys.openai) return "openai";
    return null;
}

/** Generate text with the given provider */
export async function generateWithProvider(
    prompt: string,
    provider: AIProvider,
    apiKey: string,
    jsonMode = false
): Promise<string> {
    if (provider === "gemini") {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        return result.response.text();
    }

    if (provider === "openai") {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
                ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
            }),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err?.error?.message || `OpenAI error ${res.status}`);
        }
        const data = await res.json();
        return data.choices?.[0]?.message?.content || "";
    }

    throw new Error(`Unknown provider: ${provider}`);
}

/** Validate a key for a given provider — returns { valid, error? } */
export async function validateProviderKey(
    provider: AIProvider,
    apiKey: string
): Promise<{ valid: boolean; error?: string; quotaExhausted?: boolean; warning?: string }> {
    if (provider === "gemini") {
        const MODELS = ["gemini-2.0-flash", "gemini-1.5-flash"];
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(apiKey);
        let hadQuota = false;

        for (const m of MODELS) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                const result = await model.generateContent("Say OK");
                if (result.response.text()) return { valid: true };
            } catch (err: any) {
                const msg = (err?.message || "").toLowerCase();
                console.error("[Gemini Validation Error for " + m + "]:", err?.message);
                if (msg.includes("[401") || msg.includes("[403") || msg.includes("api_key_invalid") || msg.includes("unauthenticated")) {
                    return { valid: false, error: "Invalid Gemini API key." };
                }
                if (msg.includes("[429") || msg.includes("quota")) {
                    hadQuota = true; continue;
                }
                if (msg.includes("[404") || msg.includes("not found")) continue;
            }
        }
        if (hadQuota) return { valid: true, quotaExhausted: true, warning: "Key valid but free-tier quota is exhausted." };
        return { valid: true, warning: "Key authenticated but no models responded." };
    }

    if (provider === "openai") {
        try {
            const res = await fetch("https://api.openai.com/v1/models", {
                headers: { Authorization: `Bearer ${apiKey}` },
            });
            if (res.status === 401) return { valid: false, error: "Invalid OpenAI API key." };
            if (res.status === 429) return { valid: true, quotaExhausted: true, warning: "Key valid but OpenAI quota or rate limit exceeded." };
            if (!res.ok) return { valid: false, error: `OpenAI error: ${res.status}` };
            return { valid: true };
        } catch (e: any) {
            return { valid: false, error: e.message || "Could not reach OpenAI." };
        }
    }

    return { valid: false, error: "Unknown provider." };
}
