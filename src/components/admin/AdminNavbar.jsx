"use client";

import Link from "next/link";
import { Shield, LogOut, Users } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminNavbar() {
    return (
        <nav className="bg-emerald-950 border-b border-gold/20 text-gold shadow-md">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 fill-gold/20" />
                    <span className="text-xl font-bold font-serif tracking-wide">Ansari Admin</span>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/admin" className="flex items-center gap-2 hover:text-white transition-colors text-sm font-medium">
                        <Users className="w-4 h-4" /> User Management
                    </Link>

                    <button
                        onClick={() => signOut({ callbackUrl: '/admin/login' })}
                        className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-900/10"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
