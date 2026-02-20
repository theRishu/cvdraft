import React from 'react';

export default function CreativeTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, socialLinks } = data;

    const { themeColor = "#0f172a" } = data;

    return (
        <div className={`${data?.fontSize ? "resume-font-scale-" + data.fontSize : "resume-font-scale-medium"} flex h-full  font-sans text-slate-900 bg-white  bg-white print:p-0 print:w-full`}>
            {/* Dark Sidebar */}
            <div className="w-1/3 text-white p-8 flex flex-col gap-6 print:shadow-none" style={{ backgroundColor: themeColor }}>
                <div className="text-center print:shadow-none">
                    {/* Placeholder for photo if we had one, for now initials */}
                    <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center text-3xl font-bold border-2 border-white/20 mb-4 print:shadow-none">
                        {personalInfo?.fullName ? personalInfo.fullName.substring(0, 2).toUpperCase() : "ME"}
                    </div>
                </div>

                <div className="space-y-6 print:shadow-none">
                    <section>
                        <h3 className="text-xs font-bold  tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1 print:shadow-none">Contact</h3>
                        <div className="space-y-2 text-sm text-slate-300 print:shadow-none">
                            {personalInfo?.email && <div className="break-all print:shadow-none">{personalInfo.email}</div>}
                            {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                            {personalInfo?.address && <div>{personalInfo.address}</div>}
                        </div>
                    </section>

                    {socialLinks?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold  tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1 print:shadow-none">Socials</h3>
                            <div className="space-y-2 text-sm text-slate-300 print:shadow-none">
                                {socialLinks.map((link: any, i: number) => (
                                    <div key={i}>
                                        <a href={link.url} className="hover:text-white transition-colors block truncate print:shadow-none">{link.platform}</a>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold  tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1 print:shadow-none">Skills</h3>
                            <div className="flex flex-wrap gap-2 print:shadow-none">
                                {skills.map((skill: any, i: number) => (
                                    <span key={i} className="bg-slate-800 text-slate-200 px-2 py-1 rounded text-xs print:shadow-none">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.languages?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold  tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1 print:shadow-none">Languages</h3>
                            <ul className="space-y-1 print:shadow-none">
                                {data.languages.map((lang: any, i: number) => (
                                    <li key={i} className="text-sm text-slate-300 flex justify-between print:shadow-none">
                                        <span>{lang.name}</span>
                                        <span className="text-slate-500 text-xs print:shadow-none">{lang.level}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {data.certifications?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold  tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1 print:shadow-none">Awards</h3>
                            <div className="space-y-3 print:shadow-none">
                                {data.certifications.map((cert: any, i: number) => (
                                    <div key={i} className="text-sm text-slate-300 print:shadow-none">
                                        <div className="font-bold text-white leading-tight print:shadow-none">{cert.name}</div>
                                        <div className="text-xs text-slate-500 print:shadow-none">{cert.issuer}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-8 space-y-8 print:shadow-none">
                <header>
                    <h1 className="text-3xl font-black  tracking-tight text-slate-900 leading-none mb-2 print:shadow-none">
                        {personalInfo?.fullName?.split(' ')[0]} <br />
                        <span className="text-slate-500 print:shadow-none">{personalInfo?.fullName?.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-medium tracking-wide print:shadow-none">{personalInfo?.title}</p>
                </header>

                {personalInfo?.summary && (
                    <section>
                        <p className="text-slate-600 leading-relaxed text-sm print:shadow-none">
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {experience?.length > 0 && (
                    <section>
                        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900  tracking-wider mb-6 print:shadow-none">
                            <span className="w-8 h-1 bg-slate-900 print:shadow-none"></span> Experience
                        </h2>
                        <div className="space-y-8 print:shadow-none">
                            {experience.map((exp: any, i: number) => (
                                <div key={i} className="relative pl-6 border-l-2 border-slate-100 print:shadow-none">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-2 border-white print:shadow-none"></div>
                                    <div className="mb-2 print:shadow-none">
                                        <h3 className="font-bold text-slate-900 print:shadow-none">{exp.jobTitle}</h3>
                                        <div className="text-sm font-medium text-slate-500 print:shadow-none">{exp.companyName} | {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</div>
                                    </div>
                                    <ul className="list-disc ml-4 text-sm text-slate-600 space-y-1 print:shadow-none">
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
                        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900  tracking-wider mb-6 print:shadow-none">
                            <span className="w-8 h-1 bg-slate-900 print:shadow-none"></span> Education
                        </h2>
                        <div className="grid grid-cols-1 gap-4 print:shadow-none">
                            {education.map((edu: any, i: number) => (
                                <div key={i} className="bg-slate-50 p-4 rounded-lg print:shadow-none">
                                    <div className="font-bold text-slate-900 text-sm print:shadow-none">{edu.schoolName}</div>
                                    <div className="text-sm text-slate-500 print:shadow-none">{edu.degree}</div>
                                    <div className="text-xs text-slate-400 mt-1 print:shadow-none">{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
