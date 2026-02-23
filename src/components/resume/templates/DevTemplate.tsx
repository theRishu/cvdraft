import React from 'react';

export default function DevTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, themeColor = "#10b981" } = data; // Emerald

    const fName = personalInfo?.fullName || 'Linus Fisher';
    const fTitle = personalInfo?.jobTitle || 'Full Stack Engineer';
    const fEmail = personalInfo?.email || 'linus.dev@example.com';
    const fGithub = personalInfo?.github || 'github.com/linus-codes';
    const fLinkedin = personalInfo?.linkedin || 'linkedin.com/in/linusfisher';
    const fLocation = personalInfo?.address || 'Seattle, WA';
    const fSummary = personalInfo?.summary || 'Full Stack Engineer with a passion for designing and building highly scalable, distributed systems. 5 years of experience developing robust microservices in Go and Node.js, and crafting responsive frontends with React. Strong advocate for clean code principles, test-driven development, and CI/CD.';

    const displayExp = experience?.length > 0 ? experience : [
        {
            jobTitle: 'Senior Software Engineer',
            companyName: 'CloudScale Technologies',
            startDate: 'Jan 2021',
            endDate: 'Present',
            isCurrent: true,
            description: '• Architected and developed a high-throughput data processing pipeline using Apache Kafka and Go, handling 1B+ events/day.\n• Migrated legacy monolithic architecture to Kubernetes-orchestrated microservices.'
        }
    ];

    const displayEdu = education?.length > 0 ? education : [
        {
            degree: 'B.S. Computer Science',
            schoolName: 'University of Washington',
            startDate: 'Sep 2014',
            endDate: 'Jun 2018'
        }
    ];

    const displaySkills = skills?.length > 0 ? skills : [
        { name: 'JavaScript/TypeScript' }, { name: 'Go (Golang)' }, { name: 'React.js' }, { name: 'Node.js' }, { name: 'PostgreSQL' }
    ];

    return (
        <div className={`${data?.fontSize ? "resume-font-scale-" + data.fontSize : "resume-font-scale-medium"} w-full max-w-[210mm]  mx-auto bg-white text-slate-800 font-mono shadow-sm flex flex-col  bg-white print:p-0 print:w-full`}>
            <header className="mb-8 border-b-2 border-slate-200 pb-8 print:shadow-none">
                <div className="flex justify-between items-center print:shadow-none">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 print:shadow-none">
                            <span style={{ color: themeColor }}>&lt;</span>
                            {fName}
                            <span style={{ color: themeColor }}>/&gt;</span>
                        </h1>
                        <h2 className="text-xl text-slate-500 print:shadow-none">{fTitle}</h2>
                    </div>
                    <div className="text-right text-sm text-slate-600 space-y-1 print:shadow-none">
                        <p>{fEmail}</p>
                        <p>{fGithub}</p>
                        <p>{fLinkedin}</p>
                        <p>{fLocation}</p>
                    </div>
                </div>
            </header>

            <div className="space-y-8 flex-1 print:shadow-none">
                <section>
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-slate-600 print:shadow-none">
                        <span className="w-4 h-4 rounded-sm print:shadow-none" style={{ backgroundColor: themeColor }}></span>
                        Summary
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-700 bg-slate-50 p-4 border border-slate-100 rounded-md shadow-inner print:shadow-none">
                        {fSummary}
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-slate-600 print:shadow-none">
                        <span className="w-4 h-4 rounded-sm print:shadow-none" style={{ backgroundColor: themeColor }}></span>
                        Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2 print:shadow-none">
                        {displaySkills.map((s: any, i: number) => (
                            <span key={i} className="text-sm px-2 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded print:shadow-none">
                                {s.name}
                            </span>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-lg font-bold mb-5 flex items-center gap-2 text-slate-600 print:shadow-none">
                        <span className="w-4 h-4 rounded-sm print:shadow-none" style={{ backgroundColor: themeColor }}></span>
                        Experience
                    </h3>
                    <div className="space-y-6 print:shadow-none">
                        {displayExp.map((exp: any, i: number) => (
                            <div key={i} className="group print:shadow-none">
                                <div className="flex justify-between items-baseline mb-2 print:shadow-none">
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-800 inline-block mr-2 print:shadow-none">{exp.jobTitle}</h4>
                                        <span className="text-sm text-slate-500 font-medium px-2 py-0.5 rounded print:shadow-none" style={{ backgroundColor: `${themeColor}20`, color: themeColor }}>
                                            @ {exp.companyName}
                                        </span>
                                    </div>
                                    <span className="text-sm text-slate-400 print:shadow-none">
                                        {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <ul className="list-none text-sm space-y-2 text-slate-700 ml-2 print:shadow-none">
                                    {exp.description?.split('\n').map((line: string, j: number) => {
                                        const cleanLine = line.replace(/^[\s•\-\*]+\s*/, '');
                                        return cleanLine && (
                                            <li key={j} className="flex gap-2 print:shadow-none">
                                                <span style={{ color: themeColor }} className="mt-0.5 print:shadow-none">→</span>
                                                <span>{cleanLine}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-600 print:shadow-none">
                        <span className="w-4 h-4 rounded-sm print:shadow-none" style={{ backgroundColor: themeColor }}></span>
                        Education
                    </h3>
                    <div className="grid grid-cols-2 gap-4 print:shadow-none">
                        {displayEdu.map((edu: any, i: number) => (
                            <div key={i} className="p-4 border border-slate-200 rounded-md bg-white print:shadow-none">
                                <h4 className="font-bold text-slate-800 text-sm mb-1 print:shadow-none">{edu.degree}</h4>
                                <div className="text-slate-600 text-sm print:shadow-none">{edu.schoolName}</div>
                                <div className="text-xs text-slate-400 mt-2 font-semibold print:shadow-none">
                                    {edu.startDate} — {edu.endDate}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
