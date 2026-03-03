"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

function StatusContent() {
    const params = useSearchParams();
    const router = useRouter();
    const orderId = params.get("order_id");
    const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");

    useEffect(() => {
        if (!orderId) { setStatus("failed"); return; }

        fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId }),
        })
            .then(r => r.json())
            .then(d => {
                if (d.success) {
                    setStatus("success");
                    setTimeout(() => router.push("/dashboard"), 3000);
                } else {
                    setStatus("failed");
                }
            })
            .catch(() => setStatus("failed"));
    }, [orderId, router]);

    return (
        <div className="min-h-screen bg-[#fdf9f6] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl p-10 max-w-sm w-full text-center">
                {status === "loading" && (
                    <>
                        <Loader2 className="w-16 h-16 text-indigo-400 animate-spin mx-auto mb-6" />
                        <h1 className="text-xl font-black text-stone-900 mb-2">Verifying payment…</h1>
                        <p className="text-stone-400 text-sm">Please wait, do not close this page.</p>
                    </>
                )}
                {status === "success" && (
                    <>
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h1 className="text-2xl font-black text-stone-900 mb-2">Payment Successful! 🎉</h1>
                        <p className="text-stone-400 text-sm mb-6">Your account has been upgraded to Pro. Redirecting to dashboard…</p>
                    </>
                )}
                {status === "failed" && (
                    <>
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <XCircle className="w-10 h-10 text-red-400" />
                        </div>
                        <h1 className="text-2xl font-black text-stone-900 mb-2">Payment Failed</h1>
                        <p className="text-stone-400 text-sm mb-8">Something went wrong with your payment. You have not been charged.</p>
                        <div className="flex flex-col gap-3">
                            <Link href="/premium" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all">
                                Try Again
                            </Link>
                            <Link href="/contact-us" className="w-full py-3 border border-stone-200 text-stone-600 font-semibold rounded-2xl hover:bg-stone-50 transition-all text-sm">
                                Contact Support
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function PaymentStatusPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#fdf9f6] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
            </div>
        }>
            <StatusContent />
        </Suspense>
    );
}
