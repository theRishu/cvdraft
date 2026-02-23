import React from "react";

export default function AtsTemplate({ data }: { data: any }) {
    const {
        personalInfo, experience, education, skills,
        languages, certifications, projects, socialLinks, customSection,
    } = data;

    const accent = data.themeColor || "#1e293b";
    const fs = data.fontSize || "medium";
    const sp = data.layout?.sectionSpacing || "normal";

    const sz = {
        name: fs === "small" ? "20px" : fs === "large" ? "28px" : "24px",
        title: fs === "small" ? "13.3px" : fs === "large" ? "16px" : "14.7px",
        section: fs === "small" ? "12px" : fs === "large" ? "14.7px" : "13.3px",
        body: fs === "small" ? "12px" : fs === "large" ? "14.7px" : "13.3px",
        sub: fs === "small" ? "10.5px" : fs === "large" ? "13.3px" : "12px",
    };

    const spacing = {
        section: sp === "compact" ? 4 : sp === "large" || sp === "spacious" ? 14 : 8,
        item: sp === "compact" ? 4 : sp === "large" || sp === "spacious" ? 12 : 8,
        line: sp === "compact" ? 1 : sp === "large" || sp === "spacious" ? 4 : 2,
    };

    const getAlign = (key: string) => {
        return data.layout?.sectionAlignment?.[key] || data.layout?.textAlign || "left";
    };

    const sectionTitle = (label: string, sectionId?: string) => {
        const align = sectionId ? getAlign(sectionId) : (data.layout?.textAlign || "left");
        return (
            <div style={{ marginBottom: 5, textAlign: align as any }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexDirection: align === "right" ? "row-reverse" : "row" }}>
                    {align === "center" && <div style={{ flex: 1, height: 1.5, background: accent, opacity: 0.3 }} />}
                    <span style={{
                        fontSize: sz.section,
                        fontWeight: 800,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase" as const,
                        color: accent,
                    }}>
                        {label}
                    </span>
                    <div style={{ flex: 1, height: 1.5, background: accent, opacity: 0.3 }} />
                </div>
            </div>
        );
    };

    const sep = (visible: boolean) =>
        visible ? <div style={{ height: 0.5, background: "#e2e8f0", margin: "3px 0" }} /> : null;

    return (
        <div style={{
            fontFamily: "inherit",
            color: "#1a202c",
            lineHeight: data.layout?.lineHeight || 1.35,
            fontSize: sz.body,
            background: "#fff",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
        }}>

            {/* ── NAME / HEADER ── */}
            <div style={{
                marginBottom: spacing.section,

                display: "flex",
                flexDirection: "column",
                alignItems: (getAlign("personalInfo") === "center") ? "center" : (getAlign("personalInfo") === "right") ? "flex-end" : "flex-start",
                textAlign: getAlign("personalInfo") as any
            }}>
                <h1 style={{
                    fontSize: sz.name,
                    fontWeight: 900,
                    letterSpacing: "-0.01em",
                    color: "#0f172a",
                    margin: 0,
                    lineHeight: 1.1,
                }}>
                    {personalInfo?.fullName || "Your Name"}
                </h1>

                {personalInfo?.title && (
                    <div style={{
                        fontSize: sz.title,
                        color: accent,
                        fontWeight: 700,
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        marginTop: 4,
                    }}>
                        {personalInfo.title}
                    </div>
                )}

                {/* Contact row */}
                <div style={{
                    display: "flex",
                    flexWrap: "wrap" as const,
                    gap: "4px 16px",
                    fontWeight: 300,
                    fontSize: sz.body,
                    color: "#475569",
                    justifyContent: getAlign("personalInfo") === "center" ? "center" : getAlign("personalInfo") === "right" ? "flex-end" : "flex-start",
                }}>
                    {[
                        personalInfo?.email,
                        personalInfo?.phone,
                        personalInfo?.address,
                        ...(socialLinks?.map((l: any) => l.url?.replace(/^https?:\/\//, "")) || []),
                    ].filter(Boolean).map((item: string, i: number) => (
                        <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            {i > 0 && <span style={{ color: "#cbd5e1", marginRight: 0 }}>·</span>}
                            {item}
                        </span>
                    ))}
                </div>

                <div style={{ height: 2, background: accent, marginTop: 12, borderRadius: 2 }} />
            </div>

            {/* ── SUMMARY ── */}
            {personalInfo?.summary && (
                <div style={{ marginBottom: spacing.section }} className="break-inside-avoid">
                    {sectionTitle("Summary", "summary")}
                    <p style={{ fontSize: sz.body, color: "#334155", lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap" }}>
                        {personalInfo.summary}
                    </p>
                </div>
            )}

            {/* ── SKILLS ── */}
            {skills?.length > 0 && (
                <div style={{ marginBottom: spacing.section }} className="break-inside-avoid">
                    {sectionTitle("Skills", "skills")}
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px 0", justifyContent: getAlign("skills") === "center" ? "center" : getAlign("skills") === "right" ? "flex-end" : "flex-start" }}>
                        {skills.map((s: any, i: number) => {
                            const parts = (typeof s === "string" ? s : s.name).split(":");
                            return (
                                <div key={i} style={{ fontSize: sz.body, color: "#1e293b", display: "flex", alignItems: "center", gap: 6 }}>
                                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: accent, flexShrink: 0 }} />
                                    {parts.length > 1
                                        ? <><strong>{parts[0]}:</strong>{parts.slice(1).join(":")}</>
                                        : (typeof s === "string" ? s : s.name)}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── EXPERIENCE ── */}
            {experience?.length > 0 && (
                <div style={{ marginBottom: spacing.section }}>
                    {sectionTitle("Experience", "experience")}
                    <div style={{ display: "flex", flexDirection: "column", gap: spacing.item }}>
                        {experience.map((exp: any, i: number) => (
                            <div key={i} className="break-inside-avoid">
                                <div style={{ display: "flex", justifyContent: getAlign("experience") === "center" ? "center" : getAlign("experience") === "right" ? "flex-end" : "space-between", alignItems: "baseline", gap: 8, textAlign: getAlign("experience") as any }}>
                                    <div>
                                        <strong style={{ fontSize: sz.sub, color: "#0f172a" }}>{exp.jobTitle}</strong>
                                        {exp.companyName && (
                                            <span style={{ fontSize: sz.body, color: "#475569", marginLeft: 6 }}>
                                                @ {exp.companyName}
                                            </span>
                                        )}
                                    </div>
                                    <span style={{ fontSize: sz.body, color: "#94a3b8", whiteSpace: "nowrap" as const, flexShrink: 0 }}>
                                        {exp.startDate}{exp.startDate || exp.endDate ? " – " : ""}{exp.isCurrent ? "Present" : exp.endDate}
                                    </span>
                                </div>
                                {exp.address && (
                                    <div style={{ fontSize: sz.body, color: "#94a3b8", fontStyle: "italic", marginBottom: 2 }}>
                                        {exp.address}
                                    </div>
                                )}
                                <ul style={{ margin: `${spacing.line}px 0 0 0`, paddingLeft: 16, display: "flex", flexDirection: "column", gap: spacing.line }}>
                                    {exp.description?.split("\n").map((line: string, j: number) => {
                                        const clean = line.replace(/^[\s•\-\*]+\s*/, "");
                                        return clean ? (
                                            <li key={j} style={{ fontSize: sz.body, color: "#334155", lineHeight: 1.5 }}>
                                                {clean}
                                            </li>
                                        ) : null;
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── PROJECTS ── */}
            {projects?.length > 0 && (
                <div style={{ marginBottom: spacing.section }}>
                    {sectionTitle("Projects", "projects")}
                    <div style={{ display: "flex", flexDirection: "column", gap: spacing.item }}>
                        {projects.map((p: any, i: number) => (
                            <div key={i} className="break-inside-avoid">
                                <div style={{ display: "flex", justifyContent: getAlign("projects") === "center" ? "center" : getAlign("projects") === "right" ? "flex-end" : "space-between", alignItems: "baseline", gap: 8, textAlign: getAlign("projects") as any }}>
                                    <strong style={{ fontSize: sz.sub, color: "#0f172a" }}>{p.title}</strong>
                                    {(p.startDate || p.endDate) && (
                                        <span style={{ fontSize: sz.body, color: "#94a3b8", whiteSpace: "nowrap" as const }}>
                                            {p.startDate}{p.startDate || p.endDate ? " – " : ""}{p.endDate}
                                        </span>
                                    )}
                                </div>
                                {p.link && (
                                    <div style={{ fontSize: sz.body, color: "#3b82f6", marginBottom: 2 }}>
                                        {p.link.replace(/^https?:\/\//, "")}
                                    </div>
                                )}
                                {p.description && (
                                    <p style={{ margin: "2px 0 0", fontSize: sz.body, color: "#334155", lineHeight: 1.5 }}>
                                        {p.description}
                                    </p>
                                )}
                                {p.technologies?.length > 0 && (
                                    <div style={{ fontSize: sz.body, color: "#64748b", marginTop: 2 }}>
                                        <strong>Stack:</strong> {p.technologies.join(", ")}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── EDUCATION ── */}
            {education?.length > 0 && (
                <div style={{ marginBottom: spacing.section }}>
                    {sectionTitle("Education", "education")}
                    <div style={{ display: "flex", flexDirection: "column", gap: spacing.item }}>
                        {education.map((e: any, i: number) => (
                            <div key={i} className="break-inside-avoid" style={{ display: "flex", justifyContent: getAlign("education") === "center" ? "center" : getAlign("education") === "right" ? "flex-end" : "space-between", alignItems: "baseline", gap: 8, textAlign: getAlign("education") as any }}>
                                <div>
                                    <strong style={{ fontSize: sz.sub, color: "#0f172a" }}>{e.degree}</strong>
                                    {e.fieldOfStudy && <span style={{ fontSize: sz.body, color: "#475569" }}> — {e.fieldOfStudy}</span>}
                                    {e.schoolName && <span style={{ fontSize: sz.body, color: "#64748b" }}>, <em>{e.schoolName}</em></span>}
                                </div>
                                <span style={{ fontSize: sz.body, color: "#94a3b8", whiteSpace: "nowrap" as const }}>
                                    {e.startDate}{e.startDate || e.endDate ? " – " : ""}{e.endDate}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── CERTIFICATIONS ── */}
            {certifications?.length > 0 && (
                <div style={{ marginBottom: spacing.section }} className="break-inside-avoid">
                    {sectionTitle("Certifications", "certifications")}
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {certifications.map((c: any, i: number) => (
                            <div key={i} style={{ display: "flex", justifyContent: getAlign("certifications") === "center" ? "center" : getAlign("certifications") === "right" ? "flex-end" : "space-between", alignItems: "baseline", textAlign: getAlign("certifications") as any }}>
                                <div>
                                    <strong style={{ fontSize: sz.sub, color: "#0f172a" }}>{c.name}</strong>
                                    {c.issuer && <span style={{ fontSize: sz.body, color: "#64748b" }}> · {c.issuer}</span>}
                                </div>
                                {c.date && <span style={{ fontSize: sz.body, color: "#94a3b8" }}>{c.date}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── LANGUAGES ── */}
            {languages?.length > 0 && (
                <div style={{ marginBottom: spacing.section }} className="break-inside-avoid">
                    {sectionTitle("Languages", "languages")}
                    <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "4px 20px", justifyContent: getAlign("languages") === "center" ? "center" : getAlign("languages") === "right" ? "flex-end" : "flex-start", textAlign: getAlign("languages") as any }}>
                        {languages.map((l: any, i: number) => (
                            <span key={i} style={{ fontSize: sz.body, color: "#334155" }}>
                                <strong>{l.name}</strong>{l.level && <span style={{ color: "#94a3b8" }}> ({l.level})</span>}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* ── CUSTOM SECTION ── */}
            {customSection?.items?.length > 0 && (
                <div style={{ marginBottom: 8 }} className="break-inside-avoid">
                    {sectionTitle(customSection.title || "Additional", "customSection")}
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, textAlign: getAlign("customSection") as any }}>
                        {customSection.items.map((item: any, i: number) => (
                            <div key={i}>
                                {item.title && <strong style={{ fontSize: sz.sub, color: "#0f172a" }}>{item.title}</strong>}
                                {item.description && <p style={{ margin: "2px 0 0", fontSize: sz.body, color: "#334155" }}>{item.description}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
