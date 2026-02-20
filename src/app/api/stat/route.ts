import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/models/User';
import Resume from '@/models/Resume';
import connectToDatabase from '@/lib/db';

export async function GET() {
    try {
        await connectToDatabase();

        const userCount = await User.countDocuments();
        const resumeCount = await Resume.countDocuments();

        return NextResponse.json({
            users: userCount,
            resumes: resumeCount,
            success: true
        });
    } catch (error) {
        console.error("Stats fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch stats", success: false }, { status: 500 });
    }
}
