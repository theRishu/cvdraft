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
    <div className="min-h-screen bg-base-100 text-base-content selection:bg-primary/30 relative overflow-hidden">

      {/* Background Ambient Glows for Antigravity Vibe */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-secondary/20 blur-[100px] pointer-events-none" />

      {/* Nav */}
      <nav className="navbar sticky top-0 z-50 bg-base-100/60 backdrop-blur-2xl border-b border-base-content/5 px-4 sm:px-8">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case text-xl gap-2 hover:bg-transparent px-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              CV
            </div>
            <span className="font-bold tracking-tight">Draft</span>
          </Link>
        </div>
        <div className="flex-none gap-2 sm:gap-4">
          <Link href="/sign-in" className="btn btn-ghost btn-sm sm:btn-md text-base-content/70 hover:text-base-content">
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="btn btn-primary btn-sm sm:btn-md border-0 shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all font-semibold rounded-xl"
          >
            Get started free
          </Link>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero */}
        <section className="pt-20 sm:pt-32 pb-24 sm:pb-40 px-6 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">

            <div className="badge badge-outline badge-primary gap-2 shadow-[0_0_15px_rgba(139,92,246,0.2)] border-primary/30 text-primary bg-primary/5 backdrop-blur-md px-4 py-4 sm:py-5 mb-8 rounded-full text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Free to use · No credit card needed
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-base-content leading-[1.1] mb-8">
              Your resume,{" "}
              <br className="max-sm:hidden" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary drop-shadow-[0_0_25px_rgba(139,92,246,0.4)]">done in minutes.</span>
            </h1>

            <p className="text-lg sm:text-xl text-base-content/60 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              CVdraft helps you build a great resume quickly — no design skills needed,
              no confusing forms. Just you and a beautiful CV, ready to fly.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto px-4">
              <Link
                href="/sign-up"
                className="btn btn-primary btn-lg rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.7)] transition-all transform hover:-translate-y-1 border-0"
              >
                Start building your CV <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
              <Link
                href="/sign-in"
                className="btn btn-outline btn-lg rounded-2xl border-base-content/20 text-base-content hover:bg-base-content/5 hover:border-base-content/40 transition-all font-semibold"
              >
                I already have an account
              </Link>
            </div>
          </div>

          {/* Floating Mockup */}
          <div className="mt-20 sm:mt-28 max-w-5xl mx-auto perspective-[2000px]">
            <div className="glass rounded-[2rem] sm:rounded-[2.5rem] border border-base-content/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden relative bg-base-200/30 backdrop-blur-xl transform hover:rotate-x-[2deg] hover:rotate-y-[-2deg] transition-transform duration-700 ease-out">
              {/* Browser Header */}
              <div className="h-12 bg-base-300/40 border-b border-base-content/10 flex items-center px-6 gap-2 backdrop-blur-md">
                <div className="w-3 h-3 rounded-full bg-error/80 shadow-[0_0_8px_rgba(248,113,113,0.6)]" />
                <div className="w-3 h-3 rounded-full bg-warning/80 shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                <div className="w-3 h-3 rounded-full bg-success/80 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                <div className="mx-auto text-xs text-base-content/40 font-medium bg-base-100/50 border border-base-content/5 px-4 sm:px-24 py-1.5 rounded-lg backdrop-blur-sm">
                  cvdraft.app/editor
                </div>
              </div>

              <div className="aspect-[16/10] sm:aspect-[16/9] bg-base-100/20 flex flex-col sm:flex-row gap-6 p-6 sm:p-8">
                {/* Sidebar Mockup */}
                <div className="hidden sm:flex w-1/4 flex-col gap-3">
                  {["👤 About Me", "💼 Experience", "🎓 Education", "⭐ Skills"].map(s => (
                    <div key={s} className="bg-base-200/60 rounded-xl px-4 py-3 text-sm text-base-content/70 font-semibold shadow-sm border border-base-content/5 backdrop-blur-md hover:bg-base-200 transition-colors">{s}</div>
                  ))}
                  <div className="mt-auto h-24 bg-gradient-to-t from-base-200/80 to-transparent rounded-xl border border-base-content/5" />
                </div>

                {/* Mobile placeholder */}
                <div className="sm:hidden flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
                  {["👤 Bio", "💼 Work", "🎓 Edu", "⭐ Skills"].map(s => (
                    <div key={s} className="bg-base-200/80 rounded-xl px-4 py-2 text-xs text-base-content/80 font-bold shadow-sm border border-base-content/5 whitespace-nowrap">{s}</div>
                  ))}
                </div>

                {/* Canvas Mockup */}
                <div className="flex-1 bg-base-100 rounded-2xl sm:rounded-3xl shadow-2xl border border-base-content/5 p-8 sm:p-12 relative overflow-hidden flex flex-col gap-6 transform translate-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="h-6 w-48 sm:w-64 bg-base-content rounded-md mb-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                      <div className="h-4 w-32 sm:w-40 bg-primary/40 rounded-md" />
                    </div>
                    <div className="h-16 w-16 rounded-full bg-base-200 border-2 border-primary/20" />
                  </div>

                  <div className="space-y-3 mt-4">
                    <div className="h-3 w-full bg-base-200 rounded-sm" />
                    <div className="h-3 w-11/12 bg-base-200 rounded-sm" />
                    <div className="h-3 w-4/5 bg-base-200 rounded-sm" />
                  </div>

                  <div className="mt-6 flex gap-3">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-6 w-16 bg-primary/10 border border-primary/20 rounded-full" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 sm:py-32 px-6 border-t border-base-content/5 relative">
          <div className="absolute inset-0 bg-base-200/30" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16 sm:mb-24">
              <h2 className="text-4xl sm:text-5xl font-black text-base-content mb-6">
                Everything you need, <br className="sm:hidden" />nothing you don't.
              </h2>
              <p className="text-base-content/60 max-w-xl mx-auto text-lg">
                We engineered simplicity — so you can focus entirely on what matters: your career trajectory.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {features.map((f, i) => (
                <div key={i} className="p-8 sm:p-10 rounded-3xl bg-base-100 border border-base-content/10 hover:border-primary/40 hover:bg-primary/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(139,92,246,0.15)] group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent blur-2xl group-hover:from-primary/20 transition-all" />
                  <div className="text-4xl sm:text-5xl mb-6 transform group-hover:scale-110 transition-transform origin-bottom-left">{f.emoji}</div>
                  <h3 className="text-xl font-bold text-base-content mb-3">{f.title}</h3>
                  <p className="text-base-content/60 text-base leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32 px-6 text-center relative overflow-hidden">
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-[100px] pointer-events-none" />
          <div className="max-w-xl mx-auto relative z-10 glass p-12 rounded-[3rem] border border-base-content/10">
            <div className="text-5xl sm:text-6xl mb-8">🚀</div>
            <h2 className="text-3xl sm:text-5xl font-black text-base-content mb-6 leading-tight">Ready to launch?</h2>
            <p className="text-lg text-base-content/60 mb-10">Create your stellar resume in under 5 minutes. It's free.</p>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-10 py-5 bg-base-content text-base-100 hover:bg-primary hover:text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.5)] border-0"
            >
              Ignite your career <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-base-content/10 bg-base-100 py-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-base-content/50">
          <Link href="/" className="flex items-center gap-2 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
            <div className="w-6 h-6 rounded bg-base-content text-base-100 flex items-center justify-center font-bold text-[10px]">CV</div>
            <span className="font-bold tracking-tight text-base-content">Draft</span>
          </Link>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-base-content transition-colors font-medium">Privacy</Link>
            <Link href="#" className="hover:text-base-content transition-colors font-medium">Terms</Link>
            <Link href="#" className="hover:text-base-content transition-colors font-medium">Contact</Link>
          </div>
          <p className="font-medium tracking-wide">© {new Date().getFullYear()} CVdraft</p>
        </div>
      </footer>
    </div>
  );
}
