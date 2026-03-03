import StaticPageLayout from "@/components/StaticPageLayout";
import { Mail } from "lucide-react";

export default function ContactUs() {
    return (
        <StaticPageLayout title="Contact Us">
            <div className="space-y-10">
                <p className="text-lg">
                    We're here to help. Email us anytime and we'll respond within <strong>24–48 business hours</strong>.
                </p>

                {/* Support Email */}
                <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-200">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Support Email</p>
                        <a href="mailto:support@cvdraft.space" className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors text-lg">
                            support@cvdraft.space
                        </a>
                        <p className="text-sm text-stone-400 mt-1">CVdraft Technologies</p>
                    </div>
                </div>

                {/* Grievance */}
                <section className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
                    <h2 className="text-lg font-bold text-stone-900 mb-3">Grievance Redressal</h2>
                    <p className="text-sm text-stone-600 mb-3">
                        In accordance with the Information Technology Act, 2000, any grievances can be addressed to our support team:
                    </p>
                    <div className="space-y-2 text-sm text-stone-700">
                        <p>
                            <strong>Email:</strong>{" "}
                            <a href="mailto:support@cvdraft.space" className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors">
                                support@cvdraft.space
                            </a>
                        </p>
                        <p><strong>Response Time:</strong> Within 30 days of receipt of complaint</p>
                    </div>
                </section>
            </div>
        </StaticPageLayout>
    );
}
