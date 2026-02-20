import React from 'react';

export default function StartupTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, socialLinks, languages, certifications, projects, customSection } = data;

    const { themeColor = "#4f46e5" } = data; // Indigo-600 default

    return (
        <div className="p-8 font-sans min-h-[297mm] bg-white text-slate-900 flex flex-col">
            {/* Header with vibrant accent */}
            <header className="mb-8 relative flex-none">
                <div className="absolute top-0 left-0 w-16 h-16 rounded-br-2xl -z-10 -ml-8 -mt-8" style={{ backgroundColor: themeColor }}></div>
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-1">{personalInfo?.fullName}</h1>
                        <p className="text-lg font-bold" style={{ color: themeColor }}>{personalInfo?.title}</p>
                    </div>
                    <div className="text-right space-y-1 text-sm font-medium text-slate-500">
                        {personalInfo?.email && <div>{personalInfo.email}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                        {socialLinks?.length > 0 && (
                            <div className="flex justify-end gap-3 mt-2">
                                {socialLinks.map((link: any, i: number) => (
                                    <a key={i} href={link.url} className="text-indigo-600 hover:text-indigo-800 underline decoration-2 underline-offset-2">
                                        {link.platform}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-3 gap-8 flex-1">
                <div className="col-span-2 space-y-10">
                    {personalInfo?.summary && (
                        <section>
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                🚀 <span className="bg-indigo-50 px-2 rounded">Mission</span>
                            </h3>
                            <p className="text-lg leading-relaxed text-slate-700">
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {experience?.length > 0 && (
                        <section className="h-full">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                ⚡ <span className="bg-indigo-50 px-2 rounded">Impact</span>
                            </h3>
                            <div className="space-y-8 border-l-4 border-indigo-100 pl-6 ml-2 h-full">
                                {experience.map((exp: any, i: number) => (
                                    <div key={i} className="relative">
                                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-4 border-white" style={{ backgroundColor: themeColor }}></div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="text-xl font-bold text-slate-900">{exp.jobTitle}</h4>
                                            <span className="font-mono text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">
                                                {exp.startDate} — {exp.isCurrent ? 'Now' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="font-bold mb-3" style={{ color: themeColor }}>{exp.companyName}</div>
                                        <ul className="space-y-2 text-slate-700">
                                            {exp.description?.split('\n').map((line: string, j: number) => {
                                                const cleanLine = line.replace(/^[\s•\-\*]+\s*/, '');
                                                return cleanLine && <li key={j} className="flex gap-2">
                                                    <span className="mt-1.5 text-[10px]" style={{ color: themeColor }}>●</span>
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
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                💻 <span className="bg-indigo-50 px-2 rounded">Projects</span>
                            </h3>
                            <div className="space-y-6">
                                {projects.map((project: any, i: number) => (
                                    <div key={i} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h4 className="text-xl font-bold text-slate-900">{project.title}</h4>
                                            <span className="font-mono text-xs text-slate-400 bg-white px-2 py-1 rounded border border-slate-100">
                                                {project.startDate} — {project.endDate}
                                            </span>
                                        </div>
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline mb-3 inline-block" style={{ color: themeColor }}>
                                                {project.link}
                                            </a>
                                        )}
                                        <p className="text-slate-700 leading-relaxed text-sm mb-4">{project.description}</p>
                                        {project.technologies?.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech: string, j: number) => (
                                                    <span key={j} className="text-xs font-medium text-slate-600 bg-white px-2 py-1 rounded-md border border-slate-200">
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
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                🌟 <span className="bg-indigo-50 px-2 rounded">{customSection.title || "Activities"}</span>
                            </h3>
                            <div className="space-y-6">
                                {customSection.items.map((item: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="text-xl font-bold text-slate-900">{item.name}</h4>
                                            <span className="font-mono text-xs text-slate-400">
                                                {item.startDate} {item.endDate && `— ${item.endDate}`}
                                            </span>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed text-sm">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-1 space-y-10">
                    {skills?.length > 0 && (
                        <section className="bg-slate-50 p-6 rounded-2xl">
                            <h3 className="font-bold  tracking-wider text-slate-400 text-sm mb-4">Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill: any, i: number) => (
                                    <span key={i} className="bg-white border border-slate-200 text-slate-800 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {education?.length > 0 && (
                        <section>
                            <h3 className="font-bold  tracking-wider text-slate-400 text-sm mb-4">Education</h3>
                            <div className="space-y-4">
                                {education.map((edu: any, i: number) => (
                                    <div key={i}>
                                        <div className="font-bold text-slate-900 leading-tight">{edu.schoolName}</div>
                                        <div className="text-sm font-medium" style={{ color: themeColor }}>{edu.degree}</div>
                                        <div className="text-xs text-slate-400 mt-1">{edu.startDate} - {edu.endDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {(languages?.length > 0 || certifications?.length > 0) && (
                        <section>
                            <h3 className="font-bold  tracking-wider text-slate-400 text-sm mb-4">Extras</h3>
                            <div className="space-y-6">
                                {languages?.length > 0 && (
                                    <div className="space-y-2">
                                        {languages.map((lang: any, i: number) => (
                                            <div key={i} className="flex justify-between text-sm">
                                                <span className="font-medium text-slate-700">{lang.name}</span>
                                                <span className="text-slate-400 text-xs">{lang.level}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {certifications?.length > 0 && (
                                    <div className="space-y-3">
                                        {certifications.map((cert: any, i: number) => (
                                            <div key={i} className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                                                <div className="text-sm font-bold text-indigo-900 leading-tight">{cert.name}</div>
                                                <div className="text-xs text-indigo-500 mt-1">{cert.issuer}</div>
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
