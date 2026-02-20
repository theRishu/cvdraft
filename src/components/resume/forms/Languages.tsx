import React, { useState } from "react";
import { Plus, X } from "lucide-react";

export default function Languages({ data, onChange }: { data: any[], onChange: (d: any[]) => void }) {
    const [newItem, setNewItem] = useState("");
    const [newLevel, setNewLevel] = useState("Professional");

    const addLanguage = () => {
        if (newItem.trim()) {
            onChange([...(data || []), { name: newItem, level: newLevel }]);
            setNewItem("");
            setNewLevel("Professional");
        }
    };

    const removeLanguage = (index: number) => {
        onChange(data.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addLanguage()}
                    className="flex-1 p-2 border border-slate-200 rounded text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder="Add a language (e.g. Spanish)"
                    list="language-suggestions"
                />
                <datalist id="language-suggestions">
                    <option value="English" />
                    <option value="Spanish" />
                    <option value="French" />
                    <option value="German" />
                    <option value="Chinese" />
                    <option value="Japanese" />
                    <option value="Arabic" />
                    <option value="Hindi" />
                    <option value="Portuguese" />
                    <option value="Russian" />
                    <option value="Italian" />
                    <option value="Korean" />
                    <option value="Dutch" />
                    <option value="Turkish" />
                    <option value="Polish" />
                    <option value="Vietnamese" />
                </datalist>
                <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                    className="p-2 border border-slate-200 rounded text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                    <option>Native</option>
                    <option>Fluent</option>
                    <option>Professional</option>
                    <option>Intermediate</option>
                    <option>Basic</option>
                </select>
                <button
                    onClick={addLanguage}
                    className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-black transition-colors"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
                {(data || []).map((lang, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100">
                        <div>
                            <span className="font-medium text-slate-900">{lang.name}</span>
                            <span className="text-slate-400 text-xs ml-2">({lang.level})</span>
                        </div>
                        <button
                            onClick={() => removeLanguage(index)}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
