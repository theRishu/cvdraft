import { Plus, X, Zap, Sparkles, ChevronUp, ChevronDown } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import AiImproveButton from "./AiImproveButton";
import AlignmentToggle from "./AlignmentToggle";

interface SkillsProps {
    data: any[];
    onChange: (d: any) => void;
    textAlign?: string;
    onTextAlignChange?: (align: string) => void;
}

const POPULAR_SKILLS = [
    "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "AWS", "Docker",
    "Git", "SQL", "MongoDB", "GraphQL", "Kubernetes", "TailwindCSS", "Next.js", "Vue.js",
    "Machine Learning", "Data Analysis", "Project Management", "Agile", "Figma", "REST APIs",
];

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function Skills({ data = [], onChange, textAlign, onTextAlignChange }: SkillsProps) {
    const [newItem, setNewItem] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleAdd = (name?: string) => {
        const skill = name || newItem.trim();
        if (!skill) return;
        if (data.some((s: any) => (typeof s === "string" ? s : s.name).toLowerCase() === skill.toLowerCase())) return;
        onChange([...data, { id: uuidv4(), name: skill, level: "Intermediate" }]);
        if (!name) setNewItem("");
        setShowSuggestions(false);
    };

    const handleRemove = (id: string) => {
        onChange(data.filter((item: any) => item.id !== id));
    };

    const handleLevelChange = (id: string, level: string) => {
        onChange(data.map((item: any) => item.id === id ? { ...item, level } : item));
    };

    const handleMoveUp = (idx: number) => {
        if (idx === 0) return;
        const next = [...data];
        [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
        onChange(next);
    };

    const handleMoveDown = (idx: number) => {
        if (idx === data.length - 1) return;
        const next = [...data];
        [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
        onChange(next);
    };

    const filtered = POPULAR_SKILLS.filter(s =>
        newItem.length > 0 &&
        s.toLowerCase().includes(newItem.toLowerCase()) &&
        !data.some((d: any) => (typeof d === "string" ? d : d.name).toLowerCase() === s.toLowerCase())
    );

    const levelColor = (level: string) => {
        const map: Record<string, string> = {
            Beginner: "bg-slate-100 text-slate-500",
            Intermediate: "bg-blue-50 text-blue-600",
            Advanced: "bg-indigo-50 text-indigo-600",
            Expert: "bg-purple-50 text-purple-600",
        };
        return map[level] || "bg-slate-100 text-slate-500";
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl">
                        <Zap className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Skills</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Technical Arsenal — {data.length} added</p>
                    </div>
                </div>
                {onTextAlignChange && (
                    <AlignmentToggle value={textAlign || "left"} onChange={onTextAlignChange} />
                )}
            </div>

            {/* Add skill input */}
            <div className="relative">
                <form onSubmit={e => { e.preventDefault(); handleAdd(); }} className="flex gap-3">
                    <div className="flex-1 relative">
                        <input
                            value={newItem}
                            onChange={e => { setNewItem(e.target.value); setShowSuggestions(true); }}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                            placeholder="e.g. React, Python, AWS…"
                            className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl px-5 py-3.5 text-sm outline-none transition-all duration-300 font-bold"
                        />
                        {/* Autocomplete dropdown */}
                        {showSuggestions && filtered.length > 0 && (
                            <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-slate-100 rounded-2xl shadow-lg z-20 overflow-hidden">
                                {filtered.slice(0, 6).map(s => (
                                    <button key={s} type="button" onClick={() => handleAdd(s)}
                                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button type="submit"
                        className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg">
                        Add
                    </button>
                </form>

                {/* Popular suggestions pills */}
                {data.length === 0 && (
                    <div className="mt-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Popular Skills</p>
                        <div className="flex flex-wrap gap-2">
                            {POPULAR_SKILLS.slice(0, 12).map(s => (
                                <button key={s} onClick={() => handleAdd(s)}
                                    className="px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-all">
                                    + {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Skills list with level picker and reorder */}
            <div className="space-y-2">
                {data.map((item: any, idx: number) => {
                    const name = typeof item === "string" ? item : item.name;
                    const level = item.level || "Intermediate";
                    const id = item.id || name;
                    return (
                        <div key={id} className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl group hover:border-slate-200 transition-all">
                            {/* Reorder buttons */}
                            <div className="flex flex-col gap-0.5">
                                <button onClick={() => handleMoveUp(idx)} className="p-0.5 text-slate-200 hover:text-slate-600 transition-colors"><ChevronUp className="w-3 h-3" /></button>
                                <button onClick={() => handleMoveDown(idx)} className="p-0.5 text-slate-200 hover:text-slate-600 transition-colors"><ChevronDown className="w-3 h-3" /></button>
                            </div>

                            <span className="flex-1 text-sm font-bold text-slate-700">{name}</span>

                            {/* Level picker */}
                            <select
                                value={level}
                                onChange={e => handleLevelChange(id, e.target.value)}
                                className={`text-[10px] font-bold px-2 py-1 rounded-lg border-0 outline-none cursor-pointer ${levelColor(level)}`}
                            >
                                {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>

                            <button onClick={() => handleRemove(id)}
                                className="p-1.5 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    );
                })}

                {data.length === 0 && (
                    <div className="text-center py-12 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">No skills added yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
