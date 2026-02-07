import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
    try {
        await dbConnect();
        const email = "admin@ansarimatrimonials.com";
        const password = "AdminSecurePassword2024!";

        let user = await User.findOne({ email });
        let action = "created";

        if (user) {
            user.role = 'admin';
            user.isVerified = true;
            user.verificationStatus = 'verified';
            user.isProfileComplete = true;
            user.password = password;
            await user.save();
            action = "updated";
        } else {
            user = await User.create({
                name: "Super Admin",
                email,
                password,
                role: 'admin',
                isVerified: true,
                verificationStatus: 'verified',
                isProfileComplete: true,
                phone: "0000000000"
            });
        }

        return NextResponse.json({
            success: true,
            action,
            user: { email: user.email, role: user.role }
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
