/**
 * CCAvenue Server-to-Server (S2S) callback webhook.
 * CCAvenue POSTs form-encoded data with an `encResp` field.
 */
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { decrypt, parseResponse } from "@/lib/ccavenue";

export async function POST(req: NextRequest) {
    try {
        // CCAvenue sends form data, not JSON
        const formData = await req.formData();
        const encResp = formData.get("encResp")?.toString();

        if (!encResp) {
            return new NextResponse("Missing encResp", { status: 400 });
        }

        const workingKey = process.env.CCAVENUE_WORKING_KEY!;
        const plainText = decrypt(encResp, workingKey);
        const data = parseResponse(plainText);

        console.log("[CCAVENUE_WEBHOOK] Decrypted Data:", data);

        const orderStatus = (data["order_status"] || "").toLowerCase();
        const isPaid = orderStatus === "success";
        const orderId = data["order_id"];

        if (isPaid && orderId) {
            // Extract userId from merchant_param1
            const userId = data["merchant_param1"];

            console.log("[CCAVENUE_WEBHOOK] Success for order:", orderId, "User:", userId);

            if (userId) {
                await connectToDatabase();
                await User.findOneAndUpdate(
                    { userId },
                    { $set: { isPro: true, ccavenueOrderId: orderId } },
                    { upsert: false }
                );
                console.log(`[CCAvenue Webhook] Upgraded user ${userId} to Pro (order: ${orderId})`);
            }
        }

        return new NextResponse("OK", { status: 200 });
    } catch (err) {
        console.error("[CCAvenue Webhook]", err);
        return new NextResponse("Webhook error", { status: 500 });
    }
}
