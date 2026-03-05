import StaticPageLayout from "@/components/StaticPageLayout";
import { Sparkles, Shield, Zap, Users, Target, Heart } from "lucide-react";

export const metadata = {
    title: "About Us — CVdraft",
    description:
        "Learn about CVdraft — the AI-powered resume builder helping job seekers craft standout resumes in minutes.",
};

const values = [
    {
        icon: Sparkles,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        title: "AI-First Innovation",
        desc: "We harness the power of Google Gemini AI to turn your experience into polished, professional content — instantly.",
    },
    {
        icon: Shield,
        color: "text-teal-600",
        bg: "bg-teal-50",
        border: "border-teal-100",
        title: "Privacy by Default",
        desc: "Your personal data belongs to you. We never sell, rent, or trade your information — ever.",
    },
    {
        icon: Zap,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        title: "Speed & Simplicity",
        desc: "From blank page to polished PDF in under 5 minutes. No design skills, no complicated forms.",
    },
    {
        icon: Users,
        color: "text-teal-600",
        bg: "bg-teal-50",
        border: "border-teal-100",
        title: "Built for Everyone",
        desc: "Whether you are a fresh graduate or a seasoned executive, CVdraft adapts to your level and role.",
    },
    {
        icon: Target,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        title: "ATS-Optimised Output",
        desc: "Our templates and AI suggestions are designed to pass Applicant Tracking System filters used by top employers.",
    },
    {
        icon: Heart,
        color: "text-teal-600",
        bg: "bg-teal-50",
        border: "border-teal-100",
        title: "Customer-Obsessed",
        desc: "Every feature is shaped by real user feedback. If something feels off, we want to hear from you.",
    },
];

export default function AboutUs() {
    return (
        <StaticPageLayout title="About CVdraft">
            <section className="mb-12">
                <p className="text-base leading-relaxed mb-4 text-slate-600">
                    <strong>CVdraft</strong> is a professional AI resume builder platform
                    developed and operated by <strong>Rishu Kumar Pandey</strong> in India.
                </p>
                <p className="text-base leading-relaxed mb-4">
                    Our mission is simple: <em>remove every barrier between a talented
                        person and their dream job.</em> Writing a great resume should not
                    require expensive career coaches, design expertise, or hours of
                    agonising over formatting. It should take minutes.
                </p>
                <p className="text-base leading-relaxed">
                    We do this by combining intuitive interfaces with cutting-edge
                    generative AI, creating a product that guides you, writes with you,
                    and produces a flawless PDF — every single time.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold text-slate-800 mb-4">
                    Professional Plans
                </h2>
                <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600">
                                <th className="text-left px-4 py-3 font-bold">Plan</th>
                                <th className="text-left px-4 py-3 font-bold">Price</th>
                                <th className="text-left px-4 py-3 font-bold">Highlights</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr className="bg-white">
                                <td className="px-4 py-3 font-semibold">Free</td>
                                <td className="px-4 py-3">₹0 forever</td>
                                <td className="px-4 py-3">
                                    Up to 2 resumes · AI Writing Assistant · Standard templates ·
                                    PDF download
                                </td>
                            </tr>
                            <tr className="bg-slate-50/50">
                                <td className="px-4 py-3 font-semibold text-emerald-600">Pro — Weekly</td>
                                <td className="px-4 py-3 font-bold">₹79 / week</td>
                                <td className="px-4 py-3">All Pro features · Trial-friendly</td>
                            </tr>
                            <tr className="bg-white">
                                <td className="px-4 py-3 font-semibold text-emerald-600">Pro — Monthly</td>
                                <td className="px-4 py-3 font-bold">₹299 / month</td>
                                <td className="px-4 py-3">All Pro features · Standard plan</td>
                            </tr>
                            <tr className="bg-slate-50/50">
                                <td className="px-4 py-3 font-semibold text-emerald-600">Pro — 3 Months</td>
                                <td className="px-4 py-3 font-bold">₹699</td>
                                <td className="px-4 py-3">All Pro features · Save 22% vs monthly</td>
                            </tr>
                            <tr className="bg-white">
                                <td className="px-4 py-3 font-semibold text-emerald-600">Pro — 6 Months</td>
                                <td className="px-4 py-3 font-bold">₹1,199</td>
                                <td className="px-4 py-3">All Pro features · Save 33% vs monthly</td>
                            </tr>
                            <tr className="bg-slate-50/50">
                                <td className="px-4 py-3 font-semibold text-emerald-600">Pro — 12 Months</td>
                                <td className="px-4 py-3 font-bold">₹1,999</td>
                                <td className="px-4 py-3">All Pro features · Best value · Save 44%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-slate-400 mt-3 font-medium">
                    Prices are in Indian Rupees (INR) and inclusive of applicable taxes.
                    Payments are processed securely via our local payment gateways.
                </p>
            </section>


            <section className="mb-12">
                <h2 className="text-xl font-bold text-slate-800 mb-6">World-Class Standards</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {values.map(({ icon: Icon, color, bg, border, title, desc }, i) => (
                        <div
                            key={i}
                            className={`flex gap-4 p-5 rounded-2xl border ${border} ${bg}`}
                        >
                            <div
                                className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-white border ${border}`}
                            >
                                <Icon className={`w-5 h-5 ${color}`} />
                            </div>
                            <div>
                                <p className="font-bold text-slate-800 mb-1">{title}</p>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold text-slate-800 mb-4">
                    World-Class Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                    {[
                        "Next.js 15",
                        "React 19",
                        "Google Gemini AI",
                        "Clerk Auth",
                        "Secure Payments",
                        "MongoDB Atlas",
                        "Tailwind CSS",
                        "TypeScript",
                    ].map((tech) => (
                        <span
                            key={tech}
                            className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-sm font-semibold text-slate-600"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Get in Touch</h2>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    We value user feedback above all else. Whether you have a feature request
                    or need professional support with your resume — reach us at{" "}
                    <a
                        href="mailto:support@cvdraft.space"
                        className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
                    >
                        support@cvdraft.space
                    </a>
                    .
                </p>
            </section>
        </StaticPageLayout>
    );
}
