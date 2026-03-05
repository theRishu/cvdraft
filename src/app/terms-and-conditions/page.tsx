import StaticPageLayout from "@/components/StaticPageLayout";

export const metadata = { title: "Terms & Conditions — CVdraft" };

export default function TermsAndConditions() {
    const sections = [
        {
            title: "1. Service Description",
            content: `CVdraft ("we", "us", "our") is a professional Software-as-a-Service (SaaS) resume builder developed by Rishu Kumar Pandey and available at cvdraft.space. 
      The platform allows registered users to create, edit, and export professional resumes using AI-powered tools and curated templates. 
      By accessing our platform, you agree to these Terms and Conditions in full.`,
        },
        {
            title: "2. User Eligibility",
            content: `You must be at least 18 years of age to use CVdraft. By using this service, you represent and warrant that you are 18 or older 
      and have the legal capacity to enter into a binding agreement. Accounts registered on behalf of another individual or entity 
      must have authorisation from the represented party.`,
        },
        {
            title: "3. Account Registration",
            content: `You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately at 
      support@cvdraft.space if you suspect any unauthorised access. CVdraft is not liable for any loss or damage arising from your failure to 
      safeguard your credentials.`,
        },
        {
            title: "4. Payment Terms",
            content: `CVdraft offers a free tier (limited to 2 resumes) and a Pro subscription available in the following plans (all prices in INR, inclusive of applicable taxes):
      • Weekly — ₹79
      • Monthly — ₹299
      • 3 Months — ₹699
      • 6 Months — ₹1,199
      • 12 Months — ₹1,999
      Payment is processed via our secure payment gateway and is subject to their terms.
      Payment must be completed in full before Pro features are activated. We do not store card details on our servers.`,
        },
        {
            title: "5. Intellectual Property",
            content: `All content, templates, designs, and technology on CVdraft are the intellectual property of the developer, Rishu Kumar Pandey. 
      You are granted a limited, non-exclusive, non-transferable licence to use the platform solely for personal or professional resume creation. 
      You may not copy, modify, distribute, sell, or lease any part of our services without our written consent.`,
        },
        {
            title: "6. User Content",
            content: `You retain ownership of any content you upload or create on CVdraft (e.g., your resume data). 
      By using the service, you grant us a limited licence to process and store your content solely to provide the service. 
      We will never sell your personal data to third parties. Please refer to our Privacy Policy for full details.`,
        },
        {
            title: "7. Acceptable Use",
            content: `You agree not to use CVdraft for any unlawful purpose, to impersonate any person, to interfere with the platform's operations, 
      or to submit false, misleading, or fraudulent information. We reserve the right to suspend or terminate accounts that violate these terms.`,
        },
        {
            title: "8. Limitation of Liability",
            content: `To the maximum extent permitted by applicable law, Rishu Kumar Pandey shall not be liable for any indirect, incidental, special, 
      consequential, or punitive damages arising out of your use of, or inability to use, the service. Our total cumulative liability shall not exceed 
      the amount paid by you in the 12 months preceding the claim.`,
        },
        {
            title: "9. Dispute Resolution",
            content: `Any dispute arising out of these Terms shall first be attempted to be resolved amicably through mutual discussion. 
      If unresolved within 30 days, disputes shall be subject to arbitration under the Arbitration and Conciliation Act, 1996, with a sole arbitrator 
      appointed by mutual agreement. The seat of arbitration shall be India.`,
        },
        {
            title: "10. Governing Law",
            content: `These Terms are governed by and construed in accordance with the laws of the Republic of India. 
      Any legal proceedings shall be subject to the exclusive jurisdiction of courts located in India.`,
        },
        {
            title: "11. Changes to Terms",
            content: `We reserve the right to update these Terms at any time. We will notify users via email or an in-app notice at least 7 days before 
      material changes take effect. Continued use of the platform after changes constitutes your acceptance of the revised Terms.`,
        },
        {
            title: "12. Contact",
            content: `For any questions regarding these Terms, email us at support@cvdraft.space or write to us at our registered address listed on the Contact Us page.`,
        },
    ];

    return (
        <StaticPageLayout title="Terms & Conditions">
            <div className="space-y-1 mb-8">
                <p className="text-sm text-slate-400">
                    Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <p>
                    Please read these Terms and Conditions carefully before using CVdraft. By accessing or using the platform, you agree to be bound by these terms.
                </p>
            </div>
            <div className="space-y-8">
                {sections.map((s, i) => (
                    <section key={i}>
                        <h2 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h2>
                        <p className="leading-relaxed whitespace-pre-line">{s.content}</p>
                    </section>
                ))}
            </div>
        </StaticPageLayout>
    );
}
