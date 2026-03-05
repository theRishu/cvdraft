import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import { FileText } from "lucide-react";
import connectToDatabase from "@/lib/db";
import Resume from "@/models/Resume";
import User from "@/models/User";
import CreateResumeButton from "@/components/dashboard/CreateResumeButton";
import ResumeCard from "@/components/dashboard/ResumeCard";
import ImportResumeButton from "@/components/dashboard/ImportResumeButton";
import SettingsCard from "@/components/dashboard/SettingsCard";

async function getResumes(userId: string) {
    await connectToDatabase();
    const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 }).lean();
    return JSON.parse(JSON.stringify(resumes));
}

export default async function DashboardPage() {
    const { userId } = await auth();
    if (!userId) redirect("/");

    // Fetch resumes and clerk user info in parallel, then connect once
    const [resumes, clerkUser] = await Promise.all([
        getResumes(userId),
        currentUser(),
    ]);
    const email = clerkUser?.emailAddresses?.[0]?.emailAddress || "unknown@example.com";

    await connectToDatabase();

    // Atomic upsert: avoids the race condition where two concurrent requests
    // both see no user and both call User.create, hitting a duplicate-key error.
    const user = await User.findOneAndUpdate(
        { userId },
        {
            $setOnInsert: { email },          // only written on first-ever insert
            $set: { resumeCount: resumes.length }, // always kept in sync
        },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );

    const adminEmail = process.env.ADMIN_EMAIL;
    const uiUser = user ? JSON.parse(JSON.stringify(user)) : null;
    if (uiUser && adminEmail && uiUser.email === adminEmail) uiUser.isPro = true;

    return (
        <div className="min-h-screen bg-white">
            <Header isPro={uiUser?.isPro} />

            <main className="max-w-6xl mx-auto px-6 py-10">
                {/* Page header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800">My Resumes</h1>
                        <p className="text-sm text-slate-400 mt-0.5">
                            {resumes.length === 0
                                ? "Start fresh — create your first one!"
                                : `${resumes.length} professional resume${resumes.length > 1 ? "s" : ""} saved`}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {!uiUser?.isPro && (
                            <div className="text-xs text-slate-400 font-medium bg-white border border-slate-200 px-3 py-1.5 rounded-xl">
                                {resumes.length} / 2 used
                            </div>
                        )}
                        <ImportResumeButton />
                        <CreateResumeButton user={uiUser} />
                    </div>
                </div>

                {/* Resume grid */}
                {resumes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-24 px-6 bg-white border-2 border-dashed border-slate-200 rounded-3xl">
                        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5">
                            <FileText className="w-7 h-7 text-emerald-500" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">No resumes yet</h2>
                        <p className="text-slate-400 text-sm mb-7 max-w-xs">
                            Create your first resume and you'll be ready to apply for professional roles in minutes.
                        </p>
                        <CreateResumeButton user={uiUser} isLarge />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {resumes.map((resume: any) => (
                            <ResumeCard key={resume._id} resume={resume} />
                        ))}
                    </div>
                )}

                {/* Settings */}
                <div className="mt-20">
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-slate-800">Settings</h2>
                        <p className="text-sm text-slate-400">Manage your AI configurations and preferences.</p>
                    </div>
                    <SettingsCard user={uiUser} />
                </div>
            </main>
        </div>
    );
}
