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

        const host = req.headers.get("host") || "cvdraft.space";
        const protocol = host.includes("localhost") ? "http" : "https";
        const base = `${protocol}://${host}`;

        if (!encResp) {
            console.error("[CCAVENUE_STATUS] Missing encResp in POST");
            return NextResponse.redirect(`${base}/payment/result?status=failed`, 303);
        }

        const workingKey = process.env.CCAVENUE_WORKING_KEY!;
        const plainText = decrypt(encResp, workingKey);
        const data = parseResponse(plainText);

        console.log("[CCAVENUE_STATUS] Decrypted Data:", data);

        const orderStatus = (data["order_status"] || "").toLowerCase();
        const isPaid = orderStatus === "success";
        const orderId = data["order_id"] || "";

        if (isPaid) {
            // Get userId from merchant_param1 (our custom data) or fall back to current session
            const merchantUserId = data["merchant_param1"];
            let finalUserId: string | null = null;

            if (merchantUserId && typeof merchantUserId === "string") {
                finalUserId = merchantUserId;
            } else {
                try {
                    const authSession = await auth();
                    finalUserId = authSession.userId;
                } catch (e) {
                    console.error("[CCAVENUE_STATUS] auth() failed:", e);
                }
            }

            if (finalUserId) {
                console.log("[CCAVENUE_STATUS] Upgrading user:", finalUserId);
                await connectToDatabase();
                await User.findOneAndUpdate(
                    { userId: finalUserId },
                    { $set: { isPro: true, ccavenueOrderId: orderId } },
                    { upsert: false }
                );
            } else {
                console.error("[CCAVENUE_STATUS] Paid but no finalUserId found");
            }
        }

        const statusParam = isPaid ? "success" : "failed";
        return NextResponse.redirect(`${base}/payment/result?status=${statusParam}`, 303);
    } catch (err) {
        console.error("[CCAVENUE_STATUS_POST] Error:", err);
        const host = req.headers.get("host") || "cvdraft.space";
        const protocol = host.includes("localhost") ? "http" : "https";
        const base = `${protocol}://${host}`;
        return NextResponse.redirect(`${base}/payment/result?status=failed`, 303);
    }
}
