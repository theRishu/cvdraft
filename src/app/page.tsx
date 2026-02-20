import Link from "next/link";
import { ArrowRight, FileText, CheckCircle, Sparkles } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-white p-1.5 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">ResumeGPT</span>
          </div>
          <div className="flex items-center gap-4">
            {userId ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium mb-6 animate-fade-in-up">
              <Sparkles className="w-3 h-3" />
              <span>AI-Powered Resume Builder</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
              Craft the perfect resume <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900">in minutes.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Create professional, ATS-friendly resumes that get you hired.
              Our AI-powered builder helps you tell your professional story.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={userId ? "/dashboard" : "/sign-up"}
                className="px-8 py-4 text-base font-bold text-white bg-slate-900 rounded-xl hover:bg-black transition-colors shadow-xl shadow-slate-200 flex items-center gap-2"
              >
                Build Your Resume <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 text-base font-bold text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                View Templates
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto max-w-5xl mt-12 rounded-2xl border border-slate-200 bg-slate-50/50 p-2 md:p-4 shadow-2xl">
            <div className="rounded-xl overflow-hidden bg-white border border-slate-100 aspect-[16/9] relative">
              <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                <div className="text-center">
                  <div className="grid grid-cols-2 gap-8 p-8 opacity-50 scale-90 blur-[1px]">
                    <div className="w-[210mm] h-[297mm] bg-white shadow-xl border border-slate-100 p-8 text-left">
                      <div className="h-4 w-32 bg-slate-900 mb-2"></div>
                      <div className="h-3 w-48 bg-slate-200 mb-8"></div>
                      <div className="space-y-4">
                        <div className="h-3 w-full bg-slate-100"></div>
                        <div className="h-3 w-full bg-slate-100"></div>
                        <div className="h-3 w-2/3 bg-slate-100"></div>
                      </div>
                    </div>
                    <div className="hidden md:block w-[210mm] h-[297mm] bg-white shadow-xl border border-slate-100 p-8 text-left">
                      <div className="text-center mb-8">
                        <div className="h-4 w-32 bg-slate-900 mx-auto mb-2"></div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1 bg-slate-50 h-full"></div>
                        <div className="col-span-2 space-y-4">
                          <div className="h-3 w-full bg-slate-100"></div>
                          <div className="h-3 w-full bg-slate-100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white/90 backdrop-blur border border-slate-200 px-6 py-3 rounded-xl font-bold text-slate-900 shadow-xl">
                  Interactive Editor Preview
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to get hired</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to create a standout resume.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI-Powered</h3>
              <p className="text-slate-600 leading-relaxed">
                Get smart suggestions and content improvements powered by advanced AI to make your resume shine.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">ATS Friendly</h3>
              <p className="text-slate-600 leading-relaxed">
                All templates are designed to be easily read by Applicant Tracking Systems used by most recruiters.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Preview</h3>
              <p className="text-slate-600 leading-relaxed">
                See changes instantly as you type. Switch templates with a single click without losing content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-white p-1 rounded-md">
              <FileText className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg text-slate-900">ResumeGPT</span>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} ResumeGPT. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
