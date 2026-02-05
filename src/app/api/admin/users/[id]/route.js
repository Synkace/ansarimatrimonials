import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function PUT(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        const body = await req.json();

        await dbConnect();

        const updatedUser = await User.findByIdAndUpdate(id, body, { new: true }).select("-password");

        if (!updatedUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

        return NextResponse.json({ success: true, user: updatedUser });

    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        await dbConnect();

        await User.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
