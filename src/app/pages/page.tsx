import Link from "next/link";
import {
    Home, LayoutDashboard, FileText, Star, Phone,
    Shield, ReceiptText, BookOpen, Info, Crown
} from "lucide-react";

const pages = [
    {
        section: "Main", items: [
            { href: "/", label: "Home", icon: Home, desc: "Landing page" },
            { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, desc: "Your resumes" },
            { href: "/templates", label: "Templates", icon: FileText, desc: "Browse resume templates" },
            { href: "/premium", label: "Buy Premium", icon: Crown, desc: "Upgrade to Pro — ₹299" },
        ]
    },
    {
        section: "Auth", items: [
            { href: "/sign-in", label: "Sign In", icon: Star, desc: "Login to your account" },
            { href: "/sign-up", label: "Sign Up", icon: Star, desc: "Create a new account" },
        ]
    },
    {
        section: "Payment", items: [
            { href: "/payment/status", label: "Payment Status", icon: ReceiptText, desc: "Post-payment verification page" },
        ]
    },
    {
        section: "Policies (RBI / Cashfree)", items: [
            { href: "/contact-us", label: "Contact Us", icon: Phone, desc: "Business details & grievance officer" },
            { href: "/terms-and-conditions", label: "Terms & Conditions", icon: FileText, desc: "Service terms, governing law" },
            { href: "/refund-and-cancellation", label: "Refund Policy", icon: ReceiptText, desc: "Eligibility, timelines, process" },
            { href: "/privacy-policy", label: "Privacy Policy", icon: Shield, desc: "Data collection & user rights" },
            { href: "/knowledge-center", label: "Knowledge Center", icon: BookOpen, desc: "Resume tips & platform guides" },
        ]
    },
];

export default function PagesIndex() {
    return (
        <div className="min-h-screen bg-[#fdf9f6] px-6 py-16">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xs">CV</div>
                    <span className="font-black text-stone-900 text-xl">Draft</span>
                </div>
                <h1 className="text-3xl font-black text-stone-900 mt-6 mb-2">All Pages</h1>
                <p className="text-stone-400 text-sm mb-10">Quick reference for every route in the app.</p>

                <div className="space-y-10">
                    {pages.map(({ section, items }) => (
                        <div key={section}>
                            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">{section}</p>
                            <div className="flex flex-col gap-2">
                                {items.map(({ href, label, icon: Icon, desc }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className="flex items-center gap-4 p-4 bg-white border border-stone-100 rounded-2xl hover:border-indigo-200 hover:shadow-sm transition-all group"
                                    >
                                        <div className="w-10 h-10 bg-stone-50 group-hover:bg-indigo-50 border border-stone-100 group-hover:border-indigo-100 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                                            <Icon className="w-5 h-5 text-stone-400 group-hover:text-indigo-500 transition-colors" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-stone-900 text-sm">{label}</p>
                                            <p className="text-xs text-stone-400 truncate">{desc}</p>
                                        </div>
                                        <code className="text-xs text-stone-300 group-hover:text-indigo-400 font-mono transition-colors shrink-0">{href}</code>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-center text-xs text-stone-300 mt-16">© {new Date().getFullYear()} CVdraft</p>
            </div>
        </div>
    );
}
