import React from "react";
import { AlignLeft, AlignCenter, AlignRight, Type, Info, Palette, ZoomIn, Layout } from "lucide-react";

interface LayoutSettingsProps {
    data: any;
    onChange: (data: any) => void;
}

const FONTS = [
    { label: "Inter", value: "Inter, sans-serif" },
    { label: "Roboto", value: "'Roboto', sans-serif" },
    { label: "Open Sans", value: "'Open Sans', sans-serif" },
    { label: "Lato", value: "'Lato', sans-serif" },
    { label: "Merriweather", value: "'Merriweather', serif" },
    { label: "Playfair", value: "'Playfair Display', serif" },
];

const COLORS = [
    { label: "Midnight", value: "#0f172a" },
    { label: "Indigo", value: "#4f46e5" },
    { label: "Blue", value: "#2563eb" },
    { label: "Teal", value: "#0d9488" },
    { label: "Forest", value: "#16a34a" },
    { label: "Rose", value: "#e11d48" },
    { label: "Amber", value: "#d97706" },
    { label: "Slate", value: "#475569" },
    { label: "Black", value: "#000000" },
];

const FONT_SIZES = [
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
];

const SPACING_OPTIONS = [
    { label: "Compact", value: "compact" },
    { label: "Normal", value: "normal" },
    { label: "Spacious", value: "spacious" },
];

export default function LayoutSettings({ data, onChange }: LayoutSettingsProps) {
    const set = (field: string, value: any) => onChange({ ...data, [field]: value });

    const topMargin = data?.topMargin ?? 15;
    const bottomMargin = data?.bottomMargin ?? 15;
    const leftMargin = data?.leftMargin ?? 20;
    const rightMargin = data?.rightMargin ?? 20;
    const fontFamily = data?.fontFamily || "Inter, sans-serif";
    const themeColor = data?.themeColor || "#0f172a";
    const fontSize = data?.fontSize || "medium";
    const headerSize = data?.headerSize || "medium";
    const headingSize = data?.headingSize || "medium";
    const sectionSpacing = data?.sectionSpacing || "normal";
    const templateId = data?.templateId || "ats";

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

            <div className="h-px bg-stone-100" />



            {/* ── Color Palette ── */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Palette className="w-4 h-4 text-indigo-500" />
                    <h4 className="text-sm font-bold text-stone-800">Accent Color</h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                    {COLORS.map(c => (
                        <button
                            key={c.value}
                            title={c.label}
                            onClick={() => set("themeColor", c.value)}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${themeColor === c.value ? "border-stone-900 scale-125 shadow-md" : "border-transparent hover:scale-110"}`}
                            style={{ background: c.value }}
                        />
                    ))}
                    <label title="Custom color" className="w-8 h-8 rounded-full border-2 border-dashed border-stone-300 flex items-center justify-center cursor-pointer hover:border-indigo-400 overflow-hidden">
                        <input
                            type="color"
                            value={themeColor}
                            onChange={e => set("themeColor", e.target.value)}
                            className="opacity-0 absolute w-8 h-8 cursor-pointer"
                        />
                        <span className="text-[10px] font-bold text-stone-400">+</span>
                    </label>
                </div>
                <p className="text-xs text-stone-400 mt-2">Applied to headings and accents.</p>
            </div>

            <div className="h-px bg-stone-100" />

            {/* ── Text Sizes ── */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <ZoomIn className="w-4 h-4 text-indigo-500" />
                    <h4 className="text-sm font-bold text-stone-800">Typography Scale</h4>
                </div>

                <div className="space-y-4">
                    {/* Body Size */}
                    <div>
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-2">Body Text</label>
                        <div className="flex gap-2">
                            {FONT_SIZES.map(s => (
                                <button
                                    key={s.value}
                                    onClick={() => set("fontSize", s.value)}
                                    className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-all ${fontSize === s.value
                                        ? "bg-indigo-600 text-white border-indigo-600"
                                        : "bg-stone-50 text-stone-600 border-stone-200 hover:border-indigo-300"
                                        }`}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Header Size */}
                    <div>
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-2">Name & Title</label>
                        <div className="flex gap-2">
                            {FONT_SIZES.map(s => (
                                <button
                                    key={s.value}
                                    onClick={() => set("headerSize", s.value)}
                                    className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-all ${headerSize === s.value
                                        ? "bg-indigo-600 text-white border-indigo-600"
                                        : "bg-stone-50 text-stone-600 border-stone-200 hover:border-indigo-300"
                                        }`}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Heading Size */}
                    <div>
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-2">Section Headings</label>
                        <div className="flex gap-2">
                            {FONT_SIZES.map(s => (
                                <button
                                    key={s.value}
                                    onClick={() => set("headingSize", s.value)}
                                    className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-all ${headingSize === s.value
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
            </div>



            {/* ── Font Family ── */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Type className="w-4 h-4 text-indigo-500" />
                    <h4 className="text-sm font-bold text-stone-800">Font</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {FONTS.map(f => (
                        <button
                            key={f.value}
                            onClick={() => set("fontFamily", f.value)}
                            className={`px-3 py-2.5 rounded-xl border text-sm text-left transition-all ${fontFamily === f.value
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "bg-stone-50 text-stone-700 border-stone-200 hover:border-indigo-300"
                                }`}
                            style={{ fontFamily: f.value }}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-px bg-stone-100" />

            {/* ── Alignment & Line Height ── */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <AlignCenter className="w-4 h-4 text-indigo-500" />
                    <h4 className="text-sm font-bold text-stone-800">Spacing & Alignment</h4>
                </div>
                <div className="space-y-4">
                    <div className="flex bg-stone-100 rounded-xl p-1 border border-stone-200">
                        <button
                            onClick={() => set("textAlign", "left")}
                            className={`flex-1 flex justify-center py-1.5 rounded-lg transition-all ${data.textAlign === "left" || !data.textAlign ? "bg-white shadow-sm text-indigo-600" : "text-stone-400 hover:text-stone-600"}`}
                        >
                            <AlignLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => set("textAlign", "center")}
                            className={`flex-1 flex justify-center py-1.5 rounded-lg transition-all ${data.textAlign === "center" ? "bg-white shadow-sm text-indigo-600" : "text-stone-400 hover:text-stone-600"}`}
                        >
                            <AlignCenter className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => set("textAlign", "right")}
                            className={`flex-1 flex justify-center py-1.5 rounded-lg transition-all ${data.textAlign === "right" ? "bg-white shadow-sm text-indigo-600" : "text-stone-400 hover:text-stone-600"}`}
                        >
                            <AlignRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Line Height</label>
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{data.lineHeight || 1.45}</span>
                        </div>
                        <input
                            type="range" min="1.0" max="2.0" step="0.05"
                            value={data.lineHeight || 1.45}
                            onChange={e => set("lineHeight", parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                    </div>
                </div>
            </div>

            <div className="h-px bg-stone-100" />

            {/* ── Margins ── */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <AlignLeft className="w-4 h-4 text-indigo-500" />
                    <h4 className="text-sm font-bold text-stone-800">Margins</h4>
                </div>
                <div className="space-y-4">
                    {[
                        { id: "topMargin", label: "Top", val: topMargin },
                        { id: "bottomMargin", label: "Bottom", val: bottomMargin },
                        { id: "leftMargin", label: "Left", val: leftMargin },
                        { id: "rightMargin", label: "Right", val: rightMargin },
                    ].map(m => (
                        <div key={m.id}>
                            <div className="flex justify-between mb-1.5">
                                <label className="text-xs font-medium text-stone-600">{m.label}</label>
                                <span className="text-xs font-mono font-bold text-stone-800">{m.val}mm</span>
                            </div>
                            <input
                                type="range" min={0} max={40} value={m.val}
                                onChange={e => set(m.id, parseInt(e.target.value))}
                                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl text-xs text-blue-700">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-500" />
                <span>Standard margins are 15–20mm. Going below 10mm may cut content when printing.</span>
            </div>
        </div>
    );
}
