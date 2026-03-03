import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

const CASHFREE_BASE =
    process.env.CASHFREE_ENVIRONMENT === "PRODUCTION"
        ? "https://api.cashfree.com/pg"
        : "https://sandbox.cashfree.com/pg";

// ₹299 one-time Pro price
const PRO_PRICE_INR = 299;

export async function POST() {
    try {
        const { userId } = await auth();
        const clerkUser = await currentUser();
        if (!userId || !clerkUser) return new NextResponse("Unauthorized", { status: 401 });

        const orderId = `cvdraft_${userId}_${Date.now()}`;
        const customerEmail =
            clerkUser.emailAddresses?.[0]?.emailAddress || "user@example.com";
        const customerName =
            [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || "CVdraft User";
        const customerPhone = clerkUser.phoneNumbers?.[0]?.phoneNumber || "9999999999";

        const body = {
            order_id: orderId,
            order_amount: PRO_PRICE_INR,
            order_currency: "INR",
            customer_details: {
                customer_id: userId,
                customer_name: customerName,
                customer_email: customerEmail,
                customer_phone: customerPhone,
            },
            order_meta: {
                notify_url: `${process.env.NEXT_PUBLIC_APP_URL || ""}/api/payment/webhook`,
                return_url: `${process.env.NEXT_PUBLIC_APP_URL || ""}/payment/status?order_id={order_id}`,
            },
        };

        const resp = await fetch(`${CASHFREE_BASE}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-client-id": process.env.CASHFREE_APP_ID!,
                "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
                "x-api-version": "2023-08-01",
            },
            body: JSON.stringify(body),
        });

        if (!resp.ok) {
            const err = await resp.json().catch(() => ({}));
            console.error("[CREATE_ORDER] Cashfree error:", JSON.stringify(err));
            return new NextResponse(
                JSON.stringify({ error: err?.message || "Failed to create order", details: err }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        const data = await resp.json();
        return NextResponse.json({
            orderId: data.order_id,
            paymentSessionId: data.payment_session_id,
        });
    } catch (err) {
        console.error("[CREATE_ORDER]", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
