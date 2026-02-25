import React from "react";
import { Layout } from "lucide-react";

interface TemplateSettingsProps {
    data: any;
    onChange: (data: any) => void;
}

const SPACING_OPTIONS = [
    { label: "Compact", value: "compact" },
    { label: "Normal", value: "normal" },
    { label: "Spacious", value: "spacious" },
];

export default function TemplateSettings({ data, onChange }: TemplateSettingsProps) {
    const set = (field: string, value: any) => onChange({ ...data, [field]: value });
    const themeColor = data?.themeColor || "#0f172a";
    const sectionSpacing = data?.sectionSpacing || "normal";

    return (
        <div className="space-y-7">
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
