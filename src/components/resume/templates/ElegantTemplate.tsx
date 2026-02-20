import React from 'react';

export default function ElegantTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills } = data;

    const { themeColor = "#1e293b" } = data;

    return (
        <div className="p-8 font-serif min-h-[297mm] text-slate-800 bg-[#fffbf7]"> {/* Slight Ivory background */}
            <header className="flex justify-between items-end border-b-4 pb-6 mb-10" style={{ borderColor: themeColor }}>
                <div>
                    <h1 className="text-3xl font-normal tracking-tight mb-2" style={{ color: themeColor }}>{personalInfo?.fullName}</h1>
                    <p className="text-xl italic text-slate-600">{personalInfo?.title}</p>
                </div>
                <div className="text-right text-sm leading-relaxed text-slate-600">
                    <div>{personalInfo?.email}</div>
                    <div>{personalInfo?.phone}</div>
                    <div>{personalInfo?.address}</div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8 space-y-10">
                    {personalInfo?.summary && (
                        <section>
                            <h3 className="text-sm font-bold  tracking-widest text-slate-400 mb-4">About Me</h3>
                            <p className="text-lg leading-relaxed text-slate-700 font-light">
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {experience?.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold  tracking-widest text-slate-400 mb-6">Experience</h3>
                            <div className="space-y-8">
                                {experience.map((exp: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h4 className="text-xl font-medium text-slate-900">{exp.companyName}</h4>
                                            <span className="text-sm italic text-slate-500 font-sans">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                                        </div>
                                        <div className="text-md font-medium text-slate-700 mb-3">{exp.jobTitle}</div>
                                        <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-4 space-y-10">
                    {education?.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold  tracking-widest text-slate-400 mb-6">Education</h3>
                            <div className="space-y-6">
                                {education.map((edu: any, i: number) => (
                                    <div key={i}>
                                        <div className="font-medium text-slate-900 text-lg leading-snug">{edu.schoolName}</div>
                                        <div className="text-slate-600 italic mb-1">{edu.degree}</div>
                                        <div className="text-xs text-slate-400 font-sans">{edu.startDate} – {edu.endDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills?.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold  tracking-widest text-slate-400 mb-6">Expertise</h3>
                            <ul className="space-y-2">
                                {skills.map((skill: any, i: number) => (
                                    <li key={i} className="flex items-center justify-between text-sm text-slate-700 border-b border-slate-200 pb-1">
                                        <span>{skill.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {data.languages?.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold  tracking-widest text-slate-400 mb-6">Languages</h3>
                            <ul className="space-y-2">
                                {data.languages.map((lang: any, i: number) => (
                                    <li key={i} className="grid grid-cols-2 text-sm text-slate-700 items-baseline">
                                        <span className="font-bold">{lang.name}</span>
                                        <span className="text-right italic text-slate-500 text-xs">{lang.level}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {data.certifications?.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold  tracking-widest text-slate-400 mb-6">Certifications</h3>
                            <div className="space-y-4">
                                {data.certifications.map((cert: any, i: number) => (
                                    <div key={i}>
                                        <div className="font-bold text-slate-900 text-sm leading-snug">{cert.name}</div>
                                        <div className="text-slate-500 italic text-xs mt-0.5">{cert.issuer} {cert.date && `• ${cert.date}`}</div>
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
