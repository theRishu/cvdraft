import React, { useState } from "react";
import { Sparkles, Brain, PieChart, Star, Search, ChevronRight, Loader2, Target, CheckCircle2, Briefcase, Github, Globe, FileEdit, Copy } from "lucide-react";

export default function CareerTools({
    data,
    interviewQuestions,
    setInterviewQuestions,
    isPredicting,
    setIsPredicting,
    provider = "gemini",
}: {
    data: any,
    interviewQuestions: string[],
    setInterviewQuestions: (q: string[]) => void,
    isPredicting: boolean,
    setIsPredicting: (b: boolean) => void,
    provider?: string,
}) {
    const aiBody = (extra: object) => JSON.stringify({
        provider,
        ...extra,
    });
    const [jd, setJd] = useState("");
    const [tailorResult, setTailorResult] = useState<any>(null);
    const [isTailoring, setIsTailoring] = useState(false);
    const [gapReason, setGapReason] = useState("");
    const [gapResult, setGapResult] = useState("");
    const [isFraming, setIsFraming] = useState(false);
    const [ghUser, setGhUser] = useState("");
    const [ghRepos, setGhRepos] = useState<any[]>([]);
    const [isGhLoading, setIsGhLoading] = useState(false);
    const [coverLetterJD, setCoverLetterJD] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [isGeneratingCL, setIsGeneratingCL] = useState(false);
    const [clCopied, setClCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<"ats" | "interview" | "tailor" | "cover" | "gap" | "github">("ats");

    // ATS Scores Calculation
    const calculateAtsScore = () => {
        let score = 0;
        const checks = [];

        // Core Sections (Weighted towards presence AND quality)
        if (data.experience?.length > 0) {
            const expScore = Math.min(25, data.experience.length * 10);
            score += expScore;
            checks.push("Work History Added");
        } else {
            checks.push("Missing Experience");
        }

        if (data.skills?.length >= 5) { score += 15; checks.push("Solid Skills Base"); }
        else if (data.skills?.length > 0) { score += 5; checks.push("Needs More Skills"); }

        if (data.education?.length > 0) { score += 15; checks.push("Education Listed"); }

        if (data.personalInfo?.summary && data.personalInfo.summary.length > 50) {
            score += 15; checks.push("Strong Summary");
        } else if (data.personalInfo?.summary) {
            score += 5; checks.push("Summary Too Short");
        }

        if (data.personalInfo?.email && data.personalInfo?.phone) {
            score += 10; checks.push("Contact Reachable");
        }

        // Keywords and Density
        const totalWords = JSON.stringify(data).split(/\s+/).length;
        if (totalWords >= 450) { score += 10; checks.push("Optimal Word Density"); }
        else if (totalWords >= 250) { score += 5; checks.push("Good Word Density"); }

        // Formatting
        if (["Inter", "Roboto", "Open Sans", "Arial", "Calibri"].some(f => data.layout?.fontFamily?.includes(f))) {
            score += 10; checks.push("ATS-Standard Font");
        }

        return { score: Math.min(100, score), checks };
    };

    const atsResults = calculateAtsScore();

    const handlePredict = async () => {
        // Removed local anyKey check, allow backend to validate if DB has keys
        setIsPredicting(true);
        try {
            const prompt = `Based on the following resume data, predict 10 specific behavioral and technical interview questions a hiring manager might ask. Return the questions as a simple JSON array of strings.
            
            Resume Data: ${JSON.stringify(data)}`;

            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: aiBody({ prompt }),
            });

            if (res.ok) {
                const result = await res.json();
                if (Array.isArray(result)) setInterviewQuestions(result);
                else if (result.questions) setInterviewQuestions(result.questions);
            }
        } catch (error) {
            console.error("Failed to predict questions", error);
        } finally {
            setIsPredicting(false);
        }
    };

    const handleTailor = async () => {
        // Removed local anyKey check, allow backend to validate if DB has keys
        if (!jd) return alert("Please paste a job description first.");
        setIsTailoring(true);
        try {
            const prompt = `Analyze this resume against the provided job description. 
            Return a JSON object: { score: number, keywords: string[], improvements: string[] }
            Job Description: ${jd}
            Resume Data: ${JSON.stringify(data)}`;

            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: aiBody({ prompt }),
            });

            if (res.ok) {
                const result = await res.json();
                setTailorResult(result);
            }
        } catch (error) {
            console.error("Failed to tailor resume", error);
        } finally {
            setIsTailoring(false);
        }
    };

    const handleFrameGap = async () => {
        // Removed local anyKey check, allow backend to validate if DB has keys
        if (!gapReason) return alert("Please describe your gap first.");
        setIsFraming(true);
        try {
            const prompt = `Help me frame a career gap in my resume positively. Gap Reason: ${gapReason}. Provide a short, professional explanation.`;
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: aiBody({ prompt }),
            });
            if (res.ok) {
                const result = await res.json();
                setGapResult(typeof result === 'string' ? result : result.text || "");
            }
        } catch (error) {
            console.error("Failed to frame gap", error);
        } finally {
            setIsFraming(false);
        }
    };

    const handleGhSync = async () => {
        if (!ghUser) return;
        setIsGhLoading(true);
        try {
            const res = await fetch(`https://api.github.com/users/${ghUser}/repos?sort=updated&per_page=5`);
            if (res.ok) {
                const data = await res.json();
                setGhRepos(data);
            }
        } catch (err) {
            console.error("Github sync failed", err);
        } finally {
            setIsGhLoading(false);
        }
    };

    const skills = data.skills || [];
    const experience = data.experience || [];
    const skillStats = skills.map((skill: any) => {
        const skillName = typeof skill === 'string' ? skill : skill.name;
        const mentions = experience.filter((exp: any) =>
            exp.description?.toLowerCase().includes(skillName.toLowerCase())
        ).length;
        return { name: skillName, level: Math.min(100, (mentions * 25) + 25) };
    }).sort((a: any, b: any) => b.level - a.level).slice(0, 6);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
                    <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                </div>
                <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">AI Career Tools</h3>
                    <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Next-Gen Insights</p>
                </div>
            </div>

            {/* Part 0: ATS Heatmap & Parsability */}
            <div className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-slate-100 shadow-sm relative overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center text-center sm:text-left">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100 sm:hidden" />
                            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 hidden sm:block" />

                            <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={314.15} strokeDashoffset={314.15 - (314.15 * atsResults.score) / 100} className={`transition-all duration-1000 sm:hidden ${atsResults.score >= 80 ? 'text-green-500' : 'text-blue-500'}`} />
                            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * atsResults.score) / 100} className={`transition-all duration-1000 hidden sm:block ${atsResults.score >= 80 ? 'text-green-500' : 'text-blue-500'}`} />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl sm:text-2xl font-black text-slate-900">{atsResults.score}</span>
                            <span className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest">ATS Score</span>
                        </div>
                    </div>
                    <div className="flex-1 space-y-4">
                        <h4 className="text-[10px] sm:text-sm font-black text-slate-900 uppercase tracking-widest">ATS Parsability Check</h4>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                            {atsResults.checks.map((check, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[9px] sm:text-[10px] font-bold text-slate-600">
                                    <CheckCircle2 className="w-3 h-3 text-green-500" /> {check}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Part 1: Skill Matrix */}
            <div className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity hidden sm:block"><PieChart className="w-32 h-32 text-slate-900" /></div>
                <div className="relative z-10">
                    <h4 className="text-[10px] sm:text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Automated Skill Matrix</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {skillStats.map((skill: { name: string, level: number }, idx: number) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-slate-500">
                                    <span>{skill.name}</span>
                                    <span className="text-blue-600">{skill.level}%</span>
                                </div>
                                <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${skill.level}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Part 2: Interview Predictor */}
            <div className="bg-slate-900 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                        <div>
                            <h4 className="text-base sm:text-lg font-black tracking-tight uppercase">Interview Predictor</h4>
                            <p className="text-slate-400 text-[10px] sm:text-xs font-medium">AI predicts 10 likely questions based on your resume.</p>
                        </div>
                        <button onClick={handlePredict} disabled={isPredicting} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-purple-400 transition-all active:scale-95">
                            {isPredicting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                            {isPredicting ? "Analyzing..." : "Predict Questions"}
                        </button>
                    </div>
                    {interviewQuestions.length > 0 && (
                        <div className="space-y-3">
                            {interviewQuestions.map((q, idx) => (
                                <div key={idx} className="p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/5 text-xs sm:text-sm font-medium leading-relaxed">{q}</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Part 3: Job Tailoring */}
            <div className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-slate-100 shadow-sm">
                <div className="space-y-6">
                    <h4 className="text-[10px] sm:text-sm font-black text-slate-900 uppercase tracking-widest">Job Micro-Tailoring</h4>
                    <textarea value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Paste job description here..." rows={4} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl sm:rounded-2xl px-4 py-3 text-sm outline-none transition-all focus:border-slate-900 resize-none" />
                    <button onClick={handleTailor} disabled={isTailoring || !jd} className="w-full py-3.5 sm:py-4 bg-slate-900 text-white rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95">
                        {isTailoring ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 inline mr-2" />}
                        {isTailoring ? "Tailoring..." : "Analyze Alignment"}
                    </button>
                    {tailorResult && (
                        <div className="pt-6 space-y-4">
                            <div className="flex justify-between font-black uppercase text-[10px]"><span>Match Score</span><span className="text-blue-600 font-black">{tailorResult.score}%</span></div>
                            <div className="flex flex-wrap gap-2">
                                {tailorResult.keywords?.map((k: string, i: number) => <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-[9px] sm:text-[10px] font-bold rounded-lg border border-blue-100">+{k}</span>)}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Part 4: Career Gap Framer */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-slate-200/50">
                <div className="space-y-6">
                    <h4 className="text-[10px] sm:text-sm font-black text-slate-900 uppercase tracking-widest">Career Gap Framer</h4>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input type="text" value={gapReason} onChange={(e) => setGapReason(e.target.value)} placeholder="e.g. 1 year family sabbatical" className="flex-1 bg-white border-2 border-slate-100 rounded-xl sm:rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-slate-900 transition-all" />
                        <button onClick={handleFrameGap} disabled={isFraming || !gapReason} className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95">
                            {isFraming ? <Loader2 className="w-4 h-4 animate-spin" /> : "Frame"}
                        </button>
                    </div>
                    {gapResult && (
                        <div className="p-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200">
                            <p className="text-xs text-slate-600 italic leading-relaxed">"{gapResult}"</p>
                        </div>
                    )}
                </div>
            </div>
            {/* Part 5: GitHub Sync (New) */}
            <div className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-slate-100 shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity hidden sm:block">
                    <Github className="w-24 h-24 text-slate-900" />
                </div>

                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 rounded-lg sm:rounded-xl shadow-lg shadow-slate-900/10">
                            <Github className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <h4 className="text-[10px] sm:text-sm font-black text-slate-900 uppercase tracking-widest">Live GitHub Sync</h4>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            value={ghUser}
                            onChange={(e) => setGhUser(e.target.value)}
                            placeholder="GitHub Username"
                            className="flex-1 bg-slate-50 border-2 border-slate-100 focus:border-slate-900 focus:bg-white rounded-xl sm:rounded-2xl px-4 py-3 text-sm font-bold outline-none transition-all duration-300"
                        />
                        <button
                            onClick={handleGhSync}
                            disabled={isGhLoading || !ghUser}
                            className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                        >
                            {isGhLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sync"}
                        </button>
                    </div>

                    {ghRepos.length > 0 && (
                        <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
                            <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Latest Repositories</p>
                            {ghRepos.map((repo: any) => (
                                <div key={repo.id} className="p-3 sm:p-4 bg-slate-50/50 hover:bg-white rounded-xl sm:rounded-2xl border border-slate-100 flex items-center justify-between group transition-all hover:shadow-md">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[11px] sm:text-xs font-black text-slate-900 truncate">{repo.name}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                            <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold truncate">{repo.language || "GitHub Project"}</p>
                                        </div>
                                    </div>
                                    <button
                                        className="px-2.5 py-1.5 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-wider rounded-lg opacity-0 group-hover:opacity-100 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105"
                                        onClick={() => {
                                            alert(`${repo.name} added to your Projects draft!`);
                                        }}
                                    >
                                        + Sync
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Cover Letter Generator ──────────────────────────────────────── */}
            <div className="space-y-6 p-6 sm:p-8 bg-emerald-50/50 rounded-[1.5rem] sm:rounded-[2.5rem] border border-emerald-100">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                        <FileEdit className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                        <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">Cover Letter Generator</h4>
                        <p className="text-[10px] sm:text-xs text-slate-500 font-medium">AI writes a tailored cover letter from your resume</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">Paste Job Description (optional but recommended)</label>
                    <textarea
                        value={coverLetterJD}
                        onChange={e => setCoverLetterJD(e.target.value)}
                        placeholder="Paste the job posting here for a tailored letter…"
                        rows={4}
                        className="w-full bg-white border-2 border-slate-100 focus:border-emerald-400 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm outline-none transition-all font-medium resize-none"
                    />
                    <button
                        onClick={async () => {
                            // Removed local anyKey check, allow backend to validate if DB has keys
                            setIsGeneratingCL(true);
                            try {
                                const p = data.personalInfo || {};
                                const expText = (data.experience || []).slice(0, 3).map((e: any) =>
                                    `${e.jobTitle} at ${e.companyName}: ${e.description || ""}`).join("\n");
                                const skillsText = (data.skills || []).map((s: any) => typeof s === "string" ? s : s.name).join(", ");
                                const prompt = `Write a professional, engaging cover letter for ${p.fullName || "the applicant"} who is a ${p.title || "professional"}.

Their email: ${p.email || ""}
Key experience: ${expText}
Skills: ${skillsText}
Summary: ${p.summary || ""}
${coverLetterJD ? `\nJob Description:\n${coverLetterJD.slice(0, 2000)}` : ""}

Write 3–4 concise paragraphs. Be specific, energetic, and professional. Don't use generic platitudes. Start with impact. Return only the letter body text, no subject line.`;
                                const res = await fetch("/api/generate", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: aiBody({ section: "coverLetter", currentContent: prompt }),
                                });
                                const d2 = await res.json();
                                if (d2.text) setCoverLetter(d2.text);
                                else alert("AI returned empty. Try again.");
                            } catch { alert("Cover letter generation failed."); }
                            finally { setIsGeneratingCL(false); }
                        }}
                        disabled={isGeneratingCL}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all active:scale-95 disabled:opacity-60 shadow-lg shadow-emerald-500/20"
                    >
                        {isGeneratingCL ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        {isGeneratingCL ? "Writing…" : "Generate Cover Letter"}
                    </button>
                </div>

                {coverLetter && (
                    <div className="relative">
                        <pre className="whitespace-pre-wrap text-xs sm:text-sm text-slate-700 bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 font-sans leading-relaxed max-h-72 overflow-y-auto">
                            {coverLetter}
                        </pre>
                        <button
                            onClick={() => { navigator.clipboard.writeText(coverLetter); setClCopied(true); setTimeout(() => setClCopied(false), 2000); }}
                            className={`absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all ${clCopied ? "bg-green-100 text-green-600" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                        >
                            <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            {clCopied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                )}
            </div>

            {/* Achievement Badge */}
            <div className="bg-blue-50/50 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 flex items-center gap-4 sm:gap-6 border border-blue-100 relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <CheckCircle2 className="w-24 h-24 sm:w-32 sm:h-32 text-blue-900" />
                </div>
                <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/10 shrink-0">
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                </div>
                <div className="relative z-10">
                    <p className="text-[9px] sm:text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1.5">Elite Professional Status</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Your CVdraft profile is now optimized with <span className="text-blue-600 underline">200+ Premium Features</span>.</p>
                </div>
            </div>
        </div>
    );
}

