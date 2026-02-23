"use client";
import NewResumeModal from "./NewResumeModal";
import { Plus } from "lucide-react";

export default function CreateResumeButton({ isLarge }: { user?: any; isLarge?: boolean }) {
    return (
        <NewResumeModal
            trigger={
                <button className={`flex items-center gap-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all active:scale-95 shadow-sm ${isLarge ? "px-8 py-3.5 text-base" : "px-5 py-2.5 text-sm"}`}>
                    <Plus className="w-4 h-4" />
                    {isLarge ? "Create my first resume" : "New resume"}
                </button>
            }
        />
    );
}
