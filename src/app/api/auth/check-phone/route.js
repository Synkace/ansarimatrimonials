import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { phone } = await req.json();

        if (!phone) {
            return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
        }

        await dbConnect();

        // Check if user exists with this phone number
        const existingUser = await User.findOne({ phone });

        return NextResponse.json({ exists: !!existingUser });

    } catch (error) {
        console.error("Phone check error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
