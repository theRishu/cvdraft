"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

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
    <div className="min-h-screen bg-white flex flex-col">
      <Header isPro={isPro} />

      <main className="flex-1 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-8 tracking-tight">
              {title}
            </h1>
            <div className="text-slate-600 leading-relaxed text-[15px] space-y-4">
              {children}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
