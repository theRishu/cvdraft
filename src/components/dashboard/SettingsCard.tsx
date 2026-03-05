"use client";

import { useState, useEffect } from "react";
import { Key, Save, Loader2, CheckCircle, AlertCircle, Sparkles, ExternalLink, ShieldCheck, Eye, EyeOff } from "lucide-react";

type Provider = "gemini" | "openai";

interface ProviderConfig {
    id: Provider;
    label: string;
    logo: string;
    keyUrl: string;
    docsUrl: string;
    placeholder: string;
    model: string;
    color: string;
}

const PROVIDERS: ProviderConfig[] = [
    {
        id: "gemini",
        label: "Google Gemini",
        logo: "✨",
        keyUrl: "https://aistudio.google.com/app/apikey",
        docsUrl: "https://ai.google.dev/gemini-api/docs/rate-limits",
        placeholder: "AIzaSy...",
        model: "gemini-1.5-flash",
        color: "#4285F4",
    },
    {
        id: "openai",
        label: "OpenAI",
        logo: "⚙️",
        keyUrl: "https://platform.openai.com/api-keys",
        docsUrl: "https://platform.openai.com/docs",
        placeholder: "sk-proj-...",
        model: "gpt-4o-mini",
        color: "#10A37F",
    },
];

interface ProviderState {
    key: string;
    isSaving: boolean;
    isTesting: boolean;
    saveStatus: "idle" | "success" | "error";
    testStatus: "idle" | "valid" | "invalid";
    testError: string;
    testWarning: string;
    quotaExhausted: boolean;
    showKey: boolean;
}

const defaultState = (): ProviderState => ({
    key: "", isSaving: false, isTesting: false, saveStatus: "idle",
    testStatus: "idle", testError: "", testWarning: "", quotaExhausted: false, showKey: false,
});

export default function SettingsCard({ user }: { user: any }) {
    const [activeTab, setActiveTab] = useState<Provider>("gemini");
    const [states, setStates] = useState<Record<Provider, ProviderState>>({
        gemini: defaultState(),
        openai: defaultState(),
    });

    useEffect(() => {
        if (!user?.aiKeys) return;
        setStates(prev => ({
            gemini: { ...prev.gemini, key: user.aiKeys?.gemini || "" },
            openai: { ...prev.openai, key: user.aiKeys?.openai || "" },
        }));
    }, [user]);

    const patch = (p: Provider, update: Partial<ProviderState>) =>
        setStates(prev => ({ ...prev, [p]: { ...prev[p], ...update } }));

    const handleSave = async (p: Provider) => {
        patch(p, { isSaving: true, saveStatus: "idle" });
        try {
            const res = await fetch("/api/user", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ aiKeys: { [p]: states[p].key } }),
            });
            if (!res.ok) throw new Error();
            patch(p, { saveStatus: "success" });
            setTimeout(() => patch(p, { saveStatus: "idle" }), 3000);
        } catch {
            patch(p, { saveStatus: "error" });
        } finally {
            patch(p, { isSaving: false });
        }
    };

    const handleRemove = async (p: Provider) => {
        if (!confirm(`Are you sure you want to remove your ${PROVIDERS.find(x => x.id === p)?.label} key?`)) return;
        patch(p, { isSaving: true, saveStatus: "idle" });
        try {
            const res = await fetch("/api/user", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ aiKeys: { [p]: "" } }),
            });
            if (!res.ok) throw new Error();
            patch(p, { key: "", testStatus: "idle", saveStatus: "success" });
            setTimeout(() => patch(p, { saveStatus: "idle" }), 3000);
        } catch {
            patch(p, { saveStatus: "error" });
        } finally {
            patch(p, { isSaving: false });
        }
    };

    const handleTest = async (p: Provider) => {
        const key = states[p].key.trim();
        if (!key) return;
        patch(p, { isTesting: true, testStatus: "idle", testError: "", testWarning: "", quotaExhausted: false });
        try {
            const res = await fetch("/api/validate-key", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ apiKey: key, provider: p }),
            });
            const data = await res.json();
            if (data.valid) {
                patch(p, { testStatus: "valid", testWarning: data.warning || "", quotaExhausted: data.quotaExhausted || false });
            } else {
                patch(p, { testStatus: "invalid", testError: data.error || "Validation failed." });
            }
        } catch {
            patch(p, { testStatus: "invalid", testError: "Could not reach the server. Try again." });
        } finally {
            patch(p, { isTesting: false });
        }
    };

    const cfg = PROVIDERS.find(p => p.id === activeTab)!;
    const s = states[activeTab];
    const hasKey = (id: Provider) => !!states[id].key.trim();

    return (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900">AI Provider Settings</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Add keys for one or more providers. If one runs out of quota, the editor will automatically try the next available key.
                    </p>
                </div>
            </div>

            {/* Provider Tabs */}
            <div className="flex border-b border-slate-100 bg-slate-50">
                {PROVIDERS.map(p => (
                    <button
                        key={p.id}
                        onClick={() => setActiveTab(p.id)}
                        className={`flex-1 flex flex-col items-center gap-0.5 py-3.5 px-2 text-xs font-semibold transition-all relative ${activeTab === p.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                            }`}
                    >
                        <span className="text-lg leading-none">{p.logo}</span>
                        <span className="hidden sm:block">{p.label}</span>
                        {/* Green dot when key is saved */}
                        {hasKey(p.id) && (
                            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-emerald-400 shadow-sm" />
                        )}
                        {activeTab === p.id && (
                            <span className="absolute bottom-0 inset-x-0 h-0.5 rounded-t" style={{ background: cfg.color }} />
                        )}
                    </button>
                ))}
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-5">
                {/* Key input */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                            <span>{cfg.logo}</span> {cfg.label} API Key
                        </label>
                        <a href={cfg.keyUrl} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-emerald-600 hover:text-emerald-800 flex items-center gap-1 transition-colors">
                            Get a free key <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                    <div className="relative">
                        <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type={s.showKey ? "text" : "password"}
                            value={s.key}
                            onChange={e => patch(activeTab, { key: e.target.value, testStatus: "idle" })}
                            placeholder={cfg.placeholder}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-400 focus:bg-white rounded-xl pl-10 pr-10 py-3 text-sm outline-none transition-all font-mono placeholder:font-sans placeholder:text-slate-300"
                        />
                        <button
                            type="button"
                            onClick={() => patch(activeTab, { showKey: !s.showKey })}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                            title={s.showKey ? "Hide key" : "Reveal key"}
                        >
                            {s.showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    <p className="text-xs text-slate-400">
                        Uses model: <span className="font-mono text-slate-500">{cfg.model}</span> · Stored securely, never shared.
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-3">
                    <button onClick={() => handleTest(activeTab)} disabled={s.isTesting || s.isSaving || !s.key.trim()}
                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                        {s.isTesting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                        {s.isTesting ? "Testing…" : "Test Key"}
                    </button>
                    <button onClick={() => handleSave(activeTab)} disabled={s.isSaving || !s.key.trim()}
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                        {s.isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {s.isSaving ? "Saving…" : "Save Key"}
                    </button>
                    {hasKey(activeTab) && (
                        <button onClick={() => handleRemove(activeTab)} disabled={s.isSaving}
                            className="flex items-center gap-2 px-4 py-2.5 text-red-500 hover:bg-red-50 text-sm font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-50">
                            Remove
                        </button>
                    )}
                    {s.saveStatus === "success" && (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 animate-in fade-in">
                            <CheckCircle className="w-3.5 h-3.5" /> Saved!
                        </div>
                    )}
                    {s.saveStatus === "error" && (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-red-500 animate-in fade-in">
                            <AlertCircle className="w-3.5 h-3.5" /> Couldn't save. Try again.
                        </div>
                    )}
                </div>

                {/* Test result banner */}
                {s.testStatus === "valid" && (
                    <div className="space-y-2">
                        {!s.quotaExhausted ? (
                            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-3 rounded-2xl animate-in fade-in">
                                <CheckCircle className="w-4 h-4 shrink-0" />
                                {cfg.label} key is valid — AI features are ready to use!
                            </div>
                        ) : (
                            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium px-4 py-3 rounded-2xl animate-in fade-in">
                                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                <span>
                                    <strong>Key is valid</strong>, but your free-tier quota is exhausted.
                                    If you have another provider key saved, the editor will use that automatically.{" "}
                                    <a href={cfg.docsUrl} target="_blank" rel="noopener noreferrer" className="underline font-semibold">Learn more</a>
                                </span>
                            </div>
                        )}
                        {s.testWarning && !s.quotaExhausted && (
                            <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl">{s.testWarning}</div>
                        )}
                    </div>
                )}
                {s.testStatus === "invalid" && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-2xl animate-in fade-in">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {s.testError || "Invalid API key. Please double-check and try again."}
                    </div>
                )}

                {/* Connected providers summary */}
                <div className="pt-3 border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Connected Providers</p>
                    <div className="flex flex-wrap gap-2">
                        {PROVIDERS.map(p => (
                            <div key={p.id}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${hasKey(p.id)
                                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                    : "bg-slate-50 border-slate-200 text-slate-400"
                                    }`}>
                                <span>{p.logo}</span>
                                <span className="hidden sm:inline">{p.label}</span>
                                <span className="sm:hidden">{p.id}</span>
                                {hasKey(p.id) ? <CheckCircle className="w-3 h-3" /> : <span className="opacity-40 text-[10px]">No key</span>}
                            </div>
                        ))}
                    </div>
                    {/* Multiple Providers Text... */}
                    {[hasKey("gemini"), hasKey("openai")].filter(Boolean).length > 1 && (
                        <p className="text-xs text-emerald-600 font-medium mt-2">
                            ✨ Multiple providers connected — the editor will auto-switch if one runs out of quota.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
