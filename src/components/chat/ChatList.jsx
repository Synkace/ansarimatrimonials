"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";

export default function ChatList({ onSelect, activeId, currentUserId }) {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const res = await fetch('/api/chat');
            const data = await res.json();
            if (data.conversations) {
                setConversations(data.conversations);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Helper to get partner (not self) - simplistic assumption: API returns populated members, we need to filter out 'self'
    // But wait, client doesn't know 'self' id easily without session context. 
    // Easier: API should format the 'displayUser' for the list? 
    // Or we pass session to this component.
    // For now, let's assume the first member that is NOT me is the partner. 
    // Actually, passing currentUserId prop is cleaner.

    return (
        <div className="w-full md:w-1/3 bg-emerald-950/50 border-r border-gold/20 flex flex-col h-[80vh]">
            <div className="p-4 border-b border-gold/20">
                <h2 className="text-xl font-serif text-gold font-bold">Messages</h2>
            </div>

            <div className="overflow-y-auto flex-1">
                {loading ? (
                    <div className="p-4 text-center text-emerald-400">Loading...</div>
                ) : conversations.length === 0 ? (
                    <div className="p-4 text-center text-emerald-400 opacity-50">No conversations yet.</div>
                ) : (
                    conversations.map(conv => (
                        <ConversationItem
                            key={conv._id}
                            conversation={conv}
                            isActive={activeId === conv._id}
                            onClick={() => onSelect(conv)}
                            currentUserId={currentUserId}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

function ConversationItem({ conversation, isActive, onClick, currentUserId }) {
    const partner = conversation.members.find(m => m._id !== currentUserId) || conversation.members[0];

    return (
        <div
            onClick={onClick}
            className={`p-4 border-b border-gold/10 cursor-pointer hover:bg-gold/10 transition-colors ${isActive ? 'bg-gold/20' : ''}`}
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-800 border-gold/30 flex items-center justify-center overflow-hidden relative">
                    {partner?.image ? (
                        <Image src={partner.image} alt={partner.name} fill className="object-cover" />
                    ) : (
                        <User className="w-5 h-5 text-gold" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-emerald-100 truncate">{partner?.name || "Unknown User"}</h4>
                    <p className="text-xs text-emerald-400 truncate">{conversation.lastMessage || "Started chat"}</p>
                </div>
                <div className="text-xs text-emerald-500 whitespace-nowrap">
                    {new Date(conversation.lastMessageAt).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
}
