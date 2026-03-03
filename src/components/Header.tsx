"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import NewResumeModal from "./dashboard/NewResumeModal";
import {
    LayoutDashboard,
    Palette,
    BarChart3,
    Search,
    HelpCircle,
    Bell,
    Menu,
    X,
    Keyboard,
    Lightbulb,
    BookOpen,
    MessageCircle,
    ChevronDown,
    Sparkles,
    FileText,
    Plus,
} from "lucide-react";

const NAV_LINKS = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/stat", label: "Analytics", icon: BarChart3 },
];

const TIPS = [
    {
        icon: Keyboard,
        title: "Keyboard shortcuts",
        desc: "Ctrl+S to save, Ctrl+P to print your resume",
    },
    {
        icon: Lightbulb,
        title: "Pro tip: AI suggestions",
        desc: "Add your API key in Settings to unlock smart bullet points",
    },
    {
        icon: BookOpen,
        title: "ATS-friendly resumes",
        desc: "Use the ATS template for maximum compatibility with job scanners",
    },
    {
        icon: MessageCircle,
        title: "Need help?",
        desc: "Contact us anytime — we respond within 24 hours",
    },
];

export default function Header({ isPro }: { isPro?: boolean }) {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const helpRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    // Close help dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (helpRef.current && !helpRef.current.contains(e.target as Node)) {
                setHelpOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Ctrl+K to focus search
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                searchRef.current?.focus();
            }
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
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
        <>
            <header
                className="sticky top-0 z-50"
                style={{
                    background: "rgba(255,255,255,0.82)",
                    backdropFilter: "blur(20px) saturate(1.8)",
                    WebkitBackdropFilter: "blur(20px) saturate(1.8)",
                    borderBottom: "1px solid rgba(231,229,228,0.6)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)",
                }}
            >
                <div
                    style={{
                        maxWidth: 1280,
                        margin: "0 auto",
                        padding: "0 24px",
                        height: 56,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    {/* ─── Brand ──────────────────────────────────── */}
                    <a
                        href="/dashboard"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            textDecoration: "none",
                            flexShrink: 0,
                            marginRight: 4,
                        }}
                    >
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 10,
                                background: "linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #a78bfa 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 2px 10px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
                                flexShrink: 0,
                                transition: "transform 0.2s, box-shadow 0.2s",
                            }}
                            className="hover:scale-110"
                        >
                            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                                <rect x="2" y="2" width="4" height="10" rx="1" fill="white" />
                                <rect x="8" y="2" width="4" height="4" rx="1" fill="white" opacity="0.7" />
                                <rect x="8" y="8" width="4" height="4" rx="1" fill="white" opacity="0.5" />
                            </svg>
                        </div>
                        <span
                            style={{
                                fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                                fontSize: 17,
                                fontWeight: 800,
                                color: "#0f172a",
                                letterSpacing: "-0.03em",
                            }}
                        >
                            CV<span style={{ color: "#6366f1" }}>draft</span>
                        </span>
                    </a>

                    {/* ─── Desktop Nav ────────────────────────────── */}
                    <nav
                        className="hidden md:flex"
                        style={{
                            alignItems: "center",
                            gap: 2,
                            marginLeft: 12,
                        }}
                    >
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    style={{
                                        padding: "6px 14px",
                                        borderRadius: 10,
                                        fontSize: 13,
                                        fontWeight: isActive ? 600 : 500,
                                        color: isActive ? "#4f46e5" : "#57534e",
                                        textDecoration: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                        background: isActive ? "rgba(99,102,241,0.08)" : "transparent",
                                        transition: "all 0.2s ease",
                                        position: "relative",
                                        whiteSpace: "nowrap",
                                    }}
                                    className="hover:bg-stone-100"
                                    onMouseEnter={(e) => {
                                        if (!isActive) e.currentTarget.style.color = "#1c1917";
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) e.currentTarget.style.color = "#57534e";
                                    }}
                                >
                                    <Icon size={15} strokeWidth={isActive ? 2.2 : 1.8} />
                                    {link.label}
                                    {isActive && (
                                        <span
                                            style={{
                                                position: "absolute",
                                                bottom: -1,
                                                left: 14,
                                                right: 14,
                                                height: 2,
                                                borderRadius: 2,
                                                background: "linear-gradient(90deg, #6366f1, #818cf8)",
                                            }}
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </nav>

                    {/* ─── Spacer ─────────────────────────────────── */}
                    <div style={{ flex: 1 }} />

                    {/* ─── Search ─────────────────────────────────── */}
                    <form
                        onSubmit={handleSearch}
                        className="hidden lg:flex"
                        style={{
                            alignItems: "center",
                            background: searchFocused ? "white" : "#f5f5f4",
                            borderRadius: 10,
                            padding: "0 12px",
                            height: 34,
                            width: searchFocused ? 260 : 200,
                            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                            border: searchFocused
                                ? "1.5px solid #6366f1"
                                : "1px solid transparent",
                            boxShadow: searchFocused
                                ? "0 0 0 3px rgba(99,102,241,0.1)"
                                : "none",
                        }}
                    >
                        <Search
                            size={14}
                            style={{
                                color: searchFocused ? "#6366f1" : "#a8a29e",
                                flexShrink: 0,
                                transition: "color 0.2s",
                            }}
                        />
                        <input
                            ref={searchRef}
                            type="text"
                            placeholder="Search resumes…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                            style={{
                                flex: 1,
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                fontSize: 13,
                                color: "#1c1917",
                                padding: "0 8px",
                                fontFamily: "inherit",
                            }}
                        />
                        {!searchFocused && (
                            <kbd
                                style={{
                                    fontSize: 10,
                                    color: "#a8a29e",
                                    background: "white",
                                    border: "1px solid #e7e5e4",
                                    borderRadius: 4,
                                    padding: "1px 5px",
                                    fontFamily: "inherit",
                                    lineHeight: 1.4,
                                    flexShrink: 0,
                                }}
                            >
                                ⌘K
                            </kbd>
                        )}
                    </form>

                    {/* ─── Upgrade button ────────────────────────── */}
                    {!isPro && (
                        <Link
                            href="/premium"
                            className="hidden lg:flex items-center gap-2 px-4 py-2 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-all shadow-sm mr-1"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            Upgrade
                        </Link>
                    )}

                    {/* ─── New Resume ─────────────────────────────── */}
                    <NewResumeModal
                        trigger={
                            <div
                                className="hidden sm:flex"
                                style={{
                                    padding: "7px 16px",
                                    borderRadius: 10,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "white",
                                    background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    userSelect: "none",
                                    boxShadow: "0 2px 8px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    e.currentTarget.style.boxShadow =
                                        "0 4px 14px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.15)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow =
                                        "0 2px 8px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.15)";
                                }}
                            >
                                <Plus size={15} strokeWidth={2.5} />
                                <span>New Resume</span>
                            </div>
                        }
                    />

                    {/* ─── Icon Buttons ───────────────────────────── */}
                    <div
                        className="hidden md:flex"
                        style={{ alignItems: "center", gap: 2 }}
                    >
                        {/* Help dropdown */}
                        <div ref={helpRef} style={{ position: "relative" }}>
                            <button
                                onClick={() => setHelpOpen(!helpOpen)}
                                style={{
                                    width: 34,
                                    height: 34,
                                    borderRadius: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "none",
                                    background: helpOpen ? "rgba(99,102,241,0.08)" : "transparent",
                                    cursor: "pointer",
                                    color: helpOpen ? "#6366f1" : "#78716c",
                                    transition: "all 0.2s",
                                }}
                                className="hover:bg-stone-100"
                                title="Help & Tips"
                            >
                                <HelpCircle size={18} strokeWidth={1.8} />
                            </button>

                            {/* Help dropdown panel */}
                            {helpOpen && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "calc(100% + 8px)",
                                        right: 0,
                                        width: 320,
                                        background: "white",
                                        borderRadius: 16,
                                        border: "1px solid #e7e5e4",
                                        boxShadow: "0 10px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.04)",
                                        padding: 8,
                                        zIndex: 100,
                                        animation: "dropdownFade 0.18s ease-out",
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: "10px 12px 8px",
                                            fontSize: 11,
                                            fontWeight: 700,
                                            color: "#a8a29e",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.06em",
                                        }}
                                    >
                                        Help & Tips
                                    </div>
                                    {TIPS.map((tip, i) => {
                                        const TipIcon = tip.icon;
                                        return (
                                            <div
                                                key={i}
                                                style={{
                                                    display: "flex",
                                                    gap: 12,
                                                    padding: "10px 12px",
                                                    borderRadius: 12,
                                                    cursor: "pointer",
                                                    transition: "background 0.15s",
                                                }}
                                                className="hover:bg-stone-50"
                                            >
                                                <div
                                                    style={{
                                                        width: 36,
                                                        height: 36,
                                                        borderRadius: 10,
                                                        background: "#f5f3ff",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <TipIcon size={16} style={{ color: "#6366f1" }} />
                                                </div>
                                                <div style={{ minWidth: 0 }}>
                                                    <div
                                                        style={{
                                                            fontSize: 13,
                                                            fontWeight: 600,
                                                            color: "#1c1917",
                                                            marginBottom: 2,
                                                        }}
                                                    >
                                                        {tip.title}
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontSize: 12,
                                                            color: "#78716c",
                                                            lineHeight: 1.4,
                                                        }}
                                                    >
                                                        {tip.desc}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Notifications */}
                        <button
                            style={{
                                width: 34,
                                height: 34,
                                borderRadius: 10,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                color: "#78716c",
                                position: "relative",
                                transition: "all 0.2s",
                            }}
                            className="hover:bg-stone-100"
                            title="Notifications"
                        >
                            <Bell size={18} strokeWidth={1.8} />
                            {/* Activity dot */}
                            <span
                                style={{
                                    position: "absolute",
                                    top: 7,
                                    right: 8,
                                    width: 7,
                                    height: 7,
                                    borderRadius: "50%",
                                    background: "#ef4444",
                                    border: "1.5px solid white",
                                }}
                            />
                        </button>
                    </div>

                    {/* ─── Divider ────────────────────────────────── */}
                    <div
                        className="hidden md:block"
                        style={{
                            width: 1,
                            height: 24,
                            background: "#e7e5e4",
                            margin: "0 4px",
                            flexShrink: 0,
                        }}
                    />

                    {/* ─── User Avatar ────────────────────────────── */}
                    <div style={{ flexShrink: 0 }}>
                        <UserButton afterSignOutUrl="/" />
                    </div>

                    {/* ─── Mobile Hamburger ────────────────────────── */}
                    <button
                        className="md:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "none",
                            background: mobileOpen ? "rgba(99,102,241,0.08)" : "transparent",
                            cursor: "pointer",
                            color: "#57534e",
                            transition: "all 0.2s",
                            flexShrink: 0,
                        }}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* ─── Mobile Menu ─────────────────────────────────── */}
                {mobileOpen && (
                    <div
                        className="md:hidden"
                        style={{
                            borderTop: "1px solid #f5f5f4",
                            padding: "8px 16px 16px",
                            background: "rgba(255,255,255,0.97)",
                            backdropFilter: "blur(20px)",
                            animation: "slideDown 0.2s ease-out",
                        }}
                    >
                        {/* Mobile search */}
                        <form
                            onSubmit={handleSearch}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                background: "#f5f5f4",
                                borderRadius: 12,
                                padding: "0 12px",
                                height: 40,
                                marginBottom: 8,
                            }}
                        >
                            <Search size={16} style={{ color: "#a8a29e", flexShrink: 0 }} />
                            <input
                                type="text"
                                placeholder="Search resumes…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    flex: 1,
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    fontSize: 14,
                                    color: "#1c1917",
                                    padding: "0 10px",
                                    fontFamily: "inherit",
                                }}
                            />
                        </form>

                        {/* Mobile nav links */}
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        padding: "10px 12px",
                                        borderRadius: 12,
                                        fontSize: 14,
                                        fontWeight: isActive ? 600 : 500,
                                        color: isActive ? "#4f46e5" : "#57534e",
                                        textDecoration: "none",
                                        background: isActive ? "rgba(99,102,241,0.06)" : "transparent",
                                        transition: "background 0.15s",
                                    }}
                                >
                                    <Icon size={18} strokeWidth={isActive ? 2 : 1.6} />
                                    {link.label}
                                </a>
                            );
                        })}

                        {!isPro && (
                            <a
                                href="/premium"
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    padding: "10px 12px",
                                    borderRadius: 12,
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: "#d97706",
                                    background: "#fffbeb",
                                    border: "1px solid #fef3c7",
                                    textDecoration: "none",
                                    marginTop: 4,
                                }}
                            >
                                <Sparkles size={18} />
                                Upgrade to Pro
                            </a>
                        )}

                        {/* Mobile new resume */}
                        <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #f5f5f4" }}>
                            <NewResumeModal
                                trigger={
                                    <div
                                        style={{
                                            padding: "10px 16px",
                                            borderRadius: 12,
                                            fontSize: 14,
                                            fontWeight: 600,
                                            color: "white",
                                            background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 8,
                                            boxShadow: "0 2px 8px rgba(99,102,241,0.3)",
                                        }}
                                    >
                                        <Plus size={16} strokeWidth={2.5} />
                                        New Resume
                                    </div>
                                }
                            />
                        </div>
                    </div>
                )}
            </header>

            {/* ─── CSS Keyframes (injected once) ──────────────────── */}
            <style jsx global>{`
                @keyframes dropdownFade {
                    from { opacity: 0; transform: translateY(-4px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}
