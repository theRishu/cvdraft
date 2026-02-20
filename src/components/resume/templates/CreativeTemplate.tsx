import React from 'react';

export default function CreativeTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, socialLinks } = data;

    const { themeColor = "#0f172a" } = data;

    return (
        <div className="flex h-full min-h-[297mm] font-sans text-slate-900 bg-white">
            {/* Dark Sidebar */}
            <div className="w-1/3 text-white p-8 flex flex-col gap-6" style={{ backgroundColor: themeColor }}>
                <div className="text-center">
                    {/* Placeholder for photo if we had one, for now initials */}
                    <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center text-3xl font-bold border-2 border-white/20 mb-4">
                        {personalInfo?.fullName ? personalInfo.fullName.substring(0, 2).toUpperCase() : "ME"}
                    </div>
                </div>

                <div className="space-y-6">
                    <section>
                        <h3 className="text-xs font-bold  tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1">Contact</h3>
                        <div className="space-y-2 text-sm text-slate-300">
                            {personalInfo?.email && <div className="break-all">{personalInfo.email}</div>}
                            {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                            {personalInfo?.address && <div>{personalInfo.address}</div>}
                        </div>
                    </section>

                    {socialLinks?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold  tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1">Socials</h3>
                            <div className="space-y-2 text-sm text-slate-300">
                                {socialLinks.map((link: any, i: number) => (
                                    <div key={i}>
                                        <a href={link.url} className="hover:text-white transition-colors block truncate">{link.platform}</a>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold  tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill: any, i: number) => (
                                    <span key={i} className="bg-slate-800 text-slate-200 px-2 py-1 rounded text-xs">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.languages?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold  tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1">Languages</h3>
                            <ul className="space-y-1">
                                {data.languages.map((lang: any, i: number) => (
                                    <li key={i} className="text-sm text-slate-300 flex justify-between">
                                        <span>{lang.name}</span>
                                        <span className="text-slate-500 text-xs">{lang.level}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {data.certifications?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold  tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1">Awards</h3>
                            <div className="space-y-3">
                                {data.certifications.map((cert: any, i: number) => (
                                    <div key={i} className="text-sm text-slate-300">
                                        <div className="font-bold text-white leading-tight">{cert.name}</div>
                                        <div className="text-xs text-slate-500">{cert.issuer}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-8 space-y-8">
                <header>
                    <h1 className="text-3xl font-black  tracking-tight text-slate-900 leading-none mb-2">
                        {personalInfo?.fullName?.split(' ')[0]} <br />
                        <span className="text-slate-500">{personalInfo?.fullName?.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-medium tracking-wide">{personalInfo?.title}</p>
                </header>

                {personalInfo?.summary && (
                    <section>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {experience?.length > 0 && (
                    <section>
                        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900  tracking-wider mb-6">
                            <span className="w-8 h-1 bg-slate-900"></span> Experience
                        </h2>
                        <div className="space-y-8">
                            {experience.map((exp: any, i: number) => (
                                <div key={i} className="relative pl-6 border-l-2 border-slate-100">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-2 border-white"></div>
                                    <div className="mb-2">
                                        <h3 className="font-bold text-slate-900">{exp.jobTitle}</h3>
                                        <div className="text-sm font-medium text-slate-500">{exp.companyName} | {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</div>
                                    </div>
                                    <ul className="list-disc ml-4 text-sm text-slate-600 space-y-1">
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
                        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900  tracking-wider mb-6">
                            <span className="w-8 h-1 bg-slate-900"></span> Education
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            {education.map((edu: any, i: number) => (
                                <div key={i} className="bg-slate-50 p-4 rounded-lg">
                                    <div className="font-bold text-slate-900 text-sm">{edu.schoolName}</div>
                                    <div className="text-sm text-slate-500">{edu.degree}</div>
                                    <div className="text-xs text-slate-400 mt-1">{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
