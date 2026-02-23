import { Plus, X, Share2, Link as LinkIcon, Globe, Linkedin, Github, Twitter } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import AlignmentToggle from "./AlignmentToggle";

interface SocialsProps {
    data: any[];
    onChange: (d: any) => void;
    textAlign?: string;
    onTextAlignChange?: (align: string) => void;
}

export default function Socials({ data = [], onChange, textAlign, onTextAlignChange }: SocialsProps) {
    const handleAdd = () => {
        onChange([...data, { id: uuidv4(), platform: 'LinkedIn', url: '' }]);
    };

    const handleRemove = (id: string) => {
        onChange(data.filter(item => item.id !== id));
    };

    const handleChange = (id: string, field: string, value: string) => {
        onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const getIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'linkedin': return <Linkedin className="w-4 h-4" />;
            case 'github': return <Github className="w-4 h-4" />;
            case 'twitter': return <Twitter className="w-4 h-4" />;
            default: return <Globe className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl">
                        <Share2 className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Socials</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Digital Presence — {data.length} links</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {onTextAlignChange && <AlignmentToggle value={textAlign || "left"} onChange={onTextAlignChange} />}
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-100 rounded-xl text-xs font-bold text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                    >
                        <Plus className="w-4 h-4 text-blue-600" />
                        Add Link
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {data.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center p-2 bg-slate-50/50 rounded-[1.5rem] border border-slate-100 hover:border-slate-200 transition-all duration-300">
                        <div className="relative">
                            <select
                                value={item.platform}
                                onChange={(e) => handleChange(item.id, 'platform', e.target.value)}
                                className="pl-10 pr-4 py-3 bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl text-sm font-bold outline-none transition-all appearance-none cursor-pointer min-w-[140px]"
                            >
                                <option value="LinkedIn">LinkedIn</option>
                                <option value="GitHub">GitHub</option>
                                <option value="Portfolio">Portfolio</option>
                                <option value="Twitter">Twitter</option>
                                <option value="Website">Website</option>
                            </select>
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                {getIcon(item.platform)}
                            </div>
                        </div>

                        <div className="flex-1 relative">
                            <input
                                value={item.url}
                                onChange={(e) => handleChange(item.id, 'url', e.target.value)}
                                placeholder="https://..."
                                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl text-sm font-bold outline-none transition-all duration-300 placeholder:text-slate-300"
                            />
                            <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        </div>

                        <button
                            onClick={() => handleRemove(item.id)}
                            className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}

                {data.length === 0 && (
                    <div className="text-center py-16 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Share2 className="w-8 h-8 text-slate-300" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-1">No links added</h4>
                        <p className="text-xs text-slate-500 mb-6 font-medium">Connect your professional profiles here.</p>
                        <button onClick={handleAdd} className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10">
                            <Plus className="w-4 h-4" /> Add Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
