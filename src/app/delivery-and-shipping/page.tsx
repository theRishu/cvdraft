import StaticPageLayout from "@/components/StaticPageLayout";

export const metadata = {
    title: "Delivery & Shipping Policy — CVdraft",
    description:
        "Understand how CVdraft delivers its digital services and what to expect after your purchase.",
};

export default function DeliveryAndShipping() {
    return (
        <StaticPageLayout title="Delivery & Shipping Policy">
            <div className="space-y-2 mb-8">
                <p className="text-sm text-slate-400">
                    Last updated:{" "}
                    {new Date().toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </p>
                <p>
                    CVdraft is a fully digital SaaS (Software-as-a-Service) platform. All
                    products, plans, and features are delivered electronically over the
                    internet — there is no physical shipment involved.
                </p>
            </div>

            <div className="space-y-10">
                {/* 1 */}
                <section>
                    <h2 className="text-lg font-bold text-slate-900 mb-3">
                        1. Nature of Delivery
                    </h2>
                    <p>
                        CVdraft provides <strong>digital services only</strong>. Upon
                        successful payment, the following are delivered electronically and
                        instantly to your registered account:
                    </p>
                    <ul className="list-disc pl-5 mt-3 space-y-1.5">
                        <li>Activation of your CVdraft Pro plan.</li>
                        <li>
                            Immediate access to all Pro-tier features including unlimited
                            resumes, premium templates, advanced AI writing tools, and
                            watermark-free PDF exports.
                        </li>
                        <li>
                            A payment confirmation and tax receipt sent to your registered
                            email address.
                        </li>
                    </ul>
                    <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-sm">
                        <strong className="text-emerald-700">Note:</strong> Since CVdraft is
                        a digital service, physical delivery, logistics, or courier partners
                        are not applicable.
                    </div>
                </section>

                {/* 2 */}
                <section>
                    <h2 className="text-lg font-bold text-slate-900 mb-3">
                        2. Delivery Timeline
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-100 text-slate-600">
                                    <th className="text-left px-4 py-3 rounded-tl-xl font-bold">
                                        Event
                                    </th>
                                    <th className="text-left px-4 py-3 rounded-tr-xl font-bold">
                                        Timeline
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="bg-white">
                                    <td className="px-4 py-3">Payment confirmed by payment gateway</td>
                                    <td className="px-4 py-3 font-semibold">Instant</td>
                                </tr>
                                <tr className="bg-slate-50">
                                    <td className="px-4 py-3">
                                        Pro features activated on your account
                                    </td>
                                    <td className="px-4 py-3 font-semibold">
                                        Instant (within seconds)
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-4 py-3">
                                        Payment confirmation email sent
                                    </td>
                                    <td className="px-4 py-3 font-semibold">
                                        Within 5–10 minutes
                                    </td>
                                </tr>
                                <tr className="bg-slate-50">
                                    <td className="px-4 py-3">
                                        Access to all resumes and templates
                                    </td>
                                    <td className="px-4 py-3 font-semibold">
                                        Immediate &amp; permanent
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 3 */}
                <section>
                    <h2 className="text-lg font-bold text-slate-900 mb-3">
                        3. Delayed or Non-Delivery
                    </h2>
                    <p className="mb-3">
                        In rare circumstances, Pro access may not be activated immediately
                        due to technical delays (e.g., payment gateway processing lag,
                        server issues). If your Pro plan is not showing as active within{" "}
                        <strong>30 minutes of a successful payment</strong>, please:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>
                            Log out and log back in to refresh your account status.
                        </li>
                        <li>
                            Check your spam/junk folder for the confirmation email.
                        </li>
                        <li>
                            If the issue persists, contact us at{" "}
                            <a
                                href="mailto:support@cvdraft.space"
                                className="text-emerald-600 font-semibold hover:text-emerald-800 transition-colors"
                            >
                                support@cvdraft.space
                            </a>{" "}
                            with your registered email and Order ID (from your payment confirmation email). We will
                            resolve the issue within <strong>2 business days</strong>.
                        </li>
                    </ol>
                </section>

                {/* 4 */}
                <section>
                    <h2 className="text-lg font-bold text-slate-900 mb-3">
                        4. Service Availability
                    </h2>
                    <p>
                        CVdraft strives for 99.9% uptime. Scheduled maintenance will be
                        communicated at least 24 hours in advance via email. In the event of
                        unplanned downtime exceeding 48 consecutive hours after your
                        purchase, you may be eligible for a refund under our{" "}
                        <a
                            href="/refund-and-cancellation"
                            className="text-emerald-600 font-semibold hover:text-emerald-800 transition-colors"
                        >
                            Refund &amp; Cancellation Policy
                        </a>
                        .
                    </p>
                </section>

                {/* 5 */}
                <section>
                    <h2 className="text-lg font-bold text-slate-900 mb-3">
                        5. Geographic Availability
                    </h2>
                    <p>
                        CVdraft is accessible from any country with internet access. However,
                        our payment gateway currently processes payments
                        primarily in Indian Rupees (INR). International cards (Visa,
                        Mastercard) are accepted, though your bank may apply
                        foreign transaction fees. CVdraft is not responsible for such
                        additional bank charges.
                    </p>
                </section>

                {/* 6 */}
                <section>
                    <h2 className="text-lg font-bold text-slate-900 mb-3">
                        6. Contact Us
                    </h2>
                    <p>
                        For any queries related to delivery of your CVdraft plan, email us
                        at{" "}
                        <a
                            href="mailto:support@cvdraft.space"
                            className="text-emerald-600 font-semibold hover:text-emerald-800 transition-colors"
                        >
                            support@cvdraft.space
                        </a>
                        . Our support team responds within 24–48 business hours.
                    </p>
                </section>
            </div>
        </StaticPageLayout>
    );
}
