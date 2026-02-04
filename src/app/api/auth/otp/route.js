import { NextResponse } from "next/server";

export async function POST(request) {
    const { phone } = await request.json();

    // Simulate sending OTP
    const otp = "123456";
    console.log(`[OTP SIMULATION] Sending OTP ${otp} to ${phone}`);

    return NextResponse.json({ success: true, message: "OTP sent (check console)" });
}
