import React from 'react';

export default function FinanceTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, themeColor = "#0f766e" } = data; // Teal

    const fName = personalInfo?.fullName || 'Alexander Wright';
    const fTitle = personalInfo?.jobTitle || 'Financial Analyst';
    const fPhone = personalInfo?.phone || '+1 415 555 0192';
    const fEmail = personalInfo?.email || 'a.wright@example.com';
    const fLocation = personalInfo?.location || 'San Francisco, CA';
    const fSummary = personalInfo?.summary || 'Detail-oriented Financial Analyst with 5 years of experience in corporate finance, financial modeling, and data analysis. Proven ability to identify cost-saving opportunities and improve financial reporting accuracy. Adept at creating complex Excel models to forecast revenue and expenses.';

    const displayExp = experience?.length > 0 ? experience : [
        {
            jobTitle: 'Senior Financial Analyst',
            companyName: 'Apex Capital Partners',
            startDate: 'Mar 2021',
            endDate: 'Present',
            isCurrent: true,
            description: '• Developed and maintained complex financial models for forecasting and budgeting.\n• Analyzed quarterly financial performance and presented findings to senior management.\n• Identified $1.2M in annual cost savings through rigorous expense analysis.'
        }
    ];

    const displayEdu = education?.length > 0 ? education : [
        {
            degree: 'Master of Business Administration (Finance)',
            schoolName: 'Stanford Graduate School of Business',
            startDate: 'Sep 2016',
            endDate: 'Jun 2018'
        }
    ];

    const displaySkills = skills?.length > 0 ? skills : [
        { name: 'Financial Modeling' }, { name: 'Data Analysis' }, { name: 'Forecasting & Budgeting' }, { name: 'Advanced Excel' }
    ];

    return (
        <div className="w-full max-w-[210mm] min-h-[297mm] mx-auto bg-white text-slate-900 font-serif flex flex-col shadow-sm">
            {/* Top Bar */}
            <div className="h-4 w-full" style={{ backgroundColor: themeColor }}></div>

            <div className="p-8 space-y-10 flex-1">
                <header className="flex justify-between items-center border-b-2 border-slate-200 pb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 text-slate-800">{fName}</h1>
                        <h2 className="text-xl font-medium text-slate-500">{fTitle}</h2>
                    </div>
                    <div className="text-right text-sm font-sans text-slate-600 space-y-1">
                        <p>{fPhone}</p>
                        <p>{fEmail}</p>
                        <p>{fLocation}</p>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-8 flex flex-col gap-8">
                        <section>
                            <h3 className="text-2xl font-bold border-b border-slate-200 mb-4 pb-2" style={{ color: themeColor }}>Professional Profile</h3>
                            <p className="text-base leading-relaxed text-slate-700 font-sans">{fSummary}</p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold border-b border-slate-200 mb-6 pb-2" style={{ color: themeColor }}>Experience</h3>
                            <div className="space-y-8">
                                {displayExp.map((exp: any, i: number) => (
                                    <div key={i} className="font-sans">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="text-xl font-bold text-slate-800">{exp.jobTitle}</h4>
                                            <span className="text-sm font-semibold text-slate-500">
                                                {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-lg font-bold text-slate-600 mb-3">{exp.companyName}</div>
                                        <ul className="list-disc list-outside ml-4 text-base space-y-2 text-slate-700">
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

                    <div className="col-span-4 flex flex-col gap-8">
                        <section>
                            <h3 className="text-xl font-bold border-b border-slate-200 mb-4 pb-2" style={{ color: themeColor }}>Expertise</h3>
                            <ul className="font-sans flex flex-col gap-3">
                                {displaySkills.map((s: any, i: number) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: themeColor }}></div>
                                        <span className="text-slate-700 font-medium">{s.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold border-b border-slate-200 mb-4 pb-2" style={{ color: themeColor }}>Education</h3>
                            <div className="space-y-6 font-sans">
                                {displayEdu.map((edu: any, i: number) => (
                                    <div key={i}>
                                        <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                                        <div className="text-slate-600 my-1">{edu.schoolName}</div>
                                        <div className="text-sm font-medium text-slate-500 italic">
                                            {edu.startDate} - {edu.endDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
