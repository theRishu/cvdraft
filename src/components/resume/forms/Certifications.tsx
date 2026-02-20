import React from "react";
import { Plus, Trash2 } from "lucide-react";

export default function Certifications({ data, onChange }: { data: any[], onChange: (d: any[]) => void }) {
    const addCert = () => {
        onChange([...(data || []), { name: "", issuer: "", date: "" }]);
    };

    const updateCert = (index: number, field: string, value: string) => {
        const newData = [...(data || [])];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const removeCert = (index: number) => {
        onChange(data.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            {(data || []).map((cert, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-lg space-y-3 bg-slate-50">
                    <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium text-slate-700">Certification #{index + 1}</h4>
                        <button onClick={() => removeCert(index)} className="text-slate-400 hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase">Certificate Name</label>
                        <input
                            type="text"
                            value={cert.name}
                            onChange={(e) => updateCert(index, "name", e.target.value)}
                            className="w-full mt-1 p-2 border border-slate-200 rounded text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                            placeholder="e.g. AWS Certified Solutions Architect"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase">Issuer</label>
                            <input
                                type="text"
                                value={cert.issuer}
                                onChange={(e) => updateCert(index, "issuer", e.target.value)}
                                className="w-full mt-1 p-2 border border-slate-200 rounded text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                placeholder="e.g. Amazon Web Services"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase">Date</label>
                            <input
                                type="text"
                                value={cert.date}
                                onChange={(e) => updateCert(index, "date", e.target.value)}
                                className="w-full mt-1 p-2 border border-slate-200 rounded text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                placeholder="e.g. 2024"
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={addCert}
                className="w-full py-3 flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-500 hover:border-slate-900 hover:text-slate-900 transition-colors font-medium"
            >
                <Plus className="w-4 h-4" /> Add Certification
            </button>
        </div>
    );
}
