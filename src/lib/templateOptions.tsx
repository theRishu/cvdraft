import React from "react";

const getPreviewSVG = (c: string, variantOffset: number) => (
    <svg viewBox="0 0 60 80" className="w-full h-full border border-slate-200" style={{ borderRadius: '4px', overflow: 'hidden' }}>
        <rect width="60" height="80" fill="white" />
        <rect x={10 + (variantOffset % 3) * 2} y="8" width="40" height="6" fill="#0f172a" />
        <rect x={20 - (variantOffset % 2) * 5} y="16" width="20" height="1.5" fill={c} />
        <rect x="15" y="20" width="30" height="1" fill="#64748b" />
        {(variantOffset % 2 === 0) && <rect x="8" y="26" width="44" height="0.5" fill="#cbd5e1" />}

        <rect x="8" y="28" width="12" height="1.5" fill="#334155" />
        <rect x="8" y="31" width="44" height="0.5" fill="#94a3b8" />
        <rect x="8" y="33" width="38" height="0.5" fill="#94a3b8" />

        <rect x="8" y="40" width="12" height="1.5" fill="#334155" />
        <rect x="8" y="43" width="44" height="0.5" fill="#94a3b8" />

        <rect x="8" y="50" width="12" height="1.5" fill="#334155" />
        <rect x="8" y="53" width="20" height="0.5" fill="#94a3b8" />
    </svg>
);

export const TEMPLATES = [
    { id: "singlecolumn", label: "Professional", preview: (c: string) => getPreviewSVG(c, 0) },
    { id: "executive", label: "Executive", preview: (c: string) => getPreviewSVG(c, 1) },
    { id: "modern", label: "Modern", preview: (c: string) => getPreviewSVG(c, 2) },
    { id: "minimalist", label: "Minimalist", preview: (c: string) => getPreviewSVG(c, 3) },
    { id: "academic", label: "Academic", preview: (c: string) => getPreviewSVG(c, 4) },
    { id: "creative", label: "Creative", preview: (c: string) => getPreviewSVG(c, 5) },
    { id: "classic", label: "Classic", preview: (c: string) => getPreviewSVG(c, 6) },
    { id: "startup", label: "Startup", preview: (c: string) => getPreviewSVG(c, 7) },
    { id: "tech", label: "Tech", preview: (c: string) => getPreviewSVG(c, 8) },
    { id: "corporate", label: "Corporate", preview: (c: string) => getPreviewSVG(c, 9) },
    { id: "refined", label: "Refined", preview: (c: string) => getPreviewSVG(c, 10) },
];
