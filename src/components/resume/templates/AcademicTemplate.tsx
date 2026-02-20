import React from 'react';

export default function AcademicTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills } = data;

    const { themeColor = "#0f172a" } = data;

    return (
        <div className="p-8 font-serif text-slate-900 min-h-[297mm] bg-white max-w-[210mm] mx-auto text-sm">
            <header className="text-center border-b-2 pb-6 mb-8" style={{ borderColor: themeColor }}>
                <h1 className="text-3xl font-bold mb-2 " style={{ color: themeColor }}>{personalInfo?.fullName}</h1>
                <div className="space-y-1 text-slate-700">
                    <div>{personalInfo?.title}</div>
                    <div>{personalInfo?.address} • {personalInfo?.phone} • {personalInfo?.email}</div>
                </div>
            </header>

            <div className="space-y-6">
                {education?.length > 0 && (
                    <section>
                        <h3 className="font-bold text-base  mb-3 bg-slate-100 p-1 pl-2 border-l-4 border-slate-900">Education</h3>
                        <div className="space-y-3 pl-2">
                            {education.map((edu: any, i: number) => (
                                <div key={i} className="grid grid-cols-12 gap-2">
                                    <div className="col-span-2 text-slate-600 font-medium">{edu.startDate} – {edu.endDate}</div>
                                    <div className="col-span-10">
                                        <div className="font-bold">{edu.schoolName}</div>
                                        <div>{edu.degree}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {experience?.length > 0 && (
                    <section>
                        <h3 className="font-bold text-base  mb-3 bg-slate-100 p-1 pl-2 border-l-4 border-slate-900">Professional Experience</h3>
                        <div className="space-y-4 pl-2">
                            {experience.map((exp: any, i: number) => (
                                <div key={i} className="grid grid-cols-12 gap-2">
                                    <div className="col-span-2 text-slate-600 font-medium whitespace-nowrap">
                                        {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                                    </div>
                                    <div className="col-span-10">
                                        <div className="font-bold">{exp.jobTitle}</div>
                                        <div className="italic mb-1">{exp.companyName}</div>
                                        <ul className="list-disc ml-4 space-y-1">
                                            {exp.description?.split('\n').map((line: string, j: number) => {
                                                const cleanLine = line.replace(/^[\s•\-\*]+\s*/, '');
                                                return cleanLine && <li key={j}>{cleanLine}</li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.certifications?.length > 0 && (
                    <section>
                        <h3 className="font-bold text-base  mb-3 bg-slate-100 p-1 pl-2 border-l-4 border-slate-900">Certifications & Licensure</h3>
                        <ul className="list-disc ml-6 space-y-2">
                            {data.certifications.map((cert: any, i: number) => (
                                <li key={i} className="pl-2">
                                    <span className="font-bold">{cert.name}</span>, <span className="italic">{cert.issuer}</span> {cert.date && `(${cert.date})`}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {skills?.length > 0 && (
                    <section>
                        <h3 className="font-bold text-base  mb-3 bg-slate-100 p-1 pl-2 border-l-4 border-slate-900">Skills & Languages</h3>
                        <div className="pl-2 space-y-2">
                            <p>
                                <span className="font-bold">Technical:</span> {skills.map((s: any) => s.name).join(' • ')}
                            </p>
                            {data.languages?.length > 0 && (
                                <p>
                                    <span className="font-bold">Languages:</span> {data.languages.map((l: any) => `${l.name} (${l.level})`).join(', ')}
                                </p>
                            )}
                        </div>
                    </section>
                )}

                {personalInfo?.summary && (
                    <section>
                        <h3 className="font-bold text-base  mb-3 bg-slate-100 p-1 pl-2 border-l-4 border-slate-900">Research Interests / Summary</h3>
                        <p className="pl-2 leading-relaxed">
                            {personalInfo.summary}
                        </p>
                    </section>
                )}
            </div>
        </div>
    );
}
