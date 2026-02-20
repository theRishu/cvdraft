"use client";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { FileText, CheckCircle, Star } from "lucide-react";
import { useState, useEffect } from "react";

export default function SignInPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex flex-col items-center justify-center p-8 bg-white text-slate-900">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center md:text-left">
                        <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                            <div className="bg-slate-900 text-white p-1.5 rounded-lg group-hover:scale-105 transition-transform">
                                <FileText className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-900">ResumeGPT</span>
                        </Link>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back</h1>
                        <p className="text-slate-500 mt-2 text-sm">Sign in to your account to continue building your resume.</p>
                    </div>

                    <div className="flex justify-center md:justify-start min-h-[400px]">
                        {mounted && (
                            <SignIn
                                appearance={{
                                    elements: {
                                        formButtonPrimary: "bg-slate-900 hover:bg-black text-sm normal-case",
                                        card: "shadow-none border-none p-0 w-full",
                                        headerTitle: "hidden",
                                        headerSubtitle: "hidden",
                                        footerAction: "text-slate-500",
                                        footerActionLink: "text-slate-900 hover:text-black font-medium"
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Right Side - Visuals */}
            <div className="hidden md:flex flex-col justify-between bg-slate-50 border-l border-slate-100 p-12 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

                <div className="relative z-10 flex-1 flex items-center justify-center">
                    <div className="w-[80%] aspect-[210/297] bg-white rounded-lg shadow-2xl border border-slate-100 p-8 rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                        <div className="h-4 w-32 bg-slate-900 mb-2"></div>
                        <div className="h-3 w-48 bg-slate-200 mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-3 w-full bg-slate-50"></div>
                            <div className="h-3 w-full bg-slate-50"></div>
                            <div className="h-3 w-2/3 bg-slate-50"></div>
                        </div>
                        <div className="mt-8 grid grid-cols-3 gap-4">
                            <div className="col-span-1 bg-slate-50 h-24 rounded"></div>
                            <div className="col-span-2 space-y-2">
                                <div className="h-3 w-full bg-slate-50"></div>
                                <div className="h-3 w-full bg-slate-50"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-12">
                    <div className="flex items-center gap-1 text-yellow-500 mb-4">
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                    </div>
                    <blockquote className="text-xl font-medium text-slate-900 mb-4">
                        "ResumeGPT helped me land my dream job at a top tech company. The templates are clean and the AI suggestions are a game changer."
                    </blockquote>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">
                            S
                        </div>
                        <div>
                            <div className="font-bold text-slate-900">Sarah Jenkins</div>
                            <div className="text-slate-500 text-sm">Product Manager</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
