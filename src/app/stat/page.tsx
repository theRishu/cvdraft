"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, FileText, Activity } from "lucide-react";

export default function StatPage() {
    const [stats, setStats] = useState({ users: 0, resumes: 0, success: false });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/stat");
                const data = await res.json();
                if (data.success) {
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to load stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <div className="max-w-4xl w-full">
                <Link href="/dashboard" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </Link>

                <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100">
                    <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
                        <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
                            <Activity className="w-10 h-10" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Platform Statistics</h1>
                            <p className="text-slate-500 mt-1">Live overview of application usage and growth.</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                            {/* Users Card */}
                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-3xl text-white shadow-lg shadow-indigo-500/20 flex flex-col items-start transform transition-transform hover:-translate-y-1">
                                <div className="p-3 bg-white/20 rounded-xl mb-6 backdrop-blur-sm">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-blue-100 text-lg font-medium mb-1">Total Users</h2>
                                <p className="text-5xl font-bold tracking-tight">{stats.users.toLocaleString()}</p>
                            </div>

                            {/* Resumes Card */}
                            <div className="bg-gradient-to-br from-purple-500 to-fuchsia-600 p-8 rounded-3xl text-white shadow-lg shadow-purple-500/20 flex flex-col items-start transform transition-transform hover:-translate-y-1">
                                <div className="p-3 bg-white/20 rounded-xl mb-6 backdrop-blur-sm">
                                    <FileText className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-purple-100 text-lg font-medium mb-1">Resumes Created</h2>
                                <p className="text-5xl font-bold tracking-tight">{stats.resumes.toLocaleString()}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
