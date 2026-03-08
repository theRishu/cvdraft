import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { encrypt } from "@/lib/ccavenue";

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
        if (!userId || !clerkUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json().catch(() => ({}));
        const plan: string = body?.plan && PLAN_PRICES[body.plan] ? body.plan : "monthly";
        const amount = PLAN_PRICES[plan];

        // Simple alphanumeric orderId (some gateways 
        const orderId = `CVD${Date.now()}`;
        const customerEmail =
            clerkUser.emailAddresses?.[0]?.emailAddress || "user@example.com";
        const customerName =
            [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || "CVdraft User";

        const host = req.headers.get("host") || "cvdraft.space";
        const protocol = host.includes("localhost") ? "http" : "https";
        const appUrl = `${protocol}://${host}`;

        const workingKey = process.env.CCAVENUE_WORKING_KEY;
        const accessCode = process.env.CCAVENUE_ACCESS_CODE;
        const merchantId = process.env.CCAVENUE_MERCHANT_ID;

        if (!workingKey || !accessCode || !merchantId) {
            console.error("[CCAVENUE_CREATE] Missing configuration:", {
                hasKey: !!workingKey,
                hasCode: !!accessCode,
                hasMerchant: !!merchantId
            });
            throw new Error("Payment configuration is missing on the server.");
        }

        const ccavenueUrl =
            process.env.CCAVENUE_URL ||
            "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction";

        // Build the parameter string
        // We use merchant_param1 and 2 to pass our internal metadata safely
        const params = new URLSearchParams({
            merchant_id: merchantId,
            order_id: orderId,
            currency: "INR",
            amount: amount.toFixed(2),
            redirect_url: `${appUrl}/payment/status`,
            cancel_url: `${appUrl}/payment/status`,
            language: "EN",
            billing_name: customerName,
            billing_email: customerEmail,
            billing_country: "India",
            merchant_param1: userId,  // Store userId here
            merchant_param2: plan,    // Store plan here
        }).toString();

        console.log("[CCAVENUE_CREATE] Order:", orderId, "Target URL:", appUrl);
        const encRequest = encrypt(params, workingKey);

        return NextResponse.json({ encRequest, accessCode, actionUrl: ccavenueUrl, orderId, merchantId });
    } catch (err) {
        console.error("[CREATE_ORDER_CCAVENUE]", err);
        return new NextResponse(
            JSON.stringify({ error: err instanceof Error ? err.message : "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
