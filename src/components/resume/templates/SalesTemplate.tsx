import React from 'react';

export default function SalesTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, themeColor = "#ea580c" } = data; // Orange

    const fName = personalInfo?.fullName || 'Mark Johnson';
    const fTitle = personalInfo?.jobTitle || 'Senior Sales Executive';
    const fPhone = personalInfo?.phone || '(800) 555-1234';
    const fEmail = personalInfo?.email || 'mark.sales@example.com';
    const fLocation = personalInfo?.address || 'Miami, FL';
    const fLinkedin = personalInfo?.linkedin || 'linkedin.com/in/marksales';
    const fSummary = personalInfo?.summary || 'Dynamic and results-driven Sales Professional with 8 years of successful B2B enterprise sales experience. Expert in territory management, lead generation, and closing multi-million dollar contracts. Consistently ranked in the top 5% of sales representatives nationwide.';

    const displayExp = experience?.length > 0 ? experience : [
        {
            jobTitle: 'Enterprise Account Executive',
            companyName: 'TechSolutions Inc.',
            startDate: 'May 2019',
            endDate: 'Present',
            isCurrent: true,
            description: '• Exceeded annual sales quota by 140% in 2022, securing $4.2M in new ARR.\n• Successfully negotiated and closed a $1.5M enterprise agreement with a Fortune 500 client.\n• Developed and executed strategic territory plans to increase market share by 20% in the Southeast region.'
        }
    ];

    const displayEdu = education?.length > 0 ? education : [
        {
            degree: 'B.A. in Communications',
            schoolName: 'Florida State University',
            startDate: 'Sep 2011',
            endDate: 'May 2015'
        }
    ];

    const displaySkills = skills?.length > 0 ? skills : [
        { name: 'B2B Sales' }, { name: 'CRM (Salesforce)' }, { name: 'Contract Negotiation' }, { name: 'Pipeline Management' }
    ];

    return (
        <div className={`${data?.fontSize ? "resume-font-scale-" + data.fontSize : "resume-font-scale-medium"} w-full max-w-[210mm]  mx-auto bg-white text-slate-900 font-sans flex flex-col shadow-sm  bg-white print:p-0 print:w-full`}>
            <header className="border-b-8 shadow-sm flex items-center justify-between print:shadow-none" style={{ borderColor: themeColor }}>
                <div className="flex-1 print:shadow-none">
                    <h1 className="text-3xl font-bold mb-2 text-slate-900 print:shadow-none">
                        {fName}
                    </h1>
                    <h2 className="text-xl font-semibold print:shadow-none" style={{ color: themeColor }}>
                        {fTitle}
                    </h2>
                </div>
                <div className="text-right text-sm font-medium text-slate-600 bg-slate-50 p-4 rounded border border-slate-100 shadow-sm space-y-1 print:shadow-none">
                    <p>{fEmail}</p>
                    <p>{fPhone}</p>
                    <p>{fLocation}</p>
                    <p>{fLinkedin}</p>
                </div>
            </header>

            <div className="flex flex-col gap-8 flex-1 print:shadow-none">
                <section className="bg-slate-50 p-6 rounded border-l-4 shadow-sm print:shadow-none" style={{ borderColor: themeColor }}>
                    <h3 className="text-xl font-bold mb-2 text-slate-800 print:shadow-none">Executive Profile</h3>
                    <p className="text-base leading-relaxed text-slate-700 font-medium print:shadow-none">{fSummary}</p>
                </section>

                <div className="flex gap-8 print:shadow-none">
                    <div className="w-2/3 space-y-8 print:shadow-none">
                        <section>
                            <h3 className="text-xl font-bold mb-5 flex items-center gap-3 border-b pb-2 print:shadow-none">
                                <div className="p-1.5 rounded-sm print:shadow-none" style={{ backgroundColor: themeColor }}></div>
                                Key Accomplishments & Experience
                            </h3>
                            <div className="space-y-8 print:shadow-none">
                                {displayExp.map((exp: any, i: number) => (
                                    <div key={i} className="relative print:shadow-none">
                                        <div className="flex justify-between items-baseline mb-1 print:shadow-none">
                                            <h4 className="text-xl font-bold text-slate-900 print:shadow-none">{exp.jobTitle}</h4>
                                        </div>
                                        <div className="flex justify-between items-center mb-3 print:shadow-none">
                                            <div className="text-lg font-bold print:shadow-none" style={{ color: themeColor }}>{exp.companyName}</div>
                                            <div className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full print:shadow-none">
                                                {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                            </div>
                                        </div>
                                        <ul className="list-disc list-outside ml-5 text-base space-y-2 text-slate-700 font-medium print:shadow-none">
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
                    <div className="w-1/3 space-y-8 print:shadow-none">
                        <section>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2 print:shadow-none">
                                <div className="w-3 h-3 rounded-full print:shadow-none" style={{ backgroundColor: themeColor }}></div>
                                Core Skills
                            </h3>
                            <div className="flex flex-col gap-2 print:shadow-none">
                                {displaySkills.map((s: any, i: number) => (
                                    <div key={i} className="bg-slate-800 text-white px-4 py-2 rounded font-medium text-sm shadow-sm transition hover:scale-105 print:shadow-none">
                                        {s.name}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2 print:shadow-none">
                                <div className="w-3 h-3 rounded-full print:shadow-none" style={{ backgroundColor: themeColor }}></div>
                                Education
                            </h3>
                            <div className="space-y-4 print:shadow-none">
                                {displayEdu.map((edu: any, i: number) => (
                                    <div key={i} className="bg-slate-50 p-4 rounded border border-slate-100 print:shadow-none">
                                        <h4 className="font-bold text-slate-900 print:shadow-none">{edu.degree}</h4>
                                        <div className="text-slate-600 font-medium my-1 print:shadow-none">{edu.schoolName}</div>
                                        <div className="text-sm font-bold print:shadow-none" style={{ color: themeColor }}>
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
