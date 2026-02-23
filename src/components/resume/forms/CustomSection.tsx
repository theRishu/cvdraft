import { Plus, Trash2, GripVertical, AlertCircle, Layout, Calendar, Edit3 } from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from 'uuid';
import AlignmentToggle from "./AlignmentToggle";

interface CustomSectionProps {
    data: any;
    onChange: (d: any) => void;
    textAlign?: string;
    onTextAlignChange?: (align: string) => void;
}

export default function CustomSection({ data, onChange, textAlign, onTextAlignChange }: CustomSectionProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAdd = () => {
        const newItems = [...(data.items || []), { id: uuidv4(), name: "", description: "", startDate: "" }];
        onChange({ ...data, items: newItems });
    };

    const handleUpdate = (id: string, field: string, value: any) => {
        const newItems = data.items.map((item: any) => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        });
        onChange({ ...data, items: newItems });
    };

    const handleDelete = (id: string) => {
        const newItems = data.items.filter((item: any) => item.id !== id);
        onChange({ ...data, items: newItems });
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = data.items.findIndex((item: any) => item.id === active.id);
            const newIndex = data.items.findIndex((item: any) => item.id === over.id);
            onChange({ ...data, items: arrayMove(data.items, oldIndex, newIndex) });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl">
                        <Layout className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 group/title">
                            <input
                                type="text"
                                value={data.title || ""}
                                onChange={(e) => onChange({ ...data, title: e.target.value })}
                                className="bg-transparent text-xl font-black text-slate-900 tracking-tight outline-none border-b-2 border-transparent focus:border-blue-500 transition-all w-full max-w-xs"
                                placeholder="Section Title"
                            />
                            <Edit3 className="w-4 h-4 text-slate-300 group-hover/title:text-blue-500 transition-colors" />
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Custom Additions</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {onTextAlignChange && <AlignmentToggle value={textAlign || "left"} onChange={onTextAlignChange} />}
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-100 rounded-xl text-xs font-bold text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                    >
                        <Plus className="w-4 h-4 text-blue-600" />
                        Add Item
                    </button>
                </div>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={data.items?.map((i: any) => i.id) || []} strategy={verticalListSortingStrategy}>
                    <div className="space-y-6">
                        {data.items?.map((item: any) => (
                            <SortableCustomItem key={item.id} id={item.id} data={item} onUpdate={handleUpdate} onDelete={handleDelete} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {(!data.items || data.items.length === 0) && (
                <div className="text-center py-16 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <Layout className="w-8 h-8 text-slate-300" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Empty custom section</h4>
                    <p className="text-xs text-slate-500 mb-6 font-medium">Add volunteering, publications, or awards.</p>
                    <button onClick={handleAdd} className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all">
                        <Plus className="w-4 h-4" /> Add Your First Item
                    </button>
                </div>
            )}
        </div>
    );
}

function SortableCustomItem({ id, data, onUpdate, onDelete }: { id: string, data: any, onUpdate: (id: string, field: string, value: any) => void, onDelete: (id: string) => void }) {
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Title / Role</label>
                    <input
                        type="text"
                        value={data.name || ""}
                        onChange={(e) => onUpdate(id, "name", e.target.value)}
                        placeholder="e.g. Volunteer"
                        className="w-full bg-slate-50/50 border-2 border-slate-100 focus:border-slate-900 focus:bg-white rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-300 font-bold"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Date / Period</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={data.startDate || ""}
                            onChange={(e) => onUpdate(id, "startDate", e.target.value)}
                            placeholder="e.g. 2022 - Present"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border-2 border-slate-100 focus:border-slate-900 focus:bg-white rounded-2xl text-sm font-bold outline-none transition-all duration-300"
                        />
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Additional Details</label>
                    <textarea
                        value={data.description || ""}
                        onChange={(e) => onUpdate(id, "description", e.target.value)}
                        placeholder="Describe your achievements..."
                        rows={3}
                        className="w-full bg-slate-50/50 border-2 border-slate-100 focus:border-slate-900 focus:bg-white rounded-[1.5rem] px-5 py-4 text-sm outline-none transition-all duration-300 font-medium leading-relaxed resize-none"
                    />
                </div>
            </div>
        </div>
    );
}
