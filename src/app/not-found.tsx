import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#fdf9f6] flex flex-col items-center justify-center text-center px-6">
            <div className="text-7xl mb-6">🗺️</div>
            <h1 className="text-3xl font-black text-stone-900 mb-2">Page not found</h1>
            <p className="text-stone-500 mb-8 max-w-sm text-sm leading-relaxed">
                Sorry, we couldn't find what you were looking for. It might have been moved or deleted.
            </p>
            <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all active:scale-95"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to home
            </Link>
        </div>
    );
}
