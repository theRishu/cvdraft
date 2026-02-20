import React from 'react';

export default function ClassicTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, socialLinks, languages, certifications } = data;

    const { themeColor = "#000000" } = data;

    return (
        <div className="p-8 font-serif text-black bg-white min-h-[297mm] leading-relaxed">
            <header className="text-center border-b pb-4 mb-6" style={{ borderColor: themeColor }}>
                <h1 className="text-2xl font-bold  tracking-widest mb-2" style={{ color: themeColor }}>{personalInfo?.fullName}</h1>
                <div className="text-sm space-y-1">
                    <div>{personalInfo?.address}</div>
                    <div className="space-x-4">
                        {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo?.email && <span>{personalInfo.email}</span>}
                    </div>
                </div>
            </header>

            <div className="space-y-6">
                {personalInfo?.summary && (
                    <section>
                        <h3 className="font-bold  border-b border-black mb-2 text-sm">Professional Summary</h3>
                        <p className="text-sm text-justify">
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {experience?.length > 0 && (
                    <section>
                        <h3 className="font-bold  border-b border-black mb-3 text-sm">Experience</h3>
                        <div className="space-y-4">
                            {experience.map((exp: any, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline font-bold text-sm">
                                        <span>{exp.companyName}</span>
                                        <span>{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                                    </div>
                                    <div className="italic text-sm mb-1">{exp.jobTitle}</div>
                                    <ul className="list-disc ml-5 text-sm space-y-1">
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
                        <h3 className="font-bold  border-b border-black mb-3 text-sm">Education</h3>
                        <div className="space-y-2">
                            {education.map((edu: any, i: number) => (
                                <div key={i} className="flex justify-between text-sm">
                                    <div>
                                        <div className="font-bold">{edu.schoolName}</div>
                                        <div className="italic">{edu.degree}</div>
                                    </div>
                                    <div className="text-right">{edu.startDate} – {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {(skills?.length > 0 || languages?.length > 0 || certifications?.length > 0) && (
                    <section>
                        <h3 className="font-bold  border-b border-black mb-3 text-sm">Skills & Additional Information</h3>
                        <div className="text-sm space-y-2">
                            {skills?.length > 0 && (
                                <div className="grid grid-cols-12">
                                    <div className="col-span-3 font-bold">Skills:</div>
                                    <div className="col-span-9">{skills.map((s: any) => s.name).join(', ')}</div>
                                </div>
                            )}
                            {languages?.length > 0 && (
                                <div className="grid grid-cols-12">
                                    <div className="col-span-3 font-bold">Languages:</div>
                                    <div className="col-span-9">{languages.map((l: any) => `${l.name} (${l.level})`).join(', ')}</div>
                                </div>
                            )}
                            {certifications?.length > 0 && (
                                <div className="grid grid-cols-12">
                                    <div className="col-span-3 font-bold">Certifications:</div>
                                    <div className="col-span-9">{certifications.map((c: any) => c.name).join(', ')}</div>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
