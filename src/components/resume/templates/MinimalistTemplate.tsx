import React from 'react';

export default function MinimalistTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, socialLinks } = data;
    const { themeColor = "#0f172a" } = data;
    const fs = data.fontSize || "medium";

    const sz = {
        name: fs === "small" ? "18px" : fs === "large" ? "26px" : "22px",
        section: fs === "small" ? "8.5px" : fs === "large" ? "10.5px" : "9.5px",
        body: fs === "small" ? "9.5px" : fs === "large" ? "12px" : "10.5px",
        sub: fs === "small" ? "10px" : fs === "large" ? "12px" : "11px",
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
        return align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start";
    };

    const Divider = () => (
        <div style={{ borderBottom: "1px solid #f1f5f9", margin: "14px 0" }} />
    );

    const SectionTitle = ({ label, sectionId }: { label: string, sectionId?: string }) => (
        <div style={{
            fontSize: sz.section, fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase" as const, color: "#94a3b8",
            textAlign: (sectionId ? getAlign(sectionId) : "center") as any, marginBottom: 10,
            paddingBottom: 6, borderBottom: "1px solid #f1f5f9"
        }}>
            {label}
        </div>
    );

    return (
        <div style={{ fontFamily: "inherit", color: "#0f172a", background: "white", width: "100%" }}>

            {/* Header — dynamic alignment */}
            <div style={{ textAlign: getAlign("personalInfo") as any, marginBottom: 16 }}>
                <h1 style={{ margin: 0, fontSize: sz.name, fontWeight: 300, letterSpacing: "0.08em", color: themeColor }}>
                    {personalInfo?.fullName}
                </h1>
                {personalInfo?.title && (
                    <div style={{ fontSize: sz.section, color: "#94a3b8", letterSpacing: "0.1em", marginTop: 4, textTransform: "uppercase" as const }}>
                        {personalInfo.title}
                    </div>
                )}
                <div style={{ display: "flex", justifyContent: getJustify("personalInfo"), gap: 16, flexWrap: "wrap" as const, marginTop: 6 }}>
                    {[personalInfo?.email, personalInfo?.phone, personalInfo?.address,
                    ...(socialLinks?.map((l: any) => l.platform) || [])
                    ].filter(Boolean).map((v: string, i: number) => (
                        <span key={i} style={{ fontSize: sz.section, color: "#94a3b8", letterSpacing: "0.05em" }}>
                            {i > 0 && <span style={{ marginRight: 16, color: "#e2e8f0" }}>·</span>}{v}
                        </span>
                    ))}
                </div>
            </div>

            <Divider />

            {/* Summary */}
            {personalInfo?.summary && (
                <>
                    <p style={{ margin: 0, fontSize: sz.body, color: "#64748b", lineHeight: 1.65, textAlign: getAlign("summary") as any, fontWeight: 300 }}>
                        {personalInfo.summary}
                    </p>
                    <Divider />
                </>
            )}

            {/* Experience */}
            {experience?.length > 0 && (
                <section style={{ marginBottom: 6 }}>
                    <SectionTitle label="Experience" sectionId="experience" />
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {experience.map((exp: any, i: number) => (
                            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: 12 }}>
                                <div style={{ fontSize: sz.section, color: "#94a3b8", textAlign: "right", paddingTop: 1 }}>
                                    {exp.startDate} –<br />{exp.isCurrent ? "Present" : exp.endDate}
                                </div>
                                <div>
                                    <div style={{ fontSize: sz.sub, fontWeight: 500, color: "#0f172a" }}>
                                        {exp.jobTitle} <span style={{ color: "#94a3b8", fontWeight: 400 }}>— {exp.companyName}</span>
                                    </div>
                                    <div style={{ fontSize: sz.body, color: "#64748b", fontWeight: 300, lineHeight: 1.55, marginTop: 2, textAlign: getAlign("experience") as any }}>
                                        {exp.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Divider />
                </section>
            )}

            {/* Projects */}
            {data.projects?.length > 0 && (
                <section style={{ marginBottom: 6 }}>
                    <SectionTitle label="Projects" sectionId="projects" />
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {data.projects.map((p: any, i: number) => (
                            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: 12 }}>
                                <div style={{ fontSize: sz.section, color: "#94a3b8", textAlign: "right" }}>{p.startDate}</div>
                                <div>
                                    <div style={{ fontSize: sz.sub, fontWeight: 500, color: "#0f172a" }}>{p.title}</div>
                                    {p.description && <div style={{ fontSize: sz.body, color: "#64748b", fontWeight: 300, lineHeight: 1.55, marginTop: 2, textAlign: getAlign("projects") as any }}>{p.description}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Divider />
                </section>
            )}

            {/* Education */}
            {education?.length > 0 && (
                <section style={{ marginBottom: 6 }}>
                    <SectionTitle label="Education" sectionId="education" />
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {education.map((edu: any, i: number) => (
                            <div key={i} style={{ textAlign: getAlign("education") as any }}>
                                <div style={{ fontSize: sz.sub, fontWeight: 500, color: "#0f172a" }}>{edu.schoolName}</div>
                                <div style={{ fontSize: sz.body, color: "#64748b", fontWeight: 300 }}>{edu.degree}</div>
                                <div style={{ fontSize: sz.section, color: "#94a3b8", marginTop: 2 }}>{edu.startDate} – {edu.endDate}</div>
                            </div>
                        ))}
                    </div>
                    <Divider />
                </section>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
                <section style={{ marginBottom: 6 }}>
                    <SectionTitle label="Skills" sectionId="skills" />
                    <div style={{ display: "flex", flexWrap: "wrap" as const, justifyContent: getJustify("skills"), gap: "6px 20px" }}>
                        {skills.map((skill: any, i: number) => (
                            <span key={i} style={{ fontSize: sz.body, color: "#64748b", fontWeight: 300 }}>{skill.name}</span>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages + Certifications */}
            {(data.languages?.length > 0 || data.certifications?.length > 0) && (
                <>
                    <Divider />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                        {data.languages?.length > 0 && (
                            <section>
                                <SectionTitle label="Languages" sectionId="languages" />
                                <div style={{ display: "flex", flexDirection: "column", gap: 4, textAlign: getAlign("languages") as any }}>
                                    {data.languages.map((lang: any, i: number) => (
                                        <div key={i} style={{ fontSize: sz.body, color: "#64748b", fontWeight: 300 }}>
                                            {lang.name} <span style={{ color: "#cbd5e1" }}>·</span> {lang.level}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {data.certifications?.length > 0 && (
                            <section>
                                <SectionTitle label="Certifications" sectionId="certifications" />
                                <div style={{ display: "flex", flexDirection: "column", gap: 6, textAlign: getAlign("certifications") as any }}>
                                    {data.certifications.map((cert: any, i: number) => (
                                        <div key={i}>
                                            <div style={{ fontSize: sz.body, fontWeight: 500, color: "#0f172a" }}>{cert.name}</div>
                                            <div style={{ fontSize: sz.section, color: "#94a3b8" }}>{cert.issuer}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
