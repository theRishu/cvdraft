import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
            <Loader2 className="w-10 h-10 text-slate-900 animate-spin" />
        </div>
    );
}
