import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import { FileText, Plus } from "lucide-react";
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

    const resumes = await getResumes(userId);
    let user = await User.findOne({ userId });

    if (!user) {
        const { currentUser } = await import("@clerk/nextjs/server");
        const clerkUser = await currentUser();
        const email = clerkUser?.emailAddresses?.[0]?.emailAddress || "unknown@example.com";
        user = await User.create({ userId, email, resumeCount: resumes.length });
    } else if (user.resumeCount !== resumes.length) {
        // Use updateOne to bypass strict validation if an older document is missing an email
        await User.updateOne({ userId }, { $set: { resumeCount: resumes.length } });
        user.resumeCount = resumes.length;
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const uiUser = user ? JSON.parse(JSON.stringify(user)) : null;
    if (uiUser && adminEmail && uiUser.email === adminEmail) uiUser.isPro = true;

    return (
        <div className="min-h-screen bg-[#fdf9f6]">
            <Header isPro={uiUser?.isPro} />

            <main className="max-w-6xl mx-auto px-6 py-10">
                {/* Page header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-2xl font-black text-stone-900">My Resumes</h1>
                        <p className="text-sm text-stone-400 mt-0.5">
                            {resumes.length === 0
                                ? "Start fresh — create your first one!"
                                : `${resumes.length} resume${resumes.length > 1 ? "s" : ""} saved`}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {!uiUser?.isPro && (
                            <div className="text-xs text-stone-400 font-medium bg-white border border-stone-200 px-3 py-1.5 rounded-xl">
                                {resumes.length} / 2 used
                            </div>
                        )}
                        <ImportResumeButton />
                        <CreateResumeButton user={uiUser} />
                    </div>
                </div>

                {/* Resume grid */}
                {resumes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-24 px-6 bg-white border-2 border-dashed border-stone-200 rounded-3xl">
                        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-5">
                            <FileText className="w-7 h-7 text-indigo-400" />
                        </div>
                        <h2 className="text-xl font-bold text-stone-800 mb-2">No resumes yet</h2>
                        <p className="text-stone-400 text-sm mb-7 max-w-xs">
                            Create your first resume and you'll be ready to apply for jobs in minutes.
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
                        <h2 className="text-lg font-bold text-stone-900">Settings</h2>
                        <p className="text-sm text-stone-400">Connect your AI key to unlock smart resume suggestions.</p>
                    </div>
                    <SettingsCard user={uiUser} />
                </div>
            </main>
        </div>
    );
}
