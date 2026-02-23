"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import AtsTemplate from "./templates/AtsTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";
import MinimalistTemplate from "./templates/MinimalistTemplate";
import TechTemplate from "./templates/TechTemplate";
import CorporateTemplate from "./templates/CorporateTemplate";
import AcademicTemplate from "./templates/AcademicTemplate";
import StartupTemplate from "./templates/StartupTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import DesignTemplate from "./templates/DesignTemplate";
import DevTemplate from "./templates/DevTemplate";
import ManagementTemplate from "./templates/ManagementTemplate";
import SalesTemplate from "./templates/SalesTemplate";
import MarketingTemplate from "./templates/MarketingTemplate";
import FinanceTemplate from "./templates/FinanceTemplate";
import MedicalTemplate from "./templates/MedicalTemplate";
import LegalTemplate from "./templates/LegalTemplate";
import StudentTemplate from "./templates/StudentTemplate";
import { generateDocx } from "@/lib/generateDocx";

const MM = 3.7795275591;
const A4_W_MM = 210;
const A4_H_MM = 297;
const A4_W = Math.round(A4_W_MM * MM); // 794px
const A4_H = Math.round(A4_H_MM * MM); // 1123px

export function Template({ data }: { data: any }) {
    switch (data.templateId) {
        case "modern": return <ModernTemplate data={data} />;
        case "professional": return <ProfessionalTemplate data={data} />;
        case "creative": return <CreativeTemplate data={data} />;
        case "elegant": return <ElegantTemplate data={data} />;
        case "minimalist": return <MinimalistTemplate data={data} />;
        case "tech": return <TechTemplate data={data} />;
        case "corporate": return <CorporateTemplate data={data} />;
        case "academic": return <AcademicTemplate data={data} />;
        case "startup": return <StartupTemplate data={data} />;
        case "classic": return <ClassicTemplate data={data} />;
        case "executive": return <ExecutiveTemplate data={data} />;
        case "design": return <DesignTemplate data={data} />;
        case "dev": return <DevTemplate data={data} />;
        case "management": return <ManagementTemplate data={data} />;
        case "sales": return <SalesTemplate data={data} />;
        case "marketing": return <MarketingTemplate data={data} />;
        case "finance": return <FinanceTemplate data={data} />;
        case "medical": return <MedicalTemplate data={data} />;
        case "legal": return <LegalTemplate data={data} />;
        case "student": return <StudentTemplate data={data} />;
        case "ats":
        default: return <AtsTemplate data={data} />;
    }
}

export default function ResumePreview({
    data,
    contentRef,
    isBlindMode = false,
    isExporting = false,
    hiddenSections,
}: {
    data: any;
    contentRef?: React.RefObject<HTMLDivElement | null>;
    isBlindMode?: boolean;
    isExporting?: boolean;
    hiddenSections?: Set<string>;
}) {
    const rawDisplay = (isBlindMode && !isExporting) ? {
        ...data,
        personalInfo: {
            ...data.personalInfo,
            fullName: "REDACTED NAME",
            email: "redacted@privacy.com",
            phone: "+XX XXX XXXXX",
            address: "Confidential",
        },
        socialLinks: (data.socialLinks || []).map((l: any) => ({
            ...l, url: "https://confidential.link", username: "redacted",
        })),
    } : data;

    // Apply hidden sections: zero out arrays for hidden section ids
    const SECTION_KEY_MAP: Record<string, string> = {
        experience: "experience", education: "education", skills: "skills",
        projects: "projects", certifications: "certifications",
        languages: "languages", socials: "socialLinks", custom: "customSection",
    };
    const displayData = !hiddenSections?.size ? rawDisplay : {
        ...rawDisplay,
        ...Object.fromEntries(
            [...hiddenSections].map(id => [SECTION_KEY_MAP[id] ?? id, id === "custom" ? { ...rawDisplay.customSection, items: [] } : []])
        ),
        personalInfo: hiddenSections.has("personal")
            ? { ...rawDisplay.personalInfo, summary: "" }
            : rawDisplay.personalInfo,
    };

    const wrapperRef = useRef<HTMLDivElement>(null); // the scroll container
    const paperRef = useRef<HTMLDivElement>(null); // actual A4 paper div
    const [scale, setScale] = useState(0.75);
    const [pageCount, setPageCount] = useState(1);

    // ── Scale: fit A4 width inside the wrapper ──────────────────────
    const recalcScale = useCallback(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        if (data.layout?.scale) {
            setScale(data.layout.scale);
            return;
        }
        const available = wrapper.clientWidth;
        if (available > 0) setScale(Math.min(1, available / A4_W));
    }, [data.layout?.scale]);

    useEffect(() => {
        recalcScale();
        const ro = new ResizeObserver(recalcScale);
        if (wrapperRef.current) ro.observe(wrapperRef.current);
        window.addEventListener("resize", recalcScale);
        return () => { ro.disconnect(); window.removeEventListener("resize", recalcScale); };
    }, [recalcScale]);

    // ── Paginator: insert spacers to avoid page-cut ──────────────────
    useEffect(() => {
        let cancelled = false;
        const paper = paperRef.current;
        if (!paper) return;

        const run = () => {
            if (cancelled || !paperRef.current) return;
            const el = paperRef.current;
            el.querySelectorAll(".js-spacer").forEach(n => n.remove());

            const botPx = (data.layout?.bottomMargin ?? 15) * MM;
            const topPx = (data.layout?.topMargin ?? 15) * MM;
            const danger = botPx;

            el.querySelectorAll(".break-inside-avoid, h2, h3, h4, p, li").forEach(node => {
                const elTop = el.getBoundingClientRect().top;
                const r = (node as HTMLElement).getBoundingClientRect();
                const absTop = r.top - elTop;
                const absBot = r.bottom - elTop;
                const pg = Math.floor(absTop / A4_H);
                const cut = (pg + 1) * A4_H;

                if (absBot > (cut - danger) && absTop < cut) {
                    const shift = (cut - absTop) + topPx;
                    if (shift > 0 && node.parentNode) {
                        const sp = document.createElement("div");
                        sp.className = "js-spacer";
                        sp.style.cssText = `height:${shift}px;width:100%;display:block;`;
                        node.parentNode.insertBefore(sp, node);
                    }
                }
            });

            setPageCount(Math.max(1, Math.ceil(el.scrollHeight / A4_H)));
        };

        const t = setTimeout(run, 350);
        let ro_t: ReturnType<typeof setTimeout>;
        const ro = new ResizeObserver(() => { clearTimeout(ro_t); ro_t = setTimeout(run, 250); });
        ro.observe(paper);
        return () => { cancelled = true; clearTimeout(t); clearTimeout(ro_t); ro.disconnect(); };
    }, [data]);

    const layout = data.layout || {};
    const topMm = layout.topMargin ?? 15;
    const botMm = layout.bottomMargin ?? 15;
    const leftMm = layout.leftMargin ?? 20;
    const rightMm = layout.rightMargin ?? 20;
    const fontFam = layout.fontFamily || "Inter, sans-serif";

    // The outer wrapper captures its own width for scale calculation
    // We use a negative margin trick: after scaling, the element takes up
    // `scale * A4_H` height visually but `A4_H` in DOM space, so we add a
    // negative bottom margin to collapse the excess DOM space.
    const scaledH = pageCount * A4_H * scale;
    const domH = pageCount * A4_H;
    const marginCorrection = scaledH - domH; // negative value collapses excess

    return (
        <div ref={wrapperRef} style={{ width: "100%", position: "relative" }}>
            <div style={{
                width: `${A4_W}px`,
                transformOrigin: "top left",
                transform: `scale(${scale})`,
                // Collapse the DOM space that the unscaled element would occupy
                marginBottom: `${marginCorrection}px`,
            }}>
                {/* The actual A4 paper */}
                <div
                    ref={(node) => {
                        (paperRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                        if (contentRef) (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                    }}
                    className="paper-page"
                    style={{
                        width: `${A4_W}px`,
                        minHeight: `${A4_H}px`,
                        background: "#ffffff",
                        boxSizing: "border-box",
                        paddingTop: `${topMm}mm`,
                        paddingBottom: `${botMm}mm`,
                        paddingLeft: `${leftMm}mm`,
                        paddingRight: `${rightMm}mm`,
                        fontFamily: fontFam,
                        textAlign: layout.textAlign || "left",
                        lineHeight: layout.lineHeight || 1.45,
                        position: "relative",
                        boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
                        backgroundImage: layout.showGrid ? "linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)" : "none",
                        backgroundSize: "20px 20px",
                    }}
                >
                    <Template data={displayData} />

                    {/* Page break lines (visible on screen only) */}
                    {Array.from({ length: pageCount }).map((_, i) =>
                        i > 0 ? (
                            <div key={i} className="no-print" style={{
                                position: "absolute",
                                top: i * A4_H,
                                left: 0, right: 0,
                                height: 3,
                                background: "repeating-linear-gradient(90deg,#6366f1 0,#6366f1 8px,transparent 8px,transparent 16px)",
                                zIndex: 20,
                            }} />
                        ) : null
                    )}
                </div>

                {/* Page number labels */}
                {Array.from({ length: pageCount }).map((_, i) => (
                    <div key={i} className="no-print" style={{
                        position: "absolute",
                        top: i * A4_H + 10,
                        left: A4_W + 10,
                        fontSize: 10,
                        color: "#a8a29e",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase" as const,
                        whiteSpace: "nowrap" as const,
                    }}>
                        Page {i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
}