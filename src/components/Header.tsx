"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import NewResumeModal from "./dashboard/NewResumeModal";
import Logo from "./Logo";
import {
    LayoutDashboard,
    BarChart3,
    Search,
    Sparkles,
    Plus,
} from "lucide-react";

const NAV_LINKS = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/stat", label: "Analytics", icon: BarChart3 },
];

export default function Header({ isPro }: { isPro?: boolean }) {
    const pathname = usePathname();
    const router = useRouter();
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);

    // Ctrl+K → focus search
    useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                searchRef.current?.focus();
            }
        };
        document.addEventListener("keydown", h);
        return () => document.removeEventListener("keydown", h);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/dashboard?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
            searchRef.current?.blur();
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 shadow-sm"
            style={{
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(20px) saturate(1.4)",
                WebkitBackdropFilter: "blur(20px) saturate(1.4)",
            }}>
            <div className="max-w-7xl mx-auto px-3 sm:px-6 h-20 flex items-center gap-2 sm:gap-5">

                {/* ── Brand ─────────────────────────── */}
                <div className="shrink-0 mr-1 sm:mr-4 scale-90 sm:scale-100 origin-left">
                    <Logo href="/dashboard" size="md" />
                </div>

                {/* ── Desktop Nav ────────────────────── */}
                <nav className="hidden md:flex items-center gap-2">
                    {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                        const active = pathname === href || pathname.startsWith(href + "/");
                        return (
                            <a
                                key={href}
                                href={href}
                                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[16px] font-black tracking-tight transition-all ${active
                                    ? "bg-gradient-to-r from-emerald-500/15 to-teal-500/15 text-emerald-700 shadow-inner"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-emerald-50/50"
                                    }`}
                            >
                                <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                                {label}
                            </a>
                        );
                    })}
                </nav>

                {/* ── Spacer ─────────────────────────── */}
                <div className="flex-1" />

                {/* ── Search (desktop only) ─────────── */}
                <form
                    onSubmit={handleSearch}
                    className="hidden lg:flex items-center gap-2 h-12 px-5 rounded-xl border-2 border-slate-200/60 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/20 transition-all bg-white shadow-sm"
                    style={{
                        width: searchFocused ? 280 : 220,
                    }}
                >
                    <Search size={18} className={searchFocused ? "text-emerald-600" : "text-slate-400"} strokeWidth={searchFocused ? 2.5 : 2} />
                    <input
                        ref={searchRef}
                        type="text"
                        placeholder="Search your resumes…"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className="flex-1 min-w-0 bg-transparent border-none outline-none text-[16px] font-bold text-slate-900 placeholder:text-slate-400"
                    />
                </form>

                {/* ── Upgrade pill ───────────────────── */}
                {!isPro && (
                    <Link
                        href="/premium"
                        className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-[15px] font-black tracking-tight text-emerald-700 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl hover:from-emerald-500/20 hover:to-teal-500/20 transition-all shadow-[0_2px_12px_-4px_rgba(16,185,129,0.3)] whitespace-nowrap"
                    >
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        Upgrade
                    </Link>
                )}

                {/* ── New Resume ─────────────────────── */}
                <NewResumeModal
                    trigger={
                        <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[15px] font-black tracking-tight text-white cursor-pointer select-none transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)]"
                            style={{ background: "linear-gradient(135deg, #10b981, #14b8a6, #22c55e)", backgroundSize: "200% 200%", animation: "gradient 5s ease infinite" }}>
                            <Plus size={18} strokeWidth={3} />
                            <span className="hidden sm:inline">New Resume</span>
                        </div>
                    }
                />

                {/* ── Divider ────────────────────────── */}
                <div className="w-px h-6 bg-slate-200 mx-2" />

                {/* ── User Avatar ────────────────────── */}
                <UserButton afterSignOutUrl="/" />
            </div>
        </header>
    );
}
