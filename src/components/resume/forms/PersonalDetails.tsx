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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                            <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-xl font-black text-base-content tracking-tight">Personal Details</h3>
                            <p className="text-[9px] sm:text-[10px] text-base-content/50 font-bold uppercase tracking-[0.2em]">Core Identity</p>
                        </div>
                    </div>
                    {onTextAlignChange && (
                        <div className="flex items-center sm:flex-col sm:items-end gap-2 sm:gap-1 bg-base-200/50 sm:bg-transparent p-2 sm:p-0 rounded-xl sm:rounded-none">
                            <span className="text-[9px] font-bold text-base-content/50 uppercase tracking-widest sm:mr-1">Header Align</span>
                            <AlignmentToggle value={textAlign || "left"} onChange={onTextAlignChange} />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-base-content/60 uppercase tracking-widest ml-1">Full Identity</label>
                        <input
                            type="text"
                            value={data.fullName || ''}
                            onChange={(e) => handleChange('fullName', e.target.value)}
                            className="w-full bg-base-200/50 backdrop-blur-sm border-2 border-base-content/10 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-base-content/30 font-bold text-base-content hover:border-base-content/20"
                            placeholder="Full Name"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-base-content/60 uppercase tracking-widest ml-1">Current Title</label>
                        <input
                            type="text"
                            value={data.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="w-full bg-base-200/50 backdrop-blur-sm border-2 border-base-content/10 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-base-content/30 font-bold text-base-content hover:border-base-content/20"
                            placeholder="Job Title"
                        />
                    </div>
                </div>
            </div>

            {/* Contact Details section */}
            <div className="space-y-6 pt-6 border-t border-base-content/10">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                    <h4 className="text-xs font-black text-base-content/50 uppercase tracking-widest">Contact Details</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-base-content/60 uppercase tracking-widest ml-1">Email Address</label>
                        <input
                            type="email"
                            value={data.email || ''}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full bg-base-200/50 backdrop-blur-sm border-2 border-base-content/10 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-base-content/30 font-bold text-base-content hover:border-base-content/20"
                            placeholder="Email"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-base-content/60 uppercase tracking-widest ml-1">Contact Number</label>
                        <input
                            type="tel"
                            value={data.phone || ''}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="w-full bg-base-200/50 backdrop-blur-sm border-2 border-base-content/10 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-base-content/30 font-bold text-base-content hover:border-base-content/20"
                            placeholder="Phone"
                        />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-base-content/60 uppercase tracking-widest ml-1">Location / Address</label>
                        <input
                            type="text"
                            value={data.address || ''}
                            onChange={(e) => handleChange('address', e.target.value)}
                            className="w-full bg-base-200/50 backdrop-blur-sm border-2 border-base-content/10 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-base-content/30 font-bold text-base-content hover:border-base-content/20"
                            placeholder="Address"
                        />
                    </div>
                </div>
            </div>

            {/* Summary section with its own alignment */}
            <div className="space-y-4 pt-6 border-t border-base-content/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-secondary rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
                        <h4 className="text-xs font-black text-base-content/50 uppercase tracking-widest">Professional Summary</h4>
                    </div>
                    <div className="flex items-center gap-4">
                        {onSummaryTextAlignChange && (
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold text-base-content/50 uppercase tracking-widest">Summary Align</span>
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
                    className="w-full bg-base-200/50 backdrop-blur-sm border-2 border-base-content/10 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-[1.5rem] px-5 py-4 text-sm outline-none transition-all duration-300 placeholder:text-base-content/30 font-medium leading-relaxed resize-none text-base-content hover:border-base-content/20"
                    placeholder="Briefly describe your professional background..."
                />
            </div>
        </div>
    );
}
