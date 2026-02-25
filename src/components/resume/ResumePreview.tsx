"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import SingleColumnTemplate from "./templates/SingleColumnTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalistTemplate from "./templates/MinimalistTemplate";
import AcademicTemplate from "./templates/AcademicTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import StartupTemplate from "./templates/StartupTemplate";
import TechTemplate from "./templates/TechTemplate";
import CorporateTemplate from "./templates/CorporateTemplate";
import RefinedTemplate from "./templates/RefinedTemplate";

const MM = 3.7795275591;
const A4_W_MM = 210;
const A4_H_MM = 297;
const A4_W = Math.round(A4_W_MM * MM); // 794px
const A4_H = Math.round(A4_H_MM * MM); // 1123px

export function Template({ data }: { data: any }) {
    switch (data.templateId) {
        case "executive": return <ExecutiveTemplate data={data} />;
        case "modern": return <ModernTemplate data={data} />;
        case "minimalist": return <MinimalistTemplate data={data} />;
        case "academic": return <AcademicTemplate data={data} />;
        case "creative": return <CreativeTemplate data={data} />;
        case "classic": return <ClassicTemplate data={data} />;
        case "startup": return <StartupTemplate data={data} />;
        case "tech": return <TechTemplate data={data} />;
        case "corporate": return <CorporateTemplate data={data} />;
        case "refined": return <RefinedTemplate data={data} />;
        default: return <SingleColumnTemplate data={data} />;
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

    // ── Paginator: ONE spacer per page boundary (no compounding) ─────────
    useEffect(() => {
        const paper = paperRef.current;
        if (!paper) return;
        let cancelled = false;

        const run = () => {
            if (cancelled || !paperRef.current) return;
            const el = paperRef.current;
            el.querySelectorAll(".js-spacer").forEach(n => n.remove());

            const botPx = (data.layout?.bottomMargin ?? 15) * MM;
            const topPx = (data.layout?.topMargin ?? 15) * MM;
            const elRect = el.getBoundingClientRect();

            // ── Step 1: Snapshot all candidate positions BEFORE any DOM mutation ──
            const candidates = Array.from(
                el.querySelectorAll("h2, h3, h4, p, li, section, div[data-section]")
            ) as HTMLElement[];

            type NodeSnap = { node: HTMLElement; absTop: number; height: number };
            const snaps: NodeSnap[] = candidates.map(node => {
                const r = node.getBoundingClientRect();
                return {
                    node,
                    absTop: (r.top - elRect.top) / scale,
                    height: r.height / scale,
                };
            }).sort((a, b) => a.absTop - b.absTop);

            // ── Step 2: Walk elements, tracking virtual position after spacers ──
            let cumulativeShift = 0;
            const handledPages = new Set<number>();
            const toInsert: { before: HTMLElement; height: number }[] = [];

            for (const snap of snaps) {
                const top = snap.absTop + cumulativeShift;
                const bot = top + snap.height;
                const page = Math.floor(top / A4_H);
                const pageBot = (page + 1) * A4_H;
                const usableBot = pageBot - botPx;

                if (bot > usableBot && top < usableBot && !handledPages.has(page)) {
                    // This element crosses the usable bottom → push to next page
                    const shift = (pageBot + topPx) - top;
                    toInsert.push({ before: snap.node, height: shift });
                    cumulativeShift += shift;
                    handledPages.add(page);
                }
            }

            // ── Step 3: Insert spacers all at once ──
            for (const { before, height } of toInsert) {
                const sp = document.createElement("div");
                sp.className = "js-spacer";
                sp.style.cssText = `height:${height}px;width:100%;display:block;clear:both;pointer-events:none;`;
                before.parentNode?.insertBefore(sp, before);
            }

            setPageCount(Math.max(1, Math.ceil((el.scrollHeight - 8) / A4_H)));
        };

        const t = setTimeout(run, 300);
        let ro_t: ReturnType<typeof setTimeout>;
        const ro = new ResizeObserver(() => { clearTimeout(ro_t); ro_t = setTimeout(run, 200); });
        ro.observe(paper);
        return () => { cancelled = true; clearTimeout(t); clearTimeout(ro_t); ro.disconnect(); };
    }, [data, scale]);

    const layout = data.layout || {};
    const topMm = layout.topMargin ?? data.topMargin ?? 15;
    const botMm = layout.bottomMargin ?? data.bottomMargin ?? 15;
    const leftMm = layout.leftMargin ?? data.leftMargin ?? 20;
    const rightMm = layout.rightMargin ?? data.rightMargin ?? 20;
    const fontFam = layout.fontFamily ?? data.fontFamily ?? "Inter, sans-serif";
    const headerSize = layout.headerSize ?? data.headerSize ?? "medium";
    const titleSize = layout.titleSize ?? data.titleSize;
    const headingSize = layout.headingSize ?? data.headingSize ?? "medium";
    const fontSize = layout.fontSize ?? data.fontSize ?? "medium";

    // Normalized typography calculations (convert string scales to pt)
    const namePt = typeof headerSize === 'number' ? headerSize : (headerSize === "small" ? 20 : headerSize === "large" ? 32 : 26);
    const titlePt = typeof titleSize === 'number' ? titleSize : (typeof headerSize === 'number' ? Math.max(10, Math.round(headerSize * 0.45)) : 11);
    const headingPt = typeof headingSize === 'number' ? headingSize : (headingSize === "small" ? 9 : headingSize === "large" ? 13 : 11);
    const bodyPt = typeof fontSize === 'number' ? fontSize : (fontSize === "small" ? 8.5 : fontSize === "large" ? 11 : 9.5);

    const scaledW = A4_W * scale;
    const scaledH = pageCount * A4_H * scale;

    return (
        <div ref={wrapperRef} className="w-full flex justify-center overflow-x-hidden pb-8">
            <div style={{ width: scaledW, height: scaledH, position: "relative", flexShrink: 0 }}>
                {/* The single pdf-export-wrapper that we capture for PDF */}
                <div className="pdf-export-wrapper" style={{
                    width: A4_W,
                    minHeight: pageCount * A4_H,
                    transformOrigin: "top left",
                    transform: `scale(${scale})`,
                    position: "absolute",
                    top: 0, left: 0,
                }}>
                    {/* The paper itself — single continuous flow */}
                    <div
                        ref={(node) => {
                            (paperRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                            if (contentRef) (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                        }}
                        className="paper-page"
                        style={{
                            width: A4_W,
                            minHeight: pageCount * A4_H,
                            background: "#fff",
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
                            // @ts-ignore
                            "--resume-name-size": `${namePt}pt`,
                            "--resume-title-size": `${titlePt}pt`,
                            "--resume-heading-size": `${headingPt}pt`,
                            "--resume-body-size": `${bodyPt}pt`,
                        } as React.CSSProperties}
                    >
                        <Template data={displayData} />

                        {/* Dashed page break indicator lines (visual only, no cropping) */}
                        {Array.from({ length: pageCount - 1 }).map((_, i) => (
                            <div key={i} className="no-print" style={{
                                position: "absolute",
                                top: (i + 1) * A4_H,
                                left: 0, right: 0,
                                height: 2,
                                zIndex: 10,
                                background: "repeating-linear-gradient(90deg,#6366f1 0,#6366f1 8px,transparent 8px,transparent 16px)",
                            }} />
                        ))}
                    </div>

                    {/* Page number labels */}
                    {Array.from({ length: pageCount }).map((_, i) => (
                        <div key={i} className="no-print" style={{
                            position: "absolute",
                            top: i * A4_H + 8,
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
        </div>
    );
}