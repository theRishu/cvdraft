"use client";

import { useState, useRef } from "react";
import { Upload, Loader2, FileJson, FilePlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ImportResumeButton() {
    const router = useRouter();
    const [isImporting, setIsImporting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsImporting(true);
        setShowModal(false);

        try {
            const fileName = file.name.toLowerCase();
            let importData: any = null;

            if (fileName.endsWith(".json")) {
                // JSON path — direct parse
                const text = await file.text();
                importData = JSON.parse(text);
                if (!importData.personalInfo) {
                    alert("Invalid resume JSON. Make sure it was exported from CVdraft.");
                    return;
                }
            } else {
                // PDF / DOCX / TXT path — use AI parse
                const fd = new FormData();
                fd.append("file", file);

                const res = await fetch("/api/parse-document", { method: "POST", body: fd });
                if (!res.ok) {
                    const err = await res.json();
                    alert(`Import failed: ${err.error || "Unknown error"}`);
                    return;
                }
                const { resumeData } = await res.json();
                importData = resumeData;
            }

            // Create resume from parsed data
            const res = await fetch("/api/resumes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: importData.title ? `${importData.title} (Imported)` : "Imported Resume",
                    importData,
                }),
            });

            if (res.ok) {
                const newResume = await res.json();
                router.push(`/resume/${newResume._id}`);
            } else {
                const msg = await res.text();
                alert(`Import failed: ${msg}`);
            }
        } catch (error: any) {
            console.error("Import error", error);
            alert("Failed to import file. " + (error.message || ""));
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
                accept=".json,.pdf,.docx,.txt"
                className="hidden"
            />

            <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isImporting}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 hover:border-stone-300 rounded-xl transition-all shadow-sm disabled:opacity-60"
                title="Import from PDF, DOCX, or JSON"
            >
                {isImporting
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <FilePlus className="w-4 h-4" />
                }
                <span className="hidden sm:inline">
                    {isImporting ? "Importing…" : "Import"}
                </span>
            </button>
        </>
    );
}
