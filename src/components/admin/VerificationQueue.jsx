"use client";

import { useEffect, useState } from "react";
import { Check, X, User, FileText } from "lucide-react";
import Image from "next/image";

export default function VerificationQueue() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const fetchPendingUsers = async () => {
        setLoading(true);
        try {
            // Fetch users with verificationStatus='pending' (or unverified but complete)
            // For now, simplify to fetch all and filter client side or use specific query if API supports
            // Let's assume API supports ?status=pending
            const res = await fetch('/api/admin/users?status=pending');
            const data = await res.json();
            if (data.users) setUsers(data.users);

            // Fallback if API filter isn't strict: filter client side
            // setUsers(data.users.filter(u => !u.isVerified && u.isProfileComplete));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDecision = async (id, decision) => {
        // decision: 'approve' | 'reject'
        if (!confirm(`Are you sure you want to ${decision} this profile?`)) return;

        try {
            const updates = decision === 'approve'
                ? { isVerified: true, verificationStatus: 'verified' }
                : { verificationStatus: 'rejected' }; // Maybe add rejectionReason

            const res = await fetch(`/api/admin/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });

            if (res.ok) {
                // Remove from list
                setUsers(users.filter(u => u._id !== id));
            } else {
                alert("Action failed");
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="text-emerald-400 p-8 text-center">Loading pending verifications...</div>;

    if (users.length === 0) return (
        <div className="text-center p-12 bg-emerald-900/20 rounded-xl border border-gold/10">
            <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl text-gold font-serif">All Caught Up!</h3>
            <p className="text-emerald-300 opacity-60">No pending profiles to verify.</p>
        </div>
    );

    return (
        <div className="grid gap-6">
            {users.map(user => (
                <div key={user._id} className="bg-emerald-900/40 border border-gold/20 rounded-xl p-6 flex flex-col md:flex-row gap-6">
                    {/* ID / Photo Section */}
                    <div className="w-full md:w-1/4">
                        <div className="aspect-[3/4] relative bg-black/30 rounded-lg overflow-hidden border border-gold/10">
                            {user.image ? (
                                <Image src={user.image} alt={user.name} fill className="object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-emerald-600"><User className="w-12 h-12" /></div>
                            )}
                        </div>
                        <div className="mt-2 text-center text-xs text-emerald-400">Profile Photo</div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl text-gold font-serif">{user.name}</h3>
                                <p className="text-emerald-300 text-sm">Submitted on {new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                            <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                {user.verificationStatus || 'Pending'}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-emerald-100/80 bg-black/20 p-4 rounded-lg">
                            <div><span className="text-gold opacity-70 block text-xs">Phone</span> {user.phone}</div>
                            <div><span className="text-gold opacity-70 block text-xs">Email</span> {user.email || "N/A"}</div>
                            <div><span className="text-gold opacity-70 block text-xs">Age</span> {user.age}</div>
                            <div><span className="text-gold opacity-70 block text-xs">Occupation</span> {user.occupation}</div>
                            <div className="col-span-2"><span className="text-gold opacity-70 block text-xs">Bio</span> <p className="italic">{user.bio}</p></div>
                        </div>

                        {/* Aadhaar / ID Placeholder */}
                        <div className="flex items-center gap-2 p-3 border border-dashed border-gold/30 rounded-lg bg-gold/5">
                            <FileText className="w-5 h-5 text-gold" />
                            <span className="text-emerald-200 text-sm">ID Proof (Aadhaar/Passport) - Not Uploaded</span>
                            {/* In real app, check user.aadhaarImage */}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-2">
                            <button
                                onClick={() => handleDecision(user._id, 'approve')}
                                className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
                            >
                                <Check className="w-5 h-5" /> Approve Profile
                            </button>
                            <button
                                onClick={() => handleDecision(user._id, 'reject')}
                                className="flex-1 bg-red-900/50 hover:bg-red-900 border border-red-500/30 text-red-200 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
                            >
                                <X className="w-5 h-5" /> Reject
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
