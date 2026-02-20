import React from 'react';

export default function MinimalistTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, socialLinks } = data;

    const { themeColor = "#0f172a" } = data;

    return (
        <div className={`${data?.fontSize ? "resume-font-scale-" + data.fontSize : "resume-font-scale-medium"} p-8 font-sans text-slate-900  max-w-[210mm] mx-auto bg-white  bg-white print:p-0 print:w-full`}>
            <header className="text-center mb-12 print:shadow-none">
                <h1 className="text-3xl font-light tracking-widest  mb-4 print:shadow-none" style={{ color: themeColor }}>{personalInfo?.fullName}</h1>
                <div className="text-xs tracking-widest text-slate-500  flex justify-center gap-4 flex-wrap print:shadow-none">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo?.address && <span>{personalInfo.address}</span>}
                    {socialLinks?.map((link: any, i: number) => (
                        <a key={i} href={link.url} className="hover:text-slate-900 border-b border-transparent hover:border-slate-900 transition-colors print:shadow-none">
                            {link.platform}
                        </a>
                    ))}
                </div>
            </header>

            <div className="space-y-10 max-w-3xl mx-auto print:shadow-none">
                {personalInfo?.summary && (
                    <section className="text-center print:shadow-none">
                        <p className="text-sm leading-7 text-slate-600 font-light print:shadow-none">
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {experience?.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold  tracking-widest text-center mb-8 border-b border-slate-100 pb-4 print:shadow-none">Experience</h3>
                        <div className="space-y-8 print:shadow-none">
                            {experience.map((exp: any, i: number) => (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 print:shadow-none">
                                    <div className="md:col-span-1 text-xs text-slate-400 font-medium text-right pt-1 print:shadow-none">
                                        {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                                    </div>
                                    <div className="md:col-span-3 print:shadow-none">
                                        <div className="font-medium text-slate-900 mb-1 print:shadow-none">{exp.jobTitle} <span className="text-slate-400 font-normal print:shadow-none">— {exp.companyName}</span></div>
                                        <div className="text-sm text-slate-600 font-light leading-relaxed print:shadow-none">
                                            {exp.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {education?.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold  tracking-widest text-center mb-8 border-b border-slate-100 pb-4 print:shadow-none">Education</h3>
                        <div className="space-y-4 print:shadow-none">
                            {education.map((edu: any, i: number) => (
                                <div key={i} className="text-center print:shadow-none">
                                    <div className="font-medium text-slate-900 print:shadow-none">{edu.schoolName}</div>
                                    <div className="text-sm text-slate-500 font-light print:shadow-none">{edu.degree}</div>
                                    <div className="text-xs text-slate-400 mt-1 print:shadow-none">{edu.startDate} – {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {skills?.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold  tracking-widest text-center mb-6 border-b border-slate-100 pb-4 print:shadow-none">Skills</h3>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-600 font-light print:shadow-none">
                            {skills.map((skill: any, i: number) => (
                                <span key={i}>{skill.name}</span>
                            ))}
                        </div>
                    </section>
                )}

                {(data.languages?.length > 0 || data.certifications?.length > 0) && (
                    <section className="grid grid-cols-2 gap-8 pt-4 print:shadow-none">
                        {data.languages?.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold  tracking-widest text-center mb-6 border-b border-slate-100 pb-4 print:shadow-none">Languages</h3>
                                <div className="space-y-2 text-center text-sm font-light text-slate-600 print:shadow-none">
                                    {data.languages.map((lang: any, i: number) => (
                                        <div key={i}>{lang.name} <span className="text-slate-300 print:shadow-none">/</span> {lang.level}</div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {data.certifications?.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold  tracking-widest text-center mb-6 border-b border-slate-100 pb-4 print:shadow-none">Certifications</h3>
                                <div className="space-y-3 text-center print:shadow-none">
                                    {data.certifications.map((cert: any, i: number) => (
                                        <div key={i}>
                                            <div className="text-sm font-medium text-slate-800 print:shadow-none">{cert.name}</div>
                                            <div className="text-xs text-slate-400 print:shadow-none">{cert.issuer}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
}
