import { Plus, Trash2, GripVertical, AlertCircle, Rocket, Calendar, Link as LinkIcon, Code2, Sparkles, ChevronRight } from "lucide-react";
import { analyzeStarMethod, findWeakVerbs } from "@/lib/star-analyzer";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from 'uuid';
import AlignmentToggle from "./AlignmentToggle";

interface ProjectsProps {
    data: any[];
    onChange: (d: any[]) => void;
    textAlign?: string;
    onTextAlignChange?: (align: string) => void;
}

export default function Projects({ data = [], onChange, textAlign, onTextAlignChange }: ProjectsProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAdd = () => {
        onChange([...data, { id: uuidv4(), title: "", description: "", link: "", startDate: "", endDate: "", technologies: [] }]);
    };

    const handleUpdate = (id: string, field: string, value: any) => {
        const newData = data.map((item) => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        });
        onChange(newData);
    };

    const handleDelete = (id: string) => {
        onChange(data.filter((item) => item.id !== id));
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = data.findIndex((item) => item.id === active.id);
            const newIndex = data.findIndex((item) => item.id === over.id);
            onChange(arrayMove(data, oldIndex, newIndex));
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl">
                        <Rocket className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Projects</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Builds & Creations — {data.length} entries</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {onTextAlignChange && <AlignmentToggle value={textAlign || "left"} onChange={onTextAlignChange} />}
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-100 rounded-xl text-xs font-bold text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                    >
                        <Plus className="w-4 h-4 text-blue-600" />
                        Add Project
                    </button>
                </div>
            </div>

            {data.length === 0 && (
                <div className="text-center py-16 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <Rocket className="w-8 h-8 text-slate-300" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">No projects listed</h4>
                    <p className="text-xs text-slate-500 mb-6 font-medium">Showcase your side projects and case studies.</p>
                    <button onClick={handleAdd} className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10">
                        <Plus className="w-4 h-4" /> Start Feature
                    </button>
                </div>
            )}

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={data.map(i => i.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-6">
                        {data.map((item) => (
                            <SortableProject key={item.id} id={item.id} data={item} onUpdate={handleUpdate} onDelete={handleDelete} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}

function SortableProject({ id, data, onUpdate, onDelete }: { id: string, data: any, onUpdate: (id: string, field: string, value: any) => void, onDelete: (id: string) => void }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div ref={setNodeRef} style={style} className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-sm group hover:border-slate-200 transition-all duration-300 relative">
            <div className="flex items-center justify-between mb-6">
                <div {...attributes} {...listeners} className="cursor-grab text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 p-2 rounded-xl">
                    <GripVertical className="w-5 h-5" />
                </div>
                <button onClick={() => onDelete(id)} className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Project Name</label>
                    <input
                        type="text"
                        value={data.title || ""}
                        onChange={(e) => onUpdate(id, "title", e.target.value)}
                        placeholder="e.g. AI Content Generator"
                        className="w-full bg-slate-50/50 border-2 border-slate-100 focus:border-slate-900 focus:bg-white rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-300 font-bold"
                    />
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Direct Link</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={data.link || ""}
                            onChange={(e) => onUpdate(id, "link", e.target.value)}
                            placeholder="https://github.com/..."
                            className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border-2 border-slate-100 focus:border-slate-900 focus:bg-white rounded-2xl text-sm font-bold outline-none transition-all duration-300"
                        />
                        <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Start Date</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={data.startDate || ""}
                            onChange={(e) => onUpdate(id, "startDate", e.target.value)}
                            placeholder="Jan 2023"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border-2 border-slate-100 focus:border-slate-900 focus:bg-white rounded-2xl text-sm font-bold outline-none transition-all duration-300"
                        />
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">End Date</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={data.endDate || ""}
                            onChange={(e) => onUpdate(id, "endDate", e.target.value)}
                            placeholder="Present"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border-2 border-slate-100 focus:border-slate-900 focus:bg-white rounded-2xl text-sm font-bold outline-none transition-all duration-300"
                        />
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                </div>
                <div className="md:col-span-2 space-y-3">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Impact & Tech Stack</label>
                        <button
                            onClick={() => (window as any).improveWithAi?.('projects', data.description, (newVal: string) => onUpdate(id, 'description', newVal))}
                            className="text-[10px] font-bold text-white flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-purple-500/20 active:scale-95"
                        >
                            <Sparkles className="w-3.5 h-3.5" /> Improve with AI
                        </button>
                    </div>
                    <textarea
                        value={data.description || ""}
                        onChange={(e) => onUpdate(id, "description", e.target.value)}
                        placeholder="Built X using Y to achieve Z..."
                        rows={4}
                        className="w-full bg-slate-50/50 border-2 border-slate-100 focus:border-slate-900 focus:bg-white rounded-[1.5rem] px-5 py-4 text-sm outline-none transition-all duration-300 font-medium leading-relaxed resize-none"
                    />

                    {/* STAR & Verb Upgrade UI */}
                    {data.description && data.description.length > 5 && (
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
                                            className={`h-full transition-all duration-700 ${analyzeStarMethod(data.description).score >= 75 ? 'bg-green-500' : 'bg-blue-500'}`}
                                            style={{ width: `${analyzeStarMethod(data.description).score}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-900">{analyzeStarMethod(data.description).score}%</span>
                                </div>
                            </div>

                            <p className="text-[11px] text-slate-500 font-bold ml-2">
                                {analyzeStarMethod(data.description).feedback}
                            </p>

                            {findWeakVerbs(data.description).length > 0 && (
                                <div className="pt-2 border-t border-slate-200/50">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Verb Upgrades</p>
                                    <div className="flex flex-wrap gap-2">
                                        {findWeakVerbs(data.description).map((match: any, idx: number) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    const newVal = data.description.replace(new RegExp(`\\b${match.verb}\\b`, 'gi'), match.suggestion);
                                                    onUpdate(id, "description", newVal);
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
                <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Technologies (Comma separated)</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={data.technologies?.join(", ") || ""}
                            onChange={(e) => onUpdate(id, "technologies", e.target.value.split(",").map((s: string) => s.trim()))}
                            placeholder="React, Next.js, TypeScript..."
                            className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border-2 border-slate-100 focus:border-slate-900 focus:bg-white rounded-2xl text-sm font-bold outline-none transition-all duration-300"
                        />
                        <Code2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                </div>
            </div>
        </div>
    );
}
