import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

const CASHFREE_BASE =
    process.env.CASHFREE_ENVIRONMENT === "PRODUCTION"
        ? "https://api.cashfree.com/pg"
        : "https://sandbox.cashfree.com/pg";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const { orderId } = await req.json();
        if (!orderId) return new NextResponse("Order ID required", { status: 400 });

        // Fetch order status from Cashfree
        const resp = await fetch(`${CASHFREE_BASE}/orders/${orderId}`, {
            headers: {
                "x-client-id": process.env.CASHFREE_APP_ID!,
                "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
                "x-api-version": "2023-08-01",
            },
        });

        if (!resp.ok) {
            return new NextResponse("Failed to fetch order", { status: 500 });
        }

        const order = await resp.json();
        const isPaid = order.order_status === "PAID";

        if (isPaid) {
            await connectToDatabase();
            await User.findOneAndUpdate(
                { userId },
                {
                    $set: {
                        isPro: true,
                        razorpayOrderId: orderId, // reusing field for Cashfree order
                    },
                },
                { upsert: false }
            );
        }

        return NextResponse.json({ success: isPaid, status: order.order_status });
    } catch (err) {
        console.error("[VERIFY_PAYMENT]", err);
        return new NextResponse("Verification failed", { status: 500 });
    }
}
