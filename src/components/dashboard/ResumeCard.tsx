"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FileText, Trash2, Edit, MoreVertical, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import ResumePreview from "@/components/resume/ResumePreview";

export default function ResumeCard({ resume }: { resume: any }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.3); // Initial fallback

    useEffect(() => {
        if (!previewRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                // A4 width in pixels is approx 794px. Scale to perfectly fit the container width.
                if (entry.contentRect.width > 0) {
                    setScale(entry.contentRect.width / 794);
                }
            }
        });

        observer.observe(previewRef.current);
        return () => observer.disconnect();
    }, []);

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if inside Link
        e.stopPropagation();

        if (!confirm("Are you sure you want to delete this resume? This action cannot be undone.")) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/resumes/${resume._id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert("Failed to delete resume");
            }
        } catch (error) {
            console.error("Delete error", error);
            alert("Error deleting resume");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDownloadJson = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${resume.title || "resume"}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        setShowMenu(false);
    }

    return (
        <div
            onClick={() => router.push(`/resume/${resume._id}`)}
            className="group relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer ring-1 ring-slate-200/50 hover:ring-blue-500/30"
        >
            <div className="block">
                <div
                    ref={previewRef}
                    className="aspect-[210/297] w-full bg-white relative border-b border-slate-100 overflow-hidden group-hover:shadow-inner transition-all"
                >
                    {/* Live Preview - Scaled */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div
                            className="origin-top-left"
                            style={{
                                width: '210mm',
                                height: '297mm',
                                transform: `scale(${scale})`
                            }}
                        >
                            <ResumePreview data={resume} />
                        </div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Overlay Buttons */}
                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl font-bold text-sm text-slate-900 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            <Edit className="w-4 h-4 text-blue-600" />
                            Edit Resume
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-5 bg-gradient-to-b from-transparent to-slate-50/50">
                <div className="flex justify-between items-start gap-2">
                    <div className="block flex-1 min-w-0" onClick={() => router.push(`/resume/${resume._id}`)}>
                        <h3 className="font-bold text-slate-800 truncate text-lg group-hover:text-blue-600 transition-colors duration-300">
                            {resume.title || "Untitled Resume"}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5 opacity-80" suppressHydrationWarning>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Edited {new Date(resume.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>

                    <div className="relative">
                        <div className="flex bg-white rounded-xl border border-slate-200/60 p-0.5 shadow-sm group-hover:border-slate-300 transition-colors">
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                title="Delete Resume"
                                className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded text-slate-400 transition-colors"
                            >
                                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowMenu(!showMenu); }}
                                title="More Options"
                                className="p-1.5 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>

                        {showMenu && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/60 z-20 py-1.5 origin-top-right animate-in fade-in zoom-in-95 duration-200">
                                <button
                                    onClick={handleDownloadJson}
                                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-3 transition-colors"
                                >
                                    <FileText className="w-4 h-4" /> Download JSON
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Click outside to close menu - simplified for now */}
            {showMenu && (
                <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)}></div>
            )}
        </div>
    );
}
