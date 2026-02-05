"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ChatList from "@/components/chat/ChatList";
import ChatWindow from "@/components/chat/ChatWindow";

export default function ChatPage() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const targetUserId = searchParams.get('userId');

    const [activeConversationId, setActiveConversationId] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        if (session?.user?.id) {
            setCurrentUserId(session.user.id);
        }
    }, [session]);

    // Handle initial target from URL (e.g., coming from profile profile button)
    useEffect(() => {
        if (targetUserId && currentUserId) {
            initiateChat(targetUserId);
        }
    }, [targetUserId, currentUserId]);

    const initiateChat = async (targetId) => {
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetUserId: targetId })
            });
            const data = await res.json();
            if (data.conversation) {
                setActiveConversationId(data.conversation._id);
            }
        } catch (error) {
            console.error("Failed to start chat", error);
        }
    };

    if (!session) {
        return <div className="p-8 text-center text-white">Please login to chat.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 h-screen pt-24">
            {/* pt-24 to account for fixed navbar */}
            <div className="bg-emerald-900/50 backdrop-blur-md rounded-2xl border border-gold/20 shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[800px]">
                <ChatList
                    onSelect={(conv) => setActiveConversationId(conv._id)}
                    activeId={activeConversationId}
                    currentUserId={currentUserId}
                />
                <ChatWindow
                    conversationId={activeConversationId}
                    currentUserId={currentUserId}
                />
            </div>
        </div>
    );
}
