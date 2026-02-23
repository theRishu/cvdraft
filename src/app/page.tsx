import Link from "next/link";
import { ArrowRight, FileText, Zap, Shield, Sparkles } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  const features = [
    {
      emoji: "✨",
      title: "AI writes for you",
      desc: "Just fill in the basics — our AI turns it into polished, professional bullet points.",
    },
    {
      emoji: "📄",
      title: "Perfect PDF every time",
      desc: "What you see is exactly what you get. No surprises when you print or download.",
    },
    {
      emoji: "🎨",
      title: "Beautiful templates",
      desc: "Pick a clean, modern template that looks great to any recruiter or hiring manager.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fdf9f6] text-stone-900">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-100 h-16 flex items-center">
        <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="CVdraft" className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-xl transition-all active:scale-95"
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="pt-24 pb-32 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-8 border border-indigo-100">
              <Sparkles className="w-3.5 h-3.5" />
              Free to use · No credit card needed
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-stone-900 leading-tight mb-6">
              Your resume,{" "}
              <span className="text-indigo-600">done in minutes.</span>
            </h1>

            <p className="text-lg text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
              CVdraft helps you build a great resume quickly — no design skills needed,
              no confusing forms. Just you and a beautiful CV, ready to go.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-indigo-200"
              >
                Start building your CV <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sign-in"
                className="flex items-center justify-center px-8 py-4 bg-white text-stone-700 font-semibold rounded-2xl border border-stone-200 hover:border-stone-400 transition-all"
              >
                I already have an account
              </Link>
            </div>
          </div>

          {/* Mockup */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl shadow-stone-100 overflow-hidden">
              <div className="h-10 bg-stone-50 border-b border-stone-100 flex items-center px-4 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                <div className="mx-auto text-[10px] text-stone-400 font-medium bg-white border border-stone-200 px-3 py-0.5 rounded-md">
                  cvdraft.app/editor
                </div>
              </div>
              <div className="aspect-[16/8] bg-stone-50 flex gap-4 p-6">
                <div className="w-1/4 space-y-2">
                  {["👤 About Me", "💼 Experience", "🎓 Education", "⭐ Skills"].map(s => (
                    <div key={s} className="bg-white rounded-xl px-3 py-2 text-xs text-stone-500 font-medium shadow-sm border border-stone-100">{s}</div>
                  ))}
                </div>
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
                  <div className="h-4 w-40 bg-stone-900 rounded mb-1" />
                  <div className="h-3 w-28 bg-indigo-100 rounded mb-6" />
                  {[100, 85, 70, 90, 60].map((w, i) => (
                    <div key={i} className="h-2.5 bg-stone-50 rounded mb-2" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 px-6 bg-white border-t border-stone-100">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-stone-900 mb-4">
                Everything you need, nothing you don't.
              </h2>
              <p className="text-stone-500 max-w-xl mx-auto">
                We kept it simple on purpose — so you can focus on what matters: your career.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <div key={i} className="p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-300">
                  <div className="text-4xl mb-5">{f.emoji}</div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">{f.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-xl mx-auto">
            <div className="text-5xl mb-6">🚀</div>
            <h2 className="text-3xl font-black text-stone-900 mb-4">Ready to get hired?</h2>
            <p className="text-stone-500 mb-8">Create your first resume in under 5 minutes. It's free.</p>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-indigo-200"
            >
              Create my CV now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-400">
          <Link href="/">
            <img src="/logo.svg" alt="CVdraft" className="h-7 w-auto opacity-60" />
          </Link>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-stone-700 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-stone-700 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-stone-700 transition-colors">Contact</Link>
          </div>
          <p>© {new Date().getFullYear()} CVdraft</p>
        </div>
      </footer>
    </div>
  );
}
