"use client";

import { Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateResumeButton({ user }: { user?: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const isLimitReached = !user?.isPro && (user?.resumeCount >= 2);

    const handleCreate = async () => {
        if (isLimitReached) {
            alert("You've reached the free limit of 2 resumes. Upgrade to Pro for unlimited resumes!");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch("/api/resumes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: "Untitled Resume" }),
            });

            if (!res.ok) {
                if (res.status === 403) {
                    const msg = await res.text();
                    alert(msg);
                    return;
                }
                throw new Error("Failed to create resume");
            }

            const data = await res.json();
            router.push(`/resume/${data._id}`);
        } catch (error) {
            console.error(error);
            alert("Failed to create resume");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            {isLimitReached && (
                <button
                    onClick={() => alert("Redirecting to payment gateway... (Mock)")}
                    className="px-4 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg shadow-orange-500/20 hover:scale-105 hover:shadow-orange-500/40 transition-all flex items-center gap-2"
                >
                    <span>Upgrade to Pro</span>
                </button>
            )}
            <button
                onClick={handleCreate}
                disabled={loading}
                className={`group relative px-6 py-2.5 rounded-xl font-medium text-white shadow-lg transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden ${isLimitReached ? 'bg-slate-400 shadow-slate-500/20' : 'shadow-blue-500/20 hover:shadow-blue-500/40'}`}
            >
                {!isLimitReached && <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transition-transform group-hover:scale-110 duration-500"></div>}
                <div className="relative flex items-center gap-2">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                    <span>Create New</span>
                </div>
            </button>
        </div>
    );
}
