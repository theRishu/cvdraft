import React from 'react';

export default function ModernTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, socialLinks } = data;

    const { themeColor = "#0f172a" } = data; // Default slate-900

    return (
        <div className={`${data?.fontSize ? "resume-font-scale-" + data.fontSize : "resume-font-scale-medium"} p-8 md:p-8 font-sans  text-slate-900 bg-white  bg-white print:p-0 print:w-full`}>
            {/* Header */}
            <header className="border-b-2 pb-4 mb-6 print:shadow-none" style={{ borderColor: themeColor }}>
                <h1 className="text-3xl font-bold  mb-1 print:shadow-none" style={{ color: themeColor }}>{personalInfo?.fullName}</h1>
                <p className="text-base font-medium text-slate-600 mb-2 print:shadow-none">{personalInfo?.title}</p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-500 print:shadow-none">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo?.address && <span>• {personalInfo.address}</span>}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8 print:shadow-none">
                {/* Main Column */}
                <div className="col-span-8 space-y-8 print:shadow-none">
                    {personalInfo?.summary && (
                        <section>
                            <h3 className="text-sm font-bold  tracking-wider text-slate-400 mb-3 print:shadow-none">Profile</h3>
                            <p className="text-slate-700 leading-relaxed text-sm print:shadow-none">{personalInfo.summary}</p>
                        </section>
                    )}

                    {experience?.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold  tracking-wider text-slate-400 mb-4 print:shadow-none">Experience</h3>
                            <div className="space-y-6 print:shadow-none">
                                {experience.map((exp: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1 print:shadow-none">
                                            <h4 className="font-bold text-slate-900 print:shadow-none">{exp.jobTitle}</h4>
                                            <span className="text-xs text-slate-500 font-medium print:shadow-none">
                                                {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm text-slate-600 font-medium mb-2 print:shadow-none">{exp.companyName}</div>
                                        <p className="text-sm text-slate-600 whitespace-pre-wrap print:shadow-none">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education?.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold  tracking-wider text-slate-400 mb-4 print:shadow-none">Education</h3>
                            <div className="space-y-4 print:shadow-none">
                                {education.map((edu: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1 print:shadow-none">
                                            <h4 className="font-bold text-slate-900 print:shadow-none">{edu.schoolName}</h4>
                                            <span className="text-xs text-slate-500 font-medium print:shadow-none">
                                                {edu.startDate} - {edu.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm text-slate-600 print:shadow-none">{edu.degree}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.projects?.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold  tracking-wider text-slate-400 mb-4 print:shadow-none">Projects</h3>
                            <div className="space-y-5 print:shadow-none">
                                {data.projects.map((project: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1 print:shadow-none">
                                            <h4 className="font-bold text-slate-900 print:shadow-none">{project.title}</h4>
                                            <span className="text-xs text-slate-500 font-medium print:shadow-none">
                                                {project.startDate} - {project.endDate}
                                            </span>
                                        </div>
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mb-1 block print:shadow-none">
                                                {project.link}
                                            </a>
                                        )}
                                        <p className="text-sm text-slate-600 whitespace-pre-wrap mb-2 print:shadow-none">{project.description}</p>
                                        {project.technologies?.length > 0 && (
                                            <div className="flex flex-wrap gap-2 print:shadow-none">
                                                {project.technologies.map((tech: string, j: number) => (
                                                    <span key={j} className="text-[10px] bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-100 print:shadow-none">
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
                        <section>
                            <h3 className="text-sm font-bold  tracking-wider text-slate-400 mb-4 print:shadow-none">{data.customSection.title || "Custom Section"}</h3>
                            <div className="space-y-4 print:shadow-none">
                                {data.customSection.items.map((item: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1 print:shadow-none">
                                            <h4 className="font-bold text-slate-900 print:shadow-none">{item.name}</h4>
                                            <span className="text-xs text-slate-500 font-medium print:shadow-none">
                                                {item.startDate} {item.endDate && `- ${item.endDate}`}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600 whitespace-pre-wrap print:shadow-none">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Column */}
                <div className="col-span-4 space-y-8 border-l border-slate-100 pl-8 print:shadow-none">
                    {skills?.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold  tracking-wider text-slate-400 mb-4 print:shadow-none">Skills</h3>
                            <div className="flex flex-wrap gap-2 print:shadow-none">
                                {skills.map((skill: any, i: number) => (
                                    <span key={i} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium print:shadow-none">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.languages?.length > 0 && (
                        <section>
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
                        <section>
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
                        <section>
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
