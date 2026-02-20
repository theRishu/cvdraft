import { Plus, X } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

export default function Skills({ data = [], onChange }: { data: any[], onChange: (d: any) => void }) {
    const [newItem, setNewItem] = useState("");

    const handleAdd = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!newItem.trim()) return;
        onChange([...data, { id: uuidv4(), name: newItem.trim(), level: 'Intermediate' }]);
        setNewItem("");
    };

    const handleRemove = (id: string) => {
        onChange(data.filter(item => item.id !== id));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-medium text-slate-900">Skills</h3>
            </div>

            <form onSubmit={handleAdd} className="flex gap-2">
                <input
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add a skill (e.g. React, Python)"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                />
                <button
                    type="submit"
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-black transition-colors"
                >
                    Add
                </button>
            </form>

            <div className="flex flex-wrap gap-2">
                {data.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-200 px-3 py-1.5 rounded-full flex items-center gap-2 group hover:border-slate-400 transition-colors">
                        <span className="text-sm font-medium text-slate-700">{item.name}</span>
                        <button
                            onClick={() => handleRemove(item.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}
                {data.length === 0 && (
                    <div className="text-slate-400 text-sm italic w-full">
                        No skills added yet.
                    </div>
                )}
            </div>
        </div>
    );
}
