"use client";

import { useEffect, useState, useRef } from "react";
import { Send, User } from "lucide-react";

export default function ChatWindow({ conversationId, currentUserId }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (conversationId) {
            fetchMessages();
            // Polling for new messages every 5 seconds
            const interval = setInterval(fetchMessages, 5000);
            return () => clearInterval(interval);
        }
    }, [conversationId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchMessages = async () => {
        try {
            const res = await fetch(`/api/chat/${conversationId}`);
            const data = await res.json();
            if (data.messages) {
                setMessages(data.messages);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const originalInput = input;
        setInput(""); // Optimistic clear

        try {
            const res = await fetch(`/api/chat/${conversationId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: originalInput })
            });

            if (res.ok) {
                fetchMessages(); // Refresh immediately
            } else {
                setInput(originalInput); // Revert on fail
            }
        } catch (error) {
            console.error(error);
            setInput(originalInput);
        }
    };

    if (!conversationId) {
        return (
            <div className="flex-1 flex items-center justify-center bg-emerald-900/20 text-emerald-400">
                Select a conversation to start chatting
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-emerald-950/30 h-[80vh]">
            {/* Header (Optional, could show Partner Name) */}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => {
                    const isMe = msg.sender?._id === currentUserId || msg.sender === currentUserId;
                    return (
                        <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] p-3 rounded-xl ${isMe ? 'bg-gold text-emerald-950 rounded-br-none' : 'bg-emerald-800 text-white rounded-bl-none'}`}>
                                <p>{msg.content}</p>
                                <span className="text-[10px] opacity-70 block text-right mt-1">
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-emerald-900/50 border-t border-gold/10 flex gap-2">
                <input
                    type="text"
                    className="flex-1 bg-emerald-950 border border-gold/30 rounded-full px-4 py-2 text-white focus:outline-none focus:border-gold"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" className="p-2 bg-gold rounded-full text-emerald-950 hover:bg-white transition-colors">
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
}
