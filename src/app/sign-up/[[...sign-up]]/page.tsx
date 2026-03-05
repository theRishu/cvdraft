"use client";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";

export default function SignUpPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Logo size="lg" />
                </div>
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-black text-stone-900">Create your account ✨</h1>
                    <p className="text-stone-500 text-sm mt-1">Free forever. No credit card needed.</p>
                </div>

                {/* Clerk sign-up widget */}
                <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6">
                    {mounted && (
                        <SignUp
                            appearance={{
                                elements: {
                                    formButtonPrimary: "bg-emerald-600 hover:bg-emerald-700 text-sm normal-case rounded-xl font-semibold",
                                    card: "shadow-none border-none p-0",
                                    headerTitle: "hidden",
                                    headerSubtitle: "hidden",
                                    footerAction: "text-stone-500",
                                    footerActionLink: "text-emerald-600 hover:text-emerald-800 font-semibold",
                                    formFieldInput: "rounded-xl border-stone-200",
                                    socialButtonsBlockButton: "rounded-xl border-stone-200",
                                }
                            }}
                        />
                    )}
                </div>

                <p className="text-center text-sm text-stone-400 mt-6">
                    Already have an account?{" "}
                    <Link href="/sign-in" className="text-emerald-600 hover:text-emerald-800 font-semibold transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
