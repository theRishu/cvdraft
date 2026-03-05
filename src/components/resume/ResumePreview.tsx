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

// A4 at 96 dpi
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
    // Blind mode
    const rawDisplay = (isBlindMode && !isExporting) ? {
        ...data,
        personalInfo: { ...data.personalInfo, fullName: "REDACTED NAME", email: "redacted@privacy.com", phone: "+XX XXX XXXXX", address: "Confidential" },
        socialLinks: (data.socialLinks || []).map((l: any) => ({ ...l, url: "https://confidential", username: "redacted" })),
    } : data;

    // Hidden sections
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

    // Layout
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

    const cssVarStyle: React.CSSProperties & Record<string, string> = {
        "--resume-name-size": `${namePt}pt`,
        "--resume-title-size": `${titlePt}pt`,
        "--resume-heading-size": `${headingPt}pt`,
        "--resume-body-size": `${bodyPt}pt`,
    };

    // Responsive scale
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

    // ── Hidden paper: runs spacers, captures innerHTML for clips ─────
    const hiddenRef = useRef<HTMLDivElement>(null);
    const pdfRef = useRef<HTMLDivElement>(null);   // PDF capture target

    const [pageCount, setPageCount] = useState(1);
    const [paperHTML, setPaperHTML] = useState<string>("");

    // Expose pdfRef as contentRef
    useEffect(() => {
        if (contentRef) (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = pdfRef.current;
    });

    // ── Spacer algorithm ─────────────────────────────────────────────
    // Runs on the HIDDEN paper.
    // Inserts spacers so that:
    //   • The BOTTOM of every page has `botMm` whitespace (no content in botPx zone)
    //   • The TOP of every page N+1 has `topMm` whitespace (spacer extends topPx past boundary)
    // After spacers settle, snapshots innerHTML → visible clips all share the same
    // spacered layout, guaranteeing identical margins on every page.
    useEffect(() => {
        const el = hiddenRef.current;
        if (!el) return;
        let cancelled = false;

        const run = () => {
            if (cancelled || !hiddenRef.current) return;
            const el = hiddenRef.current;
            el.querySelectorAll(".js-spacer").forEach(n => n.remove());

            const rect = el.getBoundingClientRect();
            const nodes = Array.from(el.querySelectorAll("h2,h3,h4,p,li")) as HTMLElement[];
            const contentH = A4_H - topPx - botPx;

            const snaps = nodes.map(node => {
                const r = node.getBoundingClientRect();
                return {
                    node,
                    // Hidden paper has NO CSS transform → positions are 1:1 CSS pixels, no division needed
                    top: r.top - rect.top,
                    height: r.height,
                };
            }).sort((a, b) => a.top - b.top);

            let shift = 0;
            const done = new Set<number>();

            for (const s of snaps) {
                const top = s.top + shift;
                const page = Math.floor(top / A4_H);
                const pageEnd = (page + 1) * A4_H;
                const usableBot = pageEnd - botPx - 4; // 4px cushion to prevent line clipping
                const bot = top + s.height;

                // Push if bottom crosses the usable area AND element fits on next page
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

            // Snapshot HTML for visible clips
            const raw = Math.max(1, Math.ceil((el.scrollHeight - 4) / A4_H));
            const capped = maxPages > 0 ? Math.min(raw, maxPages) : raw;
            setPageCount(capped);
            setPaperHTML(el.innerHTML);

            // Also update the PDF capture div
            if (pdfRef.current) pdfRef.current.innerHTML = el.innerHTML;
        };

        const t = setTimeout(run, 350);
        let rot: ReturnType<typeof setTimeout>;
        const ro = new ResizeObserver(() => { clearTimeout(rot); rot = setTimeout(run, 200); });
        ro.observe(el);
        return () => { cancelled = true; clearTimeout(t); clearTimeout(rot); ro.disconnect(); };
    }, [data, scale, topPx, botPx, maxPages]);

    // ── Shared paper style ───────────────────────────────────────────
    const paperStyle: React.CSSProperties = {
        width: A4_W,
        boxSizing: "border-box",
        background: "#fff",
        paddingTop: `${topMm}mm`,
        paddingBottom: `${botMm}mm`,
        paddingLeft: `${leftMm}mm`,
        paddingRight: `${rightMm}mm`,
        fontFamily: fontFam,
        textAlign: (layout.textAlign || "left") as any,
        lineHeight: layout.lineHeight || 1.45,
        ...cssVarStyle,
    };

    const scaledW = A4_W * scale;

    return (
        <div ref={wrapperRef} className="w-full flex flex-col items-center gap-3 pb-10">

            {/* ── Hidden full-scale paper: runs spacers, NEVER visible ── */}
            <div style={{ position: "fixed", top: 0, left: -(A4_W + 40), width: A4_W, pointerEvents: "none", zIndex: -1 }}>
                <div ref={hiddenRef} style={paperStyle}>
                    <Template data={displayData} />
                </div>
            </div>

            {/* ── Hidden PDF capture target (used by downloadPDF) ── */}
            <div style={{ position: "fixed", top: 0, left: -(A4_W + 40 + A4_W + 40), width: A4_W, pointerEvents: "none", zIndex: -1 }}>
                <div
                    ref={pdfRef}
                    id="resume-pdf-target"
                    className="paper-page"
                    style={paperStyle}
                />
            </div>

            {/* ── Visible A4 pages: each shows a slice of the spacered HTML ── */}
            {Array.from({ length: pageCount }).map((_, pageIdx) => (
                <div key={pageIdx} style={{ position: "relative", flexShrink: 0 }}>
                    {/* A4 clip box — exactly one page, position:relative for overlays */}
                    <div
                        className="preview-page-container"
                        style={{
                            width: scaledW,
                            height: A4_H * scale,
                            overflow: "hidden",
                            position: "relative",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.14)",
                            flexShrink: 0,
                        }}
                    >
                        {/* Full paper content shifted to show this page's slice */}
                        <div
                            dangerouslySetInnerHTML={{ __html: paperHTML }}
                            style={{
                                ...paperStyle,
                                transformOrigin: "top left",
                                transform: `scale(${scale}) translateY(${-pageIdx * A4_H}px)`,
                            }}
                        />

                        {/* ── White top margin overlay (pages 2+ only) ──
                            Page 1 gets its top margin from paperStyle.paddingTop.
                            Pages 2+ need a guaranteed visual top margin regardless
                            of spacer precision. The spacer should have pushed
                            content below this zone — this just makes it bulletproof. */}
                        {pageIdx > 0 && (
                            <div style={{
                                position: "absolute", top: 0, left: 0, right: 0,
                                height: topPx * scale,
                                background: "#ffffff",
                                zIndex: 10,
                                pointerEvents: "none",
                            }} />
                        )}

                        {/* ── White bottom margin overlay (every page) ──
                            Covers the bottom botMm of every page with solid white,
                            matching the margin setting from the Design panel.
                            The spacer pushes content above this zone; the overlay
                            is a safety net for a clean visual margin. */}
                        <div style={{
                            position: "absolute", bottom: 0, left: 0, right: 0,
                            height: botPx * scale,
                            background: "#ffffff",
                            zIndex: 10,
                            pointerEvents: "none",
                        }} />
                    </div>

                    {/* Page label */}
                    <div className="no-print" style={{
                        position: "absolute", top: 6, left: scaledW + 8,
                        fontSize: 10, color: "#94a3b8",
                        fontWeight: 700, letterSpacing: "0.06em",
                        textTransform: "uppercase", whiteSpace: "nowrap",
                    }}>
                        Page {pageIdx + 1}
                    </div>
                </div>
            ))}
        </div>
    );
}