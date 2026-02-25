"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Plus, X, Trash2, Loader2, Upload, FileText,
    FilePlus, AlertCircle, ArrowRight
} from "lucide-react";

interface Resume { _id: string; title: string; updatedAt: string; }

interface Props {
    trigger?: React.ReactNode;  // custom trigger element
    className?: string;
}

export default function NewResumeModal({ trigger, className }: Props) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);
    const [isPro, setIsPro] = useState(false);
    const [creating, setCreating] = useState(false);
    const [importing, setImporting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const FREE_LIMIT = 2;
    const atLimit = !isPro && resumes.length >= FREE_LIMIT;

    // fetch resumes when modal opens
    useEffect(() => {
        if (!open) return;
        setLoadingResumes(true);
        fetch("/api/resumes")
            .then(r => r.json())
            .then(d => {
                // GET /api/resumes returns a plain array
                const list = Array.isArray(d) ? d : (d.resumes ?? []);
                setResumes(list);
                setIsPro(d.isPro || false);
            })
            .catch(console.error)
            .finally(() => setLoadingResumes(false));
    }, [open]);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
            if (res.ok) setResumes(prev => prev.filter(r => r._id !== id));
            else alert("Couldn't delete resume. Try again.");
        } catch { alert("Delete failed."); }
        finally { setDeletingId(null); }
    };

    const handleCreateBlank = async () => {
        setCreating(true);
        try {
            const res = await fetch("/api/resumes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: "My Resume" }),
            });
            if (res.status === 403) {
                alert("Limit reached. Delete an existing resume first.");
                return;
            }
            if (!res.ok) throw new Error();
            const data = await res.json();
            setOpen(false);
            router.push(`/resume/${data._id}`);
        } catch { alert("Couldn't create resume. Try again."); }
        finally { setCreating(false); }
    };

    const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (fileRef.current) fileRef.current.value = "";

        setImporting(true);
        try {
            let importData: any = null;
            const fileName = file.name.toLowerCase();

            if (fileName.endsWith(".json")) {
                const text = await file.text();
                importData = JSON.parse(text);
                if (!importData.personalInfo) {
                    alert("Invalid resume JSON — make sure it was exported from CVdraft.");
                    return;
                }
            } else {
                const fd = new FormData();
                fd.append("file", file);
                const res = await fetch("/api/parse-document", { method: "POST", body: fd });
                if (!res.ok) {
                    const err = await res.json();
                    alert(`Parse failed: ${err.error || "Unknown error"}`);
                    return;
                }
                const { resumeData } = await res.json();
                importData = resumeData;
            }

            const res = await fetch("/api/resumes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: importData.title || "Imported Resume",
                    importData,
                }),
            });
            if (res.status === 403) {
                alert("Limit reached. Delete an existing resume first, then import.");
                return;
            }
            if (!res.ok) throw new Error();
            const newResume = await res.json();
            setOpen(false);
            router.push(`/resume/${newResume._id}`);
        } catch (err: any) {
            console.error(err);
            alert("Import failed. " + (err.message || ""));
        } finally {
            setImporting(false);
        }
    };

    return (
        <>
            {/* Trigger */}
            <div onClick={() => setOpen(true)} className={className} style={{ cursor: "pointer" }}>
                {trigger ?? (
                    <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all active:scale-95 shadow-sm">
                        <Plus className="w-4 h-4" /> New resume
                    </button>
                )}
            </div>

            {/* Modal */}
            {open && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
                    onClick={e => e.target === e.currentTarget && setOpen(false)}
                >
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-90 fade-in duration-200">

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
                            <div>
                                <h2 className="text-base font-bold text-stone-900">
                                    {atLimit ? "Resume limit reached" : "Create new resume"}
                                </h2>
                                <p className="text-xs text-stone-400 mt-0.5">
                                    {atLimit
                                        ? `Free plan allows ${FREE_LIMIT} resumes. Delete one to continue.`
                                        : "Start from scratch or import an existing document"
                                    }
                                </p>
                            </div>
                            <button onClick={() => setOpen(false)} className="p-2 hover:bg-stone-100 rounded-xl transition-colors text-stone-400">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">

                            {/* Limit warning */}
                            {atLimit && (
                                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                                    <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                                    <p className="text-xs text-amber-700 font-medium">
                                        You have {resumes.length} / {FREE_LIMIT} free resumes. Delete an existing one to create or import a new one.
                                    </p>
                                </div>
                            )}

                            {/* Existing resumes — always shown so user can delete */}
                            {loadingResumes ? (
                                <div className="flex items-center justify-center py-6">
                                    <Loader2 className="w-5 h-5 animate-spin text-stone-400" />
                                </div>
                            ) : resumes.length > 0 ? (
                                <div>
                                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Your resumes</p>
                                    <div className="space-y-2">
                                        {resumes.map(r => (
                                            <div key={r._id} className="flex items-center justify-between px-4 py-3 bg-stone-50 rounded-2xl border border-stone-100 group">
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-semibold text-stone-800 truncate">{r.title || "Untitled"}</p>
                                                    <p className="text-[10px] text-stone-400">
                                                        Edited {new Date(r.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleDelete(r._id)}
                                                    disabled={deletingId === r._id}
                                                    className="ml-3 p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shrink-0"
                                                    title="Delete this resume"
                                                >
                                                    {deletingId === r._id
                                                        ? <Loader2 className="w-4 h-4 animate-spin" />
                                                        : <Trash2 className="w-4 h-4" />
                                                    }
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {/* Divider */}
                            {resumes.length > 0 && !atLimit && (
                                <div className="h-px bg-stone-100" />
                            )}

                            {/* Actions — shown when not at limit OR after delete brings below limit */}
                            {!atLimit && (
                                <div className="space-y-3">
                                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                        {resumes.length === 0 ? "Get started" : "Add new"}
                                    </p>

                                    {/* Blank resume */}
                                    <button
                                        onClick={handleCreateBlank}
                                        disabled={creating || importing}
                                        className="w-full flex items-center gap-4 px-4 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition-all active:scale-95 disabled:opacity-60 text-left"
                                    >
                                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                                            {creating ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{creating ? "Creating…" : "Start blank resume"}</p>
                                            <p className="text-xs text-indigo-200">Start from scratch with a clean, blank resume</p>
                                        </div>
                                        {!creating && <ArrowRight className="w-4 h-4 ml-auto shrink-0" />}
                                    </button>

                                    {/* Import from file */}
                                    <input
                                        ref={fileRef}
                                        type="file"
                                        accept=".pdf,.txt,.json"
                                        className="hidden"
                                        onChange={handleFileImport}
                                    />
                                    <button
                                        onClick={() => fileRef.current?.click()}
                                        disabled={creating || importing}
                                        className="w-full flex items-center gap-4 px-4 py-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 rounded-2xl transition-all active:scale-95 disabled:opacity-60 text-left"
                                    >
                                        <div className="w-10 h-10 bg-white border border-stone-200 rounded-xl flex items-center justify-center shrink-0">
                                            {importing ? <Loader2 className="w-5 h-5 animate-spin text-indigo-500" /> : <Upload className="w-5 h-5 text-indigo-500" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{importing ? "Importing…" : "Import from file"}</p>
                                            <p className="text-xs text-stone-400">PDF, TXT, or JSON — AI parses and fills it for you</p>
                                        </div>
                                        {!importing && <ArrowRight className="w-4 h-4 ml-auto shrink-0 text-stone-400" />}
                                    </button>
                                </div>
                            )}

                            {/* When at limit — show import hint below resumes */}
                            {atLimit && (
                                <p className="text-xs text-stone-400 text-center pb-1">
                                    Delete a resume above, then create or import a new one.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
