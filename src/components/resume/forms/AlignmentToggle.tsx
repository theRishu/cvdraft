import React from "react";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

interface AlignmentToggleProps {
    value: string;
    onChange: (value: string) => void;
}

export default function AlignmentToggle({ value = "left", onChange }: AlignmentToggleProps) {
    return (
        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-200/50 w-fit">
            <button
                type="button"
                onClick={() => onChange("left")}
                className={`p-1.5 rounded-lg transition-all ${value === "left" || !value ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
                title="Align Left"
            >
                <AlignLeft className="w-3.5 h-3.5" />
            </button>
            <button
                type="button"
                onClick={() => onChange("center")}
                className={`p-1.5 rounded-lg transition-all ${value === "center" ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
                title="Align Center"
            >
                <AlignCenter className="w-3.5 h-3.5" />
            </button>
            <button
                type="button"
                onClick={() => onChange("right")}
                className={`p-1.5 rounded-lg transition-all ${value === "right" ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
                title="Align Right"
            >
                <AlignRight className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}
