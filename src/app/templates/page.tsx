"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import {
    ArrowRight, Sparkles, Briefcase, GraduationCap, Code2, Palette,
    BarChart3, Stethoscope, Scale, Megaphone, Rocket, Award, Loader2, Check,
} from "lucide-react";

import { TEMPLATES as ACTUAL_TEMPLATES } from "@/lib/templateOptions";

const TEMPLATES = [
    { id: "singlecolumn", name: "Professional", category: "Standard", color: "#6366f1", desc: "Clean, ATS-friendly single column layout perfect for modern professionals", icon: Sparkles },
    { id: "executive", name: "Executive", category: "Standard", color: "#334155", desc: "Strict, formal serif typography for senior roles and traditional industries", icon: Briefcase },
    { id: "modern", name: "Modern", category: "Standard", color: "#8b5cf6", desc: "Sleek sans-serif design with bold contrast and clear hierarchy", icon: Palette },
    { id: "minimalist", name: "Minimalist", category: "Standard", color: "#0ea5e9", desc: "Ultra-clean layout prioritizing content and readability above all else", icon: Sparkles },
    { id: "academic", name: "Academic", category: "Standard", color: "#a8a29e", desc: "Formal, double-bordered structure designed for academic and research CVs", icon: GraduationCap },
    { id: "creative", name: "Creative", category: "Standard", color: "#ec4899", desc: "High-impact right-aligned headers and bold accents", icon: Palette },
    { id: "classic", name: "Classic", category: "Standard", color: "#1e293b", desc: "Timeless styling with classic proportions and elegant typography", icon: Scale },
    { id: "startup", name: "Startup", category: "Standard", color: "#f59e0b", desc: "Punchy, dynamic presentation with modern formatting for tech startups", icon: Rocket },
    { id: "tech", name: "Tech", category: "Standard", color: "#10b981", desc: "Mono-spaced headers and crisp layout precision ideal for engineers", icon: Code2 },
    { id: "corporate", name: "Corporate", category: "Standard", color: "#3b82f6", desc: "Compact, data-dense structure optimized for corporate sector screening", icon: BarChart3 },
    { id: "refined", name: "Refined", category: "Standard", color: "#8b5cf6", desc: "Elegant minimalism with subtle section dividers and wide tracking", icon: Award },
];

const CATEGORIES = ["All", "Standard"];

export default function TemplatesPage() {
    const router = useRouter();
    const [filter, setFilter] = useState("All");
    const [creating, setCreating] = useState<string | null>(null);
    const [error, setError] = useState("");

    const filtered = filter === "All" ? TEMPLATES : TEMPLATES.filter(t => t.category === filter);

    const handleUseTemplate = async (templateId: string) => {
        setCreating(templateId);
        setError("");
        try {
            const res = await fetch("/api/resumes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: "My Resume",
                    templateId,
                }),
            });

            if (res.status === 403) {
                setError("Free limit reached (2 resumes max). Go to Dashboard to manage your resumes.");
                setCreating(null);
                return;
            }

            if (!res.ok) throw new Error("Failed to create resume");

            const resume = await res.json();
            router.push(`/resume/${resume._id}`);
        } catch (e) {
            setError("Something went wrong. Please try again.");
            setCreating(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#fdf9f6]">
            <Header />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                {/* Page header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-4 border border-indigo-100">
                        <Sparkles className="w-3.5 h-3.5" />
                        {TEMPLATES.length} professional templates
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 mb-3 tracking-tight">
                        Choose your <span className="text-indigo-600">template</span>
                    </h1>
                    <p className="text-stone-400 text-sm max-w-md mx-auto">
                        Pick a template that matches your style and industry. Every template is ATS-friendly and fully customizable.
                    </p>
                </div>

                {/* Error toast */}
                {error && (
                    <div className="mb-6 max-w-md mx-auto bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-2xl text-center">
                        {error}
                    </div>
                )}

                {/* Category filter */}
                <div className="flex justify-center gap-2 mb-8 flex-wrap">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === cat
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                                : "bg-white text-stone-500 border border-stone-200 hover:border-indigo-300 hover:text-indigo-600"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Template grid */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 ${filtered.length === 1 ? 'max-w-sm mx-auto' : ''}`}>
                    {filtered.map((t) => {
                        const Icon = t.icon;
                        const isCreating = creating === t.id;
                        const actualTemplate = ACTUAL_TEMPLATES.find(at => at.id === t.id);
                        return (
                            <div
                                key={t.id}
                                className="group bg-white rounded-2xl border border-stone-100 hover:border-indigo-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-50 hover:-translate-y-0.5"
                            >
                                {/* Preview area */}
                                <div
                                    className="h-32 sm:h-40 flex items-center justify-center relative overflow-hidden"
                                    style={{
                                        background: `linear-gradient(135deg, ${t.color}08, ${t.color}15)`,
                                    }}
                                >
                                    <div className="w-[72px] sm:w-[84px] aspect-[3/4.2] bg-white rounded-lg shadow-md border border-stone-200 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                                        {actualTemplate?.preview(t.color)}
                                    </div>

                                    {/* Category badge */}
                                    <span
                                        className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                                        style={{
                                            background: `${t.color}15`,
                                            color: t.color,
                                        }}
                                    >
                                        {t.category}
                                    </span>
                                </div>

                                {/* Info */}
                                <div className="p-3 sm:p-4">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Icon size={14} style={{ color: t.color }} />
                                        <h3 className="text-sm font-bold text-stone-900">{t.name}</h3>
                                    </div>
                                    <p className="text-xs text-stone-400 leading-relaxed mb-3">{t.desc}</p>

                                    <button
                                        onClick={() => handleUseTemplate(t.id)}
                                        disabled={creating !== null}
                                        className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${isCreating
                                            ? "bg-indigo-600 text-white"
                                            : "bg-stone-50 text-stone-600 hover:bg-indigo-600 hover:text-white border border-stone-200 hover:border-indigo-600"
                                            } disabled:opacity-50`}
                                    >
                                        {isCreating ? (
                                            <>
                                                <Loader2 size={14} className="animate-spin" />
                                                Creating…
                                            </>
                                        ) : (
                                            <>
                                                Use this template <ArrowRight size={12} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
