import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/db";
import Resume from "@/models/Resume";
import ResumeEditor from "@/components/resume/ResumeEditor";

import User from "@/models/User";

type Params = Promise<{ id: string }>;

export default async function EditResumePage({ params }: { params: Params }) {
    const { userId } = await auth();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!userId) {
        redirect("/");
    }

    await connectToDatabase();

    // Fetch resume as plain object
    const resume = await Resume.findOne({ _id: id, userId }).lean();

    if (!resume) {
        redirect("/dashboard");
    }

    // Convert to serializable object
    const serializedResume = JSON.parse(JSON.stringify(resume));

    return <ResumeEditor resume={serializedResume} userId={userId} />;
}
