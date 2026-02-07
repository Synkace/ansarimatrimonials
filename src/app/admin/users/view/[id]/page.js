"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Check, Ban, RotateCcw, Loader2, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminUserView() {
    const params = useParams();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/admin/users/${params.id}`);
                const data = await res.json();
                if (data.user) setUser(data.user);
            } catch (error) {
                console.error("Failed to fetch user", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [params.id]);

    const handleAction = async (action) => {
        if (!confirm(`Are you sure you want to ${action} this user?`)) return;
        setActionLoading(true);
        try {
            const res = await fetch(`/api/admin/users/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action })
            });

            if (res.ok) {
                alert(`User ${action}d successfully`);
                router.push('/admin');
            } else {
                alert("Action failed");
            }
        } catch (error) {
            console.error(error);
            alert("Error");
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex text-gold items-center justify-center">Loading Profile...</div>;
    if (!user) return <div className="min-h-screen flex text-red-400 items-center justify-center">User not found</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link href="/admin" className="inline-flex items-center gap-2 text-emerald-300 hover:text-gold mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>

            <div className="bg-emerald-900/40 border border-gold/20 rounded-2xl overflow-hidden shadow-xl">
                {/* Header / Banner */}
                <div className="bg-emerald-900/60 p-6 border-b border-gold/10 flex justify-between items-start">
                    <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/30 bg-black/40 relative">
                            {user.image ? (
                                <Image src={user.image} alt={user.name} fill className="object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-emerald-600 font-bold">No IMG</div>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-serif text-gold font-bold flex items-center gap-2">
                                {user.name}
                                {user.isVerified && <Check className="w-5 h-5 text-green-500" />}
                            </h1>
                            <p className="text-emerald-200 mt-1 flex items-center gap-2">
                                {user.email} <span className="opacity-30">|</span> {user.phone}
                            </p>
                            <div className="mt-2 flex gap-2">
                                <span className={`px-2 py-0.5 rounded text-xs border ${user.role === 'admin' ? 'border-purple-500 text-purple-300' : 'border-blue-500 text-blue-300'}`}>
                                    {user.role.toUpperCase()}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-xs ${user.accountStatus === 'suspended' ? 'bg-red-900/50 text-red-300' : 'bg-green-900/50 text-green-300'}`}>
                                    {user.accountStatus.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    <div className="space-y-4">
                        <h3 className="text-gold font-bold border-b border-gold/10 pb-2 mb-4">Personal Details</h3>
                        <DetailRow label="Age" value={user.age} />
                        <DetailRow label="Gender" value={user.gender} />
                        <DetailRow label="Height" value={user.height} />
                        <DetailRow label="Marital Status" value={user.maritalStatus} />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-gold font-bold border-b border-gold/10 pb-2 mb-4">Professional & Religious</h3>
                        <DetailRow label="Education" value={user.education} />
                        <DetailRow label="Profession" value={user.occupation} />
                        <DetailRow label="Maslak" value={user.maslak} />
                        <DetailRow label="Caste" value={user.caste} />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <h3 className="text-gold font-bold border-b border-gold/10 pb-2 mb-4">Location & Bio</h3>
                        <DetailRow label="City" value={user.city} />
                        <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                            <span className="text-emerald-400 block text-xs mb-1 uppercase tracking-wider">Bio</span>
                            <p className="text-emerald-100 italic leading-relaxed">{user.bio || "No bio provided."}</p>
                        </div>
                    </div>

                    {/* Partner Prefs */}
                    {user.partnerPreferences && (
                        <div className="md:col-span-2 space-y-4">
                            <h3 className="text-gold font-bold border-b border-gold/10 pb-2 mb-4">Partner Preferences</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <DetailRow label="Age Range" value={`${user.partnerPreferences.minAge} - ${user.partnerPreferences.maxAge}`} />
                                <DetailRow label="Height Range" value={`${user.partnerPreferences.minHeight} - ${user.partnerPreferences.maxHeight}`} />
                                <DetailRow label="Education" value={user.partnerPreferences.education?.join(", ")} />
                                <DetailRow label="Marital Status" value={user.partnerPreferences.maritalStatus?.join(", ")} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Bar */}
                <div className="bg-emerald-950/80 p-6 border-t border-gold/20 flex gap-4 justify-end">
                    {/* Approve Button */}
                    <button
                        onClick={() => handleAction('approve')}
                        disabled={actionLoading || user.isVerified || user.accountStatus === 'suspended'}
                        className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:grayscale text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all"
                    >
                        {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        Approve Profile
                    </button>

                    {/* Suspend Button */}
                    {user.accountStatus !== 'suspended' && (
                        <button
                            onClick={() => handleAction('suspend')}
                            disabled={actionLoading}
                            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all"
                        >
                            {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Ban className="w-4 h-4" />}
                            Suspend
                        </button>
                    )}

                    {/* Reactivate Button */}
                    {user.accountStatus === 'suspended' && (
                        <button
                            onClick={() => handleAction('reactivate')}
                            disabled={actionLoading}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all"
                        >
                            {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
                            Reactivate
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function DetailRow({ label, value }) {
    return (
        <div className="flex justify-between border-b border-white/5 pb-1">
            <span className="text-emerald-400/70">{label}</span>
            <span className="text-emerald-50 text-right font-medium">{value || "N/A"}</span>
        </div>
    );
}
