import React from 'react';

export default function DesignTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, themeColor = "#f43f5e" } = data; // Rose

    const fName = personalInfo?.fullName || 'Elena Rodriguez';
    const fTitle = personalInfo?.jobTitle || 'Senior UI/UX Designer';
    const fPhone = personalInfo?.phone || '+1 (555) 432-1098';
    const fEmail = personalInfo?.email || 'elena.design@example.com';
    const fLocation = personalInfo?.location || 'Austin, TX';
    const fWebsite = personalInfo?.website || 'elenadesigns.portfolio.io';
    const fSummary = personalInfo?.summary || 'Passionate Senior UI/UX Designer with 6+ years of experience crafting intuitive, user-centered digital experiences for web and mobile platforms. Skilled in translating complex user flows into beautiful, accessible interfaces.';

    const displayExp = experience?.length > 0 ? experience : [
        {
            jobTitle: 'Lead Product Designer',
            companyName: 'CreativeTech Studios',
            startDate: 'Aug 2020',
            endDate: 'Present',
            isCurrent: true,
            description: '• Spearheaded the redesign of the core mobile application, resulting in a 40% increase in daily active users and a 4.8 star App Store rating.\n• Established and maintained a comprehensive design system utilized by 15+ cross-functional teams.'
        }
    ];

    const displayEdu = education?.length > 0 ? education : [
        {
            degree: 'B.F.A. in Graphic Design',
            schoolName: 'Rhode Island School of Design (RISD)',
            startDate: 'Sep 2013',
            endDate: 'May 2017'
        }
    ];

    const displaySkills = skills?.length > 0 ? skills : [
        { name: 'Figma' }, { name: 'UI/UX Design' }, { name: 'Prototyping' }, { name: 'Design Systems' }
    ];

    return (
        <div className="w-full max-w-[210mm] min-h-[297mm] mx-auto bg-white text-slate-800 font-sans flex shadow-sm">
            {/* Left Sidebar */}
            <div className="w-[35%] p-8 text-white flex flex-col" style={{ backgroundColor: themeColor }}>
                <div className="mb-10">
                    <h1 className="text-3xl font-bold leading-tight mb-2 break-words">
                        {fName}
                    </h1>
                    <h2 className="text-lg font-medium opacity-90">{fTitle}</h2>
                </div>

                <div className="space-y-8 flex-1">
                    <section>
                        <h3 className="text-lg font-bold border-b border-white/30 pb-2 mb-3">Contact</h3>
                        <div className="space-y-2 text-sm font-light opacity-90">
                            <p>{fEmail}</p>
                            <p>{fPhone}</p>
                            <p>{fLocation}</p>
                            <p>{fWebsite}</p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold border-b border-white/30 pb-2 mb-3">Education</h3>
                        <div className="space-y-4">
                            {displayEdu.map((edu: any, i: number) => (
                                <div key={i}>
                                    <h4 className="font-bold text-base leading-tight mb-1">{edu.degree}</h4>
                                    <div className="text-sm font-light opacity-90">{edu.schoolName}</div>
                                    <div className="text-xs opacity-75 mt-1">{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold border-b border-white/30 pb-2 mb-3">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {displaySkills.map((s: any, i: number) => (
                                <span key={i} className="text-sm px-3 py-1 rounded-full bg-white/20 font-medium">
                                    {s.name}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Right Content */}
            <div className="w-[65%] p-8 flex flex-col">
                <section className="mb-8">
                    <h3 className="text-2xl font-bold mb-4" style={{ color: themeColor }}>About Me</h3>
                    <p className="text-base leading-relaxed text-slate-600 font-medium">
                        {fSummary}
                    </p>
                </section>

                <section>
                    <h3 className="text-2xl font-bold mb-6" style={{ color: themeColor }}>Experience</h3>
                    <div className="space-y-8 text-slate-700">
                        {displayExp.map((exp: any, i: number) => (
                            <div key={i} className="relative pl-6 border-l-2" style={{ borderColor: `${themeColor}40` }}>
                                <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1" style={{ backgroundColor: themeColor }} />
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="text-lg font-bold leading-tight">{exp.jobTitle}</h4>
                                </div>
                                <div className="flex justify-between items-baseline mb-3">
                                    <div className="text-base font-bold" style={{ color: themeColor }}>{exp.companyName}</div>
                                    <span className="text-sm font-semibold text-slate-500 whitespace-nowrap ml-2">
                                        {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <ul className="list-disc list-outside ml-4 text-sm space-y-2 text-slate-600 leading-relaxed">
                                    {exp.description?.split('\n').map((line: string, j: number) => {
                                        const cleanLine = line.replace(/^[\s•\-\*]+\s*/, '');
                                        return cleanLine && <li key={j}>{cleanLine}</li>;
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
