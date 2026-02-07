import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        const { action } = data; // 'approve' or 'suspend'

        await dbConnect();

        let updateData = {};

        if (action === 'approve') {
            updateData = {
                isVerified: true,
                verificationStatus: 'verified'
            };
        } else if (action === 'suspend') {
            updateData = {
                accountStatus: 'suspended'
            };
        } else {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).select("-password -aadhaarNumber -aadhaarImage");

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user: updatedUser });

    } catch (error) {
        console.error("Admin User Update Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
