import React from 'react';

export default function ModernTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, socialLinks } = data;

    const { themeColor = "#0f172a" } = data; // Default slate-900

    const fs = data.fontSize || "medium";
    const fsize = {
        name: fs === "small" ? "text-[20px]" : fs === "large" ? "text-[28px]" : "text-[24px]",
        title: fs === "small" ? "text-[13.3px]" : fs === "large" ? "text-[16px]" : "text-[14.7px]",
        contact: fs === "small" ? "text-[12px]" : fs === "large" ? "text-[14.7px]" : "text-[13.3px]",
        section: fs === "small" ? "text-[12px]" : fs === "large" ? "text-[14.7px]" : "text-[13.3px]",
        body: fs === "small" ? "text-[12px]" : fs === "large" ? "text-[14.7px]" : "text-[13.3px]",
        sub: fs === "small" ? "text-[10.5px]" : fs === "large" ? "text-[13.3px]" : "text-[12px]",
    };

    const sp = data.layout?.sectionSpacing || "normal";
    const spacing = {
        sectionY: sp === "compact" ? "space-y-4" : sp === "large" || sp === "spacious" ? "space-y-8" : "space-y-6",
        itemY: sp === "compact" ? "space-y-3" : sp === "large" || sp === "spacious" ? "space-y-6" : "space-y-4",
        mb: sp === "compact" ? "mb-3" : sp === "large" || sp === "spacious" ? "mb-8" : "mb-5",
        pb: sp === "compact" ? "pb-3" : sp === "large" || sp === "spacious" ? "pb-8" : "pb-5",
        headMb: sp === "compact" ? "mb-2" : sp === "large" || sp === "spacious" ? "mb-5" : "mb-3",
        titleMb: sp === "compact" ? "mb-3" : sp === "large" || sp === "spacious" ? "mb-6" : "mb-4",
        colGap: sp === "compact" ? "gap-6" : sp === "large" || sp === "spacious" ? "gap-12" : "gap-9",
        sidebarPl: sp === "compact" ? "pl-5" : sp === "large" || sp === "spacious" ? "pl-10" : "pl-7",
    };

    const getAlign = (key: string) => {
        return data.layout?.sectionAlignment?.[key] || data.layout?.textAlign || "left";
    };

    const getJustify = (key: string) => {
        const align = getAlign(key);
        return align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start";
    };

    const getItemsAlign = (key: string) => {
        const align = getAlign(key);
        return align === "center" ? "items-center" : align === "right" ? "items-end" : "items-start";
    };

    return (
        <div className={`font-sans text-slate-900 bg-white min-h-screen`} style={{ lineHeight: data.layout?.lineHeight || 1.6 }}>
            {/* Header */}
            <header className={`border-b-2 ${spacing.pb} ${spacing.mb} print:shadow-none flex flex-col ${getAlign("personalInfo") === "center" ? "items-center text-center" : getAlign("personalInfo") === "right" ? "items-end text-right" : "items-start text-left"}`} style={{ borderColor: themeColor }}>
                <h1 className={`${fsize.name} font-bold mb-0.5 print:shadow-none`} style={{ color: themeColor }}>{personalInfo?.fullName}</h1>
                <p className={`${fsize.title} font-medium text-slate-600 mb-2 print:shadow-none`}>{personalInfo?.title}</p>

                <div className={`flex flex-wrap gap-4 ${fsize.contact} text-slate-500 print:shadow-none ${getJustify("personalInfo")}`}>
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo?.address && <span>• {personalInfo.address}</span>}
                </div>
            </header>

            <div className={`grid grid-cols-12 ${spacing.colGap} print:shadow-none`}>
                {/* Main Column */}
                <div className={`col-span-8 ${spacing.sectionY} print:shadow-none`}>
                    {personalInfo?.summary && (
                        <section className={`break-inside-avoid flex flex-col ${getItemsAlign("summary")}`}>
                            <h3 className={`${fsize.section} font-bold tracking-wider text-slate-400 ${spacing.headMb} print:shadow-none w-full ${getAlign("summary") === "center" ? "text-center" : getAlign("summary") === "right" ? "text-right" : ""}`}>Profile</h3>
                            <p className={`text-slate-700 leading-relaxed ${fsize.body} whitespace-pre-wrap print:shadow-none ${getAlign("summary") === "center" ? "text-center" : getAlign("summary") === "right" ? "text-right" : "text-left"}`}>{personalInfo.summary}</p>
                        </section>
                    )}

                    {experience?.length > 0 && (
                        <section className={`break-inside-avoid flex flex-col ${getItemsAlign("experience")}`}>
                            <h3 className={`${fsize.section} font-bold tracking-wider text-slate-400 ${spacing.titleMb} print:shadow-none`}>Experience</h3>
                            <div className={`${spacing.itemY} print:shadow-none`}>
                                {experience.map((exp: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1 print:shadow-none">
                                            <h4 className={`${fsize.body} font-bold text-slate-900 print:shadow-none`}>{exp.jobTitle}</h4>
                                            <span className={`${fsize.sub} text-slate-500 font-medium print:shadow-none`}>
                                                {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className={`${fsize.body} text-slate-600 font-medium mb-2 print:shadow-none`}>{exp.companyName}</div>
                                        <p className={`${fsize.body} text-slate-600 whitespace-pre-wrap leading-relaxed print:shadow-none ${getAlign("experience") === "center" ? "text-center" : getAlign("experience") === "right" ? "text-right" : "text-left"}`}>{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education?.length > 0 && (
                        <section className={`break-inside-avoid flex flex-col ${getItemsAlign("education")}`}>
                            <h3 className={`${fsize.section} font-bold tracking-wider text-slate-400 ${spacing.titleMb} print:shadow-none`}>Education</h3>
                            <div className={`${spacing.itemY} print:shadow-none`}>
                                {education.map((edu: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1 print:shadow-none">
                                            <h4 className={`${fsize.body} font-bold text-slate-900 print:shadow-none`}>{edu.schoolName}</h4>
                                            <span className={`${fsize.sub} text-slate-500 font-medium print:shadow-none`}>
                                                {edu.startDate} - {edu.endDate}
                                            </span>
                                        </div>
                                        <div className={`${fsize.body} text-slate-600 print:shadow-none`}>{edu.degree}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.projects?.length > 0 && (
                        <section className={`break-inside-avoid flex flex-col ${getItemsAlign("projects")}`}>
                            <h3 className={`${fsize.section} font-bold tracking-wider text-slate-400 ${spacing.titleMb} print:shadow-none`}>Projects</h3>
                            <div className={`${spacing.itemY} print:shadow-none`}>
                                {data.projects.map((project: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1 print:shadow-none">
                                            <h4 className={`${fsize.body} font-bold text-slate-900 print:shadow-none`}>{project.title}</h4>
                                            <span className={`${fsize.sub} text-slate-500 font-medium print:shadow-none`}>
                                                {project.startDate} - {project.endDate}
                                            </span>
                                        </div>
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className={`${fsize.sub} text-blue-600 hover:underline mb-1 block print:shadow-none`}>
                                                {project.link}
                                            </a>
                                        )}
                                        <p className={`${fsize.body} text-slate-600 whitespace-pre-wrap mb-2 leading-relaxed print:shadow-none ${getAlign("projects") === "center" ? "text-center" : getAlign("projects") === "right" ? "text-right" : "text-left"}`}>{project.description}</p>
                                        {project.technologies?.length > 0 && (
                                            <div className="flex flex-wrap gap-2 print:shadow-none">
                                                {project.technologies.map((tech: string, j: number) => (
                                                    <span key={j} className={`${fsize.sub} bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-100 print:shadow-none`}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.customSection?.items?.length > 0 && (
                        <section className={`break-inside-avoid flex flex-col ${getItemsAlign("customSection")}`}>
                            <h3 className={`${fsize.section} font-bold tracking-wider text-slate-400 ${spacing.titleMb} print:shadow-none`}>{data.customSection.title || "Custom Section"}</h3>
                            <div className={`${spacing.itemY} print:shadow-none`}>
                                {data.customSection.items.map((item: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1 print:shadow-none">
                                            <h4 className={`${fsize.body} font-bold text-slate-900 print:shadow-none`}>{item.name}</h4>
                                            <span className={`${fsize.sub} text-slate-500 font-medium print:shadow-none`}>
                                                {item.startDate} {item.endDate && `- ${item.endDate}`}
                                            </span>
                                        </div>
                                        <p className={`${fsize.body} text-slate-600 whitespace-pre-wrap print:shadow-none ${getAlign("customSection") === "center" ? "text-center" : getAlign("customSection") === "right" ? "text-right" : "text-left"}`}>{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Column */}
                <div className={`col-span-4 ${spacing.sectionY} border-l border-slate-100 ${spacing.sidebarPl} print:shadow-none`}>
                    {skills?.length > 0 && (
                        <section className={`break-inside-avoid flex flex-col ${getItemsAlign("skills")}`}>
                            <h3 className={`text-sm font-bold tracking-wider text-slate-400 ${spacing.titleMb} print:shadow-none`}>Skills</h3>
                            <div className="flex flex-col gap-1.5 print:shadow-none">
                                {skills.map((skill: any, i: number) => (
                                    <div key={i} className="flex items-center gap-2 print:shadow-none">
                                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 print:shadow-none" style={{ background: themeColor }} />
                                        <span className="text-slate-700 text-xs font-medium print:shadow-none">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.languages?.length > 0 && (
                        <section className={`break-inside-avoid flex flex-col ${getItemsAlign("languages")}`}>
                            <h3 className="text-sm font-bold  tracking-wider text-slate-400 mb-4 print:shadow-none">Languages</h3>
                            <ul className="space-y-2 print:shadow-none">
                                {data.languages.map((lang: any, i: number) => (
                                    <li key={i} className="flex justify-between items-center text-sm print:shadow-none">
                                        <span className="font-medium text-slate-700 print:shadow-none">{lang.name}</span>
                                        <span className="text-slate-500 text-xs print:shadow-none">{lang.level}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {data.certifications?.length > 0 && (
                        <section className={`break-inside-avoid flex flex-col ${getItemsAlign("certifications")}`}>
                            <h3 className="text-sm font-bold  tracking-wider text-slate-400 mb-4 print:shadow-none">Certifications</h3>
                            <div className="space-y-3 print:shadow-none">
                                {data.certifications.map((cert: any, i: number) => (
                                    <div key={i}>
                                        <div className="text-sm font-bold text-slate-800 leading-tight print:shadow-none">{cert.name}</div>
                                        <div className="text-xs text-slate-500 print:shadow-none">{cert.issuer} {cert.date && `• ${cert.date}`}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {socialLinks?.length > 0 && (
                        <section className="break-inside-avoid">
                            <h3 className="text-sm font-bold  tracking-wider text-slate-400 mb-4 print:shadow-none">Links</h3>
                            <div className="space-y-2 print:shadow-none">
                                {socialLinks.map((link: any, i: number) => (
                                    <div key={i}>
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all print:shadow-none">
                                            {link.platform}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
