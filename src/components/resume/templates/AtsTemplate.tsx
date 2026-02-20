import React from 'react';

export default function AtsTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, customSection, languages, certifications, projects } = data;

    // Use themeColor for headings
    const themeColor = data.themeColor || "#2563eb"; // A classic blue 
    const fontSize = data.fontSize || 'medium';

    // Tailwind sizing scales
    const textScale = {
        name: fontSize === 'small' ? 'text-2xl' : fontSize === 'large' ? 'text-4xl' : 'text-3xl',
        heading: fontSize === 'small' ? 'text-sm' : fontSize === 'large' ? 'text-lg' : 'text-base',
        subHeading: fontSize === 'small' ? 'text-[13px]' : fontSize === 'large' ? 'text-[17px]' : 'text-[15px]',
        body: fontSize === 'small' ? 'text-xs' : fontSize === 'large' ? 'text-base' : 'text-sm',
    };

    return (
        <div className="p-6 sm:p-8 font-serif  bg-white text-slate-900 flex flex-col print:shadow-none">
            {/* Header */}
            <header className="mb-4 text-center print:shadow-none">
                <h1 className={`${textScale.name} font-bold mb-2 text-slate-900 uppercase tracking-wide print:w-full`}>{personalInfo?.fullName}</h1>
                <div className={`${textScale.body} text-slate-700 flex flex-wrap justify-center items-center gap-2`}>
                    {personalInfo?.location && <span>📍 {personalInfo.location}</span>}
                    {personalInfo?.location && (personalInfo?.email || personalInfo?.phone) && <span>|</span>}
                    {personalInfo?.email && <span>✉️ {personalInfo.email}</span>}
                    {personalInfo?.email && personalInfo?.phone && <span>|</span>}
                    {personalInfo?.phone && <span>📞 {personalInfo.phone}</span>}
                    {personalInfo?.phone && data.socialLinks?.length > 0 && <span>|</span>}
                    {data.socialLinks?.map((link: any, i: number) => (
                        <React.Fragment key={i}>
                            <a href={link.url} className="hover:underline print:shadow-none">{link.url.replace(/^https?:\/\//, '')}</a>
                            {i < data.socialLinks.length - 1 && <span>|</span>}
                        </React.Fragment>
                    ))}
                </div>
            </header>

            <div className="flex-1 flex flex-col space-y-3 print:shadow-none">
                {/* Profile Summary */}
                {personalInfo?.summary && (
                    <section>
                        <h3 className={`${textScale.heading} font-bold border-b border-slate-200 pb-0.5 mb-1.5`} style={{ color: themeColor }}>
                            Profile Summary
                        </h3>
                        <p className={`${textScale.body} text-slate-800 leading-snug text-left`}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Technical Skills */}
                {skills?.length > 0 && (
                    <section>
                        <h3 className={`${textScale.heading} font-bold border-b border-slate-200 pb-0.5 mb-1.5`} style={{ color: themeColor }}>
                            Technical Skills
                        </h3>
                        <ul className={`${textScale.body} text-slate-800 list-disc list-inside`}>
                            {skills.map((skill: any, i: number) => {
                                const parts = skill.name.split(':');
                                if (parts.length > 1) {
                                    return (
                                        <li key={i} className="leading-snug print:shadow-none">
                                            <span className="font-bold print:shadow-none">{parts[0]}:</span>
                                            {parts.slice(1).join(':')}
                                        </li>
                                    );
                                }
                                return <li key={i} className="leading-snug print:shadow-none">{skill.name}</li>;
                            })}
                        </ul>
                    </section>
                )}

                {/* Professional Experience */}
                {experience?.length > 0 && (
                    <section>
                        <h3 className={`${textScale.heading} font-bold border-b border-slate-200 pb-0.5 mb-1.5`} style={{ color: themeColor }}>
                            Professional Experience
                        </h3>
                        <div className="space-y-3 print:shadow-none">
                            {experience.map((exp: any, i: number) => (
                                <div key={i}>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline print:shadow-none">
                                        <h4 className={`font-bold text-slate-900 ${textScale.subHeading}`} style={{ color: themeColor }}>
                                            {exp.companyName}{exp.companyName && exp.jobTitle ? ' – ' : ''}{exp.jobTitle}
                                        </h4>
                                        <div className={`${textScale.body} text-slate-600 font-medium`}>
                                            {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate} {exp.location && `| ${exp.location}`}
                                        </div>
                                    </div>
                                    <ul className={`${textScale.body} text-slate-800 list-disc pl-4 mt-1`}>
                                        {exp.description?.split('\n').map((line: string, j: number) => {
                                            const cleanLine = line.replace(/^[\s•\-\*]+\s*/, '');
                                            return cleanLine && <li key={j} className="pl-1 leading-snug mb-0.5 print:shadow-none">{cleanLine}</li>;
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects?.length > 0 && (
                    <section>
                        <h3 className={`${textScale.heading} font-bold border-b border-slate-200 pb-0.5 mb-1.5`} style={{ color: themeColor }}>
                            Projects
                        </h3>
                        <div className="space-y-2 print:shadow-none">
                            {projects.map((project: any, i: number) => (
                                <div key={i}>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline print:shadow-none">
                                        <h4 className={`font-bold text-slate-900 ${textScale.subHeading}`} style={{ color: themeColor }}>
                                            {project.title}
                                        </h4>
                                        <span className={`${textScale.body} text-slate-700`}>
                                            {project.startDate} – {project.endDate}
                                        </span>
                                    </div>
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className={`${textScale.body} text-blue-600 hover:underline inline-block`}>
                                            {project.link}
                                        </a>
                                    )}
                                    <p className={`${textScale.body} text-slate-800 leading-snug mt-0.5`}>
                                        {project.description}
                                    </p>
                                    {project.technologies?.length > 0 && (
                                        <div className={`${textScale.body} text-slate-700 mt-0.5`}>
                                            <span className="font-bold print:shadow-none">Technologies:</span> {project.technologies.join(', ')}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education?.length > 0 && (
                    <section>
                        <h3 className={`${textScale.heading} font-bold border-b border-slate-200 pb-0.5 mb-1.5`} style={{ color: themeColor }}>
                            Education & Certifications
                        </h3>
                        <div className="space-y-2 print:shadow-none">
                            {education.map((edu: any, i: number) => (
                                <div key={i} className="flex justify-between items-baseline print:shadow-none">
                                    <div>
                                        <span className={`font-bold text-slate-900 ${textScale.subHeading}`} style={{ color: themeColor }}>
                                            {edu.degree}
                                        </span>
                                        <span className={`${textScale.body} text-slate-700 ml-2`}>
                                            {edu.schoolName}
                                        </span>
                                    </div>
                                    <div className={`${textScale.body} text-slate-700`}>
                                        {edu.startDate} – {edu.endDate}
                                    </div>
                                </div>
                            ))}
                            {certifications?.map((cert: any, i: number) => (
                                <div key={`cert-${i}`} className="flex justify-between items-baseline print:shadow-none">
                                    <div>
                                        <span className={`font-bold text-slate-900 ${textScale.subHeading}`} style={{ color: themeColor }}>
                                            {cert.name}
                                        </span>
                                        <span className={`${textScale.body} text-slate-700 ml-2`}>
                                            {cert.issuer}
                                        </span>
                                    </div>
                                    <div className={`${textScale.body} text-slate-700`}>
                                        {cert.date}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages?.length > 0 && (
                    <section>
                        <h3 className={`${textScale.heading} font-bold border-b border-slate-200 pb-0.5 mb-1.5`} style={{ color: themeColor }}>
                            Languages
                        </h3>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 print:shadow-none">
                            {languages.map((lang: any, i: number) => (
                                <div key={i} className={`${textScale.body} text-slate-800`}>
                                    <span className="font-bold print:shadow-none">{lang.name}</span>
                                    {lang.level && <span className="text-slate-600 print:shadow-none"> – {lang.level}</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
}
