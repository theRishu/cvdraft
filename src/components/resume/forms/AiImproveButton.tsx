"use client";
import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

interface AiImproveButtonProps {
    section: string;
    currentContent: string;
    resumeData?: any;
    onResult: (improved: string) => void;
    label?: string;
}

export default function AiImproveButton({
    section, currentContent, resumeData, onResult, label = "Fix with AI"
}: AiImproveButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        // We now expect the backend to look up keys from the DB
        const provider = (typeof window !== "undefined" ? localStorage.getItem("preferred_ai_provider") : null) || "gemini";

        if (!currentContent || currentContent.trim().length < 5) {
            alert("Please write something first, then AI can improve it.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    provider,       // Preferred provider, backend will fallback sequentially if needed
                    section,
                    currentContent,
                    currentData: resumeData,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                alert("AI error: " + (err.error || "Unknown error. Check your AI keys in Dashboard."));
                return;
            }

            const data = await res.json();
            if (data.text) {
                onResult(data.text);
            } else {
                alert("AI returned an empty response. Try again.");
            }
        } catch (e: any) {
            console.error("AI improve error", e);
            alert("AI request failed. Check your internet connection and API key.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className="text-[10px] font-bold text-white flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-purple-500/20 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            {loading ? "Improving…" : label}
        </button>
    );
}
