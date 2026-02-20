"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Download, Monitor, FileText, User, Briefcase, GraduationCap, Award, Share2, Globe, FileBadge, Plus } from "lucide-react";
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

import { useReactToPrint } from "react-to-print";

export default function ResumeEditor({ resume, userId }: { resume: any, userId: string }) {
    const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'preview'
    const [activeSection, setActiveSection] = useState("personal");
    const [resumeData, setResumeData] = useState({
        ...resume,
        certifications: resume.certifications || [],
        languages: resume.languages || [],
        projects: resume.projects || [],
        customSection: resume.customSection || { id: "custom", title: "Activities", items: [] },
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);

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

    const handlePrint = useReactToPrint({
        contentRef: previewRef,
        documentTitle: resumeData.title || "Resume",
    });

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

    const sections = [
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

    return (
        <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
            {/* Header */}
            <header className="h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0 z-50">
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
                            className="font-medium text-slate-900 bg-transparent border-none focus:ring-0 p-0 w-32 sm:w-48 truncate text-sm sm:text-base outline-none"
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
                            className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 focus:ring-1 focus:ring-slate-900 outline-none max-w-[120px]"
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
                            className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 focus:ring-1 focus:ring-slate-900 outline-none max-w-[100px]"
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
                        onClick={() => setIsPreviewOpen(true)}
                        className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors hidden sm:block"
                        title="Fullscreen Preview"
                    >
                        <Monitor className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => handlePrint()}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-slate-900 hover:bg-black rounded-lg transition-colors shadow-sm"
                    >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Download PDF</span>
                        <span className="sm:hidden">PDF</span>
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Editor Pane (Left Side) */}
                <aside className={`md:w-1/2 lg:w-[500px] xl:w-[600px] bg-white border-r border-slate-200 flex flex-col md:flex ${activeTab === 'preview' ? 'hidden' : 'flex'} w-full transition-all duration-300 z-10`}>
                    <div className="flex flex-1 overflow-hidden">
                        {/* Sidebar Navigation */}
                        <nav className="w-16 sm:w-20 bg-slate-50 border-r border-slate-200 flex flex-col items-center py-6 gap-4 shrink-0 overflow-y-auto scrollbar-hide">
                            {sections.map((section) => {
                                const Icon = section.icon;
                                const isActive = activeSection === section.id;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`p-3 rounded-xl transition-all group relative flex flex-col items-center gap-1 ${isActive ? 'bg-white shadow-md text-slate-900' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
                                        title={section.label}
                                    >
                                        <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                                        <span className="text-[10px] font-medium hidden sm:block">{section.label}</span>
                                        {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[2px] w-1 h-8 bg-slate-900 rounded-l-full sm:hidden"></div>}
                                    </button>
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
                <main className={`flex-1 bg-slate-100/50 flex flex-col relative overflow-hidden ${activeTab === 'editor' ? 'hidden md:flex' : 'flex'}`}>
                    <div className="flex-1 overflow-auto p-4 sm:p-8 md:p-12 flex justify-center items-start scrollbar-thin">
                        <div className="origin-top scale-[0.6] sm:scale-[0.7] md:scale-[0.85] lg:scale-[1] transition-transform duration-300 shadow-2xl">
                            <ResumePreview data={resumeData} contentRef={previewRef} />
                        </div>
                    </div>
                </main>
                <div className={`fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 ${isPreviewOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <div className="bg-slate-200 rounded-xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden transform transition-all duration-300 scale-95" style={{ transform: isPreviewOpen ? 'scale(100%)' : 'scale(95%)' }}>
                        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
                            <h3 className="font-bold text-lg text-slate-800">Fullscreen Preview</h3>
                            <button onClick={() => setIsPreviewOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-800 transition-colors">
                                <span className="font-bold text-xl leading-none">&times;</span>
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto p-8 flex justify-center bg-slate-100">
                            <div className="shadow-2xl origin-top scale-[0.8] md:scale-100">
                                <ResumePreview data={resumeData} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
