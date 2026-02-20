"use client";

import { useState, useRef } from "react";
import { Upload, Loader2, FileJson } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ImportResumeButton() {
    const router = useRouter();
    const [isImporting, setIsImporting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsImporting(true);
        try {
            const text = await file.text();
            const json = JSON.parse(text);

            // Simple validation
            if (!json.personalInfo) {
                alert("Invalid resume JSON format");
                return;
            }

            const res = await fetch("/api/resumes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: json.title ? `${json.title} (Imported)` : "Imported Resume",
                    importData: json
                }),
            });

            if (res.ok) {
                router.refresh();
            } else {
                const msg = await res.text();
                alert(`Import failed: ${msg}`);
            }
        } catch (error) {
            console.error("Import error", error);
            alert("Failed to parse or import file");
        } finally {
            setIsImporting(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
            />
            <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isImporting}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-lg transition-all shadow-sm"
                title="Import content from a standard Resume JSON file"
            >
                {isImporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                <span className="hidden sm:inline">Import JSON</span>
            </button>
        </>
    );
}
