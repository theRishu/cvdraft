import React from 'react';

export default function CorporateTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, socialLinks } = data;

    const { themeColor = "#1d4ed8" } = data;

    return (
        <div className={`${data?.fontSize ? "resume-font-scale-" + data.fontSize : "resume-font-scale-medium"} font-sans text-slate-900  bg-white flex flex-col  bg-white print:p-0 print:w-full`}>
            <header className="bg-slate-100 p-8 border-b border-slate-200 flex-none print:shadow-none">
                <div className="flex justify-between items-center print:shadow-none">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800  tracking-tight print:shadow-none">{personalInfo?.fullName}</h1>
                        <p className="text-lg font-medium mt-1 print:shadow-none" style={{ color: themeColor }}>{personalInfo?.title}</p>
                    </div>
                    <div className="text-right text-sm text-slate-600 space-y-1 print:shadow-none">
                        {personalInfo?.email && <div className="font-medium print:shadow-none">{personalInfo.email}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo?.address && <div>{personalInfo.address}</div>}
                    </div>
                </div>
            </header>

            <div className="p-8 grid grid-cols-12 gap-8 flex-1 print:shadow-none">
                {/* Sidebar */}
                <div className="col-span-4 space-y-8 pr-4 border-r border-slate-100 h-full print:shadow-none">
                    {personalInfo?.summary && (
                        <section>
                            <h3 className="text-xs font-bold  tracking-wider text-slate-500 mb-3 print:shadow-none">Profile</h3>
                            <p className="text-sm leading-relaxed text-slate-700 text-justify print:shadow-none">
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {skills?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold  tracking-wider text-slate-500 mb-3 print:shadow-none">Skills</h3>
                            <div className="space-y-2 print:shadow-none">
                                {skills.map((skill: any, i: number) => (
                                    <div key={i}>
                                        <div className="text-sm font-medium text-slate-700 print:shadow-none">{skill.name}</div>
                                        <div className="h-1 w-full bg-slate-100 rounded-full mt-1 print:shadow-none">
                                            <div className="h-1 rounded-full w-4/5 print:shadow-none" style={{ backgroundColor: themeColor }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.languages?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold  tracking-wider text-slate-500 mb-3 print:shadow-none">Languages</h3>
                            <div className="space-y-2 print:shadow-none">
                                {data.languages.map((lang: any, i: number) => (
                                    <div key={i} className="flex justify-between text-sm print:shadow-none">
                                        <span className="font-medium text-slate-700 print:shadow-none">{lang.name}</span>
                                        <span className="text-slate-500 text-xs print:shadow-none">{lang.level}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.certifications?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold  tracking-wider text-slate-500 mb-3 print:shadow-none">Certifications</h3>
                            <div className="space-y-3 print:shadow-none">
                                {data.certifications.map((cert: any, i: number) => (
                                    <div key={i}>
                                        <div className="text-sm font-bold text-slate-800 leading-tight print:shadow-none">{cert.name}</div>
                                        <div className="text-xs text-slate-500 mt-1 print:shadow-none">{cert.issuer}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold  tracking-wider text-slate-500 mb-3 print:shadow-none">Education</h3>
                            <div className="space-y-4 print:shadow-none">
                                {education.map((edu: any, i: number) => (
                                    <div key={i}>
                                        <div className="text-sm font-bold text-slate-800 print:shadow-none">{edu.schoolName}</div>
                                        <div className="text-sm text-slate-600 print:shadow-none">{edu.degree}</div>
                                        <div className="text-xs text-slate-400 mt-0.5 print:shadow-none">{edu.startDate} - {edu.endDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Main Content */}
                <div className="col-span-8 space-y-8 print:shadow-none">
                    {experience?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold  tracking-wider text-slate-500 mb-6 border-b border-slate-200 pb-2 print:shadow-none">Professional Experience</h3>
                            <div className="space-y-6 print:shadow-none">
                                {experience.map((exp: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1 print:shadow-none">
                                            <h4 className="font-bold text-slate-800 text-lg print:shadow-none">{exp.jobTitle}</h4>
                                            <span className="text-xs font-bold text-slate-500  tracking-wide print:shadow-none">
                                                {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium mb-3 print:shadow-none" style={{ color: themeColor }}>{exp.companyName}</div>
                                        <ul className="list-square ml-4 text-sm text-slate-700 space-y-2 marker:text-blue-400 print:shadow-none">
                                            {exp.description?.split('\n').map((line: string, j: number) => {
                                                const cleanLine = line.replace(/^[\s•\-\*]+\s*/, '');
                                                return cleanLine && <li key={j}>{cleanLine}</li>
                                            })}
                                        </ul>
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
