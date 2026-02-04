"use client";

import Link from "next/link";
import { Moon, User, Shield } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="sticky top-0 z-50 w-full bg-emerald-950/90 backdrop-blur-sm border-b border-gold/20 text-gold shadow-lg">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold font-serif flex items-center gap-2">
                    <Moon className="w-6 h-6 fill-gold" />
                    Ansari Matrimonials
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/discover" className="hover:text-white transition-colors">Discover</Link>
                    <Link href="/about" className="hover:text-white transition-colors hidden md:block">About</Link>
                    <Link href="/stories" className="hover:text-white transition-colors hidden md:block">Stories</Link>

                    {session?.user?.role === 'admin' && (
                        <Link href="/admin" className="flex items-center gap-1 hover:text-white transition-colors">
                            <Shield className="w-4 h-4" /> Admin
                        </Link>
                    )}

                    {session ? (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="hover:text-white transition-colors font-medium">Dashboard</Link>
                            <Link href={`/profile/${session.user.id}`}>
                                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center border border-gold">
                                    <User className="w-4 h-4" />
                                </div>
                            </Link>
                            <button onClick={() => signOut()} className="text-sm hover:text-white">Logout</button>
                        </div>
                    ) : (
                        <Link href="/api/auth/signin">
                            <button className="px-4 py-1.5 border border-gold rounded-full hover:bg-gold hover:text-emerald-950 transition-all font-medium">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
