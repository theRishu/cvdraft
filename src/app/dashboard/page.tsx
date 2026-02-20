import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import { FileText } from "lucide-react";
import Link from "next/link";
import connectToDatabase from "@/lib/db";
import Resume from "@/models/Resume";
import User from "@/models/User";
import CreateResumeButton from "@/components/dashboard/CreateResumeButton";
import ResumeCard from "@/components/dashboard/ResumeCard";
import ImportResumeButton from "@/components/dashboard/ImportResumeButton";

async function getResumes(userId: string) {
    await connectToDatabase();
    const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 }).lean();
    return JSON.parse(JSON.stringify(resumes));
}

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/");
    }

    const resumes = await getResumes(userId);
    const user = await User.findOne({ userId });

    // Auto-heal resume count if it got out of sync (e.g., from old deletions)
    if (user && user.resumeCount !== resumes.length) {
        user.resumeCount = resumes.length;
        await user.save();
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    // We create a "UI User" object that overrides isPro if they are an admin
    const uiUser = user ? JSON.parse(JSON.stringify(user)) : null;
    if (uiUser && adminEmail && uiUser.email === adminEmail) {
        uiUser.isPro = true;
    }

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Premium Animated Background */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                    }}
                />
            </div>

            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Your Resumes</h1>
                        <p className="text-slate-500 mt-1">Manage and create your professional resumes.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        {/* Limit Indicator */}
                        {!uiUser?.isPro && (
                            <div className="bg-slate-100 rounded-lg px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200">
                                {resumes.length} / 2 Free Resumes
                            </div>
                        )}
                        <ImportResumeButton />
                        <CreateResumeButton user={uiUser} />
                    </div>
                </div>

                {resumes.length === 0 ? (
                    <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl p-16 text-center max-w-2xl mx-auto relative overflow-hidden">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 blur-2xl opacity-50 -z-10"></div>
                        <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30 transform transition hover:scale-105 duration-300">
                            <FileText className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight mb-3">No resumes yet</h3>
                        <p className="text-lg text-slate-500 max-w-md mx-auto leading-relaxed mb-8">
                            Create your first stunning, professional resume in minutes using our cutting-edge AI builder. Stand out from the crowd today.
                        </p>
                        <div className="flex justify-center gap-4">
                            <div className="transform transition hover:scale-105 duration-200">
                                <ImportResumeButton />
                            </div>
                            <div className="transform transition hover:scale-105 duration-200 relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-300"></div>
                                <div className="relative">
                                    <CreateResumeButton user={uiUser} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {resumes.map((resume: any) => (
                            <ResumeCard key={resume._id} resume={resume} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
