import StaticPageLayout from "@/components/StaticPageLayout";

export const metadata = { title: "Refund & Cancellation Policy — CVdraft" };

export default function RefundAndCancellation() {
    return (
        <StaticPageLayout title="Refund & Cancellation Policy">
            <div className="space-y-2 mb-8">
                <p className="text-sm text-stone-400">
                    Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <p>
                    CVdraft is committed to ensuring customer satisfaction. This policy outlines the conditions under which refunds and cancellations are processed.
                </p>
            </div>

            <div className="space-y-10">

                <section>
                    <h2 className="text-lg font-bold text-stone-900 mb-3">1. Nature of Service</h2>
                    <p>
                        CVdraft offers a one-time payment Pro plan (₹299 lifetime) that provides unlimited resume creation, premium templates, and advanced AI tools.
                        The service is digital in nature and access is granted immediately upon successful payment.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-stone-900 mb-3">2. Cancellation Policy</h2>
                    <p>
                        As CVdraft Pro is a <strong>lifetime one-time purchase</strong> (not a subscription), there is no ongoing billing to cancel.
                        Once purchased, your Pro access remains active permanently on your account.
                    </p>
                    <p className="mt-3">
                        If you wish to delete your account entirely, please contact us at{" "}
                        <a href="mailto:support@cvdraft.space" className="text-indigo-600 font-semibold">support@cvdraft.space</a>{" "}
                        and we will process it within 7 business days.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-stone-900 mb-3">3. Refund Eligibility</h2>
                    <p className="mb-4">You are eligible for a full refund under the following conditions:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>You request a refund within <strong>7 days</strong> of the original purchase date.</li>
                        <li>You have not used the Pro features (e.g., downloaded a Pro-only template or created more than 2 resumes) after upgrading.</li>
                        <li>The payment was made in error or a duplicate charge occurred.</li>
                        <li>The service was unavailable or non-functional for more than 48 consecutive hours after your purchase.</li>
                    </ul>
                    <div className="mt-4 p-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm">
                        <strong>Non-refundable cases:</strong> Refunds will <em>not</em> be issued if the Pro features have been actively used,
                        if the 7-day window has passed, or if the request is based solely on a change of mind after active use.
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-stone-900 mb-3">4. How to Request a Refund</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>Email <a href="mailto:support@cvdraft.space" className="text-indigo-600 font-semibold">support@cvdraft.space</a> with the subject line: <strong>"Refund Request — [Your Registered Email]"</strong></li>
                        <li>Include your Order ID (from the payment confirmation email) and the reason for your request.</li>
                        <li>Our team will acknowledge your request within <strong>2 business days</strong>.</li>
                        <li>Once approved, the refund will be initiated within <strong>3–5 business days</strong>.</li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-stone-900 mb-3">5. Refund Processing Timeline</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-stone-100 text-stone-600">
                                    <th className="text-left px-4 py-3 rounded-tl-xl font-bold">Step</th>
                                    <th className="text-left px-4 py-3 rounded-tr-xl font-bold">Timeline</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                <tr className="bg-white">
                                    <td className="px-4 py-3">Refund request acknowledged</td>
                                    <td className="px-4 py-3 font-semibold">Within 2 business days</td>
                                </tr>
                                <tr className="bg-stone-50">
                                    <td className="px-4 py-3">Refund approved & initiated</td>
                                    <td className="px-4 py-3 font-semibold">3–5 business days</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-4 py-3">Credit reflected in your account</td>
                                    <td className="px-4 py-3 font-semibold">5–7 business days (depending on your bank)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-stone-900 mb-3">6. Mode of Refund</h2>
                    <p>
                        All approved refunds will be processed to the <strong>original payment method</strong> used at the time of purchase (UPI, credit card, debit card, net banking, etc.)
                        via Cashfree Payments. We do not offer refunds via cash or alternative payment methods.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-stone-900 mb-3">7. Contact Us</h2>
                    <p>
                        For any refund or cancellation queries, including grievances, please email us at{" "}
                        <a href="mailto:support@cvdraft.space" className="text-indigo-600 font-semibold">support@cvdraft.space</a>.
                    </p>
                </section>

            </div>
        </StaticPageLayout>
    );
}
