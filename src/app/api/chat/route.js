import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Conversation from "@/models/Conversation";
import Message from "@/models/Message";
import User from "@/models/User";

// GET: List all conversations for the current user
export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await dbConnect();

        // Find conversations where user is a member
        const conversations = await Conversation.find({
            members: { $in: [session.user.id] }
        })
            .populate("members", "name image") // Populate member details
            .sort({ lastMessageAt: -1 });

        return NextResponse.json({ conversations });
    } catch (error) {
        console.error("Chat List Error:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

// POST: Start a new conversation
export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { targetUserId } = await req.json();
        if (!targetUserId) return NextResponse.json({ error: "Target User ID required" }, { status: 400 });

        await dbConnect();

        // Check if conversation already exists
        const existingConv = await Conversation.findOne({
            members: { $all: [session.user.id, targetUserId] }
        });

        if (existingConv) {
            return NextResponse.json({ conversation: existingConv });
        }

        // Create new conversation
        const newConv = await Conversation.create({
            members: [session.user.id, targetUserId],
            lastMessage: "Started a conversation",
            lastMessageAt: new Date(),
            unreadCount: { [targetUserId]: 1 } // Simulating unread
        });

        // Fetch populated version to return
        // const populatedConv = await Conversation.findById(newConv._id).populate("members", "name image");

        return NextResponse.json({ conversation: newConv });

    } catch (error) {
        console.error("Start Chat Error:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
