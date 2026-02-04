import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Story from "@/models/Story";
import Faq from "@/models/Faq";
import Blog from "@/models/Blog";

export async function POST(request) {
    // Check Admin Session
    const session = await getServerSession();
    // if (!session || session.user.role !== 'admin') {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    try {
        const { type, action, data, id } = await request.json();
        await dbConnect();

        let Model;
        switch (type) {
            case 'story': Model = Story; break;
            case 'faq': Model = Faq; break;
            case 'blog': Model = Blog; break;
            default: return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        if (action === 'create') {
            const newItem = await Model.create(data);
            return NextResponse.json({ success: true, item: newItem });
        }
        else if (action === 'delete') {
            await Model.findByIdAndDelete(id);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    await dbConnect();

    try {
        let data;
        switch (type) {
            case 'story': data = await Story.find({}).sort({ createdAt: -1 }); break;
            case 'faq': data = await Faq.find({}).sort({ createdAt: -1 }); break;
            case 'blog': data = await Blog.find({}).sort({ createdAt: -1 }); break;
            default: return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }
        return NextResponse.json({ data });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
