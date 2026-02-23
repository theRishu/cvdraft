import { User } from "lucide-react";
import AiImproveButton from "./AiImproveButton";
import AlignmentToggle from "./AlignmentToggle";

interface PersonalDetailsProps {
    data: any;
    onChange: (data: any) => void;
    textAlign?: string;
    onTextAlignChange?: (align: string) => void;
    summaryTextAlign?: string;
    onSummaryTextAlignChange?: (align: string) => void;
}

export default function PersonalDetails({
    data,
    onChange,
    textAlign,
    onTextAlignChange,
    summaryTextAlign,
    onSummaryTextAlignChange
}: PersonalDetailsProps) {
    const handleChange = (field: string, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header section with its own alignment */}
            <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl">
                            <User className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Personal Details</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Core Identity</p>
                        </div>
                    </div>
                    {onTextAlignChange && (
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mr-1">Header Align</span>
                            <AlignmentToggle value={textAlign || "left"} onChange={onTextAlignChange} />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Identity</label>
                        <input
                            type="text"
                            value={data.fullName || ''}
                            onChange={(e) => handleChange('fullName', e.target.value)}
                            className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-slate-300 font-bold"
                            placeholder="Full Name"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Current Title</label>
                        <input
                            type="text"
                            value={data.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-slate-300 font-bold"
                            placeholder="Job Title"
                        />
                    </div>
                </div>
            </div>

            {/* Contact Details section */}
            <div className="space-y-6 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-6 bg-blue-400 rounded-full" />
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Contact Details</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                        <input
                            type="email"
                            value={data.email || ''}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-slate-300 font-bold"
                            placeholder="Email"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contact Number</label>
                        <input
                            type="tel"
                            value={data.phone || ''}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-slate-300 font-bold"
                            placeholder="Phone"
                        />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Location / Address</label>
                        <input
                            type="text"
                            value={data.address || ''}
                            onChange={(e) => handleChange('address', e.target.value)}
                            className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-slate-300 font-bold"
                            placeholder="Address"
                        />
                    </div>
                </div>
            </div>

            {/* Summary section with its own alignment */}
            <div className="space-y-4 pt-6 border-t border-slate-50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-indigo-400 rounded-full" />
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Professional Summary</h4>
                    </div>
                    <div className="flex items-center gap-4">
                        {onSummaryTextAlignChange && (
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Summary Align</span>
                                <AlignmentToggle value={summaryTextAlign || "left"} onChange={onSummaryTextAlignChange} />
                            </div>
                        )}
                        <AiImproveButton
                            section="summary"
                            currentContent={data.summary || ""}
                            resumeData={data}
                            onResult={(improved) => handleChange("summary", improved)}
                        />
                    </div>
                </div>
                <textarea
                    value={data.summary || ''}
                    onChange={(e) => handleChange('summary', e.target.value)}
                    rows={5}
                    className="w-full bg-white border-2 border-slate-100 focus:border-slate-900 rounded-[1.5rem] px-5 py-4 text-sm outline-none transition-all duration-300 placeholder:text-slate-300 font-medium leading-relaxed resize-none"
                    placeholder="Briefly describe your professional background..."
                />
            </div>
        </div>
    );
}
