import React from 'react';

export default function MinimalistTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, socialLinks } = data;

    const { themeColor = "#0f172a" } = data;

    return (
        <div className="p-8 font-sans text-slate-900 min-h-[297mm] max-w-[210mm] mx-auto bg-white">
            <header className="text-center mb-12">
                <h1 className="text-3xl font-light tracking-widest  mb-4" style={{ color: themeColor }}>{personalInfo?.fullName}</h1>
                <div className="text-xs tracking-widest text-slate-500  flex justify-center gap-4 flex-wrap">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo?.address && <span>{personalInfo.address}</span>}
                    {socialLinks?.map((link: any, i: number) => (
                        <a key={i} href={link.url} className="hover:text-slate-900 border-b border-transparent hover:border-slate-900 transition-colors">
                            {link.platform}
                        </a>
                    ))}
                </div>
            </header>

            <div className="space-y-10 max-w-3xl mx-auto">
                {personalInfo?.summary && (
                    <section className="text-center">
                        <p className="text-sm leading-7 text-slate-600 font-light">
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {experience?.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold  tracking-widest text-center mb-8 border-b border-slate-100 pb-4">Experience</h3>
                        <div className="space-y-8">
                            {experience.map((exp: any, i: number) => (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="md:col-span-1 text-xs text-slate-400 font-medium text-right pt-1">
                                        {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                                    </div>
                                    <div className="md:col-span-3">
                                        <div className="font-medium text-slate-900 mb-1">{exp.jobTitle} <span className="text-slate-400 font-normal">— {exp.companyName}</span></div>
                                        <div className="text-sm text-slate-600 font-light leading-relaxed">
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
                        <h3 className="text-xs font-bold  tracking-widest text-center mb-8 border-b border-slate-100 pb-4">Education</h3>
                        <div className="space-y-4">
                            {education.map((edu: any, i: number) => (
                                <div key={i} className="text-center">
                                    <div className="font-medium text-slate-900">{edu.schoolName}</div>
                                    <div className="text-sm text-slate-500 font-light">{edu.degree}</div>
                                    <div className="text-xs text-slate-400 mt-1">{edu.startDate} – {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {skills?.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold  tracking-widest text-center mb-6 border-b border-slate-100 pb-4">Skills</h3>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-600 font-light">
                            {skills.map((skill: any, i: number) => (
                                <span key={i}>{skill.name}</span>
                            ))}
                        </div>
                    </section>
                )}

                {(data.languages?.length > 0 || data.certifications?.length > 0) && (
                    <section className="grid grid-cols-2 gap-8 pt-4">
                        {data.languages?.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold  tracking-widest text-center mb-6 border-b border-slate-100 pb-4">Languages</h3>
                                <div className="space-y-2 text-center text-sm font-light text-slate-600">
                                    {data.languages.map((lang: any, i: number) => (
                                        <div key={i}>{lang.name} <span className="text-slate-300">/</span> {lang.level}</div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {data.certifications?.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold  tracking-widest text-center mb-6 border-b border-slate-100 pb-4">Certifications</h3>
                                <div className="space-y-3 text-center">
                                    {data.certifications.map((cert: any, i: number) => (
                                        <div key={i}>
                                            <div className="text-sm font-medium text-slate-800">{cert.name}</div>
                                            <div className="text-xs text-slate-400">{cert.issuer}</div>
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
