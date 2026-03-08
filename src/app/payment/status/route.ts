/**
 * This route receives the CCAvenue POST redirect after payment.
 * CCAvenue sends: POST /payment/status  with body: encResp=<hex>
 *
 * We decrypt, update DB, then redirect to /payment/result?status=success|failed
 */
import { NextRequest, NextResponse } from "next/server";
import { decrypt, parseResponse } from "@/lib/ccavenue";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const encResp = formData.get("encResp")?.toString();

        const base = process.env.NEXT_PUBLIC_APP_URL || "https://cvdraft.space";

        if (!encResp) {
            return NextResponse.redirect(`${base}/payment/result?status=failed`, 303);
        }

        const workingKey = process.env.CCAVENUE_WORKING_KEY!;
        const plainText = decrypt(encResp, workingKey);
        const data = parseResponse(plainText);

        const isPaid = data["order_status"] === "Success";
        const orderId = data["order_id"] || "";

        if (isPaid) {
            // Priority: extract userId from merchant_param1 which we passed in create-order
            let targetUserId = data["merchant_param1"];

            if (!targetUserId) {
                try {
                    const { userId } = await auth();
                    targetUserId = userId;
                } catch (e) { }
            }

            if (targetUserId && typeof targetUserId === 'string') {
                await connectToDatabase();
                await User.findOneAndUpdate(
                    { userId: targetUserId as string },
                    { $set: { isPro: true, ccavenueOrderId: orderId } },
                    { upsert: false }
                );
            }
        }

        const statusParam = isPaid ? "success" : "failed";
        return NextResponse.redirect(`${base}/payment/result?status=${statusParam}`, 303);
    } catch (err) {
        console.error("[CCAVENUE_STATUS_POST]", err);
        const base = process.env.NEXT_PUBLIC_APP_URL || "https://cvdraft.space";
        return NextResponse.redirect(`${base}/payment/result?status=failed`, 303);
    }
}
