import React from 'react';

export default function MarketingTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, themeColor = "#a855f7" } = data; // Purple

    // Fallbacks
    const fName = personalInfo?.fullName || 'Sarah Jenkins';
    const fTitle = personalInfo?.jobTitle || 'Digital Marketing Manager';
    const fPhone = personalInfo?.phone || '+1 234 567 8900';
    const fEmail = personalInfo?.email || 'sarah.jenkins@example.com';
    const fLocation = personalInfo?.location || 'New York, NY';
    const fLinkedin = personalInfo?.linkedin || 'linkedin.com/in/sarahjenkins';
    const fSummary = personalInfo?.summary || 'Results-driven Digital Marketing Manager with 7+ years of experience in leading comprehensive marketing campaigns. Proven track record of increasing brand awareness by 50% and driving a 30% growth in online sales through targeted social media and email strategies.';

    const displayExp = experience?.length > 0 ? experience : [
        {
            jobTitle: 'Senior Marketing Strategist',
            companyName: 'Global Brands Inc.',
            startDate: 'Jan 2020',
            endDate: 'Present',
            isCurrent: true,
            description: '• Spearheaded digital marketing campaigns across multiple platforms resulting in a 40% increase in website traffic.\n• Managed a budget of $500k, optimizing ad spend to achieve a 15% lower CPA.\n• Led a team of 5 marketing specialists to develop and execute quarterly marketing plans.'
        },
        {
            jobTitle: 'Marketing Coordinator',
            companyName: 'Creative Solutions',
            startDate: 'Jun 2016',
            endDate: 'Dec 2019',
            isCurrent: false,
            description: '• Assisted in the creation of content for social media, blogs, and email newsletters.\n• Conducted market research to identify new trends and customer segments.\n• Organized and managed company attendance at 10+ industry trade shows annually.'
        }
    ];

    const displayEdu = education?.length > 0 ? education : [
        {
            degree: 'Bachelor of Science in Marketing',
            schoolName: 'University of Business',
            startDate: 'Sep 2012',
            endDate: 'May 2016'
        }
    ];

    const displaySkills = skills?.length > 0 ? skills : [
        { name: 'SEO/SEM' }, { name: 'Content Strategy' }, { name: 'Google Analytics' }, { name: 'Social Media Management' }, { name: 'Email Marketing' }, { name: 'Campaign Optimization' }
    ];

    return (
        <div className="w-full max-w-[210mm] min-h-[297mm] mx-auto bg-[#fdfaf6] text-slate-800 font-sans p-8 shadow-sm flex flex-col">
            <header className="flex flex-col items-center mb-10 text-center">
                <div className="w-full flex justify-between items-start border-b-2 pb-6 mb-6" style={{ borderColor: themeColor }}>
                    <div className="text-left w-1/3 text-sm space-y-1 font-medium text-slate-600">
                        <p>{fPhone}</p>
                        <p>{fEmail}</p>
                    </div>
                    <div className="w-1/3">
                        <h1 className="text-3xl font-bold text-[#1e1e1e] mb-2">{fName}</h1>
                        <h2 className="text-lg font-semibold" style={{ color: themeColor }}>{fTitle}</h2>
                    </div>
                    <div className="text-right w-1/3 text-sm space-y-1 font-medium text-slate-600">
                        <p>{fLocation}</p>
                        <p>{fLinkedin}</p>
                    </div>
                </div>

                <div className="w-2/3">
                    <p className="text-base text-slate-700 leading-relaxed font-medium">
                        {fSummary}
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8 flex-1">
                <div className="col-span-8 space-y-8">
                    <section>
                        <h3 className="text-2xl font-bold mb-5 text-slate-900 border-l-4 pl-3" style={{ borderColor: themeColor }}>Experience</h3>
                        <div className="space-y-6">
                            {displayExp.map((exp: any, i: number) => (
                                <div key={i} className="bg-white p-5 shadow-sm rounded border border-slate-100 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: themeColor }}></div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-800">{exp.jobTitle}</h4>
                                            <div className="text-base font-semibold" style={{ color: themeColor }}>{exp.companyName}</div>
                                        </div>
                                        <div className="text-sm font-semibold bg-slate-50 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
                                            {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                        </div>
                                    </div>
                                    <ul className="list-disc list-outside ml-4 mt-3 text-sm space-y-1 text-slate-600">
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

                <div className="col-span-4 space-y-8">
                    <section>
                        <h3 className="text-xl font-bold mb-4 text-slate-900 border-l-4 pl-3" style={{ borderColor: themeColor }}>Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {displaySkills.map((s: any, i: number) => (
                                <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-700 rounded transition-colors" style={{ ':hover': { backgroundColor: themeColor, color: 'white' } } as any}>
                                    {s.name}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-4 text-slate-900 border-l-4 pl-3" style={{ borderColor: themeColor }}>Education</h3>
                        <div className="space-y-4">
                            {displayEdu.map((edu: any, i: number) => (
                                <div key={i} className="bg-white p-4 shadow-sm rounded border border-slate-100">
                                    <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                                    <div className="text-slate-600 text-sm mt-1">{edu.schoolName}</div>
                                    <div className="text-xs font-semibold mt-2 text-slate-500">
                                        {edu.startDate} - {edu.endDate}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
