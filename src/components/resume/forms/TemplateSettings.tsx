import React from "react";
import { Layout } from "lucide-react";

interface TemplateSettingsProps {
    data: any;
    onChange: (data: any) => void;
}

const TEMPLATES = [
    {
        id: "ats", label: "ATS Clean",
        preview: (c: string) => (
            <svg viewBox="0 0 60 80" className="w-full h-full">
                <rect width="60" height="80" fill="white" />
                <rect x="4" y="6" width="30" height="4" rx="1" fill="#0f172a" />
                <rect x="4" y="12" width="18" height="2" rx="1" fill={c} />
                <rect x="4" y="16" width="52" height="0.8" fill={c} opacity="0.4" />
                <rect x="4" y="20" width="12" height="1.5" rx="0.5" fill={c} />
                <rect x="4" y="23" width="50" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="4" y="25" width="44" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="4" y="30" width="12" height="1.5" rx="0.5" fill={c} />
                <rect x="4" y="33" width="50" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="4" y="35" width="38" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="4" y="37" width="46" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="4" y="42" width="12" height="1.5" rx="0.5" fill={c} />
                <rect x="4" y="45" width="50" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="4" y="47" width="36" height="1" rx="0.5" fill="#94a3b8" />
            </svg>
        ),
    },
    {
        id: "modern", label: "Modern",
        preview: (c: string) => (
            <svg viewBox="0 0 60 80" className="w-full h-full">
                <rect width="60" height="80" fill="white" />
                <rect x="0" y="0" width="60" height="22" fill={c} />
                <rect x="4" y="5" width="28" height="5" rx="1" fill="white" opacity="0.9" />
                <rect x="4" y="12" width="18" height="2" rx="1" fill="white" opacity="0.6" />
                <rect x="4" y="15" width="40" height="1.5" rx="0.5" fill="white" opacity="0.4" />
                <rect x="4" y="26" width="12" height="1.5" rx="0.5" fill={c} />
                <rect x="4" y="29" width="50" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="4" y="31" width="42" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="4" y="37" width="12" height="1.5" rx="0.5" fill={c} />
                <rect x="4" y="40" width="50" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="4" y="42" width="36" height="1" rx="0.5" fill="#94a3b8" />
            </svg>
        ),
    },
    {
        id: "creative", label: "Creative",
        preview: (c: string) => (
            <svg viewBox="0 0 60 80" className="w-full h-full">
                <rect width="60" height="80" fill="white" />
                <rect x="0" y="0" width="20" height="80" fill={c} />
                <circle cx="10" cy="12" r="6" fill="white" opacity="0.2" />
                <rect x="2" y="22" width="16" height="1.5" rx="0.5" fill="white" opacity="0.5" />
                <rect x="2" y="25" width="14" height="1" rx="0.5" fill="white" opacity="0.4" />
                <rect x="2" y="27" width="16" height="1" rx="0.5" fill="white" opacity="0.4" />
                <rect x="2" y="32" width="16" height="1.5" rx="0.5" fill="white" opacity="0.5" />
                <rect x="2" y="35" width="12" height="1" rx="0.5" fill="white" opacity="0.3" />
                <rect x="24" y="6" width="22" height="4" rx="1" fill="#0f172a" />
                <rect x="24" y="12" width="16" height="2" rx="1" fill="#475569" />
                <rect x="24" y="18" width="12" height="1.5" rx="0.5" fill={c} />
                <rect x="24" y="21" width="32" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="24" y="23" width="28" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="24" y="28" width="12" height="1.5" rx="0.5" fill={c} />
                <rect x="24" y="31" width="32" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="24" y="33" width="24" height="1" rx="0.5" fill="#94a3b8" />
            </svg>
        ),
    },
    {
        id: "elegant", label: "Elegant",
        preview: (c: string) => (
            <svg viewBox="0 0 60 80" className="w-full h-full">
                <rect width="60" height="80" fill="#fffbf7" />
                <rect x="4" y="6" width="28" height="4" rx="1" fill={c} opacity="0.9" />
                <rect x="4" y="12" width="18" height="2" rx="1" fill="#94a3b8" />
                <rect x="4" y="16" width="52" height="1.5" fill={c} />
                <rect x="4" y="21" width="34" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="4" y="23" width="30" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="4" y="28" width="10" height="1.5" rx="0.5" fill="#94a3b8" opacity="0.6" />
                <rect x="4" y="31" width="34" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="4" y="33" width="28" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="40" y="21" width="16" height="1.5" rx="0.5" fill="#94a3b8" opacity="0.6" />
                <rect x="40" y="24" width="14" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="40" y="28" width="16" height="1" rx="0.5" fill="#94a3b8" />
            </svg>
        ),
    },
    {
        id: "minimalist", label: "Minimal",
        preview: (c: string) => (
            <svg viewBox="0 0 60 80" className="w-full h-full">
                <rect width="60" height="80" fill="white" />
                <rect x="12" y="6" width="36" height="4" rx="1" fill={c} opacity="0.8" />
                <rect x="16" y="12" width="28" height="1.5" rx="0.5" fill="#94a3b8" />
                <rect x="8" y="18" width="44" height="0.5" fill="#e2e8f0" />
                <rect x="18" y="22" width="24" height="1.5" rx="0.5" fill="#475569" opacity="0.5" />
                <rect x="8" y="26" width="44" height="0.5" fill="#e2e8f0" />
                <rect x="4" y="30" width="12" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="18" y="30" width="34" height="1" rx="0.5" fill="#475569" />
                <rect x="18" y="32" width="28" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="4" y="38" width="12" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="18" y="38" width="34" height="1" rx="0.5" fill="#475569" />
                <rect x="18" y="40" width="24" height="1" rx="0.5" fill="#94a3b8" />
            </svg>
        ),
    },
    {
        id: "professional", label: "Classic",
        preview: (c: string) => (
            <svg viewBox="0 0 60 80" className="w-full h-full">
                <rect width="60" height="80" fill="white" />
                <rect x="4" y="5" width="52" height="14" rx="2" fill={c} opacity="0.08" />
                <rect x="8" y="8" width="24" height="4" rx="1" fill={c} opacity="0.9" />
                <rect x="8" y="14" width="44" height="1.2" rx="0.5" fill="#94a3b8" />
                <rect x="4" y="22" width="52" height="1" fill={c} opacity="0.3" />
                <rect x="4" y="25" width="10" height="1.5" rx="0.5" fill={c} />
                <rect x="4" y="28" width="50" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="4" y="30" width="44" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="4" y="36" width="10" height="1.5" rx="0.5" fill={c} />
                <rect x="4" y="39" width="50" height="1" rx="0.5" fill="#94a3b8" />
                <rect x="4" y="41" width="40" height="1" rx="0.5" fill="#94a3b8" />
            </svg>
        ),
    },
    {
        id: "tech", label: "Tech",
        preview: (c: string) => (
            <svg viewBox="0 0 60 80" className="w-full h-full">
                <rect width="60" height="80" fill="#0f172a" />
                <rect x="4" y="6" width="30" height="4" rx="1" fill={c} />
                <rect x="4" y="12" width="20" height="1" fill="white" opacity="0.4" />
                <rect x="4" y="18" width="52" height="0.5" fill={c} />
                <rect x="4" y="22" width="15" height="1.5" rx="0.5" fill={c} />
                <rect x="4" y="25" width="48" height="0.8" fill="white" opacity="0.3" />
            </svg>
        ),
    },
    {
        id: "corporate", label: "Corporate",
        preview: (c: string) => (
            <svg viewBox="0 0 60 80" className="w-full h-full">
                <rect width="60" height="80" fill="white" />
                <rect x="0" y="0" width="60" height="4" fill={c} />
                <rect x="4" y="8" width="30" height="5" rx="0.5" fill="#0f172a" />
                <rect x="4" y="15" width="52" height="1" fill={c} opacity="0.2" />
                <rect x="4" y="20" width="10" height="2" fill={c} />
            </svg>
        ),
    },
    {
        id: "academic", label: "Academic",
        preview: (c: string) => (
            <svg viewBox="0 0 60 80" className="w-full h-full">
                <rect width="60" height="80" fill="white" />
                <rect x="4" y="6" width="52" height="3" fill="#0f172a" />
                <rect x="4" y="12" width="20" height="1.5" fill={c} />
                <rect x="4" y="18" width="52" height="0.5" fill="#e2e8f0" />
            </svg>
        ),
    },
    {
        id: "startup", label: "Startup",
        preview: (c: string) => (
            <svg viewBox="0 0 60 80" className="w-full h-full">
                <rect width="60" height="80" fill="white" />
                <rect x="4" y="6" width="25" height="4" rx="2" fill={c} />
                <rect x="35" y="6" width="21" height="4" rx="2" fill="#f1f5f9" />
            </svg>
        ),
    },
    {
        id: "classic", label: "Standard",
        preview: (c: string) => (
            <svg viewBox="0 0 60 80" className="w-full h-full">
                <rect width="60" height="80" fill="white" />
                <rect x="4" y="6" width="30" height="3" fill="#000" />
                <rect x="4" y="11" width="52" height="0.5" fill="#000" />
            </svg>
        ),
    },
    {
        id: "executive", label: "Executive",
        preview: (c: string) => (
            <svg viewBox="0 0 60 80" className="w-full h-full">
                <rect width="60" height="80" fill="#f8fafc" />
                <rect x="0" y="0" width="60" height="20" fill="#1e293b" />
            </svg>
        ),
    },
    {
        id: "design", label: "Graphics",
        preview: (c: string) => (
            <svg viewBox="0 0 60 80" className="w-full h-full">
                <rect width="60" height="80" fill="white" />
                <circle cx="50" cy="10" r="8" fill={c} opacity="0.2" />
            </svg>
        ),
    },
    { id: "dev", label: "Developer", preview: (c: string) => <svg viewBox="0 0 60 80" className="w-full h-full"><rect width="60" height="80" fill="#0f172a" /></svg> },
    { id: "management", label: "Lead", preview: (c: string) => <svg viewBox="0 0 60 80" className="w-full h-full"><rect width="60" height="80" fill="white" /></svg> },
    { id: "sales", label: "Sales", preview: (c: string) => <svg viewBox="0 0 60 80" className="w-full h-full"><rect width="60" height="80" fill="white" /></svg> },
    { id: "marketing", label: "Growth", preview: (c: string) => <svg viewBox="0 0 60 80" className="w-full h-full"><rect width="60" height="80" fill="white" /></svg> },
    { id: "finance", label: "Quant", preview: (c: string) => <svg viewBox="0 0 60 80" className="w-full h-full"><rect width="60" height="80" fill="white" /></svg> },
    { id: "medical", label: "Health", preview: (c: string) => <svg viewBox="0 0 60 80" className="w-full h-full"><rect width="60" height="80" fill="white" /></svg> },
    { id: "legal", label: "Law", preview: (c: string) => <svg viewBox="0 0 60 80" className="w-full h-full"><rect width="60" height="80" fill="white" /></svg> },
    { id: "student", label: "Entry", preview: (c: string) => <svg viewBox="0 0 60 80" className="w-full h-full"><rect width="60" height="80" fill="white" /></svg> },
];

const SPACING_OPTIONS = [
    { label: "Compact", value: "compact" },
    { label: "Normal", value: "normal" },
    { label: "Spacious", value: "spacious" },
];

export default function TemplateSettings({ data, onChange }: TemplateSettingsProps) {
    const set = (field: string, value: any) => onChange({ ...data, [field]: value });

    const themeColor = data?.themeColor || "#0f172a";
    const sectionSpacing = data?.sectionSpacing || "normal";
    const templateId = data?.templateId || "ats";

    return (
        <div className="space-y-7">
            {/* ── Template Picker ── */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Layout className="w-4 h-4 text-indigo-500" />
                    <h4 className="text-sm font-bold text-stone-800">Template</h4>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {TEMPLATES.map(t => (
                        <button
                            key={t.id}
                            onClick={() => set("templateId", t.id)}
                            className={`flex flex-col items-center gap-1.5 p-1.5 rounded-xl border-2 transition-all ${templateId === t.id
                                ? "border-indigo-500 shadow-md shadow-indigo-100 bg-indigo-50/50"
                                : "border-stone-200 hover:border-indigo-300 bg-white"
                                }`}
                        >
                            <div className="w-full aspect-[3/4] rounded-md overflow-hidden border border-stone-100 shadow-sm">
                                {t.preview(themeColor)}
                            </div>
                            <span className={`text-[10px] font-semibold leading-none ${templateId === t.id ? "text-indigo-600" : "text-stone-500"}`}>
                                {t.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-px bg-stone-100" />

            {/* ── Section Spacing ── */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Layout className="w-4 h-4 text-indigo-500" />
                    <h4 className="text-sm font-bold text-stone-800">Section Spacing</h4>
                </div>
                <div className="flex gap-2">
                    {SPACING_OPTIONS.map(s => (
                        <button
                            key={s.value}
                            onClick={() => set("sectionSpacing", s.value)}
                            className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${sectionSpacing === s.value
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "bg-stone-50 text-stone-600 border-stone-200 hover:border-indigo-300"
                                }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
