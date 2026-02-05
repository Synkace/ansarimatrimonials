"use client";

import Link from "next/link";
import { Moon, Heart, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-emerald-950 border-t border-gold/20 text-emerald-100/70 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 text-gold font-serif text-2xl font-bold">
                            <Moon className="w-6 h-6 fill-gold" />
                            Ansari Matrimonials
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Halal matchmaking with privacy at its core. Verified profiles, lunar compatibility, and the blessings of tradition.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="hover:text-gold transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-gold transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-gold transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-gold transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-gold font-bold mb-4 uppercase tracking-widest text-sm">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/discover" className="hover:text-white transition-colors">Discover Matches</Link></li>
                            <li><Link href="/stories" className="hover:text-white transition-colors">Success Stories</Link></li>
                            <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-gold font-bold mb-4 uppercase tracking-widest text-sm">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/report" className="hover:text-white transition-colors">Report Misuse</Link></li>
                            <li><Link href="/referral" className="hover:text-white transition-colors">Referral Program</Link></li>
                        </ul>
                    </div>

                    {/* Legal & Agent */}
                    <div>
                        <h3 className="text-gold font-bold mb-4 uppercase tracking-widest text-sm">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="/agent/login" className="hover:text-white transition-colors">Agent Portal</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-center md:text-left gap-4">
                    <p>&copy; {new Date().getFullYear()} Ansari Matrimonials. All rights reserved.</p>
                    <div className="flex items-center gap-1 justify-center">
                        <span className="text-gold/60">Made with</span>
                        <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                        <span className="text-gold/60">by <a href="https://synkace.com" target="_blank" className="hover:text-gold underline">Synkace</a></span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
