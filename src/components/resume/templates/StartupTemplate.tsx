import React from 'react';

export default function StartupTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, socialLinks, languages, certifications, projects, customSection } = data;

    const { themeColor = "#4f46e5" } = data; // Indigo-600 default

    return (
        <div className={`${data?.fontSize ? "resume-font-scale-" + data.fontSize : "resume-font-scale-medium"} p-8 font-sans  bg-white text-slate-900 flex flex-col  bg-white print:p-0 print:w-full`}>
            {/* Header with vibrant accent */}
            <header className="mb-8 relative flex-none print:shadow-none">
                <div className="absolute top-0 left-0 w-16 h-16 rounded-br-2xl -z-10 -ml-8 -mt-8 print:shadow-none" style={{ backgroundColor: themeColor }}></div>
                <div className="flex justify-between items-end print:shadow-none">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-1 print:shadow-none">{personalInfo?.fullName}</h1>
                        <p className="text-lg font-bold print:shadow-none" style={{ color: themeColor }}>{personalInfo?.title}</p>
                    </div>
                    <div className="text-right space-y-1 text-sm font-medium text-slate-500 print:shadow-none">
                        {personalInfo?.email && <div>{personalInfo.email}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                        {socialLinks?.length > 0 && (
                            <div className="flex justify-end gap-3 mt-2 print:shadow-none">
                                {socialLinks.map((link: any, i: number) => (
                                    <a key={i} href={link.url} className="text-indigo-600 hover:text-indigo-800 underline decoration-2 underline-offset-2 print:shadow-none">
                                        {link.platform}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-3 gap-8 flex-1 print:shadow-none">
                <div className="col-span-2 space-y-10 print:shadow-none">
                    {personalInfo?.summary && (
                        <section>
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 print:shadow-none">
                                🚀 <span className="bg-indigo-50 px-2 rounded print:shadow-none">Mission</span>
                            </h3>
                            <p className="text-lg leading-relaxed text-slate-700 print:shadow-none">
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {experience?.length > 0 && (
                        <section className="h-full print:shadow-none">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 print:shadow-none">
                                ⚡ <span className="bg-indigo-50 px-2 rounded print:shadow-none">Impact</span>
                            </h3>
                            <div className="space-y-8 border-l-4 border-indigo-100 pl-6 ml-2 h-full print:shadow-none">
                                {experience.map((exp: any, i: number) => (
                                    <div key={i} className="relative print:shadow-none">
                                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-4 border-white print:shadow-none" style={{ backgroundColor: themeColor }}></div>
                                        <div className="flex justify-between items-baseline mb-1 print:shadow-none">
                                            <h4 className="text-xl font-bold text-slate-900 print:shadow-none">{exp.jobTitle}</h4>
                                            <span className="font-mono text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded print:shadow-none">
                                                {exp.startDate} — {exp.isCurrent ? 'Now' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="font-bold mb-3 print:shadow-none" style={{ color: themeColor }}>{exp.companyName}</div>
                                        <ul className="space-y-2 text-slate-700 print:shadow-none">
                                            {exp.description?.split('\n').map((line: string, j: number) => {
                                                const cleanLine = line.replace(/^[\s•\-\*]+\s*/, '');
                                                return cleanLine && <li key={j} className="flex gap-2 print:shadow-none">
                                                    <span className="mt-1.5 text-[10px] print:shadow-none" style={{ color: themeColor }}>●</span>
                                                    <span>{cleanLine}</span>
                                                </li>
                                            })}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects?.length > 0 && (
                        <section>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 print:shadow-none">
                                💻 <span className="bg-indigo-50 px-2 rounded print:shadow-none">Projects</span>
                            </h3>
                            <div className="space-y-6 print:shadow-none">
                                {projects.map((project: any, i: number) => (
                                    <div key={i} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl print:shadow-none">
                                        <div className="flex justify-between items-baseline mb-2 print:shadow-none">
                                            <h4 className="text-xl font-bold text-slate-900 print:shadow-none">{project.title}</h4>
                                            <span className="font-mono text-xs text-slate-400 bg-white px-2 py-1 rounded border border-slate-100 print:shadow-none">
                                                {project.startDate} — {project.endDate}
                                            </span>
                                        </div>
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline mb-3 inline-block print:shadow-none" style={{ color: themeColor }}>
                                                {project.link}
                                            </a>
                                        )}
                                        <p className="text-slate-700 leading-relaxed text-sm mb-4 print:shadow-none">{project.description}</p>
                                        {project.technologies?.length > 0 && (
                                            <div className="flex flex-wrap gap-2 print:shadow-none">
                                                {project.technologies.map((tech: string, j: number) => (
                                                    <span key={j} className="text-xs font-medium text-slate-600 bg-white px-2 py-1 rounded-md border border-slate-200 print:shadow-none">
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

                    {customSection?.items?.length > 0 && (
                        <section>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 print:shadow-none">
                                🌟 <span className="bg-indigo-50 px-2 rounded print:shadow-none">{customSection.title || "Activities"}</span>
                            </h3>
                            <div className="space-y-6 print:shadow-none">
                                {customSection.items.map((item: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1 print:shadow-none">
                                            <h4 className="text-xl font-bold text-slate-900 print:shadow-none">{item.name}</h4>
                                            <span className="font-mono text-xs text-slate-400 print:shadow-none">
                                                {item.startDate} {item.endDate && `— ${item.endDate}`}
                                            </span>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed text-sm print:shadow-none">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-1 space-y-10 print:shadow-none">
                    {skills?.length > 0 && (
                        <section className="bg-slate-50 p-6 rounded-2xl print:shadow-none">
                            <h3 className="font-bold  tracking-wider text-slate-400 text-sm mb-4 print:shadow-none">Stack</h3>
                            <div className="flex flex-wrap gap-2 print:shadow-none">
                                {skills.map((skill: any, i: number) => (
                                    <span key={i} className="bg-white border border-slate-200 text-slate-800 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm print:shadow-none">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {education?.length > 0 && (
                        <section>
                            <h3 className="font-bold  tracking-wider text-slate-400 text-sm mb-4 print:shadow-none">Education</h3>
                            <div className="space-y-4 print:shadow-none">
                                {education.map((edu: any, i: number) => (
                                    <div key={i}>
                                        <div className="font-bold text-slate-900 leading-tight print:shadow-none">{edu.schoolName}</div>
                                        <div className="text-sm font-medium print:shadow-none" style={{ color: themeColor }}>{edu.degree}</div>
                                        <div className="text-xs text-slate-400 mt-1 print:shadow-none">{edu.startDate} - {edu.endDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {(languages?.length > 0 || certifications?.length > 0) && (
                        <section>
                            <h3 className="font-bold  tracking-wider text-slate-400 text-sm mb-4 print:shadow-none">Extras</h3>
                            <div className="space-y-6 print:shadow-none">
                                {languages?.length > 0 && (
                                    <div className="space-y-2 print:shadow-none">
                                        {languages.map((lang: any, i: number) => (
                                            <div key={i} className="flex justify-between text-sm print:shadow-none">
                                                <span className="font-medium text-slate-700 print:shadow-none">{lang.name}</span>
                                                <span className="text-slate-400 text-xs print:shadow-none">{lang.level}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {certifications?.length > 0 && (
                                    <div className="space-y-3 print:shadow-none">
                                        {certifications.map((cert: any, i: number) => (
                                            <div key={i} className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 print:shadow-none">
                                                <div className="text-sm font-bold text-indigo-900 leading-tight print:shadow-none">{cert.name}</div>
                                                <div className="text-xs text-indigo-500 mt-1 print:shadow-none">{cert.issuer}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
