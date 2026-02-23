import React from 'react';

export default function ExecutiveTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, themeColor = "#1e3a8a" } = data;

    // Fallbacks
    const fName = personalInfo?.fullName || 'John Doe';
    const fTitle = personalInfo?.jobTitle || 'Chief Executive Officer';
    const fPhone = personalInfo?.phone || '+1 555-0100';
    const fEmail = personalInfo?.email || 'john.doe@example.com';
    const fLocation = personalInfo?.address || 'San Francisco, CA';
    const fLinkedin = personalInfo?.linkedin || 'linkedin.com/in/johndoe';
    const fSummary = personalInfo?.summary || 'Visionary Executive with 15+ years of experience in driving business growth, leading cross-functional teams, and executing strategic initiatives. Proven track record of improving operational efficiency by 30% and scaling revenue from $5M to $50M within 3 years.';

    const displayExp = experience?.length > 0 ? experience : [
        {
            jobTitle: 'Chief Operating Officer',
            companyName: 'Global Enterprises Inc.',
            startDate: 'Jan 2018',
            endDate: 'Present',
            isCurrent: true,
            description: '• Directed comprehensive transition in global supply chain operations, successfully reducing overhead costs by 18%.\n• Championed a digital transformation initiative impacting 5,000+ employees and accelerating product time-to-market by 25%.\n• Managed P&L for a $200M division and restructured underperforming assets to achieve consecutive years of profitability.'
        }
    ];

    const displayEdu = education?.length > 0 ? education : [
        {
            degree: 'Master of Business Administration (MBA)',
            schoolName: 'Harvard Business School',
            startDate: 'Sep 2008',
            endDate: 'May 2010'
        }
    ];

    const displaySkills = skills?.length > 0 ? skills : [
        { name: 'Strategic Planning' }, { name: 'P&L Management' }, { name: 'Organizational Leadership' }
    ];

    const displayLanguages = data.languages?.length > 0 ? data.languages : [
        { name: 'English', level: 'Native' }, { name: 'Spanish', level: 'Fluent' }
    ];

    return (
        <div className={`${data?.fontSize ? "resume-font-scale-" + data.fontSize : "resume-font-scale-medium"} font-sans text-slate-800 w-full max-w-[210mm]  mx-auto bg-slate-50 flex flex-col shadow-sm  bg-white print:p-0 print:w-full`}>
            <header className="border-b-2 pb-6 mb-6 print:shadow-none" style={{ borderColor: themeColor }}>
                <div className="flex justify-between items-end print:shadow-none">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-1 print:shadow-none">
                            {fName}
                        </h1>
                        <h2 className="text-xl font-medium print:shadow-none" style={{ color: themeColor }}>
                            {fTitle}
                        </h2>
                    </div>
                    <div className="text-right text-sm space-y-1 text-slate-600 font-medium print:shadow-none">
                        <p>{fEmail}</p>
                        <p>{fPhone}</p>
                        <p>{fLocation}</p>
                        <p>{fLinkedin}</p>
                    </div>
                </div>
            </header>

            <div className="flex gap-8 flex-1 print:shadow-none">
                <div className="w-[65%] space-y-6 print:shadow-none">
                    <section>
                        <h3 className="text-lg font-bold text-slate-900 border-b pb-1 mb-3 print:shadow-none" style={{ borderBottomColor: themeColor }}>Profile</h3>
                        <p className="text-base leading-relaxed text-slate-700 print:shadow-none">{fSummary}</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-slate-900 border-b pb-1 mb-4 print:shadow-none" style={{ borderBottomColor: themeColor }}>Professional Experience</h3>
                        <div className="space-y-6 print:shadow-none">
                            {displayExp.map((exp: any, i: number) => (
                                <div key={i} className="relative print:shadow-none">
                                    <div className="flex justify-between items-baseline mb-1 print:shadow-none">
                                        <h4 className="text-xl font-bold text-slate-800 print:shadow-none">{exp.jobTitle}</h4>
                                        <span className="text-sm font-semibold print:shadow-none" style={{ color: themeColor }}>
                                            {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <div className="text-lg font-medium text-slate-600 mb-2 print:shadow-none">{exp.companyName}</div>
                                    <ul className="list-disc list-outside ml-5 text-base space-y-1.5 text-slate-700 print:shadow-none">
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

                <div className="w-[35%] space-y-6 print:shadow-none">
                    <section>
                        <h3 className="text-lg font-bold text-slate-900 border-b pb-1 mb-3 print:shadow-none" style={{ borderBottomColor: themeColor }}>Core Competencies</h3>
                        <div className="flex flex-wrap gap-2 print:shadow-none">
                            {displaySkills.map((s: any, i: number) => (
                                <span key={i} className="px-3 py-1 bg-white border border-slate-200 shadow-sm text-sm font-medium rounded-md text-slate-700 print:shadow-none">
                                    {s.name}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-slate-900 border-b pb-1 mb-3 print:shadow-none" style={{ borderBottomColor: themeColor }}>Education</h3>
                        <div className="space-y-4 print:shadow-none">
                            {displayEdu.map((edu: any, i: number) => (
                                <div key={i}>
                                    <h4 className="font-bold text-slate-800 print:shadow-none">{edu.degree}</h4>
                                    <div className="text-slate-600 text-sm print:shadow-none">{edu.schoolName}</div>
                                    <div className="text-sm font-medium mt-1 print:shadow-none" style={{ color: themeColor }}>
                                        {edu.startDate} – {edu.endDate}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-slate-900 border-b pb-1 mb-3 print:shadow-none" style={{ borderBottomColor: themeColor }}>Languages</h3>
                        <div className="space-y-2 print:shadow-none">
                            {displayLanguages.map((l: any, i: number) => (
                                <div key={i} className="flex justify-between items-center text-sm print:shadow-none">
                                    <span className="font-medium text-slate-700 print:shadow-none">{l.name}</span>
                                    <span className="text-slate-500 print:shadow-none">{l.level}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
