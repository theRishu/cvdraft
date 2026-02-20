import React from 'react';

export default function ClassicTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, socialLinks, languages, certifications } = data;

    const { themeColor = "#000000" } = data;

    return (
        <div className={`${data?.fontSize ? "resume-font-scale-" + data.fontSize : "resume-font-scale-medium"} p-8 font-serif text-black bg-white  leading-relaxed  bg-white print:p-0 print:w-full`}>
            <header className="text-center border-b pb-4 mb-6 print:shadow-none" style={{ borderColor: themeColor }}>
                <h1 className="text-2xl font-bold  tracking-widest mb-2 print:shadow-none" style={{ color: themeColor }}>{personalInfo?.fullName}</h1>
                <div className="text-sm space-y-1 print:shadow-none">
                    <div>{personalInfo?.address}</div>
                    <div className="space-x-4 print:shadow-none">
                        {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo?.email && <span>{personalInfo.email}</span>}
                    </div>
                </div>
            </header>

            <div className="space-y-6 print:shadow-none">
                {personalInfo?.summary && (
                    <section>
                        <h3 className="font-bold  border-b border-black mb-2 text-sm print:shadow-none">Professional Summary</h3>
                        <p className="text-sm text-justify print:shadow-none">
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {experience?.length > 0 && (
                    <section>
                        <h3 className="font-bold  border-b border-black mb-3 text-sm print:shadow-none">Experience</h3>
                        <div className="space-y-4 print:shadow-none">
                            {experience.map((exp: any, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline font-bold text-sm print:shadow-none">
                                        <span>{exp.companyName}</span>
                                        <span>{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                                    </div>
                                    <div className="italic text-sm mb-1 print:shadow-none">{exp.jobTitle}</div>
                                    <ul className="list-disc ml-5 text-sm space-y-1 print:shadow-none">
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
                        <h3 className="font-bold  border-b border-black mb-3 text-sm print:shadow-none">Education</h3>
                        <div className="space-y-2 print:shadow-none">
                            {education.map((edu: any, i: number) => (
                                <div key={i} className="flex justify-between text-sm print:shadow-none">
                                    <div>
                                        <div className="font-bold print:shadow-none">{edu.schoolName}</div>
                                        <div className="italic print:shadow-none">{edu.degree}</div>
                                    </div>
                                    <div className="text-right print:shadow-none">{edu.startDate} – {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {(skills?.length > 0 || languages?.length > 0 || certifications?.length > 0) && (
                    <section>
                        <h3 className="font-bold  border-b border-black mb-3 text-sm print:shadow-none">Skills & Additional Information</h3>
                        <div className="text-sm space-y-2 print:shadow-none">
                            {skills?.length > 0 && (
                                <div className="grid grid-cols-12 print:shadow-none">
                                    <div className="col-span-3 font-bold print:shadow-none">Skills:</div>
                                    <div className="col-span-9 print:shadow-none">{skills.map((s: any) => s.name).join(', ')}</div>
                                </div>
                            )}
                            {languages?.length > 0 && (
                                <div className="grid grid-cols-12 print:shadow-none">
                                    <div className="col-span-3 font-bold print:shadow-none">Languages:</div>
                                    <div className="col-span-9 print:shadow-none">{languages.map((l: any) => `${l.name} (${l.level})`).join(', ')}</div>
                                </div>
                            )}
                            {certifications?.length > 0 && (
                                <div className="grid grid-cols-12 print:shadow-none">
                                    <div className="col-span-3 font-bold print:shadow-none">Certifications:</div>
                                    <div className="col-span-9 print:shadow-none">{certifications.map((c: any) => c.name).join(', ')}</div>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
