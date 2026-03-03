"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "./Header";

export default function StaticPageLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    fetch("/api/user")
      .then(r => r.json())
      .then(d => setIsPro(d.isPro || false))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#fdf9f6] flex flex-col font-sans selection:bg-primary/10 selection:text-primary">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-secondary/20 blur-[100px] pointer-events-none" />

      <Header isPro={isPro} />

      <main className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass p-8 sm:p-12 rounded-[2.5rem] border border-base-content/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all">
            <h1 className="text-4xl sm:text-5xl font-black text-base-content mb-8 tracking-tight">
              {title}
            </h1>
            <div className="prose prose-stone max-w-none text-base-content/70 leading-relaxed font-medium">
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-base-content/10 bg-base-100 py-12 px-6 relative z-10 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-base-content/50">
          <Link href="/" className="flex items-center gap-2 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
            <div className="w-6 h-6 rounded bg-base-content text-base-100 flex items-center justify-center font-bold text-[10px]">CV</div>
            <span className="font-bold tracking-tight text-base-content">Draft</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-semibold">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            <Link href="/refund-and-cancellation" className="hover:text-primary transition-colors">Refund Policy</Link>
            <Link href="/contact-us" className="hover:text-primary transition-colors">Contact Us</Link>
            <Link href="/knowledge-center" className="hover:text-primary transition-colors">Knowledge Center</Link>
          </div>
          <p className="font-medium tracking-wide">© {new Date().getFullYear()} CVdraft · <span className="opacity-60">RISHU KUMAR PANDEY</span></p>
        </div>
      </footer>
    </div>
  );
}
