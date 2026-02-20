import { Plus, X } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

export default function Socials({ data = [], onChange }: { data: any[], onChange: (d: any) => void }) {
    const handleAdd = () => {
        onChange([...data, { id: uuidv4(), platform: 'LinkedIn', url: '' }]);
    };

    const handleRemove = (id: string) => {
        onChange(data.filter(item => item.id !== id));
    };

    const handleChange = (id: string, field: string, value: string) => {
        onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-medium text-slate-900">Social Links</h3>
                <button onClick={handleAdd} className="text-sm flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium">
                    <Plus className="w-4 h-4" /> Add Link
                </button>
            </div>

            <div className="space-y-3">
                {data.map((item) => (
                    <div key={item.id} className="flex gap-2 items-center">
                        <select
                            value={item.platform}
                            onChange={(e) => handleChange(item.id, 'platform', e.target.value)}
                            className="px-3 py-2 border border-slate-300 rounded-lg text-sm w-1/3"
                        >
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="GitHub">GitHub</option>
                            <option value="Portfolio">Portfolio</option>
                            <option value="Twitter">Twitter</option>
                            <option value="Website">Website</option>
                        </select>
                        <input
                            value={item.url}
                            onChange={(e) => handleChange(item.id, 'url', e.target.value)}
                            placeholder="URL"
                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        />
                        <button
                            onClick={() => handleRemove(item.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-2"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
