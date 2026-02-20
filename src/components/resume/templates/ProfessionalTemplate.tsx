import React from 'react';

export default function ProfessionalTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills } = data;

    const { themeColor = "#0f172a" } = data;

    return (
        <div className={`${data?.fontSize ? "resume-font-scale-" + data.fontSize : "resume-font-scale-medium"} p-8 font-serif text-slate-900  bg-white  bg-white print:p-0 print:w-full`}>
            <header className="text-center border-b border-slate-300 pb-8 mb-8 print:shadow-none">
                <h1 className="text-3xl font-bold mb-2 print:shadow-none" style={{ color: themeColor }}>{personalInfo?.fullName?.toUpperCase()}</h1>
                <div className="flex justify-center gap-4 text-sm italic text-slate-600 print:shadow-none">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo?.address && <span>{personalInfo.address}</span>}
                </div>
            </header>

            <div className="space-y-8 print:shadow-none">
                {personalInfo?.summary && (
                    <section>
                        <h3 className="font-bold border-b mb-3 pb-1  text-sm print:shadow-none" style={{ borderColor: themeColor, color: themeColor }}>Professional Summary</h3>
                        <p className="text-sm leading-relaxed print:shadow-none">{personalInfo.summary}</p>
                    </section>
                )}

                {experience?.length > 0 && (
                    <section>
                        <h3 className="font-bold border-b mb-4 pb-1  text-sm print:shadow-none" style={{ borderColor: themeColor, color: themeColor }}>Experience</h3>
                        <div className="space-y-5 print:shadow-none">
                            {experience.map((exp: any, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline font-bold text-sm mb-1 print:shadow-none">
                                        <span>{exp.companyName}</span>
                                        <span>{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
                                    </div>
                                    <div className="italic text-sm mb-2 print:shadow-none">{exp.jobTitle}</div>
                                    <ul className="list-disc list-outside ml-4 text-sm space-y-1 print:shadow-none">
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
                        <h3 className="font-bold border-b border-slate-900 mb-4 pb-1  text-sm print:shadow-none">Education</h3>
                        <div className="space-y-3 print:shadow-none">
                            {education.map((edu: any, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline font-bold text-sm print:shadow-none">
                                        <span>{edu.schoolName}</span>
                                        <span>{edu.startDate} - {edu.endDate}</span>
                                    </div>
                                    <div className="text-sm print:shadow-none">{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {skills?.length > 0 && (
                    <section>
                        <h3 className="font-bold border-b border-slate-900 mb-3 pb-1  text-sm print:shadow-none">Skills</h3>
                        <p className="text-sm print:shadow-none">
                            {skills.map((s: any) => s.name).join(' • ')}
                        </p>
                    </section>
                )}

                {data.languages?.length > 0 && (
                    <section>
                        <h3 className="font-bold border-b border-slate-900 mb-3 pb-1  text-sm print:shadow-none">Languages</h3>
                        <p className="text-sm print:shadow-none">
                            {data.languages.map((l: any) => `${l.name} (${l.level})`).join(' • ')}
                        </p>
                    </section>
                )}

                {data.certifications?.length > 0 && (
                    <section>
                        <h3 className="font-bold border-b border-slate-900 mb-3 pb-1  text-sm print:shadow-none">Certifications & Awards</h3>
                        <div className="space-y-2 print:shadow-none">
                            {data.certifications.map((cert: any, i: number) => (
                                <div key={i} className="flex justify-between text-sm print:shadow-none">
                                    <span className="font-bold print:shadow-none">{cert.name}</span>
                                    <span className="italic text-slate-600 print:shadow-none">{cert.issuer} {cert.date && `- ${cert.date}`}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
