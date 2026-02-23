import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

export async function GET(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDatabase();

        const user = await User.findOne({ userId });

        if (!user) {
            // Should be created on first login/resume create, but handle here too
            return NextResponse.json({ resumeCount: 0, isPro: false });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("[USER_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { userId } = await auth();
        const body = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDatabase();

        const user = await User.findOneAndUpdate(
            { userId },
            { $set: body },
            { new: true, upsert: true }
        );

        return NextResponse.json(user);
    } catch (error) {
        console.error("[USER_PATCH]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
