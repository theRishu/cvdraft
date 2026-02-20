import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

export default function Experience({ data = [], onChange }: { data: any[], onChange: (d: any) => void }) {

    const handleAdd = () => {
        onChange([
            { id: uuidv4(), jobTitle: '', companyName: '', startDate: '', endDate: '', description: '', isCurrent: false },
            ...data
        ]);
    };

    const handleRemove = (id: string) => {
        onChange(data.filter(item => item.id !== id));
    };

    const handleChange = (id: string, field: string, value: any) => {
        onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-medium text-slate-900">Experience</h3>
                <button onClick={handleAdd} className="text-sm flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium">
                    <Plus className="w-4 h-4" /> Add Position
                </button>
            </div>

            <div className="space-y-6">
                {data.map((item) => (
                    <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 relative group">
                        <button
                            onClick={() => handleRemove(item.id)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                                placeholder="Job Title"
                                value={item.jobTitle}
                                onChange={(e) => handleChange(item.id, 'jobTitle', e.target.value)}
                                className="px-3 py-2 border border-slate-300 rounded-lg text-sm w-full"
                            />
                            <input
                                placeholder="Company Name"
                                value={item.companyName}
                                onChange={(e) => handleChange(item.id, 'companyName', e.target.value)}
                                className="px-3 py-2 border border-slate-300 rounded-lg text-sm w-full"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                placeholder="Start Date (e.g. Jan 2020)"
                                value={item.startDate}
                                onChange={(e) => handleChange(item.id, 'startDate', e.target.value)}
                                className="px-3 py-2 border border-slate-300 rounded-lg text-sm w-full"
                            />
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="End Date"
                                    value={item.endDate}
                                    onChange={(e) => handleChange(item.id, 'endDate', e.target.value)}
                                    disabled={item.isCurrent}
                                    className="px-3 py-2 border border-slate-300 rounded-lg text-sm w-full disabled:bg-slate-100 disabled:text-slate-400"
                                />
                                <label className="flex items-center gap-1 text-xs whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        checked={item.isCurrent}
                                        onChange={(e) => handleChange(item.id, 'isCurrent', e.target.checked)}
                                    /> Current
                                </label>
                            </div>
                        </div>
                        <textarea
                            placeholder="Description of responsibilities..."
                            value={item.description}
                            onChange={(e) => handleChange(item.id, 'description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        />
                    </div>
                ))}
                {data.length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-sm italic">
                        No experience added yet.
                    </div>
                )}
            </div>
        </div>
    );
}
