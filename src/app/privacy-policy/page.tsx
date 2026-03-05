import StaticPageLayout from "@/components/StaticPageLayout";

export const metadata = { title: "Privacy Policy — CVdraft" };

export default function PrivacyPolicy() {
    const sections = [
        {
            title: "1. Information We Collect",
            content: `When you register and use CVdraft, we collect:
      • Account information: name, email address, and profile data provided via Clerk (our authentication provider).
      • Resume content: professional details (work history, skills, education) you enter into the editor.
      • Payment information: order ID and payment status from our payment processor. We do not store card or bank account details on our servers.
      • Usage data: logs, IP addresses, browser type, and pages visited for analytics and security purposes.`,
        },
        {
            title: "2. How We Use Your Information",
            content: `We use the data we collect to:
      • Provide and improve the CVdraft service.
      • Process and verify payments through our secure payment gateway.
      • Send transactional emails (receipts, account alerts).
      • Respond to support requests.
      • Comply with legal obligations.
      We do not sell, rent, or trade your personal information to third parties for marketing purposes.`,
        },
        {
            title: "3. Data Sharing",
            content: `We share your data only with trusted third-party service providers necessary for operating the platform:
      • Clerk (authentication & user management) — clerkinc.com
      • Secure Payment Gateway (payment processing)
      • Google AI / OpenAI (AI writing assistance — only processes the text you submit, not stored) 
      • MongoDB Atlas (database hosting)
      All third-party providers are required to comply with applicable data protection laws.`,
        },
        {
            title: "4. Data Retention",
            content: `We retain your account and resume data for as long as your account is active. 
      If you request account deletion, we will remove your personal data within 30 days, except where retention is required by law.
      Contact us at support@cvdraft.space to request deletion.`,
        },
        {
            title: "5. Cookies",
            content: `CVdraft uses essential cookies to maintain your login session. We do not use third-party advertising cookies. 
      You may disable cookies in your browser settings, but this may affect functionality.`,
        },
        {
            title: "6. Data Security",
            content: `We implement industry-standard security measures including HTTPS (TLS encryption), hashed credentials via Clerk, 
      and secure database access. However, no internet transmission is 100% secure. 
      In the event of a data breach, we will notify affected users within 72 hours as required by applicable law.`,
        },
        {
            title: "7. Your Rights",
            content: `Under applicable Indian data protection laws, you have the right to:
      • Access the personal data we hold about you.
      • Request correction of inaccurate data.
      • Request deletion of your data.
      • Withdraw consent for processing (where applicable).
      To exercise these rights, email support@cvdraft.space.`,
        },
        {
            title: "8. Children's Privacy",
            content: `CVdraft is not intended for users under 18 years of age. We do not knowingly collect personal data from minors. 
      If you believe a minor has provided us with data, please contact us immediately.`,
        },
        {
            title: "9. Changes to This Policy",
            content: `We may update this Privacy Policy periodically. We will notify you via email or an in-app notice before material changes take effect. 
      Continued use of CVdraft after such changes constitutes your acceptance of the updated policy.`,
        },
        {
            title: "10. Contact & Grievance",
            content: `For any privacy concerns or grievances, please contact us at:
      Email: support@cvdraft.space
      Response time: Within 30 days.`,
        },
    ];

    return (
        <StaticPageLayout title="Privacy Policy">
            <div className="space-y-1 mb-8">
                <p className="text-sm text-slate-400">
                    Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <p>
                    This Privacy Policy explains how <strong>Rishu Kumar Pandey</strong> (the developer of CVdraft) collects, uses, and protects your personal information
                    when you use cvdraft.space. By using CVdraft, you consent to the practices described here.
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
