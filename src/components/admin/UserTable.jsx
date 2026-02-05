"use client";

import { useEffect, useState } from "react";
import { Search, MoreVertical, Shield, Ban, Trash, CheckCircle } from "lucide-react";

export default function UserTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, [search]); // Debounce in real app

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const query = search ? `?search=${search}` : '';
            const res = await fetch(`/api/admin/users${query}`);
            const data = await res.json();
            if (data.users) setUsers(data.users);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, action) => {
        if (!confirm(`Are you sure you want to ${action} this user?`)) return;

        try {
            let res;
            if (action === 'delete') {
                res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
            } else {
                let updates = {};
                if (action === 'verify') updates = { isVerified: true, verificationStatus: 'verified' };
                if (action === 'ban') updates = { accountStatus: 'banned' };
                if (action === 'activate') updates = { accountStatus: 'active' };

                res = await fetch(`/api/admin/users/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates)
                });
            }

            if (res.ok) {
                fetchUsers(); // Refresh
            } else {
                alert("Action failed");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl text-gold font-serif">User Management</h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="bg-emerald-900/50 border border-gold/20 rounded-full px-4 py-2 pl-10 text-white focus:outline-none focus:border-gold"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-emerald-400" />
                </div>
            </div>

            <div className="bg-emerald-900/30 rounded-xl border border-gold/10 overflow-hidden">
                <table className="w-full text-left text-sm text-emerald-100">
                    <thead className="bg-emerald-950 text-gold uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Name / ID</th>
                            <th className="p-4">Contact</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gold/10">
                        {loading ? (
                            <tr><td colSpan="4" className="p-8 text-center">Loading...</td></tr>
                        ) : users.length === 0 ? (
                            <tr><td colSpan="4" className="p-8 text-center">No users found.</td></tr>
                        ) : (
                            users.map(user => (
                                <tr key={user._id} className="hover:bg-gold/5 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold">{user.name}</div>
                                        <div className="text-xs opacity-50 font-mono">{user._id}</div>
                                    </td>
                                    <td className="p-4">
                                        <div>{user.phone}</div>
                                        <div className="text-xs opacity-70">{user.email || "No Email"}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            {user.isVerified && <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-xs">Verified</span>}
                                            <span className={`px-2 py-0.5 rounded text-xs ${user.accountStatus === 'banned' ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                                                {user.accountStatus || 'active'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            {!user.isVerified && (
                                                <button onClick={() => handleAction(user._id, 'verify')} title="Verify" className="p-1 hover:bg-green-500/20 rounded text-green-400">
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                            {user.accountStatus === 'banned' ? (
                                                <button onClick={() => handleAction(user._id, 'activate')} title="Activate" className="p-1 hover:bg-green-500/20 rounded text-green-400">
                                                    <Shield className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <button onClick={() => handleAction(user._id, 'ban')} title="Ban" className="p-1 hover:bg-red-500/20 rounded text-red-400">
                                                    <Ban className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button onClick={() => handleAction(user._id, 'delete')} title="Delete" className="p-1 hover:bg-red-500/20 rounded text-red-400">
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
