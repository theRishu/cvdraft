import React from 'react';

export default function ElegantTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, socialLinks } = data;
    const { themeColor = "#1e293b" } = data;
    const fs = data.fontSize || "medium";

    const sz = {
        name: fs === "small" ? "20px" : fs === "large" ? "28px" : "24px",
        title: fs === "small" ? "10px" : fs === "large" ? "13px" : "11.5px",
        section: fs === "small" ? "9px" : fs === "large" ? "11px" : "10px",
        body: fs === "small" ? "10px" : fs === "large" ? "12px" : "10.5px",
        sub: fs === "small" ? "10px" : fs === "large" ? "12.5px" : "11px",
    };

    const getAlign = (key: string) => {
        return data.layout?.sectionAlignment?.[key] || data.layout?.textAlign || "left";
    };

    const getFlexAlign = (key: string) => {
        const align = getAlign(key);
        return align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start";
    };

    const getJustify = (key: string) => {
        const align = getAlign(key);
        return align === "center" ? "center" : align === "right" ? "flex-end" : "space-between";
    };

    return (
        <div style={{ fontFamily: "inherit", color: "#1e293b", background: "#fffbf7", width: "100%", minHeight: "100%" }}>

            {/* Header */}
            <div style={{
                display: "flex",
                flexDirection: (getAlign("personalInfo") === "center" || getAlign("personalInfo") === "right") ? "column" : "row",
                justifyContent: "space-between",
                alignItems: (getAlign("personalInfo") === "center" || getAlign("personalInfo") === "right") ? (getAlign("personalInfo") === "center" ? "center" : "flex-end") : "flex-end",
                borderBottom: `3px solid ${themeColor}`,
                paddingBottom: 12,
                marginBottom: 18,
                textAlign: getAlign("personalInfo") as any
            }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: sz.name, fontWeight: 400, letterSpacing: "-0.01em", color: themeColor, fontFamily: "'Playfair Display', Georgia, serif" }}>
                        {personalInfo?.fullName}
                    </h1>
                    {personalInfo?.title && (
                        <div style={{ fontSize: sz.title, color: "#64748b", fontStyle: "italic", marginTop: 4 }}>
                            {personalInfo.title}
                        </div>
                    )}
                </div>
                <div style={{ textAlign: getAlign("personalInfo") as any, fontSize: sz.body, color: "#64748b", lineHeight: 1.7, marginTop: getAlign("personalInfo") === "center" || getAlign("personalInfo") === "right" ? 8 : 0 }}>
                    {personalInfo?.email && <div>{personalInfo.email}</div>}
                    {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo?.address && <div>{personalInfo.address}</div>}
                    {socialLinks?.map((l: any, i: number) => <div key={i}>{l.platform}</div>)}
                </div>
            </div>

            {/* Two-col body */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>

                {/* Main column */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                    {personalInfo?.summary && (
                        <section>
                            <div style={{ fontSize: sz.section, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#94a3b8", marginBottom: 6, textAlign: getAlign("summary") as any }}>Profile</div>
                            <p style={{ margin: 0, fontSize: sz.body, color: "#475569", lineHeight: 1.65, textAlign: getAlign("summary") as any }}>{personalInfo.summary}</p>
                        </section>
                    )}

                    {experience?.length > 0 && (
                        <section>
                            <div style={{ fontSize: sz.section, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#94a3b8", marginBottom: 10, textAlign: getAlign("experience") as any }}>Experience</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                {experience.map((exp: any, i: number) => (
                                    <div key={i}>
                                        <div style={{ display: "flex", justifyContent: getJustify("experience"), alignItems: "baseline", textAlign: getAlign("experience") as any }}>
                                            <span style={{ fontSize: sz.sub, fontWeight: 600, color: "#0f172a", fontFamily: "'Playfair Display', Georgia, serif" }}>{exp.companyName}</span>
                                            <span style={{ fontSize: sz.section, color: "#94a3b8", fontStyle: "italic" }}>{exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}</span>
                                        </div>
                                        <div style={{ fontSize: sz.body, color: "#64748b", marginBottom: 5, textAlign: getAlign("experience") as any }}>{exp.jobTitle}</div>
                                        <ul style={{ margin: 0, paddingLeft: 14, display: "flex", flexDirection: "column", gap: 2, alignItems: getFlexAlign("experience") }}>
                                            {exp.description?.split("\n").map((line: string, j: number) => {
                                                const clean = line.replace(/^[\s•\-\*]+\s*/, "");
                                                return clean ? <li key={j} style={{ fontSize: sz.body, color: "#475569", lineHeight: 1.55, textAlign: getAlign("experience") as any }}>{clean}</li> : null;
                                            })}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.projects?.length > 0 && (
                        <section>
                            <div style={{ fontSize: sz.section, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#94a3b8", marginBottom: 10, textAlign: getAlign("projects") as any }}>Projects</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {data.projects.map((p: any, i: number) => (
                                    <div key={i} style={{ textAlign: getAlign("projects") as any }}>
                                        <div style={{ fontSize: sz.sub, fontWeight: 600, color: "#0f172a" }}>{p.title}</div>
                                        {p.description && <div style={{ fontSize: sz.body, color: "#475569", lineHeight: 1.55, marginTop: 2 }}>{p.description}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar column */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                    {education?.length > 0 && (
                        <section>
                            <div style={{ fontSize: sz.section, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#94a3b8", marginBottom: 8 }}>Education</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {education.map((edu: any, i: number) => (
                                    <div key={i}>
                                        <div style={{ fontSize: sz.sub, fontWeight: 600, color: "#0f172a", fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.3 }}>{edu.schoolName}</div>
                                        <div style={{ fontSize: sz.body, color: "#64748b", fontStyle: "italic" }}>{edu.degree}</div>
                                        <div style={{ fontSize: sz.section, color: "#94a3b8", marginTop: 2 }}>{edu.startDate} – {edu.endDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills?.length > 0 && (
                        <section>
                            <div style={{ fontSize: sz.section, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#94a3b8", marginBottom: 8, textAlign: getAlign("skills") as any }}>Expertise</div>
                            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4, alignItems: getFlexAlign("skills") }}>
                                {skills.map((skill: any, i: number) => (
                                    <li key={i} style={{ display: "flex", justifyContent: getJustify("skills"), fontSize: sz.body, color: "#475569", borderBottom: "1px solid #f1f5f9", paddingBottom: 3, width: "100%", textAlign: getAlign("skills") as any }}>
                                        {skill.name}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {data.languages?.length > 0 && (
                        <section>
                            <div style={{ fontSize: sz.section, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#94a3b8", marginBottom: 8 }}>Languages</div>
                            {data.languages.map((lang: any, i: number) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: sz.body, color: "#475569", marginBottom: 4 }}>
                                    <span style={{ fontWeight: 600 }}>{lang.name}</span>
                                    <span style={{ color: "#94a3b8", fontStyle: "italic", fontSize: sz.section }}>{lang.level}</span>
                                </div>
                            ))}
                        </section>
                    )}

                    {data.certifications?.length > 0 && (
                        <section>
                            <div style={{ fontSize: sz.section, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#94a3b8", marginBottom: 8 }}>Certifications</div>
                            {data.certifications.map((cert: any, i: number) => (
                                <div key={i} style={{ marginBottom: 6 }}>
                                    <div style={{ fontSize: sz.body, fontWeight: 600, color: "#0f172a" }}>{cert.name}</div>
                                    <div style={{ fontSize: sz.section, color: "#94a3b8" }}>{cert.issuer} {cert.date && `· ${cert.date}`}</div>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
