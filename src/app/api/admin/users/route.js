import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || "";
        const role = searchParams.get('role'); // user, agent, admin
        const status = searchParams.get('status'); // verification status

        await dbConnect();

        let query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ];
        }
        if (role) query.role = role;
        if (role) query.role = role;

        if (status === 'pending') {
            query.isProfileComplete = true;
            query.isVerified = false;
        } else if (status) {
            query.verificationStatus = status;
        }

        // Photo Status Filter
        const photoStatus = searchParams.get('photoStatus');
        if (photoStatus === 'pending') {
            // Users with an image that is NOT verified yet
            query.image = { $exists: true, $ne: null };
            query.isImageVerified = false;
        }

        const users = await User.find(query).select("-password").sort({ createdAt: -1 }).lean();

        return NextResponse.json({ users });

    } catch (error) {
        console.error("Admin Users API Error:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

// Optional: Create User manually
export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        await dbConnect();

        // Basic validation and creation logic
        const newUser = await User.create(data);
        return NextResponse.json({ user: newUser });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
