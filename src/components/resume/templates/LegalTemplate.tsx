import React from 'react';

export default function LegalTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, themeColor = "#1e293b" } = data; // Slate 800

    const fName = personalInfo?.fullName || 'James L. Harrison, Esq.';
    const fTitle = personalInfo?.jobTitle || 'Corporate Associate Attorney';
    const fPhone = personalInfo?.phone || '(212) 555-0198';
    const fEmail = personalInfo?.email || 'jharrison@legalfirm.com';
    const fLocation = personalInfo?.location || 'New York, NY';
    const fSummary = personalInfo?.summary || 'Driven and meticulous Corporate Associate with 4 years of experience specializing in mergers and acquisitions, corporate governance, and securities law. Proven track record of drafting complex commercial agreements and advising public and private clients on regulatory compliance.';

    const displayExp = experience?.length > 0 ? experience : [
        {
            jobTitle: 'Associate Attorney - Corporate Dept.',
            companyName: 'Smith, Davis & Moore LLP',
            startDate: 'Sep 2020',
            endDate: 'Present',
            isCurrent: true,
            description: '• Draft, review, and negotiate asset purchase agreements, stock purchase agreements, and disclosure schedules for M&A transactions up to $500M.\n• Advise public company clients on SEC reporting requirements, including 10-Ks, 10-Qs, and 8-Ks.\n• Conduct extensive legal research and prepare memoranda on corporate governance best practices.'
        }
    ];

    const displayEdu = education?.length > 0 ? education : [
        {
            degree: 'Juris Doctor (J.D.), Cum Laude',
            schoolName: 'Columbia Law School',
            startDate: 'Aug 2017',
            endDate: 'May 2020'
        }
    ];

    const displaySkills = skills?.length > 0 ? skills : [
        { name: 'Mergers & Acquisitions (M&A)' }, { name: 'Securities Regulation (SEC)' }, { name: 'Corporate Governance' }, { name: 'Contract Drafting & Negotiation' }
    ];

    return (
        <div className={`${data?.fontSize ? "resume-font-scale-" + data.fontSize : "resume-font-scale-medium"} w-full max-w-[210mm]  mx-auto bg-[#f8fafc] text-slate-900 font-serif border-x-8 border-x-white shadow-inner flex flex-col  bg-white print:p-0 print:w-full`}>
            <div className="p-8 border-2 m-4 bg-white flex-1 flex flex-col print:shadow-none" style={{ borderColor: themeColor }}>
                <header className="text-center border-b-2 pb-8 mb-8 print:shadow-none" style={{ borderColor: themeColor }}>
                    <h1 className="text-3xl font-bold mb-3 text-slate-800 print:shadow-none">{fName}</h1>
                    <h2 className="text-xl font-semibold mb-4 text-slate-600 print:shadow-none">{fTitle}</h2>
                    <div className="flex justify-center flex-wrap gap-4 text-sm font-sans text-slate-500 tracking-wide print:shadow-none">
                        <p>{fLocation}</p>
                        <span>|</span>
                        <p>{fPhone}</p>
                        <span>|</span>
                        <p>{fEmail}</p>
                    </div>
                </header>

                <div className="space-y-8 flex-1 print:shadow-none">
                    <section>
                        <h3 className="text-lg font-bold border-b border-slate-300 mb-4 pb-1 text-center print:shadow-none" style={{ color: themeColor }}>Profile</h3>
                        <p className="text-base leading-relaxed text-slate-700 text-justify print:shadow-none">{fSummary}</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold border-b border-slate-300 mb-4 pb-1 text-center print:shadow-none" style={{ color: themeColor }}>Legal Experience</h3>
                        <div className="space-y-6 print:shadow-none">
                            {displayExp.map((exp: any, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1 print:shadow-none">
                                        <h4 className="text-lg font-bold text-slate-800 print:shadow-none">{exp.companyName}</h4>
                                        <span className="text-sm font-sans font-medium text-slate-600 print:shadow-none">
                                            {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <div className="text-base font-semibold italic text-slate-700 mb-2 print:shadow-none">{exp.jobTitle}</div>
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

                    <section>
                        <h3 className="text-lg font-bold border-b border-slate-300 mb-4 pb-1 text-center print:shadow-none" style={{ color: themeColor }}>Education</h3>
                        <div className="space-y-4 text-center print:shadow-none">
                            {displayEdu.map((edu: any, i: number) => (
                                <div key={i}>
                                    <h4 className="font-bold text-slate-800 text-lg print:shadow-none">{edu.schoolName}</h4>
                                    <div className="text-slate-700 italic print:shadow-none">{edu.degree} — {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold border-b border-slate-300 mb-4 pb-1 text-center print:shadow-none" style={{ color: themeColor }}>Core Competencies</h3>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-base text-slate-700 print:shadow-none">
                            {displaySkills.map((s: any, i: number) => (
                                <span key={i} className="flex items-center gap-2 print:shadow-none">
                                    <span style={{ color: themeColor }}>§</span> {s.name}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
