"use client";

import { useState, useRef, useEffect } from "react";
import { Trash2, Edit, MoreVertical, Loader2, FileText, Copy, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import ResumePreview from "@/components/resume/ResumePreview";

export default function ResumeCard({ resume }: { resume: any }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDuplicating, setIsDuplicating] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
    const [renameValue, setRenameValue] = useState(resume.title || "Untitled");
    const previewRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.3);

    useEffect(() => {
        if (!previewRef.current) return;
        const obs = new ResizeObserver(entries => {
            for (const e of entries) {
                if (e.contentRect.width > 0) setScale(e.contentRect.width / 794);
            }
        });
        obs.observe(previewRef.current);
        return () => obs.disconnect();
    }, []);

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault(); e.stopPropagation();
        if (!confirm("Delete this resume? This can't be undone.")) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/resumes/${resume._id}`, { method: "DELETE" });
            if (res.ok) router.refresh();
            else alert("Couldn't delete resume.");
        } catch {
            alert("Something went wrong — please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDuplicate = async (e: React.MouseEvent) => {
        e.preventDefault(); e.stopPropagation();
        setIsDuplicating(true); setShowMenu(false);
        try {
            const res = await fetch("/api/resumes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: `${resume.title || "Resume"} (Copy)`,
                    importData: resume,
                }),
            });
            if (res.ok) router.refresh();
            else { const t = await res.text(); alert("Couldn't duplicate: " + t); }
        } catch { alert("Duplicate failed."); }
        finally { setIsDuplicating(false); }
    };

    const handleRename = async (newTitle: string) => {
        if (!newTitle.trim() || newTitle === resume.title) { setIsRenaming(false); return; }
        try {
            await fetch(`/api/resumes/${resume._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...resume, title: newTitle }),
            });
            router.refresh();
        } catch { alert("Rename failed."); }
        setIsRenaming(false);
    };

    const handleExportJson = (e: React.MouseEvent) => {
        e.preventDefault(); e.stopPropagation();
        const a = document.createElement("a");
        a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
        a.download = `${resume.title || "resume"}.json`;
        document.body.appendChild(a); a.click(); a.remove();
        setShowMenu(false);
    };

    const handleDownloadPdf = async (e: React.MouseEvent) => {
        e.preventDefault(); e.stopPropagation();
        setShowMenu(false);
        setIsDownloadingPdf(true);
        try {
            const originalPaper = previewRef.current?.querySelector('.paper-page');
            if (!originalPaper) throw new Error("Could not find resume content");

            const clone = originalPaper.cloneNode(true) as HTMLElement;
            clone.querySelectorAll(".no-print").forEach(el => el.remove());

            const styles = Array.from(document.querySelectorAll("style,link[rel='stylesheet']:not([href*='google'])"))
                .map(s => s.outerHTML)
                .join("");

            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/api/export-pdf';
            form.target = '_blank';

            const addField = (name: string, value: string) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.value = value;
                form.appendChild(input);
            };

            const safeTitle = (resume.title || "Resume").replace(/[^a-zA-Z0-9.\-_]/g, '_');

            addField('title', safeTitle);
            addField('layout', JSON.stringify(resume.layout || {}));
            addField('css', styles);
            addField('html', clone.innerHTML);

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);

        } catch (e) {
            console.error("PDF error", e);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsDownloadingPdf(false);
        }
    };

    return (
        <div
            onClick={() => router.push(`/resume/${resume._id}`)}
            className="group relative bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
        >
            {/* Preview thumbnail */}
            <div ref={previewRef} className="aspect-[210/297] w-full relative overflow-hidden bg-stone-50 border-b border-stone-100">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="origin-top-left" style={{ width: "210mm", height: "297mm", transform: `scale(${scale})` }}>
                        <ResumePreview data={resume} />
                    </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/30 transition-all duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 bg-white text-stone-800 px-4 py-2 rounded-xl shadow-lg text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <Edit className="w-4 h-4 text-indigo-500" />
                        Edit resume
                    </div>
                </div>

                {/* Delete button */}
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="absolute top-3 right-3 p-2 bg-white rounded-xl shadow text-stone-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
            </div>

            {/* Card footer */}
            <div className="p-4 flex items-center justify-between">
                <div className="min-w-0 flex-1">
                    {isRenaming ? (
                        <input
                            autoFocus value={renameValue}
                            onChange={e => setRenameValue(e.target.value)}
                            onBlur={() => handleRename(renameValue)}
                            onKeyDown={e => { if (e.key === "Enter") handleRename(renameValue); if (e.key === "Escape") setIsRenaming(false); }}
                            onClick={e => e.stopPropagation()}
                            className="w-full text-sm font-bold text-stone-800 bg-stone-50 border border-indigo-300 rounded-lg px-2 py-0.5 outline-none"
                        />
                    ) : (
                        <h3
                            className="font-bold text-stone-800 truncate text-sm hover:text-indigo-600 cursor-text transition-colors"
                            onClick={e => { e.preventDefault(); e.stopPropagation(); setIsRenaming(true); }}
                            title="Click to rename"
                        >{resume.title || "Untitled Resume"}</h3>
                    )}
                    <p className="text-xs text-stone-400 mt-0.5">
                        Edited {new Date(resume.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                </div>

                <div className="relative">
                    <button
                        onClick={e => { e.preventDefault(); e.stopPropagation(); setShowMenu(!showMenu); }}
                        className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-400 hover:text-stone-600 transition-colors"
                    >
                        <MoreVertical className="w-4 h-4" />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 bottom-full mb-1 w-48 bg-white rounded-2xl shadow-xl border border-stone-100 py-1.5 z-20 animate-in fade-in zoom-in-90 duration-150">
                            <button onClick={e => { e.preventDefault(); e.stopPropagation(); setIsRenaming(true); setShowMenu(false); }}
                                className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2.5 transition-colors">
                                <Edit className="w-4 h-4 text-stone-400" /> Rename
                            </button>
                            <button onClick={handleDuplicate} disabled={isDuplicating}
                                className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2.5 transition-colors disabled:opacity-60">
                                {isDuplicating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Copy className="w-4 h-4 text-stone-400" />} Duplicate
                            </button>
                            <div className="h-px bg-stone-100 my-1" />
                            <button onClick={handleDownloadPdf} disabled={isDownloadingPdf} className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2.5 transition-colors disabled:opacity-60">
                                {isDownloadingPdf ? <Loader2 className="w-4 h-4 animate-spin text-stone-400" /> : <Download className="w-4 h-4 text-stone-400" />} Download PDF
                            </button>
                            <button onClick={handleExportJson} className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2.5 transition-colors">
                                <FileText className="w-4 h-4 text-stone-400" /> Export JSON
                            </button>
                            <div className="h-px bg-stone-100 my-1" />
                            <button onClick={handleDelete} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2.5 transition-colors">
                                <Trash2 className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {showMenu && <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />}
        </div>
    );
}
