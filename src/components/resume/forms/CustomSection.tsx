import { Plus, Trash2, GripVertical, AlertCircle } from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from 'uuid';

export default function CustomSection({ data, onChange }: { data: any, onChange: (d: any) => void }) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAdd = () => {
        const newItems = [...(data.items || []), { id: uuidv4(), name: "", description: "", startDate: "", endDate: "" }];
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
        <div className="space-y-6">
            <div className="mb-6">
                <label className="block text-xs font-medium text-slate-500 mb-1">Section Title</label>
                <input
                    type="text"
                    value={data.title || "Custom Section"}
                    onChange={(e) => onChange({ ...data, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-bold"
                    placeholder="e.g. Volunteering, Publications, Awards"
                />
            </div>

            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">Items</h3>
                <button onClick={handleAdd} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    <Plus className="w-4 h-4" /> Add Item
                </button>
            </div>

            {(!data.items || data.items.length === 0) && (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <p className="text-slate-500 mb-2">No items added yet.</p>
                    <button onClick={handleAdd} className="text-sm text-blue-600 font-medium hover:underline">Add your first item</button>
                </div>
            )}

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={data.items?.map((i: any) => i.id) || []} strategy={verticalListSortingStrategy}>
                    <div className="space-y-4">
                        {data.items?.map((item: any) => (
                            <SortableCustomItem key={item.id} id={item.id} data={item} onUpdate={handleUpdate} onDelete={handleDelete} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}

function SortableCustomItem({ id, data, onUpdate, onDelete }: { id: string, data: any, onUpdate: (id: string, field: string, value: any) => void, onDelete: (id: string) => void }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div ref={setNodeRef} style={style} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm group">
            <div className="flex items-center justify-between mb-4">
                <div {...attributes} {...listeners} className="cursor-grab text-slate-400 hover:text-slate-600">
                    <GripVertical className="w-5 h-5" />
                </div>
                <button onClick={() => onDelete(id)} className="text-slate-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="col-span-2">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Item Name / Role</label>
                    <input
                        type="text"
                        value={data.name || ""}
                        onChange={(e) => onUpdate(id, "name", e.target.value)}
                        placeholder="e.g. Volunteer Leader"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Date / Period</label>
                    <input
                        type="text"
                        value={data.startDate || ""}
                        onChange={(e) => onUpdate(id, "startDate", e.target.value)}
                        placeholder="e.g. 2022 - Present"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                    <textarea
                        value={data.description || ""}
                        onChange={(e) => onUpdate(id, "description", e.target.value)}
                        placeholder="Describe your activities..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm min-h-[80px]"
                    />
                </div>
            </div>
        </div>
    );
}
