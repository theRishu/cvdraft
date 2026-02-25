import React, { useState } from "react";
import { Plus, X, Globe, Star } from "lucide-react";
import AlignmentToggle from "./AlignmentToggle";

interface LanguagesProps {
    data: any[];
    onChange: (d: any[]) => void;
    textAlign?: string;
    onTextAlignChange?: (align: string) => void;
}

export default function Languages({ data = [], onChange, textAlign, onTextAlignChange }: LanguagesProps) {
    const [newItem, setNewItem] = useState("");
    const [newLevel, setNewLevel] = useState("Professional");

    const addLanguage = () => {
        if (newItem.trim()) {
            onChange([...(data || []), { id: Math.random().toString(36).substr(2, 9), name: newItem, level: newLevel }]);
            setNewItem("");
            setNewLevel("Professional");
        }
    };

    const removeLanguage = (index: number) => {
        onChange(data.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
                        <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Languages</h3>
                        <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Global Communication</p>
                    </div>
                </div>
                {onTextAlignChange && (
                    <AlignmentToggle value={textAlign || "left"} onChange={onTextAlignChange} />
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 bg-slate-50/50 p-3 rounded-2xl sm:rounded-[2rem] border border-slate-100 group focus-within:border-slate-200 transition-all">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addLanguage()}
                        className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 text-sm outline-none transition-all duration-300 font-bold"
                        placeholder="e.g. French, Spanish"
                        list="language-suggestions"
                    />
                    <datalist id="language-suggestions">
                        <option value="English" />
                        <option value="Spanish" />
                        <option value="French" />
                        <option value="German" />
                        <option value="Chinese" />
                        <option value="Japanese" />
                    </datalist>
                </div>

                <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                    className="bg-white border-2 border-slate-100 focus:border-slate-900 rounded-xl sm:rounded-2xl px-4 py-3 text-sm font-bold outline-none transition-all appearance-none cursor-pointer sm:min-w-[140px]"
                >
                    <option>Native</option>
                    <option>Fluent</option>
                    <option>Professional</option>
                    <option>Intermediate</option>
                    <option>Basic</option>
                </select>

                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addLanguage();
                    }}
                    className="bg-slate-900 text-white px-5 py-3 rounded-xl sm:rounded-2xl font-black hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    <span className="sm:hidden text-xs uppercase tracking-widest">Add Language</span>
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(data || []).map((lang, index) => {
                    const id = lang.id || lang.name || index.toString();
                    return (
                        <div key={id} className="flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-slate-100 hover:border-slate-900 transition-all duration-300 group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                    <Star className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                                </div>
                                <div>
                                    <span className="font-bold text-slate-900 block">{lang.name}</span>
                                    <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest">{lang.level}</span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    removeLanguage(index);
                                }}
                                className="p-2 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    );
                })}
            </div>

            {(!data || data.length === 0) && (
                <div className="text-center py-12 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Add your linguistic skills</p>
                </div>
            )}
        </div>
    );
}
