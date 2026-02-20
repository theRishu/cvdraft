import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/db';
import Resume from '@/models/Resume';
import User from '@/models/User';

// Fix for dynamic route Params type in Next.js 15+ (if using that, but valid for 14 too)
type Params = Promise<{ id: string }>;

export async function GET(
    req: Request,
    { params }: { params: Params } // Use Promise<Params> pattern for future-proofing
) {
    try {
        const { userId } = await auth();
        // Await params if it's a promise (Next.js 15), or just use it. 
        // In Next 14 app directory, params is not a promise by default but standard,
        // but let's handle it safely or use standard signature.
        // Standard Next.js 14 signature:
        // context: { params: { id: string } }

        const resolvedParams = await params;
        const id = resolvedParams.id;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDatabase();

        const resume = await Resume.findOne({ _id: id, userId });

        if (!resume) {
            return new NextResponse("Not Found", { status: 404 });
        }

        return NextResponse.json(resume);
    } catch (error) {
        console.error("[RESUME_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Params }
) {
    try {
        const { userId } = await auth();
        const resolvedParams = await params;
        const id = resolvedParams.id;
        const body = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDatabase();

        // Protect immutable fields
        delete body.userId;
        delete body._id;
        delete body.createdAt;

        const updatedResume = await Resume.findOneAndUpdate(
            { _id: id, userId },
            { $set: body },
            { returnDocument: 'after' }
        );

        if (!updatedResume) {
            return new NextResponse("Not Found", { status: 404 });
        }

        return NextResponse.json(updatedResume);
    } catch (error) {
        console.error("[RESUME_UPDATE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Params }
) {
    try {
        const { userId } = await auth();
        const resolvedParams = await params;
        const id = resolvedParams.id;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDatabase();

        const deletedResume = await Resume.findOneAndDelete({ _id: id, userId });

        if (!deletedResume) {
            return new NextResponse("Not Found", { status: 404 });
        }

        // Decrement user's resume count
        await User.findOneAndUpdate(
            { userId },
            { $inc: { resumeCount: -1 } }
        );

        return new NextResponse("Deleted", { status: 200 });
    } catch (error) {
        console.error("[RESUME_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
