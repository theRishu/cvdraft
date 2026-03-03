import StaticPageLayout from "@/components/StaticPageLayout";
import { Book, FileText, Zap, Shield } from "lucide-react";

export default function KnowledgeCenter() {
    const articles = [
        {
            title: "How to beat the ATS",
            desc: "Learn how to optimize your resume for applicant tracking systems.",
            icon: Zap,
        },
        {
            title: "Writing bullet points that sell",
            desc: "Master the art of describing your achievements.",
            icon: FileText,
        },
        {
            title: "Choosing the right template",
            desc: "Which design works best for your industry?",
            icon: Book,
        },
        {
            title: "Data Privacy at CVdraft",
            desc: "How we keep your professional information secure.",
            icon: Shield,
        },
    ];

    return (
        <StaticPageLayout title="Knowledge Center">
            <div className="space-y-10">
                <p>
                    Welcome to the CVdraft Knowledge Center. Here you'll find guides, tips, and best practices to help you land your dream job.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {articles.map((article, i) => {
                        const Icon = article.icon;
                        return (
                            <div key={i} className="p-6 rounded-2xl bg-base-200/50 border border-base-content/5 hover:border-primary/20 transition-all group">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-base-content mb-2">{article.title}</h3>
                                <p className="text-sm text-base-content/60">{article.desc}</p>
                            </div>
                        );
                    })}
                </div>

                <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10 mt-12">
                    <h2 className="text-xl font-bold text-base-content mb-4">Need more help?</h2>
                    <p className="mb-6">
                        If you can't find what you're looking for, our support team is always ready to assist you in creating the perfect resume.
                    </p>
                    <a href="/contact-us" className="btn btn-primary rounded-xl px-8 shadow-lg shadow-primary/20">
                        Contact Support
                    </a>
                </section>
            </div>
        </StaticPageLayout>
    );
}
