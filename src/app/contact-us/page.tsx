import StaticPageLayout from "@/components/StaticPageLayout";
import { Mail, Clock, MapPin, MessageCircle } from "lucide-react";

export const metadata = {
    title: "Contact Us — CVdraft",
    description:
        "Get in touch with the CVdraft support team. We respond to all queries within 24–48 business hours.",
};

export default function ContactUs() {
    return (
        <StaticPageLayout title="Contact Us">
            <div className="space-y-10">
                <p className="text-base leading-relaxed text-slate-600 font-medium">
                    We are dedicated to providing world-class support for your career journey.
                    Whether you have a professional query, a technical issue, or a feature
                    request — our support channel is always open.
                </p>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Support Email */}
                    <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100">
                            <Mail className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                Support Email
                            </p>
                            <a
                                href="mailto:support@cvdraft.space"
                                className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors text-base"
                            >
                                support@cvdraft.space
                            </a>
                            <p className="text-xs text-slate-400 mt-1">
                                Professional support, billing, & refunds
                            </p>
                        </div>
                    </div>

                    {/* Response Time */}
                    <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0 border border-teal-100">
                            <Clock className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                Response Time
                            </p>
                            <p className="font-bold text-slate-800 text-base">
                                24–48 business hours
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                                Monday–Saturday, 10:00 AM – 6:00 PM IST
                            </p>
                        </div>
                    </div>

                    {/* Business Name */}
                    <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 col-span-1 sm:col-span-2">
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100">
                            <MessageCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                Platform Owner
                            </p>
                            <p className="font-bold text-slate-800 text-base">
                                Rishu Kumar Pandey
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                                CVdraft is an independently developed professional project.
                            </p>
                        </div>
                    </div>
                </div>

                {/* What to include in your email */}
                <section className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl shadow-sm">
                    <h2 className="text-lg font-bold text-slate-800 mb-3">
                        Expedited Support Tips
                    </h2>
                    <p className="text-sm text-slate-700 mb-3 font-medium">
                        To help us provide a world-class resolution as quickly as possible,
                        please include these details in your email:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 font-medium">
                        <li>Your registered email address used on CVdraft.</li>
                        <li>
                            For payment queries: your Transaction ID or Order ID.
                        </li>
                        <li>
                            A brief description of your request or issue.
                        </li>
                        <li>
                            Screenshots (optional) to help us understand the problem.
                        </li>
                    </ul>
                </section>

                {/* Grievance Redressal */}
                <section className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                    <h2 className="text-lg font-bold text-slate-800 mb-3">
                        Grievance Redressal
                    </h2>
                    <p className="text-sm text-slate-600 mb-4 font-medium">
                        In accordance with Information Technology guidelines, any concerns
                        regarding our services may be addressed directly to:
                    </p>
                    <div className="space-y-2 text-sm text-slate-700">
                        <div className="flex gap-2">
                            <span className="font-bold text-slate-500 inline-block w-24">Officer:</span>
                            <span className="font-bold">Rishu Kumar Pandey</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-bold text-slate-500 inline-block w-24">Email:</span>
                            <a
                                href="mailto:support@cvdraft.space"
                                className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
                            >
                                support@cvdraft.space
                            </a>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-bold text-slate-500 inline-block w-24">TAT:</span>
                            <span className="font-bold">Within 30 business days</span>
                        </div>
                    </div>
                </section>

                {/* Policy Links */}
                <section>
                    <h2 className="text-lg font-bold text-slate-800 mb-4">
                        Professional Resources
                    </h2>
                    <div className="flex flex-wrap gap-3 text-sm font-semibold">
                        {[
                            { label: "Privacy Policy", href: "/privacy-policy" },
                            { label: "Terms & Conditions", href: "/terms-and-conditions" },
                            {
                                label: "Refund & Cancellation",
                                href: "/refund-and-cancellation",
                            },
                            {
                                label: "Delivery & Shipping",
                                href: "/delivery-and-shipping",
                            },
                            { label: "About Us", href: "/about-us" },
                        ].map(({ label, href }) => (
                            <a
                                key={href}
                                href={href}
                                className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 transition-colors shadow-sm"
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </StaticPageLayout>
    );
}
