import StaticPageLayout from "@/components/StaticPageLayout";
import { Mail, Phone, MapPin, User } from "lucide-react";

export default function ContactUs() {
    return (
        <StaticPageLayout title="Contact Us">
            <div className="space-y-10">
                <p className="text-lg">
                    We're here to help. Reach out to us through any of the channels below and we'll respond within <strong>24–48 business hours</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-200">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                            <User className="w-5 h-5 text-indigo-500" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Company Legal Name</p>
                            <p className="font-bold text-stone-900">CVdraft Technologies</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-200">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                            <Mail className="w-5 h-5 text-indigo-500" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Support Email</p>
                            <a href="mailto:support@cvdraft.space" className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                                support@cvdraft.space
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-200">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                            <Phone className="w-5 h-5 text-indigo-500" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Phone</p>
                            <p className="font-bold text-stone-900">+91-XXXXX-XXXXX</p>
                            <p className="text-xs text-stone-400 mt-1">Mon–Fri, 10:00 AM – 6:00 PM IST</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-200">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                            <MapPin className="w-5 h-5 text-indigo-500" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Registered Address</p>
                            <p className="font-bold text-stone-900 leading-relaxed">
                                [Your Building/Flat No.], [Street Name],<br />
                                [City], [State] – [PIN Code], India
                            </p>
                        </div>
                    </div>
                </div>

                <section className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
                    <h2 className="text-lg font-bold text-stone-900 mb-3">Grievance Redressal</h2>
                    <p className="text-sm text-stone-600 mb-3">
                        In accordance with the Information Technology Act, 2000, and the rules made thereunder, any grievances can be addressed to our support team:
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

                <section>
                    <h2 className="text-xl font-bold text-stone-900 mb-3">Test Access (for Cashfree Verification)</h2>
                    <div className="bg-stone-900 text-green-400 font-mono text-sm p-5 rounded-2xl space-y-1">
                        <p>URL: https://cvdraft.in/sign-in</p>
                        <p>Email: testuser@cvdraft.space</p>
                        <p>Password: TestPass@123</p>
                        <p>OTP (if prompted): 123456</p>
                    </div>
                    <p className="text-xs text-stone-400 mt-2">
                        This test account has full access to the checkout flow and a pre-created resume.
                    </p>
                </section>
            </div>
        </StaticPageLayout>
    );
}
