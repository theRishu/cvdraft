import Link from "next/link";
import Logo from "./Logo";

const POLICY_LINKS = [
    { href: "/about-us", label: "About Us" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms & Conditions" },
    { href: "/refund-and-cancellation", label: "Refund Policy" },
    { href: "/delivery-and-shipping", label: "Delivery & Shipping" },
];

export default function Footer() {
    return (
        <footer className="w-full bg-[#f8fdfa] border-t border-emerald-50 py-20 px-6 mt-auto relative overflow-hidden">
            {/* Professional Ambient glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-200/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">

                {/* Brand & Copyright */}
                <div className="flex flex-col items-center md:items-start gap-5">
                    <Logo size="lg" />
                    <p className="text-[15px] font-bold text-stone-500 max-w-sm text-center md:text-left leading-relaxed">
                        Build a professional, ATS-friendly resume in minutes. Stand out to recruiters, tell your story, and land your dream job faster.
                    </p>
                    <p className="text-[14px] font-bold text-stone-400 mt-2">
                        © {new Date().getFullYear()} CVdraft Technologies. All rights reserved.
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-xl shadow-[0_4px_12px_rgba(16,185,129,0.08)] border border-emerald-100">
                        <span className="text-[14px] font-bold text-slate-500">Made by</span>
                        <span className="text-[15px] font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                            Rishu Kumar Pandey
                        </span>
                    </div>
                </div>

                {/* Policy Links */}
                <div className="flex flex-col items-center md:items-end gap-6">
                    <h4 className="text-[14px] font-black tracking-[0.2em] text-emerald-600 uppercase">
                        Company & Legal
                    </h4>
                    <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 max-w-lg">
                        {POLICY_LINKS.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className="text-[16px] sm:text-[17px] font-black text-slate-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 transition-all drop-shadow-sm hover:scale-105 transform duration-200"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>

            </div>
        </footer>
    );
}
