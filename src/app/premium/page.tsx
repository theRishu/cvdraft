"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Check, Sparkles, Zap, Shield, Rocket,
    ArrowRight, Star, Loader2, Crown,
} from "lucide-react";

declare global {
    interface Window {
        Cashfree: (config: { mode: string }) => {
            checkout: (opts: { paymentSessionId: string; redirectTarget?: string }) => Promise<void>;
        };
    }
}

/** Wait for Cashfree SDK to load (max ~5 seconds) */
function waitForCashfree(maxMs = 5000): Promise<void> {
    return new Promise((resolve, reject) => {
        if (typeof window !== "undefined" && "Cashfree" in window) return resolve();
        const start = Date.now();
        const id = setInterval(() => {
            if ("Cashfree" in window) { clearInterval(id); resolve(); }
            else if (Date.now() - start > maxMs) { clearInterval(id); reject(new Error("Cashfree SDK did not load. Please refresh and try again.")); }
        }, 100);
    });
}

const FREE_FEATURES = [
    "Create up to 2 resumes",
    "AI Writing Assistant",
    "Standard templates",
    "PDF Downloads",
];

const PRO_FEATURES = [
    "Unlimited resumes",
    "All Premium templates",
    "AI-powered bullet suggestions",
    "Priority support",
    "No watermarks on PDFs",
    "Early access to new features",
];

export default function PremiumPage() {
    const router = useRouter();
    const [isPro, setIsPro] = useState(false);
    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/api/user")
            .then(r => r.json())
            .then(d => { setIsPro(d.isPro || false); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const handleUpgrade = async () => {
        setPaying(true);
        setError("");

        try {
            // 0. Make sure the SDK is ready
            await waitForCashfree();

            // 1. Create order on server
            const res = await fetch("/api/payment/create-order", { method: "POST" });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body?.error || "Could not create order. Check your Cashfree keys in .env.local.");
            }
            const { paymentSessionId } = await res.json();

            // 2. Open Cashfree checkout
            const mode = (process.env.NEXT_PUBLIC_CASHFREE_MODE as "sandbox" | "production") || "sandbox";
            const cashfree = window.Cashfree({ mode });
            await cashfree.checkout({
                paymentSessionId,
                redirectTarget: "_self",
            });
        } catch (e: any) {
            console.error("[Cashfree checkout error]", e);
            setError(e.message || "Something went wrong. Please try again.");
            setPaying(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fdf9f6] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fdf9f6] flex flex-col">
            {/* Load Cashfree JS from CDN — afterInteractive ensures it loads before user clicks */}
            <Script src="https://sdk.cashfree.com/js/v3/cashfree.js" strategy="afterInteractive" />

            {/* Header */}
            <header className="border-b border-stone-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xs">CV</div>
                        <span className="font-black text-stone-900">Draft</span>
                    </Link>
                    <Link href="/dashboard" className="text-sm font-semibold text-stone-500 hover:text-stone-900 transition-colors">
                        ← Back to Dashboard
                    </Link>
                </div>
            </header>

            <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-16 sm:py-24">
                {/* Already Pro */}
                {isPro ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Crown className="w-10 h-10 text-amber-500" />
                        </div>
                        <h1 className="text-3xl font-black text-stone-900 mb-3">You're already Pro! ✨</h1>
                        <p className="text-stone-500 mb-8">You have full access to all CVdraft Pro features.</p>
                        <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                            Go to Dashboard <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Hero */}
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200 mb-6">
                                <Sparkles className="w-3.5 h-3.5" />
                                One-time payment · Lifetime Pro access
                            </div>
                            <h1 className="text-4xl sm:text-6xl font-black text-stone-900 mb-5 tracking-tight">
                                Build <span className="text-indigo-600">unlimited</span> resumes
                            </h1>
                            <p className="text-xl text-stone-400 max-w-xl mx-auto">
                                Pay once. Use forever. Get premium templates, unlimited resumes, and advanced AI tools.
                            </p>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="max-w-md mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-5 py-4 rounded-2xl text-center">
                                {error}
                            </div>
                        )}

                        {/* Pricing cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-20">
                            {/* Free */}
                            <div className="bg-white border border-stone-200 rounded-3xl p-8">
                                <div className="mb-8">
                                    <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Free Plan</p>
                                    <div className="flex items-baseline gap-1 mb-1">
                                        <span className="text-4xl font-black text-stone-900">₹0</span>
                                    </div>
                                    <p className="text-sm text-stone-400">Forever free</p>
                                </div>
                                <ul className="space-y-3.5 mb-8">
                                    {FREE_FEATURES.map((f, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-stone-500">
                                            <Check className="w-4 h-4 text-stone-300 shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <div className="w-full py-3.5 text-center text-sm font-bold text-stone-300 border-2 border-dashed border-stone-200 rounded-2xl">
                                    Current Plan
                                </div>
                            </div>

                            {/* Pro */}
                            <div className="bg-indigo-600 rounded-3xl p-8 relative shadow-[0_20px_60px_rgba(99,102,241,0.35)]">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">
                                    Best Value
                                </div>
                                <div className="mb-8">
                                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-3">Pro Plan</p>
                                    <div className="flex items-baseline gap-1 mb-1">
                                        <span className="text-4xl font-black text-white">₹299</span>
                                    </div>
                                    <p className="text-sm text-indigo-300">One-time · Lifetime access</p>
                                </div>
                                <ul className="space-y-3.5 mb-8">
                                    {PRO_FEATURES.map((f, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-indigo-100">
                                            <Check className="w-4 h-4 text-indigo-300 shrink-0 stroke-[3]" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    id="cashfree-upgrade-btn"
                                    onClick={handleUpgrade}
                                    disabled={paying}
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-white text-indigo-600 font-black text-base rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 disabled:opacity-60 shadow-lg"
                                >
                                    {paying ? (
                                        <><Loader2 className="w-5 h-5 animate-spin" /> Preparing checkout…</>
                                    ) : (
                                        <><Rocket className="w-5 h-5" /> Upgrade Now — ₹299</>
                                    )}
                                </button>
                                <p className="text-center text-indigo-300 text-xs mt-4">
                                    Powered by Cashfree · Secure payment
                                </p>
                            </div>
                        </div>

                        {/* Why Pro */}
                        <div className="border-t border-stone-100 pt-16">
                            <h2 className="text-2xl font-black text-stone-900 text-center mb-10">Why go Pro?</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                {[
                                    { icon: Star, bg: "bg-amber-50", text: "text-amber-500", border: "border-amber-100", title: "Premium Templates", desc: "Exclusive, recruiter-loved designs for every industry." },
                                    { icon: Zap, bg: "bg-blue-50", text: "text-blue-500", border: "border-blue-100", title: "Unlimited Resumes", desc: "No cap. Create a tailor-made resume for every role." },
                                    { icon: Shield, bg: "bg-emerald-50", text: "text-emerald-500", border: "border-emerald-100", title: "Privacy Guaranteed", desc: "Your data is encrypted and never shared without consent." },
                                ].map(({ icon: Icon, bg, text, border, title, desc }, i) => (
                                    <div key={i} className="text-center">
                                        <div className={`w-14 h-14 ${bg} border ${border} rounded-2xl flex items-center justify-center mx-auto mb-4 ${text}`}>
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <h4 className="font-bold text-stone-900 mb-2">{title}</h4>
                                        <p className="text-sm text-stone-400 leading-relaxed">{desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </main>

            {/* Footer — all policy links */}
            <footer className="border-t border-stone-100 py-10 px-6 mt-auto">
                <div className="max-w-5xl mx-auto flex flex-col items-center gap-5 text-sm text-stone-400">
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 font-semibold">
                        <Link href="/privacy-policy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
                        <Link href="/terms-and-conditions" className="hover:text-indigo-600 transition-colors">Terms & Conditions</Link>
                        <Link href="/refund-and-cancellation" className="hover:text-indigo-600 transition-colors">Refund Policy</Link>
                        <Link href="/contact-us" className="hover:text-indigo-600 transition-colors">Contact Us</Link>
                        <Link href="/knowledge-center" className="hover:text-indigo-600 transition-colors">Knowledge Center</Link>
                    </div>
                    <p className="font-medium">© {new Date().getFullYear()} CVdraft · All rights reserved</p>
                </div>
            </footer>
        </div>
    );
}
