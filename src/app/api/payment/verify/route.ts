import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { decrypt, parseResponse } from "@/lib/ccavenue";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json().catch(() => ({}));
        const encResp: string = body?.encResp;
        if (!encResp) return new NextResponse("encResp required", { status: 400 });

        const workingKey = process.env.CCAVENUE_WORKING_KEY!;
        const plainText = decrypt(encResp, workingKey);
        const data = parseResponse(plainText);

        const isPaid = data["order_status"] === "Success";
        const orderId = data["order_id"] || "";

        if (isPaid) {
            await connectToDatabase();
            await User.findOneAndUpdate(
                { userId },
                {
                    $set: {
                        isPro: true,
                        ccavenueOrderId: orderId,
                    },
                },
                { upsert: false }
            );
        }

        return NextResponse.json({ success: isPaid, status: data["order_status"], orderId });
    } catch (err) {
        console.error("[VERIFY_CCAVENUE]", err);
        return new NextResponse("Verification failed", { status: 500 });
    }
}
