import Link from "next/link";
import { ArrowRight, Sparkles, FileText, Zap, Shield, LayoutDashboard, Check } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export const metadata = {
  title: "CVdraft — AI Resume Builder",
  description:
    "Create a polished, ATS-friendly resume in minutes with AI. Free to use, no credit card needed.",
};

const features = [
  {
    icon: Sparkles,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    title: "AI writes for you",
    desc: "Just fill in the basics — our AI turns it into polished, professional bullet points instantly.",
  },
  {
    icon: FileText,
    color: "text-teal-500",
    bg: "bg-teal-50",
    border: "border-teal-100",
    title: "Perfect PDF every time",
    desc: "What you see is exactly what you get. No surprises when you print or download.",
  },
  {
    icon: Zap,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    title: "Beautiful templates",
    desc: "Pick a clean, ATS-optimised template that stands out to recruiters.",
  },
  {
    icon: Shield,
    color: "text-teal-500",
    bg: "bg-teal-50",
    border: "border-teal-100",
    title: "Privacy guaranteed",
    desc: "Your data is encrypted and never sold. Your resume belongs to you.",
  },
];

const freeFeatures = ["Up to 2 resumes", "AI Writing Assistant", "Standard templates", "PDF Downloads"];
const proFeatures = ["Unlimited resumes", "All premium templates", "Advanced AI suggestions", "No watermarks", "Priority support"];

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-slate-50 text-stone-900 overflow-x-hidden">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 shadow-sm overflow-x-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        }}>
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <div className="shrink-0 scale-90 sm:scale-100 origin-left">
            <Logo size="lg" href="/" />
          </div>

          {/* Right CTAs — always visible, no hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {userId ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-[14px] sm:text-[15px] font-black tracking-tight text-white cursor-pointer select-none transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #10b981, #14b8a6, #22c55e)", backgroundSize: "200% 200%", animation: "gradient 5s ease infinite" }}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden xs:inline">Dashboard</span>
                <span className="xs:hidden">Go</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-2 sm:px-4 py-2 text-[15px] sm:text-[16px] font-black tracking-tight text-slate-600 hover:text-emerald-600 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-[14px] sm:text-[15px] font-black tracking-tight text-white cursor-pointer select-none transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, #10b981, #14b8a6, #22c55e)", backgroundSize: "200% 200%", animation: "gradient 5s ease infinite" }}
                >
                  <span className="hidden sm:inline">Get started free</span>
                  <span className="sm:hidden">Start</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-36 pb-32 sm:pb-48 px-4 sm:px-6 text-center overflow-hidden">
        {/* Professional ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-400/20 rounded-full blur-[100px] mix-blend-multiply opacity-50 animate-pulse" />
          <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-teal-400/20 rounded-full blur-[90px] mix-blend-multiply opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[40vw] bg-green-300/20 rounded-full blur-[110px] mix-blend-multiply opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-4xl mx-auto z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 bg-white/70 backdrop-blur-xl border border-emerald-100 rounded-full shadow-[0_8px_30px_rgba(16,185,129,0.15)] text-emerald-700 font-bold text-[14px] tracking-wide uppercase hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">The World-Class AI Resume Builder</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-[84px] font-black tracking-tighter text-slate-800 leading-[1.05] mb-8 drop-shadow-sm">
            Your dream job, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 pb-2 drop-shadow-sm">built in minutes.</span>
          </h1>

          <p className="text-lg sm:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Stand out from the crowd with ATS-ready designs, brilliant AI writing, and a flawlessly beautiful editor.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto px-4 sm:px-0">
            {userId ? (
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-emerald-600 text-white font-black text-[16px] sm:text-[17px] rounded-[2rem] hover:bg-emerald-700 transition-all shadow-[0_15px_30px_-10px_rgba(16,185,129,0.5)] hover:-translate-y-1"
              >
                <LayoutDashboard className="w-5 h-5" />
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 text-white font-bold text-[17px] sm:text-[18px] rounded-[2rem] transition-all hover:-translate-y-1 shadow-[0_15px_30px_-10px_rgba(16,185,129,0.4)] relative overflow-hidden group"
                  style={{ background: "linear-gradient(135deg, #10b981, #14b8a6, #22c55e)", backgroundSize: "200% 200%", animation: "gradient 5s ease infinite" }}
                >
                  <span className="relative z-10 flex items-center gap-2 truncate">Build free resume <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" /></span>
                </Link>
                <Link
                  href="/sign-in"
                  className="flex items-center justify-center w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-white border-2 border-emerald-100 text-slate-600 font-bold text-[16px] sm:text-[17px] rounded-[2rem] hover:border-emerald-300 hover:bg-emerald-50 transition-all shadow-sm"
                >
                  I have an account
                </Link>
              </>
            )}
          </div>

          <p className="text-[13px] text-slate-400 mt-8 font-medium">
            Trusted by top job seekers · Powered by Google Gemini AI
          </p>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-4xl sm:text-6xl font-black text-slate-800 mb-6 tracking-tight">
              Flawless <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">features.</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg sm:text-2xl font-medium">
              We engineered a perfectly frictionless experience so you can focus entirely on your career.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, color, bg, border, title, desc }, i) => (
              <div
                key={i}
                className="group relative p-8 bg-white border-2 border-emerald-50 rounded-[2.5rem] shadow-[0_8px_30px_rgba(16,185,129,0.06)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)] hover:border-emerald-100 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-40 h-40 rounded-bl-[150px] opacity-10 transition-transform duration-500 group-hover:scale-150 ${bg}`} />
                <div className={`relative z-10 w-16 h-16 rounded-[1.5rem] bg-white shadow-sm border border-emerald-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${color}`} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
                  <p className="text-[15px] text-slate-500 leading-relaxed font-medium">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING SNAPSHOT ────────────────────────────────── */}
      <section className="relative py-32 sm:py-40 px-4 sm:px-6 bg-[#f8fdfa] border-y border-emerald-50 overflow-hidden">
        {/* Soft professional glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[100px] mix-blend-multiply pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-100/40 rounded-full blur-[120px] mix-blend-multiply pointer-events-none translate-y-1/3 -translate-x-1/3" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-4xl sm:text-6xl font-black text-slate-800 mb-6 tracking-tight">
              Honest pricing. <br className="sm:hidden" /> No surprises.
            </h2>
            <p className="text-slate-500 text-lg sm:text-2xl font-medium">Start entirely for free. Go Pro when you're ready.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            {/* Free */}
            <div className="bg-white border-2 border-emerald-100 rounded-[3rem] p-6 sm:p-10 flex flex-col hover:border-emerald-200 hover:shadow-[0_20px_40px_rgba(16,185,129,0.05)] transition-all">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Starter</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-black text-slate-800">₹0</span>
              </div>
              <p className="text-sm text-slate-500 mb-8 font-medium">Forever free, incredibly powerful.</p>
              <ul className="space-y-4 mb-10 flex-1">
                {freeFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-[15px] font-medium text-slate-600">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                      <Check className="w-4 h-4 text-emerald-500" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/sign-up"
                className="block text-center py-4 font-bold text-[17px] border-2 border-emerald-100 text-emerald-600 rounded-3xl hover:bg-emerald-50 transition-all"
              >
                Start Free
              </Link>
            </div>

            {/* Pro - Pops Out! */}
            <div className="relative bg-white rounded-[3rem] p-6 sm:p-10 flex flex-col shadow-[0_30px_100px_rgba(16,185,129,0.15)] scale-100 md:scale-110 z-10 border-[6px] border-emerald-100">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[12px] font-bold uppercase tracking-widest px-5 py-2 rounded-full shadow-lg">
                Most Popular
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-4">Premium Pro</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-black text-slate-800">₹79</span>
                <span className="text-slate-400 font-bold">/week</span>
              </div>
              <p className="text-sm text-slate-500 mb-8 font-medium">Monthly, 3M, 6M & Annual plans available.</p>
              <ul className="space-y-4 mb-10 flex-1">
                {proFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-[15px] font-bold text-slate-700">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center shrink-0 shadow-inner">
                      <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/premium"
                className="block text-center py-4 font-bold text-[17px] text-white rounded-3xl transition-all hover:opacity-90 hover:-translate-y-1 shadow-[0_15px_30px_-10px_rgba(16,185,129,0.4)]"
                style={{ background: "linear-gradient(135deg, #10b981, #14b8a6)", backgroundSize: "150% 150%" }}
              >
                Get Pro Access →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="w-24 h-24 bg-white/60 backdrop-blur-xl border border-emerald-100 shadow-[0_15px_40px_rgba(16,185,129,0.1)] rounded-[3rem] flex items-center justify-center mx-auto mb-10 rotate-12 hover:rotate-0 transition-transform duration-500">
            <span className="text-5xl drop-shadow-sm">🚀</span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-black text-slate-800 mb-8 tracking-tighter">Ready to launch?</h2>
          <p className="text-xl sm:text-2xl text-slate-500 mb-12 font-medium">Join thousands of job seekers who got hired faster.</p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-12 py-6 text-white font-bold text-xl rounded-[2.5rem] transition-all shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)] hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.5)] group"
            style={{ background: "linear-gradient(135deg, #10b981, #14b8a6)", backgroundSize: "150% 150%" }}
          >
            Create my Resume now
            <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
