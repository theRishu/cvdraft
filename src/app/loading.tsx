export default function Loading() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#fdf9f6] gap-4">
            <div className="w-10 h-10 border-4 border-stone-200 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-sm text-stone-400 font-medium animate-pulse">Loading…</p>
        </div>
    );
}
