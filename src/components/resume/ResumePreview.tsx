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
import EnhancedSingleColumnTemplate from "./templates/EnhancedSingleColumnTemplate";

const MM = 3.7795275591;
const A4_W = Math.round(210 * MM);   // 794 px
const A4_H = Math.round(297 * MM);   // 1123 px

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
        case "enhancedsinglecolumn": return <EnhancedSingleColumnTemplate data={data} variant="modern" />;
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
        personalInfo: { ...data.personalInfo, fullName: "REDACTED NAME", email: "redacted@privacy.com", phone: "+XX XXX XXXXX", address: "Confidential" },
        socialLinks: (data.socialLinks || []).map((l: any) => ({ ...l, url: "https://confidential", username: "redacted" })),
    } : data;

    const SECTION_KEY: Record<string, string> = {
        experience: "experience", education: "education", skills: "skills",
        projects: "projects", certifications: "certifications",
        languages: "languages", socials: "socialLinks", custom: "customSection",
    };
    const displayData = !hiddenSections?.size ? rawDisplay : {
        ...rawDisplay,
        ...Object.fromEntries([...hiddenSections].map(id => [SECTION_KEY[id] ?? id, id === "custom" ? { ...rawDisplay.customSection, items: [] } : []])),
        personalInfo: hiddenSections.has("personal") ? { ...rawDisplay.personalInfo, summary: "" } : rawDisplay.personalInfo,
    };

    const layout = data.layout || {};
    const topMm = layout.topMargin ?? 15;
    const botMm = layout.bottomMargin ?? 15;
    const leftMm = layout.leftMargin ?? 20;
    const rightMm = layout.rightMargin ?? 20;
    const fontFam = layout.fontFamily ?? "Inter, sans-serif";
    const maxPages = layout.maxPages ?? 0;
    const topPx = topMm * MM;
    const botPx = botMm * MM;

    const headerSize = layout.headerSize ?? data.headerSize ?? "medium";
    const titleSize = layout.titleSize ?? data.titleSize;
    const headingSize = layout.headingSize ?? data.headingSize ?? "medium";
    const fontSize = layout.fontSize ?? data.fontSize ?? "medium";
    const namePt = typeof headerSize === "number" ? headerSize : headerSize === "small" ? 20 : headerSize === "large" ? 32 : 26;
    const titlePt = typeof titleSize === "number" ? titleSize : 11;
    const headingPt = typeof headingSize === "number" ? headingSize : headingSize === "small" ? 9 : headingSize === "large" ? 13 : 11;
    const bodyPt = typeof fontSize === "number" ? fontSize : fontSize === "small" ? 8.5 : fontSize === "large" ? 11 : 9.5;

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.75);
    const recalcScale = useCallback(() => {
        if (layout.scale) { setScale(layout.scale); return; }
        const w = wrapperRef.current?.clientWidth ?? 0;
        if (w > 0) setScale(Math.min(1, w / A4_W));
    }, [layout.scale]);
    useEffect(() => {
        recalcScale();
        const ro = new ResizeObserver(recalcScale);
        if (wrapperRef.current) ro.observe(wrapperRef.current);
        window.addEventListener("resize", recalcScale);
        return () => { ro.disconnect(); window.removeEventListener("resize", recalcScale); };
    }, [recalcScale]);

    // The SINGLE visible paper — spacers run here and this is also the PDF target
    const paperRef = useRef<HTMLDivElement>(null);
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        if (contentRef) (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = paperRef.current;
    });

    // ── Spacer: push block elements OUT of the bottom-margin zone ────
    // How it works:
    //   • At each A4_H boundary, the region [pageEnd-botPx … pageEnd+topPx] is the "gutter"
    //     (bottom margin of this page + top margin of next page).
    //   • Any block element whose TOP lands inside [pageEnd-botPx … pageEnd]
    //     gets a spacer inserted before it so it moves to pageEnd+topPx.
    //   • The spacer itself is invisible white space — it IS the margin gap.
    //   • Because the spacer lives inside the paper, it fills the margin zone on
    //     BOTH pages (bottom of old page visible + top of new page), giving
    //     consistent margins everywhere.
    useEffect(() => {
        const el = paperRef.current;
        if (!el) return;
        let cancelled = false;

        const run = () => {
            if (cancelled || !paperRef.current) return;
            const el = paperRef.current;
            el.querySelectorAll(".js-spacer").forEach(n => n.remove());

            const rect = el.getBoundingClientRect();
            const nodes = Array.from(el.querySelectorAll("h2,h3,h4,p,li")) as HTMLElement[];

            const snaps = nodes.map(node => {
                const r = node.getBoundingClientRect();
                return { node, top: (r.top - rect.top) / scale, height: r.height / scale };
            }).sort((a, b) => a.top - b.top);

            let shift = 0;
            const done = new Set<number>();
            const contentH = A4_H - topPx - botPx; // usable content height per page

            for (const s of snaps) {
                const top = s.top + shift;
                const page = Math.floor(top / A4_H);
                const pageEnd = (page + 1) * A4_H;
                const usableBot = pageEnd - botPx;
                const bot = top + s.height;

                // Push element if its BOTTOM crosses the usable area AND
                // the element is short enough to fit on the next page
                // (avoids huge gaps for very tall elements like multi-page descriptions)
                if (bot > usableBot && s.height < contentH && !done.has(page)) {
                    const h = (pageEnd + topPx) - top;
                    const sp = document.createElement("div");
                    sp.className = "js-spacer";
                    sp.style.cssText = `height:${h}px;width:100%;display:block;pointer-events:none;`;
                    s.node.parentNode?.insertBefore(sp, s.node);
                    shift += h;
                    done.add(page);
                }
            }

            const raw = Math.max(1, Math.ceil((el.scrollHeight - 4) / A4_H));
            const capped = maxPages > 0 ? Math.min(raw, maxPages) : raw;
            setPageCount(capped);
        };

        const t = setTimeout(run, 300);
        let rot: ReturnType<typeof setTimeout>;
        const ro = new ResizeObserver(() => { clearTimeout(rot); rot = setTimeout(run, 200); });
        ro.observe(el);
        return () => { cancelled = true; clearTimeout(t); clearTimeout(rot); ro.disconnect(); };
    }, [data, scale, topPx, botPx, maxPages]);

    // When maxPages is set, cap the paper height so overflow is hidden
    const totalH = pageCount * A4_H;
    const scaledW = A4_W * scale;
    const scaledH = totalH * scale;

    return (
        <div ref={wrapperRef} className="w-full flex justify-center overflow-x-hidden pb-10">
            <div style={{ position: "relative", width: scaledW, height: scaledH, flexShrink: 0 }}>

                {/* Scale wrapper */}
                <div style={{
                    position: "absolute", top: 0, left: 0,
                    width: A4_W,
                    transformOrigin: "top left",
                    transform: `scale(${scale})`,
                }}>
                    {/* THE paper — single continuous, spacers live inside it */}
                    <div
                        ref={paperRef}
                        className="paper-page"
                        style={{
                            width: A4_W,
                            minHeight: A4_H,
                            // If maxPages is set, clip overflow so user sees exactly N pages
                            maxHeight: maxPages > 0 ? totalH : undefined,
                            overflow: maxPages > 0 ? "hidden" : "visible",
                            background: "#fff",
                            boxSizing: "border-box",
                            paddingTop: `${topMm}mm`,
                            paddingBottom: `${botMm}mm`,
                            paddingLeft: `${leftMm}mm`,
                            paddingRight: `${rightMm}mm`,
                            fontFamily: fontFam,
                            textAlign: (layout.textAlign || "left") as any,
                            lineHeight: layout.lineHeight || 1.45,
                            boxShadow: "0 4px 32px rgba(0,0,0,0.13)",
                            position: "relative",
                            // CSS custom props for font sizes
                            ["--resume-name-size" as string]: `${namePt}pt`,
                            ["--resume-title-size" as string]: `${titlePt}pt`,
                            ["--resume-heading-size" as string]: `${headingPt}pt`,
                            ["--resume-body-size" as string]: `${bodyPt}pt`,
                        }}
                    >
                        <Template data={displayData} />

                        {/* Thin dashed page-break lines — purely visual, sit on top, don't block content */}
                        {Array.from({ length: pageCount - 1 }).map((_, i) => (
                            <div key={i} className="no-print" style={{
                                position: "absolute",
                                top: (i + 1) * A4_H,
                                left: 0, right: 0,
                                height: 1,
                                zIndex: 20,
                                pointerEvents: "none",
                                background: "repeating-linear-gradient(90deg,#818cf8 0,#818cf8 6px,transparent 6px,transparent 14px)",
                            }} />
                        ))}
                    </div>
                </div>

                {/* Page number labels shown to the right */}
                {Array.from({ length: pageCount }).map((_, i) => (
                    <div key={i} className="no-print" style={{
                        position: "absolute",
                        top: i * scaledH / pageCount + 6,
                        left: scaledW + 8,
                        fontSize: 10, color: "#a8a29e",
                        fontWeight: 700, letterSpacing: "0.06em",
                        textTransform: "uppercase", whiteSpace: "nowrap",
                    }}>
                        Page {i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
}