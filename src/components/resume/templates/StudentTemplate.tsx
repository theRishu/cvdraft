import React from 'react';

export default function StudentTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, themeColor = "#0ea5e9" } = data; // Sky blue

    const fName = personalInfo?.fullName || 'Jason Miller';
    const fTitle = personalInfo?.jobTitle || 'Computer Science Student';
    const fPhone = personalInfo?.phone || '(555) 987-6543';
    const fEmail = personalInfo?.email || 'jason.miller@student.edu';
    const fLocation = personalInfo?.location || 'Boston, MA';
    const fGithub = personalInfo?.github || 'github.com/jmiller-dev';
    const fSummary = personalInfo?.summary || 'Highly motivated and Dean\'s List Computer Science junior seeking a summer software engineering internship. Passionate about web development, algorithms, and data structures. Eager to apply academic knowledge to real-world production environments and learn from experienced engineers.';

    const displayEdu = education?.length > 0 ? education : [
        {
            degree: 'Bachelor of Science in Computer Science',
            schoolName: 'Boston University',
            startDate: 'Sep 2022',
            endDate: 'May 2026 (Expected)'
        }
    ];

    // For students, "experience" could be projects or part-time jobs
    const displayExp = experience?.length > 0 ? experience : [
        {
            jobTitle: 'Teaching Assistant - Data Structures',
            companyName: 'Boston University',
            startDate: 'Jan 2024',
            endDate: 'Present',
            isCurrent: true,
            description: '• Host weekly office hours for 40+ students to explain complex concepts regarding trees, graphs, and dynamic programming.\n• Grade programming assignments written in Java and provide constructive feedback on code quality and efficiency.'
        }
    ];

    const displaySkills = skills?.length > 0 ? skills : [
        { name: 'Java' }, { name: 'Python' }, { name: 'JavaScript/TypeScript' }, { name: 'React' }, { name: 'Node.js' }
    ];

    return (
        <div className="w-full max-w-[210mm] min-h-[297mm] bg-white text-slate-800 font-sans p-8 mx-auto border shadow-sm flex flex-col items-center">
            <header className="w-full text-center border-b-2 pb-6 mb-8" style={{ borderColor: themeColor }}>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{fName}</h1>
                <h2 className="text-xl font-medium mb-4" style={{ color: themeColor }}>{fTitle}</h2>
                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-600">
                    <p>{fEmail}</p>
                    <p>•</p>
                    <p>{fPhone}</p>
                    <p>•</p>
                    <p>{fLocation}</p>
                    {fGithub && (
                        <>
                            <p>•</p>
                            <p>{fGithub}</p>
                        </>
                    )}
                </div>
            </header>

            <div className="w-full space-y-8 flex-1">
                <section>
                    <h3 className="text-lg font-bold border-b border-slate-200 mb-4 pb-1 text-slate-900" style={{ borderBottomColor: themeColor }}>Objective</h3>
                    <p className="text-base leading-relaxed text-slate-700 font-medium">{fSummary}</p>
                </section>

                <section>
                    <h3 className="text-lg font-bold border-b border-slate-200 mb-4 pb-1 text-slate-900" style={{ borderBottomColor: themeColor }}>Education</h3>
                    <div className="space-y-4">
                        {displayEdu.map((edu: any, i: number) => (
                            <div key={i} className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">{edu.schoolName}</h4>
                                    <div className="italic text-slate-700">{edu.degree}</div>
                                </div>
                                <div className="text-sm font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                                    {edu.startDate} - {edu.endDate}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-lg font-bold border-b border-slate-200 mb-4 pb-1 text-slate-900" style={{ borderBottomColor: themeColor }}>Experience / Projects</h3>
                    <div className="space-y-6">
                        {displayExp.map((exp: any, i: number) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="text-lg font-bold text-slate-900">{exp.jobTitle}</h4>
                                    <span className="text-sm font-bold text-slate-500">
                                        {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <div className="text-base font-semibold text-slate-700 mb-2" style={{ color: themeColor }}>{exp.companyName}</div>
                                <ul className="list-disc list-outside ml-5 text-sm space-y-1.5 text-slate-600">
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
                    <h3 className="text-lg font-bold border-b border-slate-200 mb-4 pb-1 text-slate-900" style={{ borderBottomColor: themeColor }}>Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {displaySkills.map((s: any, i: number) => (
                            <span key={i} className="px-3 py-1 bg-slate-100 border border-slate-200 text-sm font-semibold text-slate-700 rounded-md">
                                {s.name}
                            </span>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
