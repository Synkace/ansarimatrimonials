import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();

        await dbConnect();

        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
            session.user.id,
            {
                ...data,
                ...data,
                isProfileComplete: true,
            },
            { new: true }
        );

        return NextResponse.json({ success: true, user: updatedUser });

    } catch (error) {
        console.error("Onboarding Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
