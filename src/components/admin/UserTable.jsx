"use client";

import { useState, useEffect } from "react";
import { Loader2, Check, Ban, Search, CheckCircle, XCircle } from "lucide-react";

export default function UserTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/users?search=${search}`);
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users || []);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (userId, action) => {
        setActionLoading(userId);
        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action })
            });

            if (res.ok) {
                // Optimistic Update
                setUsers(prev => prev.map(u => {
                    if (u._id === userId) {
                        return {
                            ...u,
                            isVerified: action === 'approve' ? true : u.isVerified,
                            verificationStatus: action === 'approve' ? 'verified' : u.verificationStatus,
                            accountStatus: action === 'suspend' ? 'suspended' : u.accountStatus
                        };
                    }
                    return u;
                }));
            } else {
                alert("Action failed. Please try again.");
            }
        } catch (error) {
            console.error("Action failed", error);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif text-gold">User Management</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-emerald-900/50 border border-gold/30 rounded-lg px-4 py-2 text-white focus:border-gold outline-none"
                    />
                    <button onClick={fetchUsers} className="bg-gold text-emerald-950 px-4 py-2 rounded-lg font-bold hover:bg-white transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 text-gold animate-spin" />
                </div>
            ) : (
                <div className="bg-emerald-900/30 border border-gold/10 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-emerald-900/50 text-gold uppercase text-xs tracking-wider border-b border-gold/10">
                            <tr>
                                <th className="p-4">User</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Account Status</th>
                                <th className="p-4">Verification</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-emerald-100/50">No users found.</td>
                                </tr>
                            ) : (
                                users.map(user => (
                                    <tr key={user._id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="font-medium text-white">{user.name}</div>
                                            <div className="text-xs opacity-60 font-mono">{user.email || user.phone || "No contact"}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded text-xs border ${user.role === 'admin' ? 'border-purple-500 text-purple-300' : 'border-blue-500 text-blue-300'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded text-xs flex w-fit items-center gap-1 ${user.accountStatus === 'suspended' ? 'bg-red-900/50 text-red-300' : 'bg-green-900/50 text-green-300'}`}>
                                                {user.accountStatus === 'suspended' && <Ban className="w-3 h-3" />}
                                                {user.accountStatus}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {user.isVerified ? (
                                                <span className="text-green-400 flex items-center gap-1 text-sm"><CheckCircle className="w-4 h-4" /> Verified</span>
                                            ) : (
                                                <span className="text-yellow-500 flex items-center gap-1 text-sm"><Loader2 className="w-3 h-3" /> Pending</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            {!user.isVerified && (
                                                <button
                                                    onClick={() => handleAction(user._id, 'approve')}
                                                    disabled={actionLoading === user._id}
                                                    className="bg-green-600/80 hover:bg-green-500 text-white px-3 py-1.5 rounded text-xs disabled:opacity-50 transition-colors"
                                                    title="Approve User"
                                                >
                                                    {actionLoading === user._id ? <Loader2 className="w-4 h-4 animate-spin" /> : "Approve"}
                                                </button>
                                            )}
                                            {user.accountStatus !== 'suspended' && (
                                                <button
                                                    onClick={() => handleAction(user._id, 'suspend')}
                                                    disabled={actionLoading === user._id}
                                                    className="bg-red-600/80 hover:bg-red-500 text-white px-3 py-1.5 rounded text-xs disabled:opacity-50 transition-colors"
                                                    title="Suspend User"
                                                >
                                                    {actionLoading === user._id ? <Loader2 className="w-4 h-4 animate-spin" /> : "Suspend"}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
