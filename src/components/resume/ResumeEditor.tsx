"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Download, Monitor, FileText, User, Briefcase, GraduationCap, Award, Share2, Globe, FileBadge, Plus, Sparkles, X, ChevronUp, ChevronDown } from "lucide-react";
import PersonalDetails from "./forms/PersonalDetails";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import Certifications from "./forms/Certifications";
import Languages from "./forms/Languages";
import Socials from "./forms/Socials";
import Projects from "./forms/Projects";
import CustomSection from "./forms/CustomSection";
import ResumePreview from "./ResumePreview";

// ... imports

export default function ResumeEditor({ resume, userId }: { resume: any, userId: string }) {
    const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'preview'
    const [activeSection, setActiveSection] = useState("personal");
    const [resumeData, setResumeData] = useState({
        ...resume,
        certifications: resume.certifications || [],
        languages: resume.languages || [],
        projects: resume.projects || [],
        customSection: resume.customSection || { id: "custom", title: "Activities", items: [] },
        sectionOrder: resume.sectionOrder || ['experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'custom'],
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);

    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [geminiKey, setGeminiKey] = useState("");
    const [aiPrompt, setAiPrompt] = useState("Generate a strong, ATS friendly, highly detailed software engineering resume with metrics.");
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const savedKey = localStorage.getItem("gemini_key");
        if (savedKey) setGeminiKey(savedKey);
    }, []);

    const handleGenerateAI = async () => {
        if (!geminiKey) return alert("Please enter your Gemini API Key.");
        localStorage.setItem("gemini_key", geminiKey);
        setIsGenerating(true);
        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ apiKey: geminiKey, prompt: aiPrompt, currentData: resumeData })
            });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || await res.text());
            }
            const data = await res.json();

            // Merge generated data while preserving metadata
            setResumeData({
                ...resumeData,
                ...data,
                // Ensure array fields exist
                experience: data.experience || [],
                education: data.education || [],
                skills: data.skills || [],
                certifications: data.certifications || [],
                languages: data.languages || [],
                projects: data.projects || [],
                socialLinks: data.socialLinks || [],
                // Retain active UI choices
                themeColor: resumeData.themeColor,
                fontSize: resumeData.fontSize,
                templateId: resumeData.templateId,
                title: resumeData.title,
                sectionOrder: resumeData.sectionOrder
            });
            setIsAiModalOpen(false);
        } catch (error: any) {
            console.error(error);
            alert("Error generating resume: " + error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    // Auto-save logic
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (JSON.stringify(resumeData) !== JSON.stringify(resume)) {
                setIsSaving(true);
                try {
                    await fetch(`/api/resumes/${resume._id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(resumeData),
                    });
                } catch (error) {
                    console.error("Failed to save", error);
                } finally {
                    setIsSaving(false);
                }
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [resumeData, resume]);

    const [isDownloading, setIsDownloading] = useState(false);

    const generatePDF = async () => {
        if (!previewRef.current) return;
        setIsDownloading(true);

        // Add a temporary class to body to allow overflow-visible during capture
        document.body.classList.add('pdf-generating');

        const element = previewRef.current;
        const opt = {
            margin: 0,
            filename: `${resumeData.title || 'Resume'}.pdf`,
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                logging: false,
                backgroundColor: '#ffffff',
                windowWidth: 794
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
        };

        try {
            // Dynamic import to avoid SSR 'self is not defined' error
            const html2pdf = (await import("html2pdf.js")).default;

            // Delay slightly to ensure class is applied and layout re-rendered
            setTimeout(() => {
                html2pdf().set(opt).from(element).save().then(() => {
                    setIsDownloading(false);
                    document.body.classList.remove('pdf-generating');
                }).catch((err: any) => {
                    console.error("PDF generation error:", err);
                    setIsDownloading(false);
                    document.body.classList.remove('pdf-generating');
                });
            }, 500);
        } catch (error) {
            console.error("Failed to load html2pdf:", error);
            setIsDownloading(false);
            document.body.classList.remove('pdf-generating');
        }
    };

    const renderForm = () => {
        switch (activeSection) {
            case "personal":
                return <PersonalDetails data={resumeData.personalInfo} onChange={(d) => setResumeData({ ...resumeData, personalInfo: d })} />;
            case "experience":
                return <Experience data={resumeData.experience} onChange={(d) => setResumeData({ ...resumeData, experience: d })} />;
            case "education":
                return <Education data={resumeData.education} onChange={(d) => setResumeData({ ...resumeData, education: d })} />;
            case "skills":
                return <Skills data={resumeData.skills} onChange={(d) => setResumeData({ ...resumeData, skills: d })} />;
            case "projects":
                return <Projects data={resumeData.projects || []} onChange={(d) => setResumeData({ ...resumeData, projects: d })} />;
            case "certifications":
                return <Certifications data={resumeData.certifications} onChange={(d) => setResumeData({ ...resumeData, certifications: d })} />;
            case "languages":
                return <Languages data={resumeData.languages} onChange={(d) => setResumeData({ ...resumeData, languages: d })} />;
            case "socials":
                return <Socials data={resumeData.socialLinks} onChange={(d) => setResumeData({ ...resumeData, socialLinks: d })} />;
            case "custom":
                return <CustomSection data={resumeData.customSection || { id: "custom", title: "Activities", items: [] }} onChange={(d) => setResumeData({ ...resumeData, customSection: d })} />;
            default:
                return null;
        }
    };

    const baseSections = [
        { id: "personal", label: "Personal", icon: User },
        { id: "experience", label: "Experience", icon: Briefcase },
        { id: "education", label: "Education", icon: GraduationCap },
        { id: "skills", label: "Skills", icon: Award },
        { id: "projects", label: "Projects", icon: FileText },
        { id: "certifications", label: "Awards", icon: FileBadge },
        { id: "languages", label: "Languages", icon: Globe },
        { id: "socials", label: "Socials", icon: Share2 },
        { id: "custom", label: "Custom", icon: Plus },
    ];

    // Compute derived display sections based on sectionOrder
    const dynamicOrder = resumeData.sectionOrder || ['experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'custom'];
    const sections = [
        baseSections.find(s => s.id === 'personal'),
        ...dynamicOrder
            .filter((id: string) => id !== 'personal' && id !== 'socials') // Prevent duplicate keys
            .map((id: string) => baseSections.find(s => s.id === id)),
        baseSections.find(s => s.id === 'socials') // Keep socials fixed at bottom or where preferred
    ].filter(Boolean) as typeof baseSections;

    const moveSection = (id: string, direction: 'up' | 'down') => {
        const order = [...dynamicOrder];
        const index = order.indexOf(id);
        if (index === -1) return;

        if (direction === 'up' && index > 0) {
            [order[index - 1], order[index]] = [order[index], order[index - 1]];
        } else if (direction === 'down' && index < order.length - 1) {
            [order[index + 1], order[index]] = [order[index], order[index + 1]];
        }

        setResumeData({ ...resumeData, sectionOrder: order });
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
            {/* Header */}
            <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-4 sm:px-6 flex items-center justify-between shrink-0 z-50 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="h-6 w-px bg-slate-200 mx-2 hidden sm:block"></div>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            value={resumeData.title}
                            onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                            className="font-bold text-slate-800 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-500 focus:bg-white rounded-lg px-2 py-1 w-32 sm:w-56 truncate text-sm sm:text-base outline-none transition-all duration-300 shadow-sm"
                        />
                        <span className="text-[10px] text-slate-400 font-medium">
                            {isSaving ? "Saving..." : "Saved"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Template Selector */}
                    <div className="hidden sm:flex items-center gap-2 mr-2">
                        <select
                            value={resumeData.templateId}
                            onChange={(e) => setResumeData({ ...resumeData, templateId: e.target.value })}
                            className="text-xs sm:text-sm font-medium border border-slate-200/80 rounded-xl px-3 py-1.5 bg-white/50 hover:bg-white text-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 shadow-sm cursor-pointer"
                        >
                            <option value="ats">ATS Standard</option>
                            <option value="modern">Modern</option>
                            <option value="professional">Professional</option>
                            <option value="creative">Creative</option>
                            <option value="elegant">Elegant</option>
                            <option value="minimalist">Minimalist</option>
                            <option value="tech">Tech</option>
                            <option value="corporate">Corporate</option>
                            <option value="academic">Academic</option>
                            <option value="startup">Startup</option>
                            <option value="classic">Classic</option>
                        </select>
                    </div>

                    {/* Font Size Selector */}
                    <div className="hidden sm:flex items-center gap-2 mr-2">
                        <select
                            value={resumeData.fontSize || 'medium'}
                            onChange={(e) => setResumeData({ ...resumeData, fontSize: e.target.value })}
                            className="text-xs sm:text-sm font-medium border border-slate-200/80 rounded-xl px-3 py-1.5 bg-white/50 hover:bg-white text-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 shadow-sm cursor-pointer"
                        >
                            <option value="small">Small (Aa)</option>
                            <option value="medium">Medium (Aa)</option>
                            <option value="large">Large (Aa)</option>
                        </select>
                    </div>

                    {/* Color Picker */}
                    <div className="flex items-center gap-1 mr-2">
                        {[
                            "#0f172a", // Slate (Default)
                            "#2563eb", // Blue
                            "#dc2626", // Red
                            "#16a34a", // Green
                            "#9333ea", // Purple
                            "#ea580c", // Orange
                            "#0891b2", // Cyan
                            "#be185d", // Pink
                        ].map((color) => (
                            <button
                                key={color}
                                onClick={() => setResumeData({ ...resumeData, themeColor: color })}
                                className={`w-5 h-5 rounded-full border border-slate-200 transition-all ${resumeData.themeColor === color ? 'scale-125 ring-2 ring-offset-1 ring-slate-400' : 'hover:scale-110'}`}
                                style={{ backgroundColor: color }}
                                title="Pick Theme Color"
                            />
                        ))}
                    </div>

                    <div className="h-6 w-px bg-slate-200 mx-2 hidden sm:block"></div>

                    {/* Mobile Toggle */}
                    <div className="flex md:hidden bg-slate-100 p-1 rounded-lg mr-2">
                        <button
                            onClick={() => setActiveTab("editor")}
                            className={`p-1.5 rounded-md transition-all ${activeTab === 'editor' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                        >
                            <FileText className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setActiveTab("preview")}
                            className={`p-1.5 rounded-md transition-all ${activeTab === 'preview' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                        >
                            <Monitor className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={() => setIsAiModalOpen(true)}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transform"
                        title="AI Auto-Generate"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span className="hidden sm:inline">AI Builder</span>
                    </button>

                    <button
                        onClick={() => setIsPreviewOpen(true)}
                        className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors hidden sm:block"
                        title="Fullscreen Preview"
                    >
                        <Monitor className="w-5 h-5" />
                    </button>

                    <button
                        onClick={generatePDF}
                        disabled={isDownloading}
                        className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r ${isDownloading ? 'from-slate-400 to-slate-500 cursor-not-allowed' : 'from-slate-800 to-slate-900 hover:from-blue-600 hover:to-indigo-600'} rounded-xl transition-all duration-300 shadow-lg ${isDownloading ? '' : 'hover:shadow-blue-500/25 hover:-translate-y-0.5'} transform`}
                    >
                        {isDownloading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Download className="w-4 h-4" />
                        )}
                        <span className="hidden sm:inline">{isDownloading ? 'Generating...' : 'Download PDF'}</span>
                        <span className="sm:hidden">PDF</span>
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Editor Pane (Left Side) */}
                <aside className={`md:w-1/2 lg:w-[500px] xl:w-[600px] bg-white border-r border-slate-200 flex flex-col md:flex ${activeTab === 'preview' ? 'hidden' : 'flex'} w-full transition-all duration-300 z-10`}>
                    <div className="flex flex-1 overflow-hidden">
                        {/* Sidebar Navigation */}
                        <nav className="w-16 sm:w-20 bg-slate-50 border-r border-slate-200 flex flex-col items-center py-6 gap-2 shrink-0 overflow-y-auto scrollbar-hide">
                            {sections.map((section, idx) => {
                                const Icon = section.icon;
                                const isActive = activeSection === section.id;
                                const isMovable = section.id !== 'personal' && section.id !== 'socials';

                                return (
                                    <div key={section.id} className="relative group w-full px-2">
                                        <button
                                            onClick={() => setActiveSection(section.id)}
                                            className={`w-full py-3 rounded-xl transition-all relative flex flex-col items-center gap-1 ${isActive ? 'bg-white shadow-md text-slate-900' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
                                            title={section.label}
                                        >
                                            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                                            <span className="text-[10px] font-medium hidden sm:block">{section.label}</span>
                                            {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[2px] w-1 h-8 bg-slate-900 rounded-l-full sm:hidden"></div>}
                                        </button>

                                        {/* Reordering Controls */}
                                        {isMovable && (
                                            <div className="absolute left-[85%] top-1/2 -translate-y-1/2 hidden group-hover:flex flex-col gap-0.5 z-20 bg-slate-800 rounded-md p-0.5 shadow-xl">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'up'); }}
                                                    className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
                                                    disabled={dynamicOrder.indexOf(section.id) === 0}
                                                >
                                                    <ChevronUp className="w-3 h-3" />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'down'); }}
                                                    className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
                                                    disabled={dynamicOrder.indexOf(section.id) === dynamicOrder.length - 1}
                                                >
                                                    <ChevronDown className="w-3 h-3" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </nav>

                        {/* Form Area */}
                        <div className="flex-1 overflow-y-auto p-6 sm:p-8 scrollbar-thin">
                            <div className="max-w-xl mx-auto space-y-6">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-slate-900">{sections.find(s => s.id === activeSection)?.label}</h2>
                                    <p className="text-slate-500 text-sm">Add your {sections.find(s => s.id === activeSection)?.label.toLowerCase()} details here.</p>
                                </div>
                                <div className="bg-white rounded-xl">
                                    {renderForm()}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Preview Pane (Right Side) */}
                <main className={`flex-1 bg-slate-100/50 flex flex-col relative overflow-hidden print:overflow-visible ${activeTab === 'editor' ? 'hidden md:flex' : 'flex'}`}>
                    <div className="flex-1 overflow-auto p-4 sm:p-8 md:p-12 flex justify-center items-start scrollbar-thin print:p-0 print:overflow-visible block">
                        <div className="origin-top scale-[0.6] sm:scale-[0.7] md:scale-[0.85] lg:scale-[1] transition-transform duration-300 shadow-2xl print:scale-100 print:transform-none print:shadow-none print:w-full">
                            <ResumePreview data={resumeData} contentRef={previewRef} />
                        </div>
                    </div>
                </main>
                <div className={`fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 print:hidden ${isPreviewOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <div className="bg-slate-200 rounded-xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden transform transition-all duration-300 scale-95" style={{ transform: isPreviewOpen ? 'scale(100%)' : 'scale(95%)' }}>
                        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
                            <h3 className="font-bold text-lg text-slate-800">Fullscreen Preview</h3>
                            <button onClick={() => setIsPreviewOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-800 transition-colors">
                                <span className="font-bold text-xl leading-none">&times;</span>
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto p-8 flex justify-center bg-slate-100">
                            <div className="shadow-2xl origin-top scale-[0.8] md:scale-100 print:scale-100 print:transform-none">
                                <ResumePreview data={resumeData} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* AI Generator Modal */}
            <div className={`fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 ${isAiModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className={`bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all duration-300 ${isAiModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-purple-50/50 to-fuchsia-50/50">
                        <div className="flex items-center gap-2 text-purple-600">
                            <Sparkles className="w-5 h-5" />
                            <h3 className="font-bold text-lg text-slate-900">AI Resume Builder</h3>
                        </div>
                        <button onClick={() => !isGenerating && setIsAiModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-50 p-1.5 rounded-full shadow-sm transition-all" disabled={isGenerating}>
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6 space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Your Gemini API Key</label>
                            <input
                                type="password"
                                value={geminiKey}
                                onChange={(e) => setGeminiKey(e.target.value)}
                                placeholder="AIzaSy..."
                                className="w-full text-sm border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 rounded-xl px-4 py-2.5 outline-none transition-all"
                                disabled={isGenerating}
                            />
                            <p className="text-[10px] text-slate-500 mt-1.5 font-medium px-1">Your key is never sent to our servers, only to Google directly. Saved locally.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">What kind of resume do you want?</label>
                            <textarea
                                value={aiPrompt}
                                onChange={(e) => setAiPrompt(e.target.value)}
                                rows={4}
                                placeholder="e.g. A Senior React Developer with 5 years experience at Google, focusing on performance and team leadership..."
                                className="w-full text-sm border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 rounded-xl px-4 py-3 outline-none transition-all resize-none"
                                disabled={isGenerating}
                            />
                        </div>
                    </div>

                    <div className="p-6 pt-2 bg-slate-50 flex justify-end gap-3">
                        <button
                            onClick={() => setIsAiModalOpen(false)}
                            className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-xl transition-all"
                            disabled={isGenerating}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleGenerateAI}
                            className={`flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 rounded-xl transition-all shadow-lg shadow-purple-500/30 ${isGenerating ? 'opacity-70 cursor-wait' : 'hover:-translate-y-0.5'}`}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Generating Magic...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4" />
                                    Generate Content
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
