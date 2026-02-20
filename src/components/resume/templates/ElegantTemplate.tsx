import React from 'react';

export default function ElegantTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills } = data;

    const { themeColor = "#1e293b" } = data;

    return (
        <div className={`${data?.fontSize ? "resume-font-scale-" + data.fontSize : "resume-font-scale-medium"} p-8 font-serif  text-slate-800 bg-[#fffbf7]  bg-white print:p-0 print:w-full`}> {/* Slight Ivory background */}
            <header className="flex justify-between items-end border-b-4 pb-6 mb-10 print:shadow-none" style={{ borderColor: themeColor }}>
                <div>
                    <h1 className="text-3xl font-normal tracking-tight mb-2 print:shadow-none" style={{ color: themeColor }}>{personalInfo?.fullName}</h1>
                    <p className="text-xl italic text-slate-600 print:shadow-none">{personalInfo?.title}</p>
                </div>
                <div className="text-right text-sm leading-relaxed text-slate-600 print:shadow-none">
                    <div>{personalInfo?.email}</div>
                    <div>{personalInfo?.phone}</div>
                    <div>{personalInfo?.address}</div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8 print:shadow-none">
                <div className="col-span-8 space-y-10 print:shadow-none">
                    {personalInfo?.summary && (
                        <section>
                            <h3 className="text-sm font-bold  tracking-widest text-slate-400 mb-4 print:shadow-none">About Me</h3>
                            <p className="text-lg leading-relaxed text-slate-700 font-light print:shadow-none">
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {experience?.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold  tracking-widest text-slate-400 mb-6 print:shadow-none">Experience</h3>
                            <div className="space-y-8 print:shadow-none">
                                {experience.map((exp: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-2 print:shadow-none">
                                            <h4 className="text-xl font-medium text-slate-900 print:shadow-none">{exp.companyName}</h4>
                                            <span className="text-sm italic text-slate-500 font-sans print:shadow-none">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                                        </div>
                                        <div className="text-md font-medium text-slate-700 mb-3 print:shadow-none">{exp.jobTitle}</div>
                                        <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line print:shadow-none">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-4 space-y-10 print:shadow-none">
                    {education?.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold  tracking-widest text-slate-400 mb-6 print:shadow-none">Education</h3>
                            <div className="space-y-6 print:shadow-none">
                                {education.map((edu: any, i: number) => (
                                    <div key={i}>
                                        <div className="font-medium text-slate-900 text-lg leading-snug print:shadow-none">{edu.schoolName}</div>
                                        <div className="text-slate-600 italic mb-1 print:shadow-none">{edu.degree}</div>
                                        <div className="text-xs text-slate-400 font-sans print:shadow-none">{edu.startDate} – {edu.endDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills?.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold  tracking-widest text-slate-400 mb-6 print:shadow-none">Expertise</h3>
                            <ul className="space-y-2 print:shadow-none">
                                {skills.map((skill: any, i: number) => (
                                    <li key={i} className="flex items-center justify-between text-sm text-slate-700 border-b border-slate-200 pb-1 print:shadow-none">
                                        <span>{skill.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {data.languages?.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold  tracking-widest text-slate-400 mb-6 print:shadow-none">Languages</h3>
                            <ul className="space-y-2 print:shadow-none">
                                {data.languages.map((lang: any, i: number) => (
                                    <li key={i} className="grid grid-cols-2 text-sm text-slate-700 items-baseline print:shadow-none">
                                        <span className="font-bold print:shadow-none">{lang.name}</span>
                                        <span className="text-right italic text-slate-500 text-xs print:shadow-none">{lang.level}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {data.certifications?.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold  tracking-widest text-slate-400 mb-6 print:shadow-none">Certifications</h3>
                            <div className="space-y-4 print:shadow-none">
                                {data.certifications.map((cert: any, i: number) => (
                                    <div key={i}>
                                        <div className="font-bold text-slate-900 text-sm leading-snug print:shadow-none">{cert.name}</div>
                                        <div className="text-slate-500 italic text-xs mt-0.5 print:shadow-none">{cert.issuer} {cert.date && `• ${cert.date}`}</div>
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
