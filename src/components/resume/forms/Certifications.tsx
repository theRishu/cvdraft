import React from "react";
import { Plus, Trash2, Award, Calendar, ShieldCheck } from "lucide-react";
import AlignmentToggle from "./AlignmentToggle";

interface CertificationsProps {
    data: any[];
    onChange: (d: any[]) => void;
    textAlign?: string;
    onTextAlignChange?: (align: string) => void;
}

export default function Certifications({ data = [], onChange, textAlign, onTextAlignChange }: CertificationsProps) {
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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Certifications</h3>
                        <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Verified Excellence</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                    {onTextAlignChange && <AlignmentToggle value={textAlign || "left"} onChange={onTextAlignChange} />}
                    <button
                        onClick={addCert}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border-2 border-slate-100 rounded-xl text-xs font-bold text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                    >
                        <Plus className="w-4 h-4 text-blue-600" />
                        <span className="whitespace-nowrap">Add Certificate</span>
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {(data || []).map((cert, index) => (
                    <div key={index} className="p-4 sm:p-6 bg-slate-50/50 border-2 border-slate-100 rounded-[1.5rem] sm:rounded-[2rem] space-y-6 relative group hover:border-slate-200 transition-all duration-300">
                        <button
                            onClick={() => removeCert(index)}
                            className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Certificate Name</label>
                            <input
                                type="text"
                                value={cert.name}
                                onChange={(e) => updateCert(index, "name", e.target.value)}
                                className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-300 font-bold"
                                placeholder="e.g. AWS Certified Developer"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Issuing Organization</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={cert.issuer}
                                        onChange={(e) => updateCert(index, "issuer", e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl text-sm font-bold outline-none transition-all duration-300"
                                        placeholder="e.g. Amazon Web Services"
                                    />
                                    <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Date Issued</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={cert.date}
                                        onChange={(e) => updateCert(index, "date", e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl text-sm font-bold outline-none transition-all duration-300"
                                        placeholder="e.g. March 2024"
                                    />
                                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {data.length === 0 && (
                    <div className="text-center py-16 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Award className="w-8 h-8 text-slate-300" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-1">No certifications yet</h4>
                        <p className="text-xs text-slate-500 mb-6 font-medium">Add your professional certifications to stand out.</p>
                        <button onClick={addCert} className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10">
                            <Plus className="w-4 h-4" /> Add Credentials
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
