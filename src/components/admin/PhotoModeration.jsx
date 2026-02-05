"use client";

import { useEffect, useState } from "react";
import { Check, X, Eye, EyeOff, User } from "lucide-react";
import Image from "next/image";

export default function PhotoModeration() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        setLoading(true);
        try {
            // Fetch users who have an image but it's NOT verified yet
            // Assuming API supports ?photoStatus=pending
            const res = await fetch('/api/admin/users?photoStatus=pending');
            const data = await res.json();
            if (data.users) setUsers(data.users);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, action) => {
        // action: 'approve' | 'reject' | 'blur'
        if (!confirm(`Confirm action: ${action}?`)) return;

        try {
            let updates = {};
            if (action === 'approve') updates = { isImageVerified: true };
            if (action === 'blur') updates = { isImageBlurred: true, isImageVerified: true }; // Approved but blurred? Or just blurred.
            if (action === 'reject') updates = { image: null, isImageVerified: false }; // Remove photo

            const res = await fetch(`/api/admin/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });

            if (res.ok) {
                setUsers(users.filter(u => u._id !== id));
            } else {
                alert("Action failed");
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="text-emerald-400 p-8 text-center">Loading photos...</div>;

    if (users.length === 0) return (
        <div className="text-center p-12 bg-emerald-900/20 rounded-xl border border-gold/10">
            <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl text-gold font-serif">All Photos Reviewed!</h3>
            <p className="text-emerald-300 opacity-60">No pending photos found.</p>
        </div>
    );

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map(user => (
                <div key={user._id} className="bg-emerald-900/40 border border-gold/20 rounded-xl overflow-hidden group">
                    <div className="aspect-square relative bg-black/50">
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name}
                                fill
                                className={`object-cover transition-all ${user.isImageBlurred ? 'blur-md' : ''}`}
                            />
                        ) : (
                            <div className="h-full flex items-center justify-center text-emerald-600"><User className="w-10 h-10" /></div>
                        )}

                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                            <button
                                onClick={() => handleAction(user._id, 'approve')}
                                className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-full w-full flex items-center justify-center gap-2 font-bold text-sm"
                            >
                                <Check className="w-4 h-4" /> Approve
                            </button>
                            <button
                                onClick={() => handleAction(user._id, 'blur')}
                                className="bg-yellow-600 hover:bg-yellow-500 text-white p-2 rounded-full w-full flex items-center justify-center gap-2 font-bold text-sm"
                            >
                                <EyeOff className="w-4 h-4" /> Blur
                            </button>
                            <button
                                onClick={() => handleAction(user._id, 'reject')}
                                className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-full w-full flex items-center justify-center gap-2 font-bold text-sm"
                            >
                                <X className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    </div>
                    <div className="p-3 text-center">
                        <p className="font-bold text-gold truncate">{user.name}</p>
                        <p className="text-xs text-emerald-400">Uploaded {new Date(user.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
