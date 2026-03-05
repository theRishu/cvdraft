import Link from "next/link";

export default function Logo({ href = "/", size = "md" }: { href?: string; size?: "sm" | "md" | "lg" }) {
    const box = size === "sm" ? "w-7 h-7 rounded-lg text-[9px]" : size === "lg" ? "w-10 h-10 rounded-xl text-xs" : "w-8 h-8 rounded-xl text-[10px]";
    const text = size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base";

    return (
        <Link href={href} className="flex items-center gap-2 select-none shrink-0">
            <div className={`${box} bg-emerald-600 flex items-center justify-center shrink-0 shadow-sm`}>
                <svg viewBox="0 0 14 14" fill="none" width="55%" height="55%">
                    <rect x="2" y="2" width="4" height="10" rx="1" fill="white" />
                    <rect x="8" y="2" width="4" height="4" rx="1" fill="white" opacity="0.75" />
                    <rect x="8" y="8" width="4" height="4" rx="1" fill="white" opacity="0.5" />
                </svg>
            </div>
            <span className={`font-black tracking-tight text-slate-800 ${text}`}>
                CV<span className="text-emerald-600">draft</span>
            </span>
        </Link>
    );
}
