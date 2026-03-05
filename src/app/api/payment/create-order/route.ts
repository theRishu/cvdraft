import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

const CASHFREE_BASE =
    process.env.CASHFREE_ENVIRONMENT === "PRODUCTION"
        ? "https://api.cashfree.com/pg"
        : "https://sandbox.cashfree.com/pg";

// Pricing table (INR)
const PLAN_PRICES: Record<string, number> = {
    weekly: 79,
    monthly: 299,
    quarterly: 699,
    biannual: 1199,
    annual: 1999,
};

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        const clerkUser = await currentUser();
        if (!userId || !clerkUser) return new NextResponse("Unauthorized", { status: 401 });

        // Read plan from request body; default to monthly if not provided
        const body = await req.json().catch(() => ({}));
        const plan: string = body?.plan && PLAN_PRICES[body.plan] ? body.plan : "monthly";
        const amount = PLAN_PRICES[plan];

        const orderId = `cvdraft_${userId}_${plan}_${Date.now()}`;
        const customerEmail =
            clerkUser.emailAddresses?.[0]?.emailAddress || "user@example.com";
        const customerName =
            [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || "CVdraft User";
        const customerPhone = clerkUser.phoneNumbers?.[0]?.phoneNumber || "9999999999";

        const orderBody = {
            order_id: orderId,
            order_amount: amount,
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
            // Store plan in order tags for webhook reference
            order_tags: { plan },
        };

        const resp = await fetch(`${CASHFREE_BASE}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-client-id": process.env.CASHFREE_APP_ID!,
                "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
                "x-api-version": "2023-08-01",
            },
            body: JSON.stringify(orderBody),
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
            plan,
            amount,
        });
    } catch (err) {
        console.error("[CREATE_ORDER]", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
