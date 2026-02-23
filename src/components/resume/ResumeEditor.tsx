"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
    ArrowLeft, Download, FileText, User, Briefcase,
    GraduationCap, Star, Share2, Globe, Medal, Plus, Sparkles,
    Loader2, AlertCircle, Eye, Sliders, Brain, Copy, ChevronUp,
    ChevronDown, EyeOff, Keyboard, Moon, Sun, FileJson,
    FileDown, CheckCircle2, BarChart3, Clock, AlignLeft, AlignCenter,
    AlignRight, Type, ChevronLeft, RefreshCw, CheckCircle, Layout, ClipboardPaste,
    MoreHorizontal, Printer, Link as LinkIcon, History, RefreshCcw, Trash2
} from "lucide-react";
import PersonalDetails from "./forms/PersonalDetails";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import Certifications from "./forms/Certifications";
import Languages from "./forms/Languages";
import Socials from "./forms/Socials";
import Projects from "./forms/Projects";
import CustomSection from "./forms/CustomSection";
import LayoutSettings from "./forms/LayoutSettings";
import CareerTools from "./forms/CareerTools";
import ResumePreview from "./ResumePreview";
import { generateDocx } from "@/lib/generateDocx";
import { INITIAL_DATA } from "@/lib/defaultData";
import { TEMPLATES } from "@/lib/templateOptions";

const SECTIONS = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Star },
    { id: "projects", label: "Projects", icon: FileText },
    { id: "certifications", label: "Certifications", icon: Medal },
    { id: "languages", label: "Languages", icon: Globe },
    { id: "socials", label: "Social Links", icon: Share2 },
    { id: "custom", label: "Custom Section", icon: Plus },
];

const UTILITY_SECTIONS = [
    { id: "ai-tools", label: "AI Tools", icon: Brain },
];

const ALL_SECTIONS = [...SECTIONS, ...UTILITY_SECTIONS];
const SIDEBAR_SECTIONS = ALL_SECTIONS;

const SECTION_HINTS: Record<string, string> = {
    personal: "Your name, contact details, and professional summary",
    experience: "Work history, job titles, and key achievements",
    education: "Degrees, institutions, and graduation dates",
    skills: "Technical skills, tools, and core competencies",
    projects: "Personal or professional projects you have built",
    certifications: "Certifications, licenses, and awards",
    languages: "Languages you speak and your proficiency level",
    socials: "LinkedIn, GitHub, portfolio, and other profile links",
    custom: "Any additional section relevant to your application",
    layout: "Templates, fonts, margins, and colors",
    "ai-tools": "AI-powered career and resume tools",
};

// ── Resume completeness score ──────────────────────────────────────────────
function getCompleteness(d: any) {
    const checks = [
        { label: "Name", done: !!d.personalInfo?.fullName },
        { label: "Email", done: !!d.personalInfo?.email },
        { label: "Phone", done: !!d.personalInfo?.phone },
        { label: "Summary", done: (d.personalInfo?.summary || "").length > 30 },
        { label: "Experience", done: (d.experience || []).length > 0 },
        { label: "Education", done: (d.education || []).length > 0 },
        { label: "Skills", done: (d.skills || []).length >= 3 },
        { label: "Projects", done: (d.projects || []).length > 0 },
        { label: "Links", done: (d.socialLinks || []).length > 0 },
        { label: "Job Title", done: !!d.personalInfo?.title },
    ];
    const done = checks.filter(c => c.done).length;
    return { score: Math.round((done / checks.length) * 100), checks };
}

export default function ResumeEditor({ resume, userId, userAiKeysData, preferredProvider = "gemini" }: { resume: any; userId: string; userAiKeysData?: { gemini: boolean, openai: boolean }; preferredProvider?: string }) {
    const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");
    const [activeSection, setActiveSection] = useState("personal");
    const [hasGemini, setHasGemini] = useState(userAiKeysData?.gemini || false);
    const [hasOpenai, setHasOpenai] = useState(userAiKeysData?.openai || false);
    const [activeProvider, setActiveProvider] = useState<"gemini" | "openai">(preferredProvider as any);
    const [showProviderMenu, setShowProviderMenu] = useState(false);
    const providerMenuRef = useRef<HTMLDivElement>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isDownloadingDocx, setIsDownloadingDocx] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [noKeyToast, setNoKeyToast] = useState(false);
    const [interviewQuestions, setInterviewQuestions] = useState<string[]>([]);
    const [isPredicting, setIsPredicting] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [showShortcuts, setShowShortcuts] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [showTypography, setShowTypography] = useState(false);
    const [showLayout, setShowLayout] = useState(false);
    const [hiddenSections, setHiddenSections] = useState<Set<string>>(new Set());
    const [copyToast, setCopyToast] = useState(false);
    const [aiStatus, setAiStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");
    const [showImportModal, setShowImportModal] = useState(false);
    const [importText, setImportText] = useState("");
    const [isImporting, setIsImporting] = useState(false);
    const [importError, setImportError] = useState("");
    const previewRef = useRef<HTMLDivElement>(null);
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [showTemplateMenu, setShowTemplateMenu] = useState(false);
    const moreMenuRef = useRef<HTMLDivElement>(null);
    const templateMenuRef = useRef<HTMLDivElement>(null);

    const [resumeData, setResumeData] = useState(() => {
        const p = { ...(resume.personalInfo || { fullName: "", title: "", email: "", phone: "", address: "", summary: "" }) };
        if (!p.fullName) {
            const first = p.firstName || p.first_name || "";
            const last = p.lastName || p.last_name || "";
            if (first || last) p.fullName = `${first} ${last}`.trim();
        }
        return {
            ...resume,
            certifications: resume.certifications || [],
            languages: resume.languages || [],
            projects: resume.projects || [],
            customSection: resume.customSection || { id: "custom", title: "Activities", items: [] },
            personalInfo: p,
            layout: resume.layout || { topMargin: 15, bottomMargin: 15, leftMargin: 20, rightMargin: 20, fontFamily: "Inter, sans-serif" },
            sectionOrder: resume.sectionOrder || ["experience", "education", "skills", "projects", "certifications", "languages", "custom"],
        };
    });

    useEffect(() => {
        // Sync the state if props update
        if (userAiKeysData) {
            setHasGemini(userAiKeysData.gemini);
            setHasOpenai(userAiKeysData.openai);
        }
    }, [userAiKeysData]);

    // Close menus on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (providerMenuRef.current && !providerMenuRef.current.contains(e.target as Node)) {
                setShowProviderMenu(false);
            }
            if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
                setShowMoreMenu(false);
            }
            if (templateMenuRef.current && !templateMenuRef.current.contains(e.target as Node)) {
                setShowTemplateMenu(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [showProviderMenu, showMoreMenu, showTemplateMenu]);

    // Auto-save
    useEffect(() => {
        const timer = setTimeout(async () => {
            setIsSaving(true);
            try {
                await fetch(`/api/resumes/${resume._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(resumeData),
                });
            } catch (e) { console.error("Save failed", e); }
            finally { setIsSaving(false); }
        }, 1500);
        return () => clearTimeout(timer);
    }, [resumeData]);

    // ── Keyboard shortcuts ──────────────────────────────────────────────────
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            // Ctrl/Cmd + S → force save
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                fetch(`/api/resumes/${resume._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(resumeData),
                });
            }
            // Ctrl/Cmd + P → download PDF
            if ((e.ctrlKey || e.metaKey) && e.key === "p") {
                e.preventDefault(); downloadPDF();
            }
            // Ctrl/Cmd + D → dark mode toggle
            if ((e.ctrlKey || e.metaKey) && e.key === "d") {
                e.preventDefault(); setDarkMode(v => !v);
            }
            // Ctrl/Cmd + ? → shortcuts
            if ((e.ctrlKey || e.metaKey) && e.key === "/") {
                e.preventDefault(); setShowShortcuts(v => !v);
            }
            // Escape → close overlays
            if (e.key === "Escape") { setShowShortcuts(false); setShowScore(false); }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [resumeData]);

    // ── Import resume from pasted text ──────────────────────────────────────
    const handleImportText = async () => {
        if (!importText.trim()) return;
        const anyKey = hasGemini || hasOpenai;
        if (!anyKey) {
            setImportError("Please add an AI API key in the Dashboard first.");
            return;
        }
        setIsImporting(true);
        setImportError("");
        try {
            const res = await fetch("/api/parse-text", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    provider: activeProvider,
                    text: importText,
                }),
            });
            const parsed = await res.json();
            if (!res.ok) throw new Error(parsed.error || "Parse failed");
            setResumeData((prev: any) => ({
                ...prev,
                personalInfo: parsed.personalInfo ?? prev.personalInfo,
                experience: parsed.experience?.length ? parsed.experience : prev.experience,
                education: parsed.education?.length ? parsed.education : prev.education,
                skills: parsed.skills?.length ? parsed.skills : prev.skills,
                projects: parsed.projects?.length ? parsed.projects : prev.projects,
                certifications: parsed.certifications?.length ? parsed.certifications : prev.certifications,
                languages: parsed.languages?.length ? parsed.languages : prev.languages,
                socialLinks: parsed.socialLinks?.length ? parsed.socialLinks : prev.socialLinks,
            }));
            setShowImportModal(false);
            setImportText("");
        } catch (e: any) {
            setImportError(e.message || "Something went wrong, please try again.");
        } finally {
            setIsImporting(false);
        }
    };

    // ── PDF download ────────────────────────────────────────────────────────
    const downloadPDF = async () => {
        if (!previewRef.current) return;
        setIsDownloading(true);
        try {
            const iframe = document.createElement("iframe");
            iframe.style.cssText = "position:absolute;top:-99999px;left:-99999px;width:210mm;";
            document.body.appendChild(iframe);
            const doc = iframe.contentWindow?.document;
            if (!doc) throw new Error("no doc");
            const styles = Array.from(document.querySelectorAll("style,link[rel='stylesheet']")).map(s => s.outerHTML).join("");
            doc.open();
            doc.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${resumeData.title || "Resume"}</title>${styles}
            <style>
                @page{size:A4 portrait;margin:0}
                body{margin:0;padding:0;background:#fff;-webkit-print-color-adjust:exact}
                .paper-page{box-shadow:none!important;margin:0!important;width:210mm!important;min-height:297mm!important;
                    padding:${resumeData.layout?.topMargin ?? 15}mm ${resumeData.layout?.rightMargin ?? 20}mm ${resumeData.layout?.bottomMargin ?? 15}mm ${resumeData.layout?.leftMargin ?? 20}mm!important}
                .no-print{display:none!important}
            </style></head><body>${previewRef.current.innerHTML}</body></html>`);
            doc.close();
            await new Promise(r => setTimeout(r, 900));
            iframe.contentWindow?.print();
            setTimeout(() => { document.body.removeChild(iframe); setIsDownloading(false); }, 1000);
        } catch (e) { console.error("PDF error", e); setIsDownloading(false); }
    };

    // ── DOCX download ───────────────────────────────────────────────────────
    const downloadDocx = async () => {
        setIsDownloadingDocx(true);
        try {
            const blob = await generateDocx(resumeData);
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = `${resumeData.title || "resume"}.docx`;
            document.body.appendChild(a); a.click(); a.remove();
            URL.revokeObjectURL(url);
        } catch (e) { alert("DOCX failed."); }
        finally { setIsDownloadingDocx(false); }
    };

    // ── Copy as plain text ──────────────────────────────────────────────────
    const copyAsText = () => {
        const p = resumeData.personalInfo || {};
        const lines: string[] = [
            p.fullName || "", p.title || "",
            [p.email, p.phone, p.address].filter(Boolean).join(" | "),
            "", "SUMMARY", p.summary || "",
        ];
        if (resumeData.experience?.length) {
            lines.push("", "EXPERIENCE");
            for (const e of resumeData.experience) {
                lines.push(`${e.jobTitle} @ ${e.companyName} (${e.startDate}–${e.isCurrent ? "Present" : e.endDate})`);
                if (e.description) lines.push(e.description);
            }
        }
        if (resumeData.skills?.length) {
            const names = resumeData.skills.map((s: any) => typeof s === "string" ? s : s.name).join(", ");
            lines.push("", "SKILLS", names);
        }
        if (resumeData.education?.length) {
            lines.push("", "EDUCATION");
            for (const e of resumeData.education) lines.push(`${e.degree} – ${e.schoolName} (${e.startDate}–${e.endDate})`);
        }
        navigator.clipboard.writeText(lines.join("\n"));
        setCopyToast(true);
        setTimeout(() => setCopyToast(false), 2500);
    };

    // ── Export JSON ─────────────────────────────────────────────────────────
    const exportJson = () => {
        const a = document.createElement("a");
        a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
        a.download = `${resumeData.title || "resume"}.json`;
        document.body.appendChild(a); a.click(); a.remove();
    };

    // ── Toggle section hidden ───────────────────────────────────────────────
    const toggleSection = (id: string) => {
        setHiddenSections(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const checkAiKey = async () => {
        const hasKey = activeProvider === "gemini" ? hasGemini : hasOpenai;
        if (!hasKey) { setAiStatus("invalid"); return; }
        setAiStatus("checking");
        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    provider: activeProvider,
                    section: "personal",
                    currentContent: "Hi, just a ping.",
                }),
            });
            setAiStatus(res.ok ? "valid" : "invalid");
        } catch { setAiStatus("invalid"); }
    };

    const updateLayout = (field: string, value: any) => {
        setResumeData((prev: any) => ({
            ...prev,
            layout: { ...(prev.layout || {}), [field]: value }
        }));
    };

    const getSectionAlignment = (id: string) => {
        return resumeData.layout?.sectionAlignment?.[id] || resumeData.layout?.textAlign || "left";
    };

    const updateSectionAlignment = (id: string, align: string) => {
        setResumeData((prev: any) => ({
            ...prev,
            layout: {
                ...prev.layout,
                sectionAlignment: {
                    ...(prev.layout?.sectionAlignment || {}),
                    [id]: align
                }
            }
        }));
    };

    const showNoKey = () => { setNoKeyToast(true); setTimeout(() => setNoKeyToast(false), 4000); };

    const renderForm = () => {
        const bind = (key: keyof typeof resumeData) => ({
            data: resumeData[key] as any,
            onChange: (d: any) => setResumeData((prev: any) => ({ ...prev, [key]: d })),
            textAlign: getSectionAlignment(key as string),
            onTextAlignChange: (a: string) => updateSectionAlignment(key as string, a),
        });
        switch (activeSection) {
            case "personal": return <PersonalDetails
                {...bind("personalInfo")}
                summaryTextAlign={getSectionAlignment("summary")}
                onSummaryTextAlignChange={(a: string) => updateSectionAlignment("summary", a)}
            />;
            case "experience": return <Experience         {...bind("experience")} />;
            case "education": return <Education          {...bind("education")} />;
            case "skills": return <Skills             {...bind("skills")} />;
            case "projects": return <Projects            {...bind("projects")} />;
            case "certifications": return <Certifications     {...bind("certifications")} />;
            case "languages": return <Languages          {...bind("languages")} />;
            case "socials": return <Socials             {...bind("socialLinks")} />;
            case "custom": return <CustomSection      {...bind("customSection")} />;
            case "layout": return <LayoutSettings
                data={{ ...resumeData.layout, themeColor: resumeData.themeColor, fontSize: resumeData.fontSize, templateId: resumeData.templateId }}
                onChange={(d: any) => setResumeData((p: any) => ({
                    ...p,
                    themeColor: d.themeColor ?? p.themeColor,
                    fontSize: d.fontSize ?? p.fontSize,
                    templateId: d.templateId ?? p.templateId,
                    layout: { ...d, sectionAlignment: p.layout?.sectionAlignment }, // Preserve granular alignments
                }))}
            />;
            case "ai-tools": return (
                <CareerTools
                    data={resumeData}
                    interviewQuestions={interviewQuestions}
                    setInterviewQuestions={setInterviewQuestions}
                    isPredicting={isPredicting}
                    setIsPredicting={setIsPredicting}
                    provider={activeProvider}
                />
            );
            default: return null;
        }
    };

    const current = ALL_SECTIONS.find(s => s.id === activeSection) || SECTIONS[0];
    const completeness = getCompleteness(resumeData);
    const wordCount = JSON.stringify(resumeData.personalInfo || {}).split(/\s+/).length
        + (resumeData.experience || []).reduce((a: number, e: any) => a + (e.description || "").split(/\s+/).length, 0);

    const bg = darkMode ? "#1e1e2e" : "#f5f4f0";
    const editorBg = darkMode ? "#2a2a3e" : "white";

    return (
        <div className="flex flex-col h-screen overflow-hidden" style={{ background: bg }}>

            {/* ── Header ─────────────────────────────────────────────────── */}
            <header className="shrink-0 h-14 border-b flex items-center justify-between px-4 shadow-sm z-50"
                style={{ background: editorBg, borderColor: darkMode ? "#3a3a5c" : "#e2e8f0" }}>
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors text-stone-500">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <input
                            type="text"
                            value={resumeData.title}
                            onChange={e => setResumeData((p: any) => ({ ...p, title: e.target.value }))}
                            className="block text-sm font-bold bg-transparent border-none outline-none w-36 sm:w-48 truncate"
                            style={{ color: darkMode ? "#e2e8f0" : "#1e293b" }}
                            placeholder="My Resume"
                        />
                        <p className="text-[10px] text-stone-400 leading-none mt-0.5 flex items-center gap-1">
                            {isSaving ? <><Loader2 className="w-2.5 h-2.5 animate-spin" /> Saving…</> : <><CheckCircle2 className="w-2.5 h-2.5 text-green-500" /> Saved</>}
                            <span className="mx-1">·</span>
                            <span className="text-stone-400">{wordCount}w</span>
                        </p>
                    </div>
                    {/* Import from text */}
                    <button
                        onClick={() => setShowImportModal(true)}
                        title="Import resume from pasted text (AI)"
                        className="hidden sm:flex items-center gap-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                    >
                        <ClipboardPaste className="w-3.5 h-3.5" />
                        Import
                    </button>
                </div>

                <div className="flex items-center gap-1.5">
                    {/* Mobile toggle */}
                    <div className="flex md:hidden bg-stone-100 rounded-xl p-1 gap-1">
                        <button onClick={() => setMobileView("editor")}
                            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${mobileView === "editor" ? "bg-white shadow text-stone-800" : "text-stone-400"}`}>
                            <FileText className="w-3 h-3" /> Edit
                        </button>
                        <button onClick={() => setMobileView("preview")}
                            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${mobileView === "preview" ? "bg-white shadow text-stone-800" : "text-stone-400"}`}>
                            <Eye className="w-3 h-3" /> Preview
                        </button>
                    </div>

                    {/* Spacer for removed utility nav — those are now in the sidebar */}

                    {/* Score badge */}
                    <button onClick={() => setShowScore(v => !v)}
                        className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all"
                        style={{ background: completeness.score >= 80 ? "#dcfce7" : "#fef9c3", color: completeness.score >= 80 ? "#16a34a" : "#ca8a04" }}>
                        <BarChart3 className="w-3.5 h-3.5" /> {completeness.score}%
                    </button>

                    {/* Dark mode */}
                    <button onClick={() => setDarkMode(v => !v)}
                        className="hidden sm:flex w-8 h-8 items-center justify-center rounded-xl hover:bg-stone-100 text-stone-500 transition-colors">
                        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>

                    {/* Export actions — Copy / DOCX / PDF in navbar */}
                    <div className="hidden sm:flex items-center gap-1 bg-stone-100 rounded-xl p-1">
                        <button onClick={copyAsText} title="Copy as plain text"
                            className={`flex items-center gap-1.5 h-7 px-2.5 text-xs font-semibold rounded-lg transition-all ${copyToast ? "text-green-600 bg-white shadow-sm" : "text-stone-600 hover:bg-white hover:shadow-sm"
                                }`}>
                            {copyToast ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            {copyToast ? "Copied!" : "Copy"}
                        </button>
                        <button onClick={downloadDocx} disabled={isDownloadingDocx}
                            title="Download Word DOCX"
                            className="flex items-center gap-1.5 h-7 px-2.5 text-xs font-semibold text-stone-600 hover:bg-white hover:shadow-sm rounded-lg transition-all disabled:opacity-50">
                            {isDownloadingDocx ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5" />}
                            DOCX
                        </button>
                        <button onClick={downloadPDF} disabled={isDownloading}
                            className="flex items-center gap-1.5 h-7 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-all disabled:opacity-50 active:scale-95">
                            {isDownloading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                            PDF
                        </button>
                    </div>

                    {/* Typography Setting */}
                    <div className="relative">
                        <button onClick={() => { setShowTypography(!showTypography); setShowLayout(false); }}
                            className={`hidden sm:flex w-8 h-8 items-center justify-center rounded-xl transition-all ${showTypography ? "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200" : "hover:bg-stone-100 text-stone-500"}`}
                            title="Typography & Sizing">
                            <Type className="w-4 h-4" />
                        </button>
                        {showTypography && (
                            <div className="absolute top-full mt-2 right-0 w-64 bg-white border border-stone-100 rounded-2xl shadow-2xl p-5 z-[100] animate-in fade-in slide-in-from-top-2">
                                <h5 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4">Typography</h5>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-xs font-bold text-stone-800">Line Height</label>
                                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{resumeData.layout?.lineHeight || 1.45}</span>
                                        </div>
                                        <input type="range" min="1.0" max="2.0" step="0.05"
                                            value={resumeData.layout?.lineHeight || 1.45}
                                            onChange={e => updateLayout("lineHeight", parseFloat(e.target.value))}
                                            className="w-full accent-indigo-600" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-stone-800">Preview Layout</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button onClick={() => updateLayout("isBlindMode", !resumeData.layout?.isBlindMode)}
                                                className={`py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${resumeData.layout?.isBlindMode ? "bg-emerald-600 text-white" : "bg-stone-50 text-stone-500"}`}>
                                                Blind Mode
                                            </button>
                                            <button onClick={() => updateLayout("showGrid", !resumeData.layout?.showGrid)}
                                                className={`py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${resumeData.layout?.showGrid ? "bg-indigo-600 text-white" : "bg-stone-50 text-stone-500"}`}>
                                                Draft Grid
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showTypography && <div className="fixed inset-0 z-[90]" onClick={() => setShowTypography(false)} />}
                    </div>

                    {/* Layout Setting popup */}
                    <div className="relative">
                        <button onClick={() => { setShowLayout(!showLayout); setShowTypography(false); }}
                            className={`hidden sm:flex w-8 h-8 items-center justify-center rounded-xl transition-all ${showLayout ? "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200" : "hover:bg-stone-100 text-stone-500"}`}
                            title="Template & Layout settings">
                            <Layout className="w-4 h-4" />
                        </button>
                        {showLayout && (
                            <div className="absolute top-full mt-2 right-0 w-[420px] bg-white border border-stone-100 rounded-2xl shadow-2xl p-6 z-[100] max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-2">
                                <h5 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4">Design & Templates</h5>
                                <LayoutSettings
                                    data={{ ...resumeData.layout, themeColor: resumeData.themeColor, fontSize: resumeData.fontSize, templateId: resumeData.templateId, sectionSpacing: resumeData.sectionSpacing }}
                                    onChange={(d: any) => setResumeData((p: any) => ({
                                        ...p,
                                        themeColor: d.themeColor ?? p.themeColor,
                                        fontSize: d.fontSize ?? p.fontSize,
                                        templateId: d.templateId ?? p.templateId,
                                        sectionSpacing: d.sectionSpacing ?? p.sectionSpacing,
                                        layout: { ...d, sectionAlignment: p.layout?.sectionAlignment },
                                    }))}
                                />
                            </div>
                        )}
                        {showLayout && <div className="fixed inset-0 z-[90]" onClick={() => setShowLayout(false)} />}
                    </div>

                    {/* Template selection dropdown */}
                    <div ref={templateMenuRef} className="relative hidden sm:block">
                        <button onClick={() => { setShowTemplateMenu(v => !v); setShowLayout(false); setShowTypography(false); setShowMoreMenu(false); setShowProviderMenu(false); }}
                            className={`flex items-center gap-1.5 h-8 px-3 rounded-xl transition-all font-bold text-xs ${showTemplateMenu ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 ring-1 ring-indigo-200"}`}
                            title="Choose Resume Template">
                            <Layout className="w-4 h-4" />
                            Templates
                        </button>
                        {showTemplateMenu && (
                            <div className="absolute right-0 top-full mt-2 w-[540px] bg-white border border-stone-200 rounded-2xl shadow-2xl p-5 z-[110] animate-in fade-in zoom-in-95 duration-150 max-h-[75vh] overflow-y-auto">
                                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4">Choose a Template</p>
                                <div className="grid grid-cols-4 gap-4">
                                    {TEMPLATES.map(t => (
                                        <button key={t.id} onClick={() => { setResumeData((p: any) => ({ ...p, templateId: t.id })); setShowTemplateMenu(false); }}
                                            className={`relative aspect-[3/4] flex flex-col rounded-xl overflow-hidden border-2 transition-all group ${resumeData.templateId === t.id ? 'border-indigo-600 ring-2 ring-indigo-600/20' : 'border-stone-200 hover:border-indigo-300'}`}>
                                            <div className="flex-1 bg-stone-100 p-2 overflow-hidden items-center justify-center flex pointer-events-none transition-transform group-hover:scale-105">
                                                <div className="w-full h-full bg-white shadow-sm overflow-hidden rounded-md border border-stone-200/50">
                                                    {t.preview(resumeData.themeColor || "#0f172a")}
                                                </div>
                                            </div>
                                            <div className="bg-white border-t border-stone-100 py-2 px-2 text-center h-8 flex items-center justify-center">
                                                <span className={`text-[10px] font-bold ${resumeData.templateId === t.id ? 'text-indigo-600' : 'text-stone-600'}`}>
                                                    {t.label}
                                                </span>
                                            </div>
                                            {resumeData.templateId === t.id && (
                                                <div className="absolute top-1.5 right-1.5 flex items-center justify-center w-4 h-4 bg-indigo-600 rounded-full shadow-sm">
                                                    <CheckCircle className="w-2.5 h-2.5 text-white" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* More actions dropdown */}
                    <div ref={moreMenuRef} className="relative hidden sm:block">
                        <button onClick={() => setShowMoreMenu(v => !v)}
                            className={`flex w-8 h-8 items-center justify-center rounded-xl transition-all ${showMoreMenu ? "bg-stone-200 text-stone-800" : "hover:bg-stone-100 text-stone-500"}`}
                            title="More Actions">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                        {showMoreMenu && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-stone-200 rounded-2xl shadow-xl py-2 z-[110] animate-in fade-in zoom-in-95 duration-150">
                                <p className="px-3 pb-1.5 pt-0.5 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Additional Tools</p>

                                <button onClick={() => { window.print(); setShowMoreMenu(false); }}
                                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors">
                                    <Printer className="w-4 h-4 text-stone-400" /> Print
                                </button>

                                <button onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert("Editor link copied! Need pro tier for public sharing.");
                                    setShowMoreMenu(false);
                                }}
                                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors">
                                    <LinkIcon className="w-4 h-4 text-stone-400" /> Share Link
                                </button>

                                <button onClick={() => { alert("Version history is a Pro feature."); setShowMoreMenu(false); }}
                                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors">
                                    <History className="w-4 h-4 text-stone-400" /> History
                                </button>

                                <div className="h-px bg-stone-100 my-1" />

                                <button onClick={() => {
                                    if (confirm("Load demo data? Current content will be lost.")) {
                                        setResumeData(INITIAL_DATA);
                                    }
                                    setShowMoreMenu(false);
                                }}
                                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-stone-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                                    <RefreshCcw className="w-4 h-4 text-blue-400" /> Load Demo
                                </button>

                                <button onClick={() => {
                                    if (confirm("Are you sure you want to clear EVERYTHING?")) {
                                        setResumeData({ title: "Blank Resume", personalInfo: {}, experience: [], education: [], skills: [], projects: [], socialLinks: [] });
                                    }
                                    setShowMoreMenu(false);
                                }}
                                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                    <Trash2 className="w-4 h-4" /> Clear All
                                </button>
                            </div>
                        )}
                    </div>

                    {/* AI Provider picker */}
                    <div ref={providerMenuRef} className="relative hidden sm:block">
                        <button
                            onClick={() => setShowProviderMenu(v => !v)}
                            title="Switch AI provider"
                            className={`flex items-center gap-1.5 h-8 px-2.5 rounded-xl text-xs font-semibold transition-all border ${aiStatus === "valid" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                aiStatus === "invalid" ? "bg-red-50 text-red-600 border-red-200" :
                                    "bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100"
                                }`}
                        >
                            <span className={`w-2 h-2 rounded-full ${activeProvider === "gemini" ? "bg-blue-400" :
                                activeProvider === "openai" ? "bg-emerald-500" : "bg-orange-400"
                                }`} />
                            <span className="capitalize">{activeProvider}</span>
                            {aiStatus === "checking" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Brain className="w-3 h-3 opacity-50" />}
                        </button>

                        {showProviderMenu && (
                            <div className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-stone-200 rounded-2xl shadow-xl py-2 z-[110] animate-in fade-in zoom-in-95 duration-150">
                                <p className="px-3 pb-1.5 pt-0.5 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Switch AI Provider</p>
                                {([
                                    { id: "gemini", label: "Google Gemini", emoji: "✨", hasKey: hasGemini, color: "bg-blue-400" },
                                    { id: "openai", label: "OpenAI GPT", emoji: "⚙️", hasKey: hasOpenai, color: "bg-emerald-500" },
                                ] as const).filter(p => !!p.hasKey).map(p => (
                                    <button
                                        key={p.id}
                                        onClick={async () => {
                                            setActiveProvider(p.id as "gemini" | "openai");
                                            localStorage.setItem("preferred_ai_provider", p.id);
                                            setShowProviderMenu(false);
                                            setAiStatus("idle");
                                            // Persist to database
                                            try {
                                                await fetch("/api/user", {
                                                    method: "PATCH",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ preferredProvider: p.id }),
                                                });
                                            } catch { /* non-critical */ }
                                        }}
                                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${activeProvider === p.id
                                            ? "bg-indigo-50 text-indigo-700 font-semibold"
                                            : "hover:bg-stone-50 text-stone-700"
                                            }`}
                                    >
                                        <span className={`w-2 h-2 rounded-full shrink-0 ${p.color}`} />
                                        <span>{p.emoji} {p.label}</span>
                                        {activeProvider === p.id && <CheckCircle className="w-3.5 h-3.5 ml-auto text-indigo-500" />}
                                    </button>
                                ))}
                                <div className="border-t border-stone-100 mt-1.5 pt-1.5 px-3">
                                    <button onClick={() => { checkAiKey(); setShowProviderMenu(false); }}
                                        className="w-full text-xs text-stone-400 hover:text-indigo-600 transition-colors py-1 text-left font-medium">
                                        Test connection →
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </header>

            {/* ── Body ───────────────────────────────────────────────────── */}
            <div className="flex flex-1 overflow-hidden">

                {/* Icon nav rail — desktop */}
                <nav className="hidden md:flex flex-col items-center gap-1 py-4 px-1.5 border-r shrink-0 w-[66px] overflow-y-auto"
                    style={{ background: editorBg, borderColor: darkMode ? "#3a3a5c" : "#e2e8f0" }}>
                    {SECTIONS.map(s => {
                        const hidden = hiddenSections.has(s.id);
                        return (
                            <button key={s.id} title={s.label} onClick={() => setActiveSection(s.id)}
                                className={`relative w-12 h-12 flex flex-col items-center justify-center rounded-2xl transition-all duration-200 group ${activeSection === s.id
                                    ? "bg-indigo-50 ring-2 ring-indigo-300 scale-105 text-indigo-600"
                                    : hidden
                                        ? "text-stone-300 hover:text-stone-500"
                                        : "text-stone-400 hover:bg-stone-50 hover:text-stone-700"
                                    }`}>
                                <s.icon className="w-5 h-5" />
                                {hidden && <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />}
                            </button>
                        );
                    })}

                    {/* Divider */}
                    <div className="w-8 h-px my-1" style={{ background: darkMode ? "#3a3a5c" : "#e2e8f0" }} />

                    {/* Layout & AI Tools */}
                    {UTILITY_SECTIONS.map(s => (
                        <button key={s.id} title={s.label} onClick={() => setActiveSection(s.id)}
                            className={`relative w-12 h-12 flex flex-col items-center justify-center rounded-2xl transition-all duration-200 group ${activeSection === s.id
                                ? "bg-indigo-50 ring-2 ring-indigo-300 scale-105 text-indigo-600"
                                : "text-stone-400 hover:bg-stone-50 hover:text-stone-700"
                                }`}>
                            <s.icon className="w-5 h-5" />
                        </button>
                    ))}
                </nav>

                {/* Editor panel */}
                <aside className={`flex-col w-full md:w-[420px] lg:w-[460px] shrink-0 border-r overflow-hidden ${mobileView === "preview" ? "hidden md:flex" : "flex"}`}
                    style={{ background: editorBg, borderColor: darkMode ? "#3a3a5c" : "#e2e8f0" }}>

                    {/* Section header with hide toggle */}
                    <div className="shrink-0 px-5 pt-4 pb-3 border-b flex items-center gap-3"
                        style={{ borderColor: darkMode ? "#3a3a5c" : "#f1f5f9" }}>
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                            <current.icon style={{ width: 18, height: 18 }} className="text-indigo-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-base font-bold" style={{ color: darkMode ? "#e2e8f0" : "#1e293b" }}>{current.label}</h2>
                            <p className="text-xs text-stone-400">{SECTION_HINTS[activeSection] || ""}</p>
                        </div>
                        {/* Hide/show section from resume */}
                        {SECTIONS.some(s => s.id === activeSection) && (
                            <button onClick={() => toggleSection(activeSection)}
                                title={hiddenSections.has(activeSection) ? "Show on resume" : "Hide from resume"}
                                className={`p-2 rounded-xl transition-colors text-xs flex items-center gap-1 ${hiddenSections.has(activeSection)
                                    ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                                    : "hover:bg-stone-100 text-stone-400"
                                    }`}>
                                <EyeOff className="w-4 h-4" />
                                <span className="hidden sm:inline text-[10px] font-semibold">
                                    {hiddenSections.has(activeSection) ? "Hidden" : "Hide"}
                                </span>
                            </button>
                        )}
                    </div>

                    {/* AI key missing banner */}
                    {!(hasGemini || hasOpenai) && (
                        <div className="shrink-0 mx-4 mt-3 flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                            <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                            <span>AI off. <Link href="/dashboard" className="font-bold underline">Add a key in Dashboard → Settings</Link></span>
                        </div>
                    )}

                    {/* Mobile section pills */}
                    <div className="md:hidden shrink-0 flex gap-1.5 px-4 pt-3 pb-1 flex-wrap">
                        {ALL_SECTIONS.map(s => (
                            <button key={s.id} onClick={() => setActiveSection(s.id)}
                                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeSection === s.id ? "bg-indigo-600 text-white" : "bg-stone-100 text-stone-500"}`}>
                                <s.icon className="w-3 h-3" /> {s.label}
                            </button>
                        ))}
                    </div>

                    {/* Form */}
                    <div className="flex-1 overflow-y-auto px-5 py-4 pb-24">
                        <div key={activeSection} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {renderForm()}
                        </div>
                    </div>
                </aside>

                {/* Preview pane */}
                <section className={`flex-1 flex-col overflow-hidden ${mobileView === "editor" ? "hidden md:flex" : "flex"}`}
                    style={{ background: darkMode ? "#161625" : "#e8e6e1" }}>
                    {/* Preview toolbar — all export actions live here, not on the canvas */}
                    <div className="shrink-0 flex items-center justify-between px-5 py-2 border-b"
                        style={{ background: editorBg, borderColor: darkMode ? "#3a3a5c" : "#e2e8f0" }}>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                                <Eye className="w-3.5 h-3.5" /> Live Preview
                            </div>
                            {/* Zoom controls */}
                            <div className="flex items-center gap-1.5 bg-stone-100 px-2 py-1 rounded-lg ml-2">
                                <button onClick={() => updateLayout("scale", Math.max(0.4, (resumeData.layout?.scale || 1) - 0.1))} className="text-stone-400 hover:text-stone-600">
                                    <ChevronLeft className="w-3 h-3" />
                                </button>
                                <span className="text-[10px] font-bold text-stone-500 w-8 text-center">{Math.round((resumeData.layout?.scale || 1) * 100)}%</span>
                                <button onClick={() => updateLayout("scale", Math.min(1.5, (resumeData.layout?.scale || 1) + 0.1))} className="text-stone-400 hover:text-stone-600">
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                        {/* Export actions — clean, always visible, no floating overlay */}
                        <div className="flex items-center gap-1.5">
                            <div className="flex items-center gap-1.5 text-[10px] text-stone-400 mr-1 hidden lg:flex">
                                <Clock className="w-3 h-3" />
                                ~{Math.max(1, Math.round(wordCount / 200))} min read
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto flex items-start justify-center p-6 lg:p-10">
                        <div ref={previewRef} className="shadow-2xl rounded-sm overflow-hidden">
                            <ResumePreview data={resumeData} hiddenSections={hiddenSections} />
                        </div>
                    </div>
                </section>
            </div>

            {/* ── Mobile bottom nav ─────────────────────────────────────── */}
            <div className="md:hidden shrink-0 flex items-center justify-around h-14 bg-white border-t border-stone-200 px-1">
                {SECTIONS.slice(0, 3).map(s => (
                    <button key={s.id} onClick={() => { setActiveSection(s.id); setMobileView("editor"); }}
                        className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${activeSection === s.id && mobileView === "editor" ? "text-indigo-600" : "text-stone-400"}`}>
                        <s.icon className="w-5 h-5" />
                        <span className="text-[8px] font-semibold">{s.label}</span>
                    </button>
                ))}

                <button onClick={() => setMobileView(mobileView === "preview" ? "editor" : "preview")}
                    className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${mobileView === "preview" ? "text-indigo-600" : "text-stone-400"}`}>
                    <Eye className="w-5 h-5" />
                    <span className="text-[8px] font-semibold">Preview</span>
                </button>
            </div>

            {/* ── Import from text modal ──────────────────────────────── */}
            {showImportModal && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
                    onClick={() => setShowImportModal(false)}>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 animate-in zoom-in-90 duration-200" onClick={e => e.stopPropagation()}>
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
                                    <ClipboardPaste className="w-5 h-5 text-indigo-500" />
                                    Import from Text
                                </h3>
                                <p className="text-xs text-stone-400 mt-0.5">Paste your old resume and AI will auto-fill all fields</p>
                            </div>
                            <button onClick={() => setShowImportModal(false)} className="text-stone-400 hover:text-stone-600 transition-colors text-xl leading-none">✕</button>
                        </div>

                        {importError && (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-medium px-3 py-2.5 rounded-xl mb-4">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {importError}
                            </div>
                        )}

                        <textarea
                            value={importText}
                            onChange={e => setImportText(e.target.value)}
                            placeholder="Paste your resume here... (plain text, LinkedIn About section, Word doc content, etc.)"
                            rows={10}
                            className="w-full text-xs text-stone-700 bg-stone-50 border border-stone-200 rounded-2xl p-4 resize-none outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                        />
                        <p className="text-[10px] text-stone-400 mt-2 mb-4">
                            ⚡ Tip: Copy-paste from Word, Google Docs, or LinkedIn — AI handles the rest
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowImportModal(false)}
                                className="flex-1 py-2.5 rounded-2xl border border-stone-200 text-sm font-semibold text-stone-500 hover:bg-stone-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleImportText}
                                disabled={isImporting || !importText.trim()}
                                className="flex-1 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                            >
                                {isImporting ? <><Loader2 className="w-4 h-4 animate-spin" /> Parsing with AI...</> : <><Sparkles className="w-4 h-4" /> Auto-fill Resume</>}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Completeness score overlay ──────────────────────────── */}
            {showScore && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
                    onClick={() => setShowScore(false)}>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 animate-in zoom-in-90 duration-200" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg font-black text-stone-900 mb-1">Resume Score</h3>
                        <p className="text-xs text-stone-400 mb-4">Fill each section to improve ATS readiness</p>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative w-20 h-20 shrink-0">
                                <svg className="w-full h-full -rotate-90">
                                    <circle cx="40" cy="40" r="34" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
                                    <circle cx="40" cy="40" r="34" stroke={completeness.score >= 80 ? "#22c55e" : "#6366f1"} strokeWidth="6" fill="transparent"
                                        strokeDasharray={213.6} strokeDashoffset={213.6 - (213.6 * completeness.score) / 100}
                                        className="transition-all duration-700" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-xl font-black text-stone-900">{completeness.score}</span>
                                    <span className="text-[8px] font-bold text-stone-400 uppercase">%</span>
                                </div>
                            </div>
                            <div className="flex-1 space-y-2">
                                {completeness.checks.map((c, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs">
                                        <span className={c.done ? "text-stone-600" : "text-stone-400"}>{c.label}</span>
                                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-white ${c.done ? "bg-green-500" : "bg-stone-200"}`}>
                                            {c.done ? "✓" : ""}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => setShowScore(false)}
                            className="w-full py-3 bg-indigo-600 text-white text-sm font-bold rounded-2xl hover:bg-indigo-700 transition-colors">
                            Got it
                        </button>
                    </div>
                </div>
            )}

            {/* ── Keyboard shortcuts overlay ──────────────────────────── */}
            {showShortcuts && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
                    onClick={() => setShowShortcuts(false)}>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 animate-in zoom-in-90 duration-200" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg font-black text-stone-900 mb-4">Keyboard Shortcuts</h3>
                        {[
                            ["Ctrl + S", "Save now"],
                            ["Ctrl + P", "Download PDF"],
                            ["Ctrl + D", "Toggle dark mode"],
                            ["Ctrl + /", "Show shortcuts"],
                            ["Escape", "Close overlays"],
                        ].map(([key, action]) => (
                            <div key={key} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                                <span className="text-xs text-stone-500">{action}</span>
                                <kbd className="px-2 py-1 bg-stone-100 rounded-lg text-xs font-mono font-bold text-stone-700">{key}</kbd>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Toast notifications ─────────────────────────────────── */}
            {noKeyToast && (
                <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-3 fade-in duration-300">
                    <div className="flex items-center gap-2 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-lg text-sm font-medium">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>AI is off. <Link href="/dashboard" className="text-indigo-300 underline font-bold">Add your key in Dashboard</Link></span>
                    </div>
                </div>
            )}

            {copyToast && (
                <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-3 fade-in duration-300">
                    <div className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-lg text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 shrink-0" /> Resume copied as plain text!
                    </div>
                </div>
            )}

            {/* AI loading overlay */}
            {isGenerating && (
                <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[90] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3 bg-white px-10 py-8 rounded-3xl shadow-xl border border-stone-100">
                        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                        <p className="text-sm font-semibold text-stone-700">Making it better…</p>
                    </div>
                </div>
            )}
        </div>
    );
}
