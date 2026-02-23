import React from 'react';

export default function CreativeTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, socialLinks } = data;
    const { themeColor = "#4f46e5" } = data;
    const fs = data.fontSize || "medium";

    const sz = {
        name: fs === "small" ? "18px" : fs === "large" ? "26px" : "22px",
        title: fs === "small" ? "10px" : fs === "large" ? "13px" : "11.5px",
        section: fs === "small" ? "9px" : fs === "large" ? "11px" : "10px",
        body: fs === "small" ? "9.5px" : fs === "large" ? "12px" : "10.5px",
    };

    const getAlign = (key: string) => {
        return data.layout?.sectionAlignment?.[key] || data.layout?.textAlign || "left";
    };

    const getFlexAlign = (key: string) => {
        const align = getAlign(key);
        return align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start";
    };

    return (
        <div style={{ display: "flex", width: "100%", minHeight: "100%", fontFamily: "inherit", color: "#1e293b", lineHeight: data.layout?.lineHeight || 1.6 }}>

            {/* ── Sidebar ── */}
            <div style={{
                width: "32%",
                background: themeColor,
                padding: "28px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                flexShrink: 0,
            }}>
                {/* Avatar / Initials */}
                <div style={{ textAlign: getAlign("personalInfo") as any }}>
                    <div style={{
                        width: 60, height: 60, borderRadius: "50%",
                        background: "rgba(255,255,255,0.15)",
                        display: "flex", alignItems: "center", justifyContent: getAlign("personalInfo") === "right" ? "flex-end" : getAlign("personalInfo") === "center" ? "center" : "flex-start",
                        margin: getAlign("personalInfo") === "center" ? "0 auto 10px" : getAlign("personalInfo") === "right" ? "0 0 10px auto" : "0 0 10px 0",
                        fontSize: 22, fontWeight: 800, color: "white",
                        border: "2px solid rgba(255,255,255,0.25)",
                    }}>
                        {personalInfo?.fullName?.substring(0, 2).toUpperCase() || "CV"}
                    </div>
                    <div style={{ fontSize: sz.name, fontWeight: 800, color: "white", lineHeight: 1.2, wordBreak: "break-word" }}>
                        {personalInfo?.fullName}
                    </div>
                    {personalInfo?.title && (
                        <div style={{ fontSize: sz.title, color: "rgba(255,255,255,0.7)", marginTop: 4, letterSpacing: "0.06em", fontWeight: 600 }}>
                            {personalInfo.title}
                        </div>
                    )}
                </div>

                {/* Contact */}
                <div>
                    <div style={{ fontSize: sz.section, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 4 }}>
                        Contact
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        {[personalInfo?.email, personalInfo?.phone, personalInfo?.address].filter(Boolean).map((v, i) => (
                            <div key={i} style={{ fontSize: sz.body, color: "rgba(255,255,255,0.8)", wordBreak: "break-all", lineHeight: 1.4 }}>{v}</div>
                        ))}
                    </div>
                </div>

                {socialLinks?.length > 0 && (
                    <div>
                        <div style={{ fontSize: sz.section, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 4 }}>
                            Links
                        </div>
                        {socialLinks.map((link: any, i: number) => (
                            <div key={i} style={{ fontSize: sz.body, color: "rgba(255,255,255,0.75)", marginBottom: 4 }}>{link.platform}</div>
                        ))}
                    </div>
                )}

                {skills?.length > 0 && (
                    <div>
                        <div style={{ fontSize: sz.section, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 4 }}>
                            Skills
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                            {skills.map((skill: any, i: number) => (
                                <span key={i} style={{ fontSize: sz.body, background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)", padding: "2px 7px", borderRadius: 4, lineHeight: 1.6 }}>
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {data.languages?.length > 0 && (
                    <div>
                        <div style={{ fontSize: sz.section, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 4 }}>
                            Languages
                        </div>
                        {data.languages.map((lang: any, i: number) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: sz.body, color: "rgba(255,255,255,0.8)", marginBottom: 4 }}>
                                <span>{lang.name}</span>
                                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: sz.section }}>{lang.level}</span>
                            </div>
                        ))}
                    </div>
                )}

                {data.certifications?.length > 0 && (
                    <div>
                        <div style={{ fontSize: sz.section, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 4 }}>
                            Certifications
                        </div>
                        {data.certifications.map((cert: any, i: number) => (
                            <div key={i} style={{ marginBottom: 6 }}>
                                <div style={{ fontSize: sz.body, fontWeight: 700, color: "white" }}>{cert.name}</div>
                                <div style={{ fontSize: sz.section, color: "rgba(255,255,255,0.5)" }}>{cert.issuer}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Main Content ── */}
            <div style={{ flex: 1, padding: "28px 20px", display: "flex", flexDirection: "column", gap: 18 }}>

                {personalInfo?.summary && (
                    <section>
                        <p style={{ fontSize: sz.body, color: "#475569", lineHeight: 1.6, margin: 0, textAlign: getAlign("summary") as any }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {experience?.length > 0 && (
                    <section style={{ textAlign: getAlign("experience") as any }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexDirection: getAlign("experience") === "right" ? "row-reverse" : "row" }}>
                            <span style={{ width: 24, height: 2, background: themeColor, display: "inline-block", flexShrink: 0 }} />
                            <h2 style={{ margin: 0, fontSize: sz.section, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: themeColor }}>Experience</h2>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            {experience.map((exp: any, i: number) => (
                                <div key={i} style={{ paddingLeft: 12, borderLeft: `2px solid #e2e8f0` }}>
                                    <div style={{ fontWeight: 700, fontSize: sz.body, color: "#0f172a" }}>{exp.jobTitle}</div>
                                    <div style={{ fontSize: sz.section, color: "#64748b", marginBottom: 5 }}>
                                        {exp.companyName} · {exp.startDate}–{exp.isCurrent ? "Present" : exp.endDate}
                                    </div>
                                    <ul style={{ margin: 0, paddingLeft: 14, display: "flex", flexDirection: "column", gap: 2, alignItems: getFlexAlign("experience") }}>
                                        {exp.description?.split("\n").map((line: string, j: number) => {
                                            const clean = line.replace(/^[\s•\-\*]+\s*/, "");
                                            return clean ? <li key={j} style={{ fontSize: sz.body, color: "#475569", lineHeight: 1.5, textAlign: getAlign("experience") as any }}>{clean}</li> : null;
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.projects?.length > 0 && (
                    <section style={{ textAlign: getAlign("projects") as any }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexDirection: getAlign("projects") === "right" ? "row-reverse" : "row" }}>
                            <span style={{ width: 24, height: 2, background: themeColor, display: "inline-block", flexShrink: 0 }} />
                            <h2 style={{ margin: 0, fontSize: sz.section, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: themeColor }}>Projects</h2>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {data.projects.map((p: any, i: number) => (
                                <div key={i}>
                                    <div style={{ fontWeight: 700, fontSize: sz.body, color: "#0f172a" }}>{p.title}</div>
                                    {p.description && <div style={{ fontSize: sz.body, color: "#475569", lineHeight: 1.5, marginTop: 2 }}>{p.description}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {education?.length > 0 && (
                    <section style={{ textAlign: getAlign("education") as any }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexDirection: getAlign("education") === "right" ? "row-reverse" : "row" }}>
                            <span style={{ width: 24, height: 2, background: themeColor, display: "inline-block", flexShrink: 0 }} />
                            <h2 style={{ margin: 0, fontSize: sz.section, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: themeColor }}>Education</h2>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {education.map((edu: any, i: number) => (
                                <div key={i} style={{ background: "#f8fafc", padding: "8px 10px", borderRadius: 6 }}>
                                    <div style={{ fontWeight: 700, fontSize: sz.body, color: "#0f172a" }}>{edu.schoolName}</div>
                                    <div style={{ fontSize: sz.body, color: "#64748b" }}>{edu.degree}</div>
                                    <div style={{ fontSize: sz.section, color: "#94a3b8", marginTop: 2 }}>{edu.startDate}–{edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
