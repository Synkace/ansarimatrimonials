"use client";

import { useState } from "react";

import Link from "next/link";
import { Moon, User, Shield, Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full bg-emerald-950/90 backdrop-blur-sm border-b border-gold/20 text-gold shadow-lg">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold font-serif flex items-center gap-2">
                    <Moon className="w-6 h-6 fill-gold" />
                    Ansar (the helpers) Matrimonials
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/discover" className="hover:text-white transition-colors">Discover</Link>
                    <Link href="/about" className="hover:text-white transition-colors">About</Link>
                    <Link href="/stories" className="hover:text-white transition-colors">Stories</Link>

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
                            <button onClick={() => signOut({ callbackUrl: '/' })} className="text-sm hover:text-white">Logout</button>
                        </div>
                    ) : (
                        <Link href="/api/auth/signin">
                            <button className="px-4 py-1.5 border border-gold rounded-full hover:bg-gold hover:text-emerald-950 transition-all font-medium">
                                Login
                            </button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gold focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-emerald-950/95 border-b border-gold/20 backdrop-blur-md p-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2">
                    <Link
                        href="/discover"
                        className="p-2 hover:bg-gold/10 rounded-lg transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        Discover
                    </Link>
                    <Link
                        href="/about"
                        className="p-2 hover:bg-gold/10 rounded-lg transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        href="/stories"
                        className="p-2 hover:bg-gold/10 rounded-lg transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        Stories
                    </Link>

                    {session?.user?.role === 'admin' && (
                        <Link
                            href="/admin"
                            className="p-2 hover:bg-gold/10 rounded-lg transition-colors flex items-center gap-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <Shield className="w-4 h-4" /> Admin
                        </Link>
                    )}

                    {session ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="p-2 hover:bg-gold/10 rounded-lg transition-colors font-bold"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href={`/profile/${session.user.id}`}
                                className="p-2 hover:bg-gold/10 rounded-lg transition-colors flex items-center gap-2"
                                onClick={() => setIsOpen(false)}
                            >
                                <User className="w-4 h-4" /> My Profile
                            </Link>
                            <button
                                onClick={() => { signOut({ callbackUrl: '/' }); setIsOpen(false); }}
                                className="p-2 text-left hover:bg-red-500/10 text-red-300 rounded-lg transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/api/auth/signin" onClick={() => setIsOpen(false)}>
                            <button className="w-full py-3 mt-2 bg-gold text-emerald-950 font-bold rounded-lg hover:bg-white transition-all">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
