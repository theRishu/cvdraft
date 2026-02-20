import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { FileText } from "lucide-react";

export default function Header() {
    return (
        <header className="h-16 border-b border-white/40 bg-white/60 backdrop-blur-xl sticky top-0 z-50 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative bg-slate-900 text-white p-2 rounded-xl border border-slate-800 shadow-sm group-hover:scale-105 transition-transform duration-300">
                            <FileText className="w-5 h-5 text-blue-400" />
                        </div>
                    </div>
                    <span className="font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                        {process.env.NEXT_PUBLIC_WEBSITE_NAME || "ResumeGPT"}
                    </span>
                </Link>
                <div className="flex items-center gap-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </header>
    );
}
