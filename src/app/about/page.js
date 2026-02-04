import Link from "next/link";
import { Moon, Heart, Shield } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
            <Moon className="w-20 h-20 text-gold mx-auto mb-8" />
            <h1 className="text-5xl font-serif text-gold mb-6">About Ansari Matrimonials</h1>

            <div className="space-y-8 text-emerald-100/90 text-lg leading-relaxed">
                <p>
                    Ansari Matrimonials was founded with a singular vision: to bring the sacred tradition of matchmaking into the digital age without compromising on our values.
                    We understand that finding a life partner is not just about swiping right; it's about compatibility, family, and deen.
                </p>
                <p>
                    Our platform uses advanced "Lunar Compatibility" metrics while maintaining strict privacy and "Halal" interaction protocols.
                    We are more than just an app; we are a community dedicated to building strong, lasting families.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
                <div className="p-6 bg-emerald-900/40 rounded-xl border border-gold/20">
                    <Shield className="w-10 h-10 text-gold mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Safety First</h3>
                    <p className="text-sm opacity-80">Rigorous verification for every profile.</p>
                </div>
                <div className="p-6 bg-emerald-900/40 rounded-xl border border-gold/20">
                    <Heart className="w-10 h-10 text-gold mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Heart & Soul</h3>
                    <p className="text-sm opacity-80">Connecting hearts with pure intentions.</p>
                </div>
                <div className="p-6 bg-emerald-900/40 rounded-xl border border-gold/20">
                    <Moon className="w-10 h-10 text-gold mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Tradition</h3>
                    <p className="text-sm opacity-80">Modern tools, timeless values.</p>
                </div>
            </div>
        </div>
    );
}
