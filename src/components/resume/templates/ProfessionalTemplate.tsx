import React from 'react';

export default function ProfessionalTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills } = data;

    const { themeColor = "#0f172a" } = data;

    return (
        <div className="p-8 font-serif text-slate-900 min-h-[297mm] bg-white">
            <header className="text-center border-b border-slate-300 pb-8 mb-8">
                <h1 className="text-3xl font-bold mb-2" style={{ color: themeColor }}>{personalInfo?.fullName?.toUpperCase()}</h1>
                <div className="flex justify-center gap-4 text-sm italic text-slate-600">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo?.address && <span>{personalInfo.address}</span>}
                </div>
            </header>

            <div className="space-y-8">
                {personalInfo?.summary && (
                    <section>
                        <h3 className="font-bold border-b mb-3 pb-1  text-sm" style={{ borderColor: themeColor, color: themeColor }}>Professional Summary</h3>
                        <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
                    </section>
                )}

                {experience?.length > 0 && (
                    <section>
                        <h3 className="font-bold border-b mb-4 pb-1  text-sm" style={{ borderColor: themeColor, color: themeColor }}>Experience</h3>
                        <div className="space-y-5">
                            {experience.map((exp: any, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline font-bold text-sm mb-1">
                                        <span>{exp.companyName}</span>
                                        <span>{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
                                    </div>
                                    <div className="italic text-sm mb-2">{exp.jobTitle}</div>
                                    <ul className="list-disc list-outside ml-4 text-sm space-y-1">
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

                {education?.length > 0 && (
                    <section>
                        <h3 className="font-bold border-b border-slate-900 mb-4 pb-1  text-sm">Education</h3>
                        <div className="space-y-3">
                            {education.map((edu: any, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline font-bold text-sm">
                                        <span>{edu.schoolName}</span>
                                        <span>{edu.startDate} - {edu.endDate}</span>
                                    </div>
                                    <div className="text-sm">{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {skills?.length > 0 && (
                    <section>
                        <h3 className="font-bold border-b border-slate-900 mb-3 pb-1  text-sm">Skills</h3>
                        <p className="text-sm">
                            {skills.map((s: any) => s.name).join(' • ')}
                        </p>
                    </section>
                )}

                {data.languages?.length > 0 && (
                    <section>
                        <h3 className="font-bold border-b border-slate-900 mb-3 pb-1  text-sm">Languages</h3>
                        <p className="text-sm">
                            {data.languages.map((l: any) => `${l.name} (${l.level})`).join(' • ')}
                        </p>
                    </section>
                )}

                {data.certifications?.length > 0 && (
                    <section>
                        <h3 className="font-bold border-b border-slate-900 mb-3 pb-1  text-sm">Certifications & Awards</h3>
                        <div className="space-y-2">
                            {data.certifications.map((cert: any, i: number) => (
                                <div key={i} className="flex justify-between text-sm">
                                    <span className="font-bold">{cert.name}</span>
                                    <span className="italic text-slate-600">{cert.issuer} {cert.date && `- ${cert.date}`}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
