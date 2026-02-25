"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
    ArrowLeft, Download, FileText, User, Briefcase,
    GraduationCap, Star, Share2, Globe, Medal, Plus, Sparkles,
    Loader2, AlertCircle, Eye, Sliders, Copy, ChevronUp,
    ChevronDown, EyeOff, Keyboard, Moon, Sun, FileJson,
    FileDown, CheckCircle2, BarChart3, Clock, AlignLeft, AlignCenter,
    AlignRight, Type, ChevronLeft, RefreshCw, CheckCircle, Layout,
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
import TemplateSettings from "./forms/TemplateSettings";
import ResumePreview from "./ResumePreview";
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
    { id: "layout", label: "Appearance", icon: Sliders },
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
    layout: "Templates, fonts, margins, and colors"
};

// ── Resume completeness score ──────────────────────────────────────────────
function getCompleteness(d: any) {
    const checks = [
        { label: "Full Name", done: (d.personalInfo?.fullName || "").length > 2 },
        { label: "Target Title", done: !!d.personalInfo?.title },
        { label: "Contact Info", done: !!d.personalInfo?.email && !!d.personalInfo?.phone },
        { label: "Pro Summary", done: (d.personalInfo?.summary || "").length > 50 },
        { label: "Work History", done: (d.experience || []).length > 0 },
        { label: "Education", done: (d.education || []).length > 0 },
        { label: "Core Skills", done: (d.skills || []).length >= 5 },
        { label: "Notable Projects", done: (d.projects || []).length > 0 },
        { label: "Social Presence", done: (d.socialLinks || []).length > 0 },
    ];
    const done = checks.filter(c => c.done).length;
    return { score: Math.round((done / checks.length) * 100), checks };
}

export default function ResumeEditor({ resume, userId }: { resume: any; userId: string; }) {
    const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");
    const [activeSection, setActiveSection] = useState("personal");
    const [isSaving, setIsSaving] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [showShortcuts, setShowShortcuts] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [showTypography, setShowTypography] = useState(false);
    const [showLayout, setShowLayout] = useState(false);
    const [hiddenSections, setHiddenSections] = useState<Set<string>>(new Set());
    const [copyToast, setCopyToast] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const moreMenuRef = useRef<HTMLDivElement>(null);
    const [showTemplateMenu, setShowTemplateMenu] = useState(false);
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

    // Close menus on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
                setShowMoreMenu(false);
            }
            if (templateMenuRef.current && !templateMenuRef.current.contains(e.target as Node)) {
                setShowTemplateMenu(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [showMoreMenu, showTemplateMenu]);

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



    // ── PDF download ──────────────────────────────────────────────────────
    const downloadPDF = async () => {
        setIsDownloading(true);
        if (mobileView === "editor" && window.innerWidth < 768) {
            setMobileView("preview");
            await new Promise(r => setTimeout(r, 300));
        }
        try {
            // html2canvas-pro supports oklch/lab (DaisyUI v5)
            // @ts-ignore
            const html2canvasPro = (await import("html2canvas-pro")).default;
            const { jsPDF } = await import("jspdf");

            const paper = document.querySelector('.paper-page') as HTMLElement;
            if (!paper) throw new Error("Preview not found");

            // paper-page is fixed off-screen; just capture it directly at 2x retina
            await new Promise(r => setTimeout(r, 80));

            const canvas = await html2canvasPro(paper, {
                scale: 2,
                useCORS: true,
                width: 794,
                windowWidth: 794,
                scrollX: 0,
                scrollY: 0,
            });

            // Slice canvas into A4 pages
            const A4_W_MM = 210;
            const A4_H_MM = 297;
            const MM_PER_PX = A4_W_MM / canvas.width; // mm per canvas pixel
            const A4_H_PX = Math.round(A4_H_MM / MM_PER_PX); // pixels that equal one A4 page height

            const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
            const totalHeightPX = canvas.height;
            let offsetPX = 0;
            let pageIdx = 0;

            while (offsetPX < totalHeightPX) {
                if (pageIdx > 0) pdf.addPage();
                const remainingPX = totalHeightPX - offsetPX;
                // Skip tiny trailing pages (< 10mm of content)
                if (remainingPX < Math.round(10 / MM_PER_PX)) break;

                // Slice this page from the canvas
                const sliceCanvas = document.createElement('canvas');
                sliceCanvas.width = canvas.width;
                sliceCanvas.height = Math.min(A4_H_PX, remainingPX);
                const ctx = sliceCanvas.getContext('2d')!;
                ctx.drawImage(canvas, 0, offsetPX, canvas.width, sliceCanvas.height, 0, 0, canvas.width, sliceCanvas.height);

                const sliceImg = sliceCanvas.toDataURL('image/jpeg', 0.98);
                const sliceHeightMM = sliceCanvas.height * MM_PER_PX;
                pdf.addImage(sliceImg, 'JPEG', 0, 0, A4_W_MM, sliceHeightMM);

                offsetPX += A4_H_PX;
                pageIdx++;
            }

            const safeTitle = (resumeData.title || "Resume").replace(/[^a-zA-Z0-9.\-_]/g, '_');
            pdf.save(`${safeTitle}.pdf`);

        } catch (e) {
            console.error("PDF error", e);
            alert("PDF generation failed. Use Ctrl+P to print as PDF instead.");
        } finally {
            setIsDownloading(false);
        }
    };

    const getTxtContent = () => {
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
        return lines.join("\n");
    };

    const copyAsText = () => {
        navigator.clipboard.writeText(getTxtContent());
        setCopyToast(true);
        setTimeout(() => setCopyToast(false), 2500);
    };

    const downloadTxt = () => {
        const a = document.createElement("a");
        a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(getTxtContent());
        a.download = `${(resumeData.title || "resume").replace(/[^a-zA-Z0-9.\-_]/g, '_')}.txt`;
        document.body.appendChild(a); a.click(); a.remove();
    };

    // ── Export JSON ─────────────────────────────────────────────────────────
    const exportJson = () => {
        const a = document.createElement("a");
        a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
        a.download = `${(resumeData.title || "resume").replace(/[^a-zA-Z0-9.\-_]/g, '_')}.json`;
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
            default: return null;
        }
    };

    const current = ALL_SECTIONS.find(s => s.id === activeSection) || SECTIONS[0];
    const completeness = getCompleteness(resumeData);
    const wordCount = JSON.stringify(resumeData.personalInfo || {}).split(/\s+/).length
        + (resumeData.experience || []).reduce((a: number, e: any) => a + (e.description || "").split(/\s+/).length, 0);


    return (
        <div className="flex flex-col h-screen overflow-hidden bg-base-300 text-base-content selection:bg-primary/30">

            {/* ── Header ─────────────────────────────────────────────────── */}
            <header className="shrink-0 h-14 border-b flex items-center justify-between px-3 sm:px-4 shadow-sm z-50 print:hidden bg-base-100/90 backdrop-blur-xl border-base-content/10">
                <div className="flex items-center gap-2 sm:gap-3 overflow-hidden shrink-0 min-w-0">
                    <Link href="/dashboard" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-base-content/10 transition-colors text-base-content/60 shrink-0">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div className="min-w-0 hidden sm:block">
                        <input
                            type="text"
                            value={resumeData.title}
                            onChange={e => setResumeData((p: any) => ({ ...p, title: e.target.value }))}
                            className="block text-sm font-bold bg-transparent border-none outline-none w-28 sm:w-48 truncate text-base-content placeholder-base-content/40"
                            placeholder="My Resume"
                        />
                        <p className="text-[9px] sm:text-[10px] text-base-content/50 font-medium leading-none mt-0.5 flex items-center gap-1">
                            {isSaving ? <><Loader2 className="w-2.5 h-2.5 animate-spin" /> Saving…</> : <><CheckCircle2 className="w-2.5 h-2.5 text-success" /> Saved</>}
                            <span className="text-base-content/20">|</span> <span>{wordCount}w</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none flex-1 justify-end min-w-0 ml-2">
                    {/* 1. Template Picker removed from navbar */}

                    <div className="w-px h-5 bg-base-content/10 mx-1 shrink-0" />
                    {/* 2. Design/Layout Tab */}
                    <button onClick={() => { setActiveSection("layout"); setMobileView("editor"); }}
                        className="flex items-center gap-1.5 h-8 px-3 rounded-xl bg-secondary/10 hover:bg-secondary/20 text-secondary font-bold text-xs transition-colors shrink-0">
                        <Sliders className="w-3.5 h-3.5" />
                        <span className="hidden lg:inline">Design</span>
                    </button>

                    <div className="w-px h-5 bg-base-content/10 mx-1 shrink-0" />

                    {/* 3. Score */}
                    <button onClick={() => setShowScore(v => !v)}
                        className={`flex items-center gap-1.5 h-8 px-2.5 rounded-lg font-bold text-xs transition-colors shrink-0 ${completeness.score >= 80 ? 'bg-success/10 text-success hover:bg-success/20' : 'bg-warning/10 text-warning hover:bg-warning/20'}`}>
                        <BarChart3 className="w-3.5 h-3.5" /> {completeness.score}%
                    </button>


                    <div className="w-px h-5 bg-base-content/10 mx-1 shrink-0" />

                    {/* 5. Share */}
                    <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Editor link copied!"); }}
                        title="Copy Share Link"
                        className="flex w-8 h-8 items-center justify-center rounded-lg hover:bg-base-content/10 text-base-content/60 transition-colors shrink-0">
                        <LinkIcon className="w-4 h-4" />
                    </button>

                    {/* 6. Settings Menu */}
                    <div className="relative" ref={moreMenuRef}>
                        <button onClick={() => setShowMoreMenu(v => !v)} title="Options"
                            className="flex w-8 h-8 items-center justify-center rounded-lg hover:bg-base-content/10 text-base-content/60 transition-colors shrink-0">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                        {showMoreMenu && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-base-200 border border-base-content/10 rounded-2xl shadow-xl py-2 z-[110] animate-in fade-in">
                                <button onClick={() => { if (confirm("Load demo data?")) setResumeData(INITIAL_DATA); setShowMoreMenu(false); }}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-info hover:bg-info/10 transition-colors">
                                    <RefreshCcw className="w-4 h-4" /> Load Demo Data
                                </button>
                                <button onClick={() => { if (confirm("Clear ALL data?")) setResumeData({ title: "Blank Resume", personalInfo: {}, experience: [], education: [], skills: [], projects: [], socialLinks: [] }); setShowMoreMenu(false); }}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors">
                                    <Trash2 className="w-4 h-4" /> Clear Template
                                </button>
                                <div className="h-px bg-base-content/10 my-1" />
                                <button onClick={() => { setMobileView(mobileView === "editor" ? "preview" : "editor"); setShowMoreMenu(false); }}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-base-content/70 md:hidden hover:bg-base-content/5 transition-colors">
                                    <Layout className="w-4 h-4" /> Toggle Preview
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="w-px h-5 bg-base-content/10 mx-1 shrink-0 hidden md:block" />

                    {/* 7. Copy TXT */}
                    <button onClick={downloadTxt} title="Download TXT format"
                        className="flex items-center gap-1 h-8 px-2 rounded-lg hover:bg-base-content/10 text-base-content/60 transition-colors shrink-0">
                        <FileText className="w-4 h-4" />
                        <span className="text-xs font-bold hidden xl:block">TXT</span>
                    </button>

                    {/* 9. Download PDF */}
                    <button
                        onClick={downloadPDF}
                        disabled={isDownloading}
                        title="Download PDF"
                        className="flex items-center gap-2 h-9 px-4 rounded-xl font-bold text-xs text-white shrink-0 ml-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed select-none"
                        style={{
                            background: isDownloading
                                ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                                : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                            boxShadow: isDownloading ? 'none' : '0 0 16px rgba(99,102,241,0.55), 0 2px 8px rgba(0,0,0,0.18)',
                        }}
                    >
                        {isDownloading
                            ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /><span>Downloading…</span></>
                            : <><Download className="w-3.5 h-3.5" /><span>Download PDF</span></>
                        }
                    </button>

                </div>
            </header>

            {/* ── Body ───────────────────────────────────────────────────── */}
            <div className="flex flex-1 overflow-hidden print:overflow-visible">

                {/* Icon nav rail — desktop */}
                <nav className="hidden md:flex flex-col items-center gap-1 py-4 px-1.5 border-r shrink-0 w-[66px] overflow-y-auto print:hidden bg-base-200/50 backdrop-blur-xl border-base-content/10">
                    {SECTIONS.map(s => {
                        const hidden = hiddenSections.has(s.id);
                        return (
                            <button key={s.id} title={s.label} onClick={() => setActiveSection(s.id)}
                                className={`relative w-12 h-12 flex flex-col items-center justify-center rounded-2xl transition-all duration-300 group ${activeSection === s.id
                                    ? "bg-primary/20 ring-1 ring-primary/50 scale-105 text-primary shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                                    : hidden
                                        ? "text-base-content/30 hover:text-base-content/50"
                                        : "text-base-content/50 hover:bg-base-content/10 hover:text-base-content"
                                    }`}>
                                <s.icon className="w-5 h-5" />
                                {hidden && <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-warning" />}
                            </button>
                        );
                    })}
                </nav>

                {/* Editor panel */}
                <aside className={`flex-col w-full md:w-[420px] lg:w-[460px] shrink-0 border-r overflow-hidden print:hidden bg-base-100/90 backdrop-blur-2xl border-base-content/10 ${mobileView === "preview" ? "hidden md:flex" : "flex"}`}>

                    {/* Section header with hide toggle */}
                    <div className="shrink-0 px-5 pt-4 pb-3 border-b border-base-content/5 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <current.icon style={{ width: 18, height: 18 }} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-base font-bold text-base-content tracking-tight">{current.label}</h2>
                            <p className="text-xs text-base-content/50">{SECTION_HINTS[activeSection] || ""}</p>
                        </div>
                        {/* Hide/show section from resume */}
                        {SECTIONS.some(s => s.id === activeSection) && (
                            <button onClick={() => toggleSection(activeSection)}
                                title={hiddenSections.has(activeSection) ? "Show on resume" : "Hide from resume"}
                                className={`p-2 rounded-xl transition-colors text-xs flex items-center gap-1 ${hiddenSections.has(activeSection)
                                    ? "bg-warning/20 text-warning hover:bg-warning/30"
                                    : "hover:bg-base-content/10 text-base-content/50"
                                    }`}>
                                <EyeOff className="w-4 h-4" />
                                <span className="hidden sm:inline text-[10px] font-semibold">
                                    {hiddenSections.has(activeSection) ? "Hidden" : "Hide"}
                                </span>
                            </button>
                        )}
                    </div>



                    {/* Mobile section pills - horizontally scrollable for better UX */}
                    <div className="md:hidden shrink-0 flex gap-2 px-4 py-3 border-b border-base-content/5 overflow-x-auto scrollbar-none bg-base-100/50 backdrop-blur-md">
                        {ALL_SECTIONS.map(s => (
                            <button key={s.id} onClick={() => setActiveSection(s.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${activeSection === s.id
                                    ? "bg-primary text-primary-content border-primary shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                                    : "bg-base-200 text-base-content/70 border-base-content/10 hover:border-primary/50"}`}>
                                <s.icon className="w-3.5 h-3.5" />
                                {s.label}
                            </button>
                        ))}
                    </div>

                    {/* Form */}
                    <div className="flex-1 overflow-y-auto px-5 py-4 pb-24 scrollbar-thin scrollbar-thumb-base-content/10 scrollbar-track-transparent">
                        <div key={activeSection} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {renderForm()}
                        </div>
                    </div>
                </aside>

                {/* Preview pane */}
                <section className={`flex-1 flex-col overflow-hidden print:overflow-visible print:!flex ${mobileView === "editor" ? "hidden md:flex" : "flex"} bg-base-300/50 relative`}>

                    {/* Background glow for preview */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none print:hidden" />
                    <div className="absolute top-0 right-0 w-[30vw] h-[30vw] bg-secondary/10 rounded-full blur-[100px] pointer-events-none print:hidden" />

                    {/* Preview toolbar — all export actions live here, not on the canvas */}
                    <div className="shrink-0 flex items-center justify-between px-5 py-2 border-b print:hidden bg-base-100/60 backdrop-blur-xl border-base-content/10 z-10">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 text-xs text-base-content/60 font-medium tracking-wide">
                                <Eye className="w-3.5 h-3.5" /> Live Preview
                            </div>
                            {/* Zoom controls */}
                            <div className="flex items-center gap-1.5 bg-base-200/50 border border-base-content/10 px-2 py-1 rounded-lg ml-2">
                                <button onClick={() => updateLayout("scale", Math.max(0.4, (resumeData.layout?.scale || 1) - 0.1))} className="text-base-content/50 hover:text-base-content">
                                    <ChevronLeft className="w-3 h-3" />
                                </button>
                                <span className="text-[10px] font-bold text-base-content/70 w-10 text-center">
                                    {resumeData.layout?.scale ? `${Math.round(resumeData.layout.scale * 100)}%` : 'Auto'}
                                </span>
                                <button onClick={() => updateLayout("scale", Math.min(1.5, (resumeData.layout?.scale || 1) + 0.1))} className="text-base-content/50 hover:text-base-content">
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                        {/* Export actions — clean, always visible, no floating overlay */}
                        <div className="flex items-center gap-1.5">
                            <div className="flex items-center gap-1.5 text-[10px] text-base-content/40 mr-1 hidden lg:flex font-medium">
                                <Clock className="w-3 h-3" />
                                ~{Math.max(1, Math.round(wordCount / 200))} min read
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto flex items-start justify-center p-2 sm:p-6 lg:p-10 print:p-0 print:overflow-visible text-black print:bg-white print:block relative z-10 scrollbar-thin scrollbar-thumb-base-content/20 scrollbar-track-transparent">
                        <div ref={previewRef} className="shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden w-full max-w-fit flex justify-center print:shadow-none print:max-w-none print:w-auto print:block transition-all duration-300">
                            <ResumePreview data={resumeData} hiddenSections={hiddenSections} />
                        </div>
                    </div>
                </section>
            </div>

            {/* ── Mobile bottom nav ─────────────────────────────────────── */}
            <div className="md:hidden shrink-0 grid grid-cols-5 items-center h-16 bg-base-100/90 backdrop-blur-xl border-t border-base-content/10 px-2 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] print:hidden relative z-50">
                {SECTIONS.slice(0, 4).map(s => (
                    <button key={s.id} onClick={() => { setActiveSection(s.id); setMobileView("editor"); }}
                        className={`flex flex-col items-center justify-center gap-1 h-full transition-all ${activeSection === s.id && mobileView === "editor" ? "text-primary" : "text-base-content/50"}`}>
                        <div className={`p-1.5 rounded-lg transition-all ${activeSection === s.id && mobileView === "editor" ? "bg-primary/20 shadow-[0_0_10px_rgba(139,92,246,0.3)]" : ""}`}>
                            <s.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-wider">{s.label.split(' ')[0]}</span>
                    </button>
                ))}

                <button onClick={() => setMobileView(mobileView === "preview" ? "editor" : "preview")}
                    className={`flex flex-col items-center justify-center gap-1 h-full transition-all ${mobileView === "preview" ? "text-primary" : "text-base-content/50"}`}>
                    <div className={`p-1.5 rounded-lg transition-all ${mobileView === "preview" ? "bg-primary/20 shadow-[0_0_10px_rgba(139,92,246,0.3)]" : ""}`}>
                        <Eye className="w-5 h-5" />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-wider">Preview</span>
                </button>
            </div>



            {/* ── Completeness score overlay ──────────────────────────── */}
            {showScore && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    onClick={() => setShowScore(false)}>
                    <div className="bg-base-200 border border-base-content/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-sm p-8 animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-black text-base-content mb-2 tracking-tight">Resume Score</h3>
                        <p className="text-sm text-base-content/60 mb-6 font-medium">Fill each section to improve ATS readiness</p>
                        <div className="flex items-center gap-5 mb-8">
                            <div className="relative w-24 h-24 shrink-0">
                                <svg className="w-full h-full -rotate-90">
                                    <circle cx="48" cy="48" r="42" className="stroke-base-content/5" strokeWidth="8" fill="transparent" />
                                    <circle cx="48" cy="48" r="42" className={completeness.score >= 80 ? "stroke-success" : "stroke-primary"} strokeWidth="8" fill="transparent"
                                        strokeDasharray={263.89} strokeDashoffset={263.89 - (263.89 * completeness.score) / 100}
                                        style={{ transition: "stroke-dashoffset 1s ease-out, stroke 0.5s ease" }} />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-black text-base-content">{completeness.score}</span>
                                    <span className="text-[10px] font-bold text-base-content/40 uppercase">%</span>
                                </div>
                            </div>
                            <div className="flex-1 space-y-3">
                                {completeness.checks.map((c, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs">
                                        <span className={c.done ? "text-base-content" : "text-base-content/40 font-medium"}>{c.label}</span>
                                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${c.done ? "bg-success/20 text-success" : "bg-base-content/10 text-transparent"}`}>
                                            {c.done ? "✓" : ""}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => setShowScore(false)}
                            className="w-full py-4 bg-base-content text-base-100 text-sm font-bold rounded-2xl hover:bg-primary hover:text-white transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                            Got it
                        </button>
                    </div>
                </div>
            )}

            {/* ── Keyboard shortcuts overlay ──────────────────────────── */}
            {showShortcuts && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    onClick={() => setShowShortcuts(false)}>
                    <div className="bg-base-200 border border-base-content/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-sm p-8 animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-black text-base-content mb-6 tracking-tight">Keyboard Shortcuts</h3>
                        <div className="space-y-4">
                            {[
                                ["Ctrl + S", "Save now"],
                                ["Ctrl + P", "Download PDF"],
                                ["Ctrl + /", "Show shortcuts"],
                                ["Escape", "Close overlays"],
                            ].map(([key, action]) => (
                                <div key={key} className="flex items-center justify-between py-1">
                                    <span className="text-sm text-base-content/60 font-medium">{action}</span>
                                    <kbd className="px-3 py-1.5 bg-base-300 rounded-lg text-xs font-mono font-bold text-base-content shadow-inner border border-base-content/5">{key}</kbd>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}



            {copyToast && (
                <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="flex items-center gap-2 bg-success/20 border border-success/30 backdrop-blur-md text-success-content pl-4 pr-5 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] text-sm font-bold">
                        <CheckCircle2 className="w-5 h-5 shrink-0" /> Resume copied to clipboard!
                    </div>
                </div>
            )}


        </div>
    );
}
