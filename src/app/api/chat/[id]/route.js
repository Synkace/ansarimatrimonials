import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Conversation from "@/models/Conversation";
import Message from "@/models/Message";

// GET: Fetch messages for a conversation
export async function GET(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = params; // Conversation ID

        await dbConnect();

        // Verify membership
        const conversation = await Conversation.findById(id);
        if (!conversation) return NextResponse.json({ error: "Not Found" }, { status: 404 });

        if (!conversation.members.some(m => m.toString() === session.user.id)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const messages = await Message.find({ conversationId: id })
            .sort({ createdAt: 1 })
            .populate("sender", "name image");

        return NextResponse.json({ messages });

    } catch (error) {
        console.error("Fetch Messages Error:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

// POST: Send a message
export async function POST(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = params; // Conversation ID
        const { content } = await req.json();

        if (!content) return NextResponse.json({ error: "Content required" }, { status: 400 });

        await dbConnect();

        const conversation = await Conversation.findById(id);
        if (!conversation) return NextResponse.json({ error: "Not Found" }, { status: 404 });

        // Create Message
        const newMessage = await Message.create({
            conversationId: id,
            sender: session.user.id,
            content
        });

        // Update Conversation
        conversation.lastMessage = content;
        conversation.lastMessageAt = new Date();
        // Increment unread for others? Simplified for now
        await conversation.save();

        return NextResponse.json({ success: true, message: newMessage });

    } catch (error) {
        console.error("Send Message Error:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
