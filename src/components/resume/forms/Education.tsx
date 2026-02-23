import { GraduationCap, Calendar, Plus, Trash2, Copy, ChevronUp, ChevronDown } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import AiImproveButton from "./AiImproveButton";
import AlignmentToggle from "./AlignmentToggle";

interface EducationProps {
    data: any[];
    onChange: (d: any[]) => void;
    textAlign?: string;
    onTextAlignChange?: (align: string) => void;
}

export default function Education({ data = [], onChange, textAlign, onTextAlignChange }: EducationProps) {

    const handleAdd = () => {
        onChange([
            { id: uuidv4(), schoolName: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', description: '' },
            ...data
        ]);
    };

    const handleRemove = (id: string) => onChange(data.filter((item: any) => item.id !== id));

    const handleChange = (id: string, field: string, value: string) =>
        onChange(data.map((item: any) => item.id === id ? { ...item, [field]: value } : item));

    const handleDuplicate = (item: any) =>
        onChange([...data, { ...item, id: uuidv4(), schoolName: item.schoolName + " (Copy)" }]);

    const handleMoveUp = (idx: number) => {
        if (idx === 0) return;
        const next = [...data];[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]; onChange(next);
    };
    const handleMoveDown = (idx: number) => {
        if (idx === data.length - 1) return;
        const next = [...data];[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]; onChange(next);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl">
                        <GraduationCap className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Education</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Academic Records — {data.length} entries</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {onTextAlignChange && <AlignmentToggle value={textAlign || "left"} onChange={onTextAlignChange} />}
                    <button onClick={handleAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-100 rounded-xl text-xs font-bold text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
                        <Plus className="w-4 h-4 text-emerald-600" /> Add Education
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {data.map((item: any, idx: number) => (
                    <div key={item.id} className="p-6 bg-slate-50/50 border-2 border-slate-100 rounded-[2rem] space-y-6 relative group hover:border-slate-200 transition-all duration-300">
                        {/* Header controls */}
                        <div className="flex items-start justify-between">
                            <div className="flex gap-1">
                                <button onClick={() => handleMoveUp(idx)} title="Move up"
                                    className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-white rounded-xl transition-all"><ChevronUp className="w-3.5 h-3.5" /></button>
                                <button onClick={() => handleMoveDown(idx)} title="Move down"
                                    className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-white rounded-xl transition-all"><ChevronDown className="w-3.5 h-3.5" /></button>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => handleDuplicate(item)} title="Duplicate"
                                    className="p-2 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"><Copy className="w-4 h-4" /></button>
                                <button onClick={() => handleRemove(item.id)} title="Delete"
                                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Institution</label>
                                <input placeholder="e.g. Stanford University" value={item.schoolName}
                                    onChange={e => handleChange(item.id, 'schoolName', e.target.value)}
                                    className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl px-4 py-3 text-sm outline-none transition-all font-bold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Degree / Certification</label>
                                <input placeholder="e.g. Bachelor of Science" value={item.degree}
                                    onChange={e => handleChange(item.id, 'degree', e.target.value)}
                                    className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl px-4 py-3 text-sm outline-none transition-all font-bold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Field of Study</label>
                                <input placeholder="e.g. Computer Science" value={item.field || ''}
                                    onChange={e => handleChange(item.id, 'field', e.target.value)}
                                    className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl px-4 py-3 text-sm outline-none transition-all font-bold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">GPA / Grade (optional)</label>
                                <input placeholder="e.g. 3.8 / 4.0" value={item.gpa || ''}
                                    onChange={e => handleChange(item.id, 'gpa', e.target.value)}
                                    className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl px-4 py-3 text-sm outline-none transition-all font-bold" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Start Date</label>
                                <div className="relative">
                                    <input placeholder="Sep 2018" value={item.startDate}
                                        onChange={e => handleChange(item.id, 'startDate', e.target.value)}
                                        className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl px-10 py-3 text-sm outline-none transition-all font-bold" />
                                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">End Date</label>
                                <div className="relative">
                                    <input placeholder="Jun 2022" value={item.endDate}
                                        onChange={e => handleChange(item.id, 'endDate', e.target.value)}
                                        className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl px-10 py-3 text-sm outline-none transition-all font-bold" />
                                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                        </div>

                        {/* Notable coursework / achievements */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Key Courses / Achievements</label>
                                <AiImproveButton section="education" currentContent={item.description || ""} onResult={v => handleChange(item.id, 'description', v)} label="AI Improve" />
                            </div>
                            <textarea placeholder="Relevant coursework, thesis, awards, honors..." value={item.description || ''}
                                onChange={e => handleChange(item.id, 'description', e.target.value)} rows={2}
                                className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-[1.5rem] px-5 py-4 text-sm outline-none transition-all font-medium resize-none" />
                        </div>
                    </div>
                ))}

                {data.length === 0 && (
                    <div className="text-center py-16 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <GraduationCap className="w-8 h-8 text-slate-300" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-1">No education records</h4>
                        <p className="text-xs text-slate-500 mb-6 font-medium">Add your academic background to build trust.</p>
                        <button onClick={handleAdd} className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10">
                            <Plus className="w-4 h-4" /> Add Academic History
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
