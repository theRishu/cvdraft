import React from 'react';

export default function TechTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, socialLinks } = data;

    const { themeColor = "#2563eb" } = data; // Default Blue

    return (
        <div className="p-8 font-mono text-slate-800 bg-white min-h-[297mm]">
            <header className="mb-8 border-b-2 border-slate-900 pb-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    <span style={{ color: themeColor }}>&gt;</span> {personalInfo?.fullName}
                </h1>
                <p className="text-lg text-slate-600 mb-4 pl-6">{personalInfo?.title}</p>
                <div className="flex flex-wrap gap-4 text-xs pl-6">
                    {personalInfo?.email && <span className="bg-slate-100 px-2 py-1 rounded">email: "{personalInfo.email}"</span>}
                    {personalInfo?.phone && <span className="bg-slate-100 px-2 py-1 rounded">tel: "{personalInfo.phone}"</span>}
                    {socialLinks?.map((link: any, i: number) => (
                        <a key={i} href={link.url} className="bg-slate-100 px-2 py-1 rounded hover:bg-slate-200 transition-colors">
                            {link.platform.toLowerCase()}: "{link.url}"
                        </a>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8 space-y-8">
                    {personalInfo?.summary && (
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <span className="text-blue-600">const</span> about =
                            </h3>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm leading-relaxed">
                                {personalInfo.summary}
                            </div>
                        </section>
                    )}

                    {experience?.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="text-blue-600">function</span> experience()
                            </h3>
                            <div className="space-y-6 pl-4 border-l-2 border-slate-100">
                                {experience.map((exp: any, i: number) => (
                                    <div key={i} className="relative">
                                        <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white"></div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-slate-900">{exp.jobTitle}</h4>
                                            <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">
                                                {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm text-slate-600 font-medium mb-2">@ {exp.companyName}</div>
                                        <ul className="list-disc ml-4 text-sm text-slate-600 space-y-1 marker:text-blue-600">
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
                </div>

                <div className="col-span-4 space-y-8">
                    {skills?.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="text-blue-600">var</span> skills = [
                            </h3>
                            <div className="flex flex-col gap-2 pl-4">
                                {skills.map((skill: any, i: number) => (
                                    <div key={i} className="text-sm">
                                        <span className="text-slate-400">{i}:</span> "<span className="text-green-600 font-medium">{skill.name}</span>",
                                    </div>
                                ))}
                                <div className="text-slate-400">];</div>
                            </div>
                        </section>
                    )}

                    {data.languages?.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="text-blue-600">const</span> langs =
                            </h3>
                            <div className="pl-4 space-y-1">
                                {data.languages.map((lang: any, i: number) => (
                                    <div key={i} className="text-sm">
                                        "{lang.name}": "<span className="text-yellow-600">{lang.level}</span>",
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.certifications?.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="text-blue-600">interface</span> Certs
                            </h3>
                            <div className="space-y-4 pl-4 border-l-2 border-slate-200 ml-2">
                                {data.certifications.map((cert: any, i: number) => (
                                    <div key={i} className="pl-3 relative">
                                        <div className="font-bold text-slate-800 text-sm">{cert.name}</div>
                                        <div className="text-xs text-slate-500">/* {cert.issuer} {cert.date && `| ${cert.date}`} */</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education?.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="text-blue-600">type</span> Education
                            </h3>
                            <div className="space-y-4 pl-4">
                                {education.map((edu: any, i: number) => (
                                    <div key={i} className="text-sm border-l-2 border-slate-200 pl-3">
                                        <div className="font-bold text-slate-900">{edu.schoolName}</div>
                                        <div className="text-slate-600">{edu.degree}</div>
                                        <div className="text-xs text-slate-400 mt-1">// {edu.startDate} - {edu.endDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
