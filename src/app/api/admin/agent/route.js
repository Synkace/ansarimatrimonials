import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
    // Add Admin check
    try {
        const { name, email, password } = await request.json();
        await dbConnect();

        // Basic check if exists
        const exists = await User.findOne({ email });
        if (exists) return NextResponse.json({ error: "User exists" }, { status: 400 });

        await User.create({
            name,
            email,
            password, // Note: In real app, hash this!
            role: 'agent',
            isVerified: true
        });

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
