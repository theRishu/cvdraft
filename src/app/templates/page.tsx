"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import {
    ArrowRight, Sparkles, Briefcase, GraduationCap, Code2, Palette,
    BarChart3, Stethoscope, Scale, Megaphone, Rocket, Award, Loader2, Check,
} from "lucide-react";

const TEMPLATES = [
    { id: "modern", name: "Modern", category: "Popular", color: "#6366f1", desc: "Clean layout with a sidebar for skills & links", icon: Sparkles },
    { id: "ats", name: "ATS Optimized", category: "Popular", color: "#0ea5e9", desc: "Maximum compatibility with applicant tracking systems", icon: Award },
    { id: "minimalist", name: "Minimalist", category: "Popular", color: "#64748b", desc: "Elegant simplicity — let your content speak", icon: Sparkles },
    { id: "professional", name: "Professional", category: "Classic", color: "#0f172a", desc: "Traditional format trusted by Fortune 500 recruiters", icon: Briefcase },
    { id: "classic", name: "Classic", category: "Classic", color: "#374151", desc: "Timeless two-column layout with clear hierarchy", icon: Briefcase },
    { id: "elegant", name: "Elegant", category: "Creative", color: "#7c3aed", desc: "Sophisticated design with refined typography", icon: Palette },
    { id: "creative", name: "Creative", category: "Creative", color: "#ec4899", desc: "Bold visual impact for design-forward roles", icon: Palette },
    { id: "corporate", name: "Corporate", category: "Business", color: "#1e40af", desc: "Structured layout for executive & corporate roles", icon: Briefcase },
    { id: "executive", name: "Executive", category: "Business", color: "#0f172a", desc: "Authoritative design for senior leadership", icon: Award },
    { id: "tech", name: "Tech", category: "Industry", color: "#059669", desc: "Showcases technical skills and projects", icon: Code2 },
    { id: "dev", name: "Developer", category: "Industry", color: "#16a34a", desc: "Tailored for software engineers & developers", icon: Code2 },
    { id: "startup", name: "Startup", category: "Industry", color: "#f97316", desc: "Dynamic layout for fast-paced startup roles", icon: Rocket },
    { id: "academic", name: "Academic", category: "Industry", color: "#7c3aed", desc: "Structured for research, publications & teaching", icon: GraduationCap },
    { id: "student", name: "Student", category: "Industry", color: "#06b6d4", desc: "Perfect for new graduates & first-time job seekers", icon: GraduationCap },
    { id: "design", name: "Design", category: "Creative", color: "#e11d48", desc: "Visual-first layout for UX/UI & graphic designers", icon: Palette },
    { id: "finance", name: "Finance", category: "Industry", color: "#047857", desc: "Numbers-focused layout for finance professionals", icon: BarChart3 },
    { id: "medical", name: "Medical", category: "Industry", color: "#0891b2", desc: "Clean format for healthcare & medical roles", icon: Stethoscope },
    { id: "legal", name: "Legal", category: "Industry", color: "#1e293b", desc: "Formal layout for legal professionals", icon: Scale },
    { id: "marketing", name: "Marketing", category: "Industry", color: "#c026d3", desc: "Engaging design for marketing & brand roles", icon: Megaphone },
    { id: "management", name: "Management", category: "Business", color: "#4f46e5", desc: "Leadership-focused layout for management roles", icon: Briefcase },
    { id: "sales", name: "Sales", category: "Business", color: "#ea580c", desc: "Results-driven design highlighting achievements", icon: BarChart3 },
];

const CATEGORIES = ["All", "Popular", "Classic", "Creative", "Business", "Industry"];

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                    {filtered.map((t) => {
                        const Icon = t.icon;
                        const isCreating = creating === t.id;
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
                                    <div className="w-16 sm:w-20 h-24 sm:h-28 bg-white rounded-lg shadow-md border border-stone-100 flex flex-col p-2 sm:p-2.5 gap-1 group-hover:scale-105 transition-transform duration-300">
                                        <div className="h-2 rounded-sm" style={{ background: t.color, width: "60%" }} />
                                        <div className="h-1 bg-stone-100 rounded-sm" style={{ width: "80%" }} />
                                        <div className="h-1 bg-stone-50 rounded-sm" style={{ width: "70%" }} />
                                        <div className="flex-1" />
                                        <div className="h-1 bg-stone-50 rounded-sm" style={{ width: "90%" }} />
                                        <div className="h-1 bg-stone-50 rounded-sm" style={{ width: "50%" }} />
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
