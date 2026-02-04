import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Report from "@/models/Report";

export async function POST(request) {
    try {
        const body = await request.json();
        await dbConnect();

        await Report.create({
            type: body.type,
            target: body.target,
            details: body.details,
            // submittedBy: session?.user?.id 
        });

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
