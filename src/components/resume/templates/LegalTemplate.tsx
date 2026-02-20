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
        <div className="w-full max-w-[210mm] min-h-[297mm] mx-auto bg-[#f8fafc] text-slate-900 font-serif border-x-8 border-x-white shadow-inner flex flex-col">
            <div className="p-8 border-2 m-4 bg-white flex-1 flex flex-col" style={{ borderColor: themeColor }}>
                <header className="text-center border-b-2 pb-8 mb-8" style={{ borderColor: themeColor }}>
                    <h1 className="text-3xl font-bold mb-3 text-slate-800">{fName}</h1>
                    <h2 className="text-xl font-semibold mb-4 text-slate-600">{fTitle}</h2>
                    <div className="flex justify-center flex-wrap gap-4 text-sm font-sans text-slate-500 tracking-wide">
                        <p>{fLocation}</p>
                        <span>|</span>
                        <p>{fPhone}</p>
                        <span>|</span>
                        <p>{fEmail}</p>
                    </div>
                </header>

                <div className="space-y-8 flex-1">
                    <section>
                        <h3 className="text-lg font-bold border-b border-slate-300 mb-4 pb-1 text-center" style={{ color: themeColor }}>Profile</h3>
                        <p className="text-base leading-relaxed text-slate-700 text-justify">{fSummary}</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold border-b border-slate-300 mb-4 pb-1 text-center" style={{ color: themeColor }}>Legal Experience</h3>
                        <div className="space-y-6">
                            {displayExp.map((exp: any, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="text-lg font-bold text-slate-800">{exp.companyName}</h4>
                                        <span className="text-sm font-sans font-medium text-slate-600">
                                            {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <div className="text-base font-semibold italic text-slate-700 mb-2">{exp.jobTitle}</div>
                                    <ul className="list-disc list-outside ml-5 text-base space-y-1.5 text-slate-700">
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
                        <h3 className="text-lg font-bold border-b border-slate-300 mb-4 pb-1 text-center" style={{ color: themeColor }}>Education</h3>
                        <div className="space-y-4 text-center">
                            {displayEdu.map((edu: any, i: number) => (
                                <div key={i}>
                                    <h4 className="font-bold text-slate-800 text-lg">{edu.schoolName}</h4>
                                    <div className="text-slate-700 italic">{edu.degree} — {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold border-b border-slate-300 mb-4 pb-1 text-center" style={{ color: themeColor }}>Core Competencies</h3>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-base text-slate-700">
                            {displaySkills.map((s: any, i: number) => (
                                <span key={i} className="flex items-center gap-2">
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
