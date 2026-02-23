import React from 'react';

export default function TechTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, socialLinks } = data;

    const { themeColor = "#2563eb" } = data; // Default Blue

    const getAlign = (key: string) => {
        return data.layout?.sectionAlignment?.[key] || data.layout?.textAlign || "left";
    };

    const getJustify = (key: string) => {
        const align = getAlign(key);
        return align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start";
    };

    const getItemsAlign = (key: string) => {
        const align = getAlign(key);
        return align === "center" ? "items-center text-center" : align === "right" ? "items-end text-right" : "items-start text-left";
    };

    const getSubAlign = (key: string) => {
        const align = getAlign(key);
        return align === "center" ? "items-center" : align === "right" ? "items-end" : "items-start";
    };

    return (
        <div className={`${data?.fontSize ? "resume-font-scale-" + data.fontSize : "resume-font-scale-medium"} ${data?.headerSize ? "resume-header-scale-" + data.headerSize : "resume-header-scale-" + (data?.fontSize || "medium")} ${data?.headingSize ? "resume-heading-scale-" + data.headingSize : "resume-heading-scale-" + (data?.fontSize || "medium")} font-mono text-slate-800 bg-white   bg-white print:p-0 print:w-full`}>
            <header className={`mb-8 border-b-2 border-slate-900 pb-6 print:shadow-none flex flex-col ${getAlign("personalInfo") === "center" ? "items-center text-center" : getAlign("personalInfo") === "right" ? "items-end text-right" : "items-start text-left"}`}>
                <h1 className="text-3xl font-bold text-slate-900 mb-2 print:shadow-none">
                    <span style={{ color: themeColor }}>&gt;</span> {personalInfo?.fullName}
                </h1>
                <p className={`text-lg text-slate-600 mb-4 print:shadow-none ${getAlign("personalInfo") === "left" ? "pl-6" : ""}`}>{personalInfo?.title}</p>
                <div className={`flex flex-wrap gap-4 text-xs print:shadow-none ${getAlign("personalInfo") === "left" ? "pl-6" : getJustify("personalInfo")}`}>
                    {personalInfo?.email && <span className="bg-slate-100 px-2 py-1 rounded print:shadow-none">email: "{personalInfo.email}"</span>}
                    {personalInfo?.phone && <span className="bg-slate-100 px-2 py-1 rounded print:shadow-none">tel: "{personalInfo.phone}"</span>}
                    {socialLinks?.map((link: any, i: number) => (
                        <a key={i} href={link.url} className="bg-slate-100 px-2 py-1 rounded hover:bg-slate-200 transition-colors print:shadow-none">
                            {link.platform.toLowerCase()}: "{link.url}"
                        </a>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8 print:shadow-none">
                <div className="col-span-8 space-y-8 print:shadow-none">
                    {personalInfo?.summary && (
                        <section className={getItemsAlign("summary")}>
                            <h3 className={`text-lg font-bold text-slate-900 mb-2 flex items-center gap-2 print:shadow-none ${getJustify("summary")}`}>
                                <span className="text-blue-600 print:shadow-none">const</span> about =
                            </h3>
                            <div className={`bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm leading-relaxed print:shadow-none w-full ${getAlign("summary") === "center" ? "text-center" : getAlign("summary") === "right" ? "text-right" : "text-left"}`}>
                                {personalInfo.summary}
                            </div>
                        </section>
                    )}

                    {experience?.length > 0 && (
                        <section className={getItemsAlign("experience")}>
                            <h3 className={`text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 print:shadow-none ${getJustify("experience")}`}>
                                <span className="text-blue-600 print:shadow-none">function</span> experience()
                            </h3>
                            <div className="space-y-6 pl-4 border-l-2 border-slate-100 print:shadow-none w-full">
                                {experience.map((exp: any, i: number) => (
                                    <div key={i} className="relative print:shadow-none">
                                        <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white print:shadow-none"></div>
                                        <div className="flex justify-between items-start mb-1 print:shadow-none">
                                            <h4 className="font-bold text-slate-900 print:shadow-none">{exp.jobTitle}</h4>
                                            <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500 print:shadow-none">
                                                {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm text-slate-600 font-medium mb-2 print:shadow-none">@ {exp.companyName}</div>
                                        <ul className={`list-disc ml-4 text-sm text-slate-600 space-y-1 marker:text-blue-600 print:shadow-none ${getAlign("experience") === "center" ? "flex flex-col items-center list-none ml-0" : getAlign("experience") === "right" ? "flex flex-col items-end list-none mr-0" : ""}`}>
                                            {exp.description?.split('\n').map((line: string, j: number) => {
                                                const cleanLine = line.replace(/^[\s•\-\*]+\s*/, '');
                                                return cleanLine && <li key={j} className={getAlign("experience") === "center" ? "text-center" : getAlign("experience") === "right" ? "text-right" : ""}>{cleanLine}</li>
                                            })}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-4 space-y-8 print:shadow-none">
                    {skills?.length > 0 && (
                        <section className={getItemsAlign("skills")}>
                            <h3 className={`text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 print:shadow-none ${getJustify("skills")}`}>
                                <span className="text-blue-600 print:shadow-none">var</span> skills = [
                            </h3>
                            <div className={`flex flex-col gap-2 pl-4 print:shadow-none w-full ${getSubAlign("skills")}`}>
                                {skills.map((skill: any, i: number) => (
                                    <div key={i} className="text-sm print:shadow-none">
                                        <span className="text-slate-400 print:shadow-none">{i}:</span> "<span className="text-green-600 font-medium print:shadow-none">{skill.name}</span>",
                                    </div>
                                ))}
                                <div className="text-slate-400 print:shadow-none">];</div>
                            </div>
                        </section>
                    )}

                    {data.languages?.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 print:shadow-none">
                                <span className="text-blue-600 print:shadow-none">const</span> langs =
                            </h3>
                            <div className="pl-4 space-y-1 print:shadow-none">
                                {data.languages.map((lang: any, i: number) => (
                                    <div key={i} className="text-sm print:shadow-none">
                                        "{lang.name}": "<span className="text-yellow-600 print:shadow-none">{lang.level}</span>",
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.certifications?.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 print:shadow-none">
                                <span className="text-blue-600 print:shadow-none">interface</span> Certs
                            </h3>
                            <div className="space-y-4 pl-4 border-l-2 border-slate-200 ml-2 print:shadow-none">
                                {data.certifications.map((cert: any, i: number) => (
                                    <div key={i} className="pl-3 relative print:shadow-none">
                                        <div className="font-bold text-slate-800 text-sm print:shadow-none">{cert.name}</div>
                                        <div className="text-xs text-slate-500 print:shadow-none">/* {cert.issuer} {cert.date && `| ${cert.date}`} */</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education?.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 print:shadow-none">
                                <span className="text-blue-600 print:shadow-none">type</span> Education
                            </h3>
                            <div className="space-y-4 pl-4 print:shadow-none">
                                {education.map((edu: any, i: number) => (
                                    <div key={i} className="text-sm border-l-2 border-slate-200 pl-3 print:shadow-none">
                                        <div className="font-bold text-slate-900 print:shadow-none">{edu.schoolName}</div>
                                        <div className="text-slate-600 print:shadow-none">{edu.degree}</div>
                                        <div className="text-xs text-slate-400 mt-1 print:shadow-none">// {edu.startDate} - {edu.endDate}</div>
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
