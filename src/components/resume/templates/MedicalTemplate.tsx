import React from 'react';

export default function MedicalTemplate({ data }: { data: any }) {
    const { personalInfo, experience, education, skills, themeColor = "#0284c7" } = data; // Light Blue

    const fName = personalInfo?.fullName || 'Dr. Emily Chen, MD';
    const fTitle = personalInfo?.jobTitle || 'Attending Physician';
    const fPhone = personalInfo?.phone || '(555) 123-4567';
    const fEmail = personalInfo?.email || 'echen.md@example.com';
    const fLocation = personalInfo?.location || 'Chicago, IL';
    const fSummary = personalInfo?.summary || 'Dedicated and compassionate Board-Certified Internal Medicine Physician with over 8 years of clinical experience. Proven expertise in diagnosing and treating complex medical conditions, providing preventative care, and managing chronic diseases. Committed to delivering patient-centered care and improving health outcomes.';

    const displayExp = experience?.length > 0 ? experience : [
        {
            jobTitle: 'Attending Physician, Internal Medicine',
            companyName: 'Northwestern Memorial Hospital',
            startDate: 'Jul 2018',
            endDate: 'Present',
            isCurrent: true,
            description: '• Provide comprehensive primary care and manage acute/chronic conditions for a diverse patient panel of 2,000+ individuals.\n• Lead a multidisciplinary clinical team to improve preventative screening rates by 25%.\n• Serve as a preceptor for medical students and internal medicine residents.'
        },
        {
            jobTitle: 'Internal Medicine Resident',
            companyName: 'University of Chicago Medical Center',
            startDate: 'Jul 2015',
            endDate: 'Jun 2018',
            isCurrent: false,
            description: '• Completed required rotations in general internal medicine, ICU, cardiology, and other subspecialties.\n• Managed diagnostic workups, treatments, and discharge planning for admitted patients.\n• Participated in monthly morbidity and mortality conferences and delivered case presentations.'
        }
    ];

    const displayEdu = education?.length > 0 ? education : [
        {
            degree: 'Doctor of Medicine (M.D.)',
            schoolName: 'Johns Hopkins University School of Medicine',
            startDate: 'Aug 2011',
            endDate: 'May 2015'
        },
        {
            degree: 'Bachelor of Science in Biology',
            schoolName: 'University of Michigan',
            startDate: 'Sep 2007',
            endDate: 'May 2011'
        }
    ];

    const displaySkills = skills?.length > 0 ? skills : [
        { name: 'Internal Medicine' }, { name: 'Preventative Care' }, { name: 'Chronic Disease Management' }, { name: 'Electronic Health Records (Epic)' }, { name: 'Patient Education' }, { name: 'Clinical Diagnostics' }
    ];

    return (
        <div className="w-full max-w-[210mm] min-h-[297mm] mx-auto bg-white text-slate-800 font-sans border-t-8 shadow-sm" style={{ borderTopColor: themeColor }}>
            <div className="p-8">
                <header className="flex items-center gap-8 border-b-2 border-slate-100 pb-10 mb-10">
                    {/* Placeholder for Photo if requested later, using initial instead */}
                    <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-md flex-shrink-0" style={{ backgroundColor: themeColor }}>
                        {fName.charAt(0)}
                    </div>

                    <div className="flex-1 flex justify-between items-end">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{fName}</h1>
                            <h2 className="text-xl font-medium" style={{ color: themeColor }}>{fTitle}</h2>
                        </div>
                        <div className="text-right text-sm font-medium text-slate-500 space-y-1">
                            <p>{fPhone}</p>
                            <p>{fEmail}</p>
                            <p>{fLocation}</p>
                        </div>
                    </div>
                </header>

                <div className="space-y-10">
                    <section>
                        <h3 className="text-xl font-semibold  tracking-wider mb-4 text-slate-900 flex items-center gap-3">
                            <span className="w-8 h-[2px]" style={{ backgroundColor: themeColor }}></span>
                            Professional Summary
                        </h3>
                        <p className="text-base leading-relaxed text-slate-700 ml-11">{fSummary}</p>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold  tracking-wider mb-6 text-slate-900 flex items-center gap-3">
                            <span className="w-8 h-[2px]" style={{ backgroundColor: themeColor }}></span>
                            Clinical Experience
                        </h3>
                        <div className="space-y-8 ml-11 border-l-2 border-slate-200 pl-6">
                            {displayExp.map((exp: any, i: number) => (
                                <div key={i} className="relative">
                                    <div className="absolute w-4 h-4 rounded-full -left-[33px] top-1 border-4 border-white" style={{ backgroundColor: themeColor }} />
                                    <h4 className="text-xl font-bold text-slate-800 mb-1">{exp.jobTitle}</h4>
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="text-lg font-medium text-slate-600">{exp.companyName}</div>
                                        <div className="text-sm font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded">
                                            {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                        </div>
                                    </div>
                                    <ul className="list-disc list-outside ml-4 text-base space-y-2 text-slate-600">
                                        {exp.description?.split('\n').map((line: string, j: number) => {
                                            const cleanLine = line.replace(/^[\s•\-\*]+\s*/, '');
                                            return cleanLine && <li key={j}>{cleanLine}</li>;
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="grid grid-cols-2 gap-8 ml-11">
                        <section>
                            <h3 className="text-xl font-semibold  tracking-wider mb-4 text-slate-900 flex items-center gap-2">
                                Education & Training
                            </h3>
                            <div className="space-y-5">
                                {displayEdu.map((edu: any, i: number) => (
                                    <div key={i}>
                                        <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                                        <div className="text-slate-600">{edu.schoolName}</div>
                                        <div className="text-sm text-slate-500 mt-1">
                                            {edu.startDate} - {edu.endDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold  tracking-wider mb-4 text-slate-900 flex items-center gap-2">
                                Clinical Competencies
                            </h3>
                            <div className="flex flex-col gap-2">
                                {displaySkills.map((s: any, i: number) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <svg className="w-4 h-4" style={{ color: themeColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-base text-slate-700 font-medium">{s.name}</span>
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
