import React from 'react';

export default function ManagementTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, themeColor = "#334155" } = data;

    const fName = personalInfo?.fullName || 'Robert Vance';
    const fTitle = personalInfo?.jobTitle || 'General Manager';
    const fPhone = personalInfo?.phone || '+1 404 555 8899';
    const fEmail = personalInfo?.email || 'rvance.management@example.com';
    const fLocation = personalInfo?.address || 'Atlanta, GA';
    const fSummary = personalInfo?.summary || 'Results-oriented General Manager with over 10 years of experience turning around underperforming business units. Demonstrated excellence in building high-performance teams, streamlining operations, and consistently exceeding revenue goals. Skilled in budget administration, vendor negotiation, and talent development.';

    const displayExp = experience?.length > 0 ? experience : [
        {
            jobTitle: 'Regional General Manager',
            companyName: 'Lumber Logistics Corp.',
            startDate: 'Feb 2019',
            endDate: 'Present',
            isCurrent: true,
            description: '• Oversee P&L for a 5-state region generating $150M in annual revenue.\n• Implemented lean management principles that reduced warehouse operational costs by 22% within the first year.\n• Hired, trained, and mentored 4 district managers who subsequently achieved regional "Top Performer" status.'
        },
        {
            jobTitle: 'Operations Manager',
            companyName: 'Prime Distribution Services',
            startDate: 'Mar 2014',
            endDate: 'Jan 2019',
            isCurrent: false,
            description: '• Directed daily operations of a 500,000 sq. ft. distribution center with 200+ employees.\n• Negotiated new vendor contracts resulting in $450,000 in annual supply chain savings.\n• Spearheaded the implementation of a new inventory management system with 99.8% accuracy.'
        }
    ];

    const displayEdu = education?.length > 0 ? education : [
        {
            degree: 'Bachelor of Business Administration',
            schoolName: 'Emory University',
            startDate: 'Sep 2008',
            endDate: 'May 2012'
        }
    ];

    const displaySkills = skills?.length > 0 ? skills : [
        { name: 'P&L Accountability' }, { name: 'Team Leadership' }, { name: 'Performance Metrics (KPIs)' }, { name: 'Operations Management' }, { name: 'Vendor Relations' }, { name: 'Strategic Planning' }
    ];

    return (
        <div className={`${data?.fontSize ? "resume-font-scale-" + data.fontSize : "resume-font-scale-medium"} ${data?.headerSize ? "resume-header-scale-" + data.headerSize : "resume-header-scale-" + (data?.fontSize || "medium")} ${data?.headingSize ? "resume-heading-scale-" + data.headingSize : "resume-heading-scale-" + (data?.fontSize || "medium")} w-full max-w-[210mm]  mx-auto bg-white text-slate-800 font-sans shadow-sm flex flex-col  bg-white print:p-0 print:w-full`}>
            {/* Header Block */}
            <header className="text-center print:shadow-none" style={{ backgroundColor: themeColor, color: '#ffffff' }}>
                <h1 className="text-3xl font-serif mb-2 text-white print:shadow-none">{fName}</h1>
                <div className="w-16 h-1 bg-white mx-auto mb-3 opacity-50 print:shadow-none"></div>
                <h2 className="text-xl font-light mb-5 text-white print:shadow-none">{fTitle}</h2>
                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium opacity-90 text-white print:shadow-none">
                    <p>{fEmail}</p>
                    <p>•</p>
                    <p>{fPhone}</p>
                    <p>•</p>
                    <p>{fLocation}</p>
                </div>
            </header>

            <div className="flex-1 space-y-8 print:shadow-none">
                <section className="text-center px-4 print:shadow-none">
                    <p className="text-base leading-relaxed text-slate-600 italic print:shadow-none">"{fSummary}"</p>
                </section>

                <section>
                    <h3 className="text-2xl font-serif text-center mb-6 print:shadow-none" style={{ color: themeColor }}>Professional Journey</h3>
                    <div className="space-y-8 print:shadow-none">
                        {displayExp.map((exp: any, i: number) => (
                            <div key={i} className="border-b border-slate-200 pb-6 last:border-0 last:pb-0 print:shadow-none">
                                <div className="flex justify-between items-center mb-1 print:shadow-none">
                                    <h4 className="text-xl font-bold text-slate-900 print:shadow-none">{exp.jobTitle}</h4>
                                    <span className="text-sm font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-600 whitespace-nowrap ml-4 print:shadow-none">
                                        {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <div className="text-lg text-slate-500 font-medium italic mb-3 print:shadow-none">{exp.companyName}</div>
                                <ul className="list-disc list-outside ml-6 text-base space-y-1.5 text-slate-700 print:shadow-none">
                                    {exp.description?.split('\n').map((line: string, j: number) => {
                                        const cleanLine = line.replace(/^[\s•\-\*]+\s*/, '');
                                        return cleanLine && <li key={j}>{cleanLine}</li>;
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-2 gap-8 print:shadow-none">
                    <section>
                        <h3 className="text-xl font-serif mb-4 border-b border-slate-300 pb-2 print:shadow-none" style={{ color: themeColor }}>Areas of Expertise</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 print:shadow-none">
                            {displaySkills.map((s: any, i: number) => (
                                <li key={i} className="text-sm font-medium text-slate-700 flex items-center gap-2 print:shadow-none">
                                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 print:shadow-none" style={{ backgroundColor: themeColor }}></div>
                                    <span>{s.name}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl font-serif mb-4 border-b border-slate-300 pb-2 print:shadow-none" style={{ color: themeColor }}>Education</h3>
                        <div className="space-y-4 print:shadow-none">
                            {displayEdu.map((edu: any, i: number) => (
                                <div key={i}>
                                    <h4 className="font-bold text-slate-800 text-base print:shadow-none">{edu.degree}</h4>
                                    <div className="text-slate-600 text-sm print:shadow-none">{edu.schoolName}</div>
                                    <div className="text-xs text-slate-500 italic mt-1 font-medium print:shadow-none">
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
