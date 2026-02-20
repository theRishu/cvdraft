import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Page not found</h1>
            <p className="text-slate-500 mb-8 max-w-md">
                Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
            <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-black transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
            </Link>
        </div>
    );
}
