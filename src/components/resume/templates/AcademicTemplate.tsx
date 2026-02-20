import React from 'react';

export default function AcademicTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills } = data;

    const { themeColor = "#0f172a" } = data;

    return (
        <div className={`${data?.fontSize ? "resume-font-scale-" + data.fontSize : "resume-font-scale-medium"} p-8 font-serif text-slate-900  bg-white max-w-[210mm] mx-auto text-sm  bg-white print:p-0 print:w-full`}>
            <header className="text-center border-b-2 pb-6 mb-8 print:shadow-none" style={{ borderColor: themeColor }}>
                <h1 className="text-3xl font-bold mb-2  print:shadow-none" style={{ color: themeColor }}>{personalInfo?.fullName}</h1>
                <div className="space-y-1 text-slate-700 print:shadow-none">
                    <div>{personalInfo?.title}</div>
                    <div>{personalInfo?.address} • {personalInfo?.phone} • {personalInfo?.email}</div>
                </div>
            </header>

            <div className="space-y-6 print:shadow-none">
                {education?.length > 0 && (
                    <section>
                        <h3 className="font-bold text-base  mb-3 bg-slate-100 p-1 pl-2 border-l-4 border-slate-900 print:shadow-none">Education</h3>
                        <div className="space-y-3 pl-2 print:shadow-none">
                            {education.map((edu: any, i: number) => (
                                <div key={i} className="grid grid-cols-12 gap-2 print:shadow-none">
                                    <div className="col-span-2 text-slate-600 font-medium print:shadow-none">{edu.startDate} – {edu.endDate}</div>
                                    <div className="col-span-10 print:shadow-none">
                                        <div className="font-bold print:shadow-none">{edu.schoolName}</div>
                                        <div>{edu.degree}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {experience?.length > 0 && (
                    <section>
                        <h3 className="font-bold text-base  mb-3 bg-slate-100 p-1 pl-2 border-l-4 border-slate-900 print:shadow-none">Professional Experience</h3>
                        <div className="space-y-4 pl-2 print:shadow-none">
                            {experience.map((exp: any, i: number) => (
                                <div key={i} className="grid grid-cols-12 gap-2 print:shadow-none">
                                    <div className="col-span-2 text-slate-600 font-medium whitespace-nowrap print:shadow-none">
                                        {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                                    </div>
                                    <div className="col-span-10 print:shadow-none">
                                        <div className="font-bold print:shadow-none">{exp.jobTitle}</div>
                                        <div className="italic mb-1 print:shadow-none">{exp.companyName}</div>
                                        <ul className="list-disc ml-4 space-y-1 print:shadow-none">
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
                        <h3 className="font-bold text-base  mb-3 bg-slate-100 p-1 pl-2 border-l-4 border-slate-900 print:shadow-none">Certifications & Licensure</h3>
                        <ul className="list-disc ml-6 space-y-2 print:shadow-none">
                            {data.certifications.map((cert: any, i: number) => (
                                <li key={i} className="pl-2 print:shadow-none">
                                    <span className="font-bold print:shadow-none">{cert.name}</span>, <span className="italic print:shadow-none">{cert.issuer}</span> {cert.date && `(${cert.date})`}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {skills?.length > 0 && (
                    <section>
                        <h3 className="font-bold text-base  mb-3 bg-slate-100 p-1 pl-2 border-l-4 border-slate-900 print:shadow-none">Skills & Languages</h3>
                        <div className="pl-2 space-y-2 print:shadow-none">
                            <p>
                                <span className="font-bold print:shadow-none">Technical:</span> {skills.map((s: any) => s.name).join(' • ')}
                            </p>
                            {data.languages?.length > 0 && (
                                <p>
                                    <span className="font-bold print:shadow-none">Languages:</span> {data.languages.map((l: any) => `${l.name} (${l.level})`).join(', ')}
                                </p>
                            )}
                        </div>
                    </section>
                )}

                {personalInfo?.summary && (
                    <section>
                        <h3 className="font-bold text-base  mb-3 bg-slate-100 p-1 pl-2 border-l-4 border-slate-900 print:shadow-none">Research Interests / Summary</h3>
                        <p className="pl-2 leading-relaxed print:shadow-none">
                            {personalInfo.summary}
                        </p>
                    </section>
                )}
            </div>
        </div>
    );
}
