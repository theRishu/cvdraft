import React from "react";
import { AlignLeft, AlignCenter, AlignRight, Type, Info, Palette, ZoomIn, Layout, Sparkles } from "lucide-react";
import { TEMPLATES } from "@/lib/templateOptions";

interface LayoutSettingsProps {
    data: any;
    onChange: (data: any) => void;
}

const FONTS = [
    { label: "Inter", value: "Inter, sans-serif" },
    { label: "Roboto", value: "'Roboto', sans-serif" },
    { label: "Open Sans", value: "'Open Sans', sans-serif" },
    { label: "Source Sans 3", value: "'Source Sans 3', sans-serif" },
    { label: "Nunito", value: "'Nunito', sans-serif" },
    { label: "Rubik", value: "'Rubik', sans-serif" },
    { label: "Lato", value: "'Lato', sans-serif" },
    { label: "Merriweather", value: "'Merriweather', serif" },
    { label: "Playfair", value: "'Playfair Display', serif" },
    { label: "Lora", value: "'Lora', serif" },
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

    return (
        <div className="space-y-7">
            {/* ── Templates Gallery ── */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
                    <h4 className="text-xs sm:text-sm font-bold text-stone-800">Template Selection</h4>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {TEMPLATES.map(t => (
                        <button
                            key={t.id}
                            onClick={() => set("templateId", t.id)}
                            className={`group relative flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all overflow-hidden ${data.templateId === t.id
                                ? "border-indigo-600 bg-indigo-50/50 shadow-sm"
                                : "border-stone-200 hover:border-indigo-300 bg-white"
                                }`}
                        >
                            <div className="w-full aspect-[1/1.3] bg-stone-50 rounded-lg mb-2 overflow-hidden flex items-center justify-center pointer-events-none">
                                {t.preview(data.templateId === t.id ? themeColor : "#cbd5e1")}
                            </div>
                            <span className={`text-[10px] font-bold w-full text-center truncate ${data.templateId === t.id ? "text-indigo-700" : "text-stone-600"}`}>
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
                    <Layout className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
                    <h4 className="text-xs sm:text-sm font-bold text-stone-800">Section Spacing</h4>
                </div>
                <div className="flex gap-2">
                    {SPACING_OPTIONS.map(s => (
                        <button
                            key={s.value}
                            onClick={() => set("sectionSpacing", s.value)}
                            className={`flex-1 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-semibold border transition-all ${sectionSpacing === s.value
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
                    <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
                    <h4 className="text-xs sm:text-sm font-bold text-stone-800">Accent Color</h4>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {COLORS.map(c => (
                        <button
                            key={c.value}
                            title={c.label}
                            onClick={() => set("themeColor", c.value)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all ${themeColor === c.value ? "border-stone-900 scale-110 sm:scale-125 shadow-md" : "border-transparent hover:scale-110"}`}
                            style={{ background: c.value }}
                        />
                    ))}
                    <label title="Custom color" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-dashed border-stone-300 flex items-center justify-center cursor-pointer hover:border-indigo-400 overflow-hidden relative">
                        <input
                            type="color"
                            value={themeColor}
                            onChange={e => set("themeColor", e.target.value)}
                            className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                        />
                        <span className="text-[10px] font-bold text-stone-400">+</span>
                    </label>
                </div>
                <p className="text-[10px] sm:text-xs text-stone-400 mt-2 font-medium">Applied to headings and accents.</p>
            </div>

            <div className="h-px bg-stone-100" />

            {/* ── Text Sizes ── */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
                    <h4 className="text-xs sm:text-sm font-bold text-stone-800">Typography Scale (pt)</h4>
                </div>

                <div className="space-y-6">
                    {/* Name Size & Style */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] sm:text-[11px] font-bold text-stone-600 uppercase tracking-widest block">Name</label>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => set("nameBold", !data.nameBold)}
                                    className={`p-1 rounded ${data.nameBold ? "bg-indigo-100 text-indigo-600" : "text-stone-400 hover:text-stone-600"}`}
                                    title="Bold"
                                >
                                    <span className="font-bold text-xs px-1">B</span>
                                </button>
                                <button
                                    onClick={() => set("nameUnderline", !data.nameUnderline)}
                                    className={`p-1 rounded ${data.nameUnderline ? "bg-indigo-100 text-indigo-600" : "text-stone-400 hover:text-stone-600"}`}
                                    title="Underline"
                                >
                                    <span className="underline text-xs px-1">U</span>
                                </button>
                                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded ml-1">
                                    {typeof headerSize === 'number' ? `${headerSize}pt` : headerSize}
                                </span>
                            </div>
                        </div>
                        <input
                            type="range" min="18" max="44" step="1"
                            value={typeof headerSize === 'number' ? headerSize : (headerSize === "small" ? 20 : headerSize === "large" ? 32 : 26)}
                            onChange={(e) => set("headerSize", parseInt(e.target.value))}
                            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex justify-between px-1">
                            <span className="text-[9px] text-stone-400 font-bold uppercase">18</span>
                            <span className="text-[9px] text-stone-400 font-bold uppercase">31</span>
                            <span className="text-[9px] text-stone-400 font-bold uppercase">44</span>
                        </div>
                    </div>

                    {/* Title Size & Style */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] sm:text-[11px] font-bold text-stone-600 uppercase tracking-widest block">Job Title</label>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => set("titleBold", !data.titleBold)}
                                    className={`p-1 rounded ${data.titleBold ? "bg-indigo-100 text-indigo-600" : "text-stone-400 hover:text-stone-600"}`}
                                    title="Bold"
                                >
                                    <span className="font-bold text-xs px-1">B</span>
                                </button>
                                <button
                                    onClick={() => set("titleItalic", !data.titleItalic)}
                                    className={`p-1 rounded ${data.titleItalic ? "bg-indigo-100 text-indigo-600" : "text-stone-400 hover:text-stone-600"}`}
                                    title="Italic"
                                >
                                    <span className="italic text-xs px-1">I</span>
                                </button>
                                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded ml-1">
                                    {typeof data.titleSize === 'number' ? `${data.titleSize}pt` : (typeof headerSize === 'number' ? `${Math.max(10, Math.round(headerSize * 0.45))}pt` : "11pt")}
                                </span>
                            </div>
                        </div>
                        <input
                            type="range" min="9" max="22" step="0.5"
                            value={typeof data.titleSize === 'number' ? data.titleSize : (typeof headerSize === 'number' ? Math.max(10, Math.round(headerSize * 0.45)) : 11)}
                            onChange={(e) => set("titleSize", parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex justify-between px-1">
                            <span className="text-[9px] text-stone-400 font-bold uppercase">9</span>
                            <span className="text-[9px] text-stone-400 font-bold uppercase">15.5</span>
                            <span className="text-[9px] text-stone-400 font-bold uppercase">22</span>
                        </div>
                    </div>

                    {/* Section Headings */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] sm:text-[11px] font-bold text-stone-600 uppercase tracking-widest block">Section Headings</label>
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                                {typeof headingSize === 'number' ? `${headingSize}pt` : headingSize}
                            </span>
                        </div>
                        <input
                            type="range" min="9" max="24" step="0.5"
                            value={typeof headingSize === 'number' ? headingSize : (headingSize === "small" ? 9 : headingSize === "large" ? 13 : 11)}
                            onChange={(e) => set("headingSize", parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex justify-between px-1">
                            <span className="text-[9px] text-stone-400 font-bold uppercase">9</span>
                            <span className="text-[9px] text-stone-400 font-bold uppercase">16.5</span>
                            <span className="text-[9px] text-stone-400 font-bold uppercase">24</span>
                        </div>
                    </div>

                    {/* Body Text */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] sm:text-[11px] font-bold text-stone-600 uppercase tracking-widest block">Body Text</label>
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                                {typeof fontSize === 'number' ? `${fontSize}pt` : fontSize}
                            </span>
                        </div>
                        <input
                            type="range" min="8" max="14" step="0.5"
                            value={typeof fontSize === 'number' ? fontSize : (fontSize === "small" ? 8.5 : fontSize === "large" ? 11 : 9.5)}
                            onChange={(e) => set("fontSize", parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex justify-between px-1">
                            <span className="text-[9px] text-stone-400 font-bold uppercase">8</span>
                            <span className="text-[9px] text-stone-400 font-bold uppercase">11</span>
                            <span className="text-[9px] text-stone-400 font-bold uppercase">14</span>
                        </div>
                    </div>
                </div>
            </div>



            {/* ── Font Family ── */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Type className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
                    <h4 className="text-xs sm:text-sm font-bold text-stone-800">Font</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {FONTS.map(f => (
                        <button
                            key={f.value}
                            onClick={() => set("fontFamily", f.value)}
                            className={`px-3 py-2 sm:py-2.5 rounded-xl border text-[11px] sm:text-sm text-left transition-all ${fontFamily === f.value
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
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
                    <AlignCenter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
                    <h4 className="text-xs sm:text-sm font-bold text-stone-800">Spacing & Alignment</h4>
                </div>
                <div className="space-y-4">
                    <div className="flex bg-stone-100 rounded-xl p-1 border border-stone-200">
                        <button
                            onClick={() => set("textAlign", "left")}
                            className={`flex-1 flex justify-center py-1.5 rounded-lg transition-all ${data.textAlign === "left" || !data.textAlign ? "bg-white shadow-sm text-indigo-600" : "text-stone-400 hover:text-stone-600"}`}
                        >
                            <AlignLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <button
                            onClick={() => set("textAlign", "center")}
                            className={`flex-1 flex justify-center py-1.5 rounded-lg transition-all ${data.textAlign === "center" ? "bg-white shadow-sm text-indigo-600" : "text-stone-400 hover:text-stone-600"}`}
                        >
                            <AlignCenter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <button
                            onClick={() => set("textAlign", "right")}
                            className={`flex-1 flex justify-center py-1.5 rounded-lg transition-all ${data.textAlign === "right" ? "bg-white shadow-sm text-indigo-600" : "text-stone-400 hover:text-stone-600"}`}
                        >
                            <AlignRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-[9px] sm:text-[10px] font-black text-stone-400 uppercase tracking-widest">Line Height</label>
                            <span className="text-[9px] sm:text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{data.lineHeight || 1.45}</span>
                        </div>
                        <input
                            type="range" min="1.0" max="2.0" step="0.05"
                            value={data.lineHeight || 1.45}
                            onChange={e => set("lineHeight", parseFloat(e.target.value))}
                            className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                    </div>
                </div>
            </div>

            <div className="h-px bg-stone-100" />

            {/* ── Skills Display ── */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Layout className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
                    <h4 className="text-xs sm:text-sm font-bold text-stone-800">Skills Display</h4>
                </div>
                <div className="flex bg-stone-100 rounded-xl p-1 border border-stone-200 gap-1">
                    <button
                        onClick={() => set("skillsDisplayStyle", "inline")}
                        className={`flex-1 flex justify-center py-1.5 rounded-lg transition-all text-xs font-semibold ${data.skillsDisplayStyle === "inline" || !data.skillsDisplayStyle ? "bg-white shadow-sm text-indigo-600" : "text-stone-500 hover:text-stone-700 hover:bg-stone-200/50"}`}
                    >
                        Inline Tags
                    </button>
                    <button
                        onClick={() => set("skillsDisplayStyle", "block")}
                        className={`flex-1 flex justify-center py-1.5 rounded-lg transition-all text-xs font-semibold ${data.skillsDisplayStyle === "block" ? "bg-white shadow-sm text-indigo-600" : "text-stone-500 hover:text-stone-700 hover:bg-stone-200/50"}`}
                    >
                        New Lines
                    </button>
                    <button
                        onClick={() => set("skillsDisplayStyle", "comma")}
                        className={`flex-1 flex justify-center py-1.5 rounded-lg transition-all text-xs font-semibold ${data.skillsDisplayStyle === "comma" ? "bg-white shadow-sm text-indigo-600" : "text-stone-500 hover:text-stone-700 hover:bg-stone-200/50"}`}
                    >
                        Comma Separated
                    </button>
                </div>
            </div>

            <div className="h-px bg-stone-100" />

            {/* ── Margins ── */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <AlignLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
                    <h4 className="text-xs sm:text-sm font-bold text-stone-800">Margins</h4>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    {[
                        { id: "topMargin", label: "Top", val: topMargin },
                        { id: "bottomMargin", label: "Bottom", val: bottomMargin },
                        { id: "leftMargin", label: "Left", val: leftMargin },
                        { id: "rightMargin", label: "Right", val: rightMargin },
                    ].map(m => (
                        <div key={m.id} className="space-y-1.5">
                            <div className="flex justify-between mb-0.5">
                                <label className="text-[10px] font-medium text-stone-500">{m.label}</label>
                                <span className="text-[10px] font-mono font-bold text-stone-800">{m.val}mm</span>
                            </div>
                            <input
                                type="range" min={0} max={40} value={m.val}
                                onChange={e => set(m.id, parseInt(e.target.value))}
                                className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-start gap-2.5 p-3.5 sm:p-4 bg-blue-50/50 border border-blue-100 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs text-blue-700 leading-relaxed font-medium">
                <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 mt-0.5 text-blue-400" />
                <span>Standard margins are 15–20mm. Going below 10mm may cut content when printing.</span>
            </div>
        </div>
    );
}
