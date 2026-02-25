import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/db';
import Resume from '@/models/Resume';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDatabase();

        // Check user subscription and limits
        let dbUser = await User.findOne({ userId });

        if (!dbUser) {
            dbUser = await User.create({
                userId,
                email: user.emailAddresses[0].emailAddress,
            });
        }

        // Limit check: Free users max 2 resumes
        const resumeCount = await Resume.countDocuments({ userId });

        // Check against Admin Email in .env.local
        const adminEmail = process.env.ADMIN_EMAIL;
        const isAdmin = adminEmail && dbUser.email === adminEmail;
        const isPro = dbUser.isPro || isAdmin;

        // Simple check for now - can be expanded with real Pro flag
        // The user says "normal user can create only 2 resume but in my protal i see 4 resume"
        // This confirms they want this limit enforced.
        if (!isPro && resumeCount >= 2) {
            return new NextResponse("Free limit reached (2 resumes max). Upgrade to Pro for unlimited resumes.", { status: 403 });
        }

        const body = await req.json();
        const { title, templateId, importData } = body;

        let initialData = {};
        if (importData) {
            // If importing, use the imported data but override critical fields
            initialData = {
                ...importData,
                title: title || importData.title || "Imported Resume",
                templateId: templateId || importData.templateId || "modern",
                userId, // Enforce current user
                _id: undefined, // Type safety, though Mongoose ignores if not in schema usually, but explicit is good
                createdAt: undefined,
                updatedAt: undefined,
            };
        } else {
            // Default creation
            initialData = {
                userId,
                title: title || "Software Engineer Resume",
                templateId: templateId || "singlecolumn",
                personalInfo: {
                    fullName: user.firstName + " " + user.lastName,
                    email: user.emailAddresses[0].emailAddress || "john.doe@example.com",
                    title: "Senior Software Engineer",
                    phone: "+1 (555) 123-4567",
                    address: "123 Tech Lane, San Francisco, CA 94105",
                    summary: "Senior Software Engineer with over 5 years of experience in building scalable web applications and distributed systems.\n\nExpert in React, Node.js, and TypeScript, with a strong focus on clean code, performance optimization, and user-centric design.\n\nProven track record of delivering high-quality software solutions in fast-paced startup environments."
                },
                experience: [
                    {
                        id: crypto.randomUUID(),
                        jobTitle: "Senior Software Engineer",
                        companyName: "TechFlow Systems",
                        startDate: "Jan 2021",
                        endDate: "Present",
                        address: "San Francisco, CA",
                        isCurrent: true,
                        description: "• Led the frontend development of a high-traffic e-commerce platform using React and Next.js, resulting in a 30% increase in conversion rates.\n• Architected and implemented a microservices-based backend using Node.js and GraphQL, improving system scalability and maintainability.\n• Mentored junior developers and conducted code reviews to ensure high-quality standards and best practices.\n• Optimized application performance, reducing page load times by 40% through code splitting and efficient data fetching strategies."
                    },
                    {
                        id: crypto.randomUUID(),
                        jobTitle: "Software Engineer",
                        companyName: "Innovate Digital",
                        startDate: "Jun 2018",
                        endDate: "Dec 2020",
                        address: "Austin, TX",
                        isCurrent: false,
                        description: "• Developed and maintained multiple client-facing web applications using JavaScript, HTML5, and CSS3.\n• Collaborated with UX/UI designers to translate complex requirements into intuitive and responsive user interfaces.\n• Integrated third-party APIs and services to enhance application functionality and user experience.\n• Participated in agile development processes, including sprint planning and daily stand-ups."
                    }
                ],
                education: [
                    {
                        id: crypto.randomUUID(),
                        degree: "Bachelor of Science in Computer Science",
                        schoolName: "University of California, Berkeley",
                        startDate: "Aug 2014",
                        endDate: "May 2018"
                    }
                ],
                skills: [
                    { id: crypto.randomUUID(), name: "Languages: JavaScript, TypeScript, Go, Python" },
                    { id: crypto.randomUUID(), name: "Frontend: React, Next.js, Vue.js, Tailwind CSS" },
                    { id: crypto.randomUUID(), name: "Backend: Node.js, Express, GraphQL, PostgreSQL" },
                    { id: crypto.randomUUID(), name: "Cloud & DevOps: AWS, Docker, Kubernetes, CI/CD" },
                    { id: crypto.randomUUID(), name: "Tools: Git, Jest, Storybook, Figma" }
                ],
                certifications: [
                    { id: crypto.randomUUID(), name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "Oct 2022" },
                    { id: crypto.randomUUID(), name: "Professional Scrum Master I", issuer: "Scrum.org", date: "Jan 2021" }
                ],
                languages: [
                    { id: crypto.randomUUID(), name: "English", level: "Native" },
                    { id: crypto.randomUUID(), name: "Spanish", level: "Fluent" }
                ],
                socialLinks: [
                    { id: crypto.randomUUID(), platform: "LinkedIn", url: "linkedin.com/in/johndoe" },
                    { id: crypto.randomUUID(), platform: "GitHub", url: "github.com/johndoe" }
                ],
                projects: [
                    {
                        id: crypto.randomUUID(),
                        title: "E-commerce Performance Dashboard",
                        description: "Designed and developed a real-time analytics dashboard for monitoring e-commerce platform metrics. Built with React and D3.js, the dashboard provided interactive visualizations of sales trends, user behavior, and system health.",
                        link: "github.com/johndoe/dashboard",
                        startDate: "Mar 2023",
                        endDate: "Jun 2023",
                        technologies: ["React", "D3.js", "Node.js", "Redis"]
                    },
                    {
                        id: crypto.randomUUID(),
                        title: "Open Source UI Library",
                        description: "Created and maintain a highly customizable UI component library for React applications. The library focused on accessibility and ease of use, gaining over 500 stars on GitHub and used by multiple production projects.",
                        startDate: "Sep 2021",
                        endDate: "Present",
                        technologies: ["TypeScript", "React", "Rollup", "Storybook"]
                    }
                ],
                customSection: { id: "custom", title: "Activities", items: [] }
            };
        }

        const newResume = await Resume.create(initialData);

        // Update user count
        dbUser.resumeCount = resumeCount + 1;
        await dbUser.save();

        return NextResponse.json(newResume);

    } catch (error) {
        console.error("[RESUMES_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDatabase();

        const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });

        return NextResponse.json(resumes);
    } catch (error) {
        console.error("[RESUMES_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
