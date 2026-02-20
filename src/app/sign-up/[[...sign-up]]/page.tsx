import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { FileText, Sparkles, Zap } from "lucide-react";

export default function SignUpPage() {
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
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create your account</h1>
                        <p className="text-slate-500 mt-2 text-sm">Join thousands of professionals building better resumes.</p>
                    </div>

                    <div className="flex justify-center md:justify-start">
                        <SignUp
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
                    </div>
                </div>
            </div>

            {/* Right Side - Visuals */}
            <div className="hidden md:flex flex-col justify-center bg-slate-900 p-12 relative overflow-hidden text-white">
                {/* Abstract shapes */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-800 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900 rounded-full blur-3xl opacity-50 -ml-20 -mb-20"></div>

                <div className="relative z-10 max-w-lg mx-auto space-y-12">
                    <h2 className="text-4xl font-bold leading-tight">
                        Stand out from the crowd with a professional resume.
                    </h2>

                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                                <Sparkles className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">AI-Powered Writing</h3>
                                <p className="text-slate-400 leading-relaxed">Let our AI help you write compelling professional summaries and bullet points.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                                <Zap className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">ATS Optimization</h3>
                                <p className="text-slate-400 leading-relaxed">Templates designed to pass Applicant Tracking Systems and get you noticed by recruiters.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                                <FileText className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Beautiful Templates</h3>
                                <p className="text-slate-400 leading-relaxed">Choose from a variety of professional templates that look great on screen and paper.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
