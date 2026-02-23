import { Plus, Trash2, Sparkles, Briefcase, Calendar, ChevronRight, Copy, ChevronUp, ChevronDown } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { analyzeStarMethod, findWeakVerbs } from "@/lib/star-analyzer";
import AiImproveButton from "./AiImproveButton";
import AlignmentToggle from "./AlignmentToggle";

interface ExperienceProps {
    data: any[];
    onChange: (d: any[]) => void;
    textAlign?: string;
    onTextAlignChange?: (align: string) => void;
}

export default function Experience({ data = [], onChange, textAlign, onTextAlignChange }: ExperienceProps) {

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

    const handleDuplicate = (item: any) => {
        onChange([...data, { ...item, id: uuidv4(), jobTitle: item.jobTitle + " (Copy)" }]);
    };

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
                        <Briefcase className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Experience</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Professional Journey — {data.length} entries</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {onTextAlignChange && <AlignmentToggle value={textAlign || "left"} onChange={onTextAlignChange} />}
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-100 rounded-xl text-xs font-bold text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                    >
                        <Plus className="w-4 h-4 text-blue-600" />
                        Add Position
                    </button>
                </div>
            </div>

            <div className="space-y-12">
                {data.map((item, index) => (
                    <div key={item.id} className="relative pl-8 border-l-2 border-slate-100 space-y-6 group">
                        {/* Timeline Bullet */}
                        <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-white border-4 border-slate-900 shadow-sm group-hover:scale-125 transition-transform duration-300"></div>

                        {/* Reorder + delete row */}
                        <div className="flex items-center justify-between">
                            <div className="flex gap-1">
                                <button onClick={() => handleMoveUp(index)} title="Move up" className="p-1.5 text-slate-300 hover:text-slate-700 hover:bg-white rounded-xl transition-all"><ChevronUp className="w-3.5 h-3.5" /></button>
                                <button onClick={() => handleMoveDown(index)} title="Move down" className="p-1.5 text-slate-300 hover:text-slate-700 hover:bg-white rounded-xl transition-all"><ChevronDown className="w-3.5 h-3.5" /></button>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => handleDuplicate(item)} title="Duplicate" className="p-1.5 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"><Copy className="w-3.5 h-3.5" /></button>
                                <button onClick={() => handleRemove(item.id)} title="Delete" className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Job Title</label>
                                <input
                                    placeholder="e.g. Senior Software Engineer"
                                    value={item.jobTitle}
                                    onChange={(e) => handleChange(item.id, 'jobTitle', e.target.value)}
                                    className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-300 font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Company / Organization</label>
                                <input
                                    placeholder="e.g. Google"
                                    value={item.companyName}
                                    onChange={(e) => handleChange(item.id, 'companyName', e.target.value)}
                                    className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-300 font-bold"
                                />
                            </div>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Start Date</label>
                                <div className="relative">
                                    <input
                                        placeholder="Jan 2020"
                                        value={item.startDate}
                                        onChange={(e) => handleChange(item.id, 'startDate', e.target.value)}
                                        className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl px-10 py-3 text-sm outline-none transition-all font-bold"
                                    />
                                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">End Date</label>
                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-900 uppercase cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={item.isCurrent}
                                            onChange={(e) => handleChange(item.id, 'isCurrent', e.target.checked)}
                                            className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        Present
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        placeholder="Present"
                                        value={item.endDate}
                                        onChange={(e) => handleChange(item.id, 'endDate', e.target.value)}
                                        disabled={item.isCurrent}
                                        className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl px-10 py-3 text-sm outline-none transition-all font-bold disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-50"
                                    />
                                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-[10px]">Key Responsibilities & Achievements</label>
                                <AiImproveButton
                                    section="experience"
                                    currentContent={item.description || ""}
                                    onResult={(improved) => handleChange(item.id, 'description', improved)}
                                    label="Improve with AI"
                                />
                            </div>
                            <textarea
                                placeholder="Describe your impact, use metrics if possible..."
                                value={item.description}
                                onChange={(e) => handleChange(item.id, 'description', e.target.value)}
                                rows={4}
                                className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-[1.5rem] px-5 py-4 text-sm outline-none transition-all duration-300 font-medium leading-relaxed resize-none"
                            />

                            {/* STAR & Verb Upgrade UI */}
                            {item.description && item.description.length > 5 && (
                                <div className="mt-4 p-4 bg-slate-50/80 backdrop-blur-sm rounded-[1.5rem] border border-slate-200/50 space-y-4 animate-in fade-in zoom-in duration-300">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                                <Sparkles className="w-4 h-4 text-blue-500" />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">STAR Analysis</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-24 bg-slate-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-700 ${analyzeStarMethod(item.description).score >= 75 ? 'bg-green-500' : 'bg-blue-500'}`}
                                                    style={{ width: `${analyzeStarMethod(item.description).score}%` }}
                                                />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-900">{analyzeStarMethod(item.description).score}%</span>
                                        </div>
                                    </div>

                                    <p className="text-[11px] text-slate-500 font-bold ml-2">
                                        {analyzeStarMethod(item.description).feedback}
                                    </p>

                                    {findWeakVerbs(item.description).length > 0 && (
                                        <div className="pt-2 border-t border-slate-200/50">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Verb Upgrades</p>
                                            <div className="flex flex-wrap gap-2">
                                                {findWeakVerbs(item.description).map((match, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => {
                                                            const newVal = item.description.replace(new RegExp(`\\b${match.verb}\\b`, 'gi'), match.suggestion);
                                                            handleChange(item.id, 'description', newVal);
                                                        }}
                                                        className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 hover:border-blue-500 hover:text-blue-600 transition-all flex items-center gap-1.5 shadow-sm"
                                                    >
                                                        <span className="text-slate-400 line-through decoration-red-300">{match.verb}</span>
                                                        <ChevronRight className="w-2.5 h-2.5 text-blue-500" />
                                                        <span className="text-blue-600">{match.suggestion}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {data.length === 0 && (
                    <div className="text-center py-16 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Briefcase className="w-8 h-8 text-slate-300" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-1">No experience listed</h4>
                        <p className="text-xs text-slate-500 mb-6 font-medium">Add your professional track record to showcase your skills.</p>
                        <button onClick={handleAdd} className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10">
                            <Plus className="w-4 h-4" /> Add Your First Position
                        </button>
                    </div>
                )}
            </div>
        </div >
    );
}
