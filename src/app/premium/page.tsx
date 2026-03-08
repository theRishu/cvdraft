"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import {
    Check, Sparkles, Zap, Shield, Rocket,
    ArrowRight, Star, Loader2, Crown,
} from "lucide-react";

const PLANS = [
    {
        id: "weekly",
        label: "Weekly",
        price: 79,
        perMonth: "~₹316/mo",
        tag: "Trial",
        tagColor: "bg-stone-100 text-stone-500",
        highlight: false,
        description: "Try Pro for a week",
    },
    {
        id: "monthly",
        label: "1 Month",
        price: 299,
        perMonth: "₹299/mo",
        tag: "Standard",
        tagColor: "bg-emerald-50 text-emerald-600",
        highlight: false,
        description: "Full month of Pro access",
    },
    {
        id: "quarterly",
        label: "3 Months",
        price: 699,
        perMonth: "~₹233/mo",
        tag: "Save 22%",
        tagColor: "bg-emerald-50 text-emerald-600",
        highlight: false,
        description: "Good saving over monthly",
    },
    {
        id: "biannual",
        label: "6 Months",
        price: 1199,
        perMonth: "~₹199/mo",
        tag: "Save 33%",
        tagColor: "bg-teal-50 text-teal-600",
        highlight: false,
        description: "Strong value for professionals",
    },
    {
        id: "annual",
        label: "12 Months",
        price: 1999,
        perMonth: "~₹166/mo",
        tag: "Best Value",
        tagColor: "bg-emerald-500 text-white",
        highlight: true,
        description: "Best per-month price, full year",
    },
] as const;

type PlanId = typeof PLANS[number]["id"];

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
    const [selectedPlan, setSelectedPlan] = useState<PlanId>("annual");

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
            const res = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan: selectedPlan }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data?.error || "Could not create order. Please try again or contact support.");
            }

            const { encRequest, accessCode, actionUrl } = data;

            // CCAvenue requires a form POST — create and submit it programmatically
            const form = document.createElement("form");
            form.method = "POST";
            form.action = actionUrl;

            // encRequest (Required)
            const encInput = document.createElement("input");
            encInput.type = "hidden";
            encInput.name = "encRequest";
            encInput.value = encRequest;
            form.appendChild(encInput);

            // access_code (Required)
            const accessInput = document.createElement("input");
            accessInput.type = "hidden";
            accessInput.name = "access_code";
            accessInput.value = accessCode;
            form.appendChild(accessInput);

            document.body.appendChild(form);
            form.submit();
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : "Something went wrong. Please try again.";
            console.error("[CCAvenue checkout error]", e);
            setError(msg);
            setPaying(false);
        }
    };

    const activePlan = PLANS.find(p => p.id === selectedPlan)!;

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Logo size="md" />
                    <Link href="/dashboard" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                        ← Back to Dashboard
                    </Link>
                </div>
            </header>

            <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-16 sm:py-24">
                {isPro ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Crown className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 mb-3">You're already Pro!</h1>
                        <p className="text-slate-500 mb-8">You have full access to all CVdraft Pro features.</p>
                        <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                            Go to Dashboard <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Hero */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 mb-6">
                                <Sparkles className="w-3.5 h-3.5" />
                                Flexible plans · Cancel anytime
                            </div>
                            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-5 tracking-tight">
                                Build <span className="text-emerald-600">unlimited</span> resumes
                            </h1>
                            <p className="text-xl text-slate-500 max-w-xl mx-auto">
                                Choose the plan that fits your job search needs. All plans include every Pro feature.
                            </p>
                        </div>

                        {error && (
                            <div className="max-w-md mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-5 py-4 rounded-2xl text-center">
                                {error}
                            </div>
                        )}

                        {/* Plan Selector */}
                        <div className="max-w-3xl mx-auto mb-10">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 text-center">
                                Select a plan
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                {PLANS.map(plan => (
                                    <button
                                        key={plan.id}
                                        onClick={() => setSelectedPlan(plan.id)}
                                        className={`relative flex flex-col items-center p-4 rounded-2xl border-2 transition-all text-center cursor-pointer ${selectedPlan === plan.id
                                            ? "border-emerald-600 bg-emerald-50 shadow-sm"
                                            : "border-slate-200 bg-white hover:border-slate-300"
                                            }`}
                                    >
                                        {plan.highlight && (
                                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-md">
                                                Best Value
                                            </span>
                                        )}
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 ${plan.tagColor}`}>
                                            {plan.tag}
                                        </span>
                                        <span className="text-base font-black text-slate-800">
                                            ₹{plan.price.toLocaleString("en-IN")}
                                        </span>
                                        <span className="text-xs font-semibold text-slate-500 mt-0.5">{plan.label}</span>
                                        <span className="text-[10px] text-slate-400 mt-1">{plan.perMonth}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Pricing Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-20">
                            {/* Free */}
                            <div className="bg-white border border-slate-200 rounded-3xl p-8">
                                <div className="mb-8">
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Free Plan</p>
                                    <div className="flex items-baseline gap-1 mb-1">
                                        <span className="text-4xl font-black text-slate-800">₹0</span>
                                    </div>
                                    <p className="text-sm text-slate-400">Standard Access</p>
                                </div>
                                <ul className="space-y-3.5 mb-8">
                                    {FREE_FEATURES.map((f, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-slate-500">
                                            <Check className="w-4 h-4 text-slate-300 shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <div className="w-full py-3.5 text-center text-sm font-bold text-slate-300 border-2 border-dashed border-slate-200 rounded-2xl">
                                    Current Plan
                                </div>
                            </div>

                            {/* Pro */}
                            <div className="bg-emerald-600 rounded-3xl p-8 relative shadow-[0_20px_60px_rgba(16,185,129,0.35)]">
                                <div className="mb-8">
                                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-200 mb-3">Pro Plan</p>
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-4xl font-black text-white">
                                            ₹{activePlan.price.toLocaleString("en-IN")}
                                        </span>
                                        <span className="text-emerald-100 text-sm font-semibold">/ {activePlan.label.toLowerCase()}</span>
                                    </div>
                                    <p className="text-sm text-emerald-100">{activePlan.perMonth} · {activePlan.description}</p>
                                </div>
                                <ul className="space-y-3.5 mb-8">
                                    {PRO_FEATURES.map((f, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-emerald-50">
                                            <Check className="w-4 h-4 text-emerald-300 shrink-0 stroke-[3]" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    id="ccavenue-upgrade-btn"
                                    onClick={handleUpgrade}
                                    disabled={paying}
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-white text-emerald-600 font-black text-base rounded-2xl hover:bg-emerald-50 transition-all active:scale-95 disabled:opacity-60 shadow-lg"
                                >
                                    {paying ? (
                                        <><Loader2 className="w-5 h-5 animate-spin" /> Redirecting to payment…</>
                                    ) : (
                                        <><Rocket className="w-5 h-5" /> Get Pro — ₹{activePlan.price.toLocaleString("en-IN")} / {activePlan.label.toLowerCase()}</>
                                    )}
                                </button>
                                <p className="text-center text-emerald-200 text-xs mt-4">
                                    Secured by CCAvenue · 256-bit SSL encryption
                                </p>
                            </div>
                        </div>

                        {/* Why Pro */}
                        <div className="border-t border-slate-100 pt-16">
                            <h2 className="text-2xl font-black text-slate-900 text-center mb-10">Professional Advantages</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                {[
                                    { icon: Star, bg: "bg-emerald-50", text: "text-emerald-500", border: "border-emerald-100", title: "Premium Templates", desc: "Exclusive, recruiter-vetted designs for every industry." },
                                    { icon: Zap, bg: "bg-teal-50", text: "text-teal-500", border: "border-teal-100", title: "Unlimited Resumes", desc: "No limits. Create a tailor-made resume for every application." },
                                    { icon: Shield, bg: "bg-emerald-50", text: "text-emerald-500", border: "border-emerald-100", title: "Privacy Guaranteed", desc: "Your career data is encrypted and secure at all times." },
                                ].map(({ icon: Icon, bg, text, border, title, desc }, i) => (
                                    <div key={i} className="text-center">
                                        <div className={`w-14 h-14 ${bg} border ${border} rounded-2xl flex items-center justify-center mx-auto mb-4 ${text}`}>
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}
