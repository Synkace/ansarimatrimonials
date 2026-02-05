import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import Image from "next/image";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { stripSensitiveData } from "@/lib/utils";
import LunarProgress from "@/components/ui/LunarProgress";
import { Lock, BadgeCheck, Phone, MessageCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ProfilePage({ params }) {
    const { id } = await params;
    await dbConnect();
    const session = await getServerSession();
    // Should extract user from session properly in real app using authOptions

    // Mock session user if needed or rely on client side logic? 
    // No, we need stripSensitiveData on server.
    // We'll assume session.user exists if logged in.

    let targetUser = null;

    if (id && id.startsWith("mock")) {
        const { MOCK_USERS } = await import("@/lib/mockData");
        targetUser = MOCK_USERS.find(u => u._id === id);
    } else {
        try {
            targetUser = await User.findById(id);
        } catch (e) {
            return notFound();
        }
    }

    if (!targetUser) return notFound();

    // Strip Data
    const safeUser = stripSensitiveData(targetUser, session?.user);

    const isUnlocked = safeUser.phone !== undefined;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Profile Section */}
            <div className="relative bg-emerald-900/50 rounded-3xl p-8 border border-gold/20 backdrop-blur-sm overflow-hidden min-h-[400px]">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left: Image (Mihrab Shape) */}
                    <div className="col-span-1 flex justify-center">
                        <div className="relative w-64 h-80 mihrab-mask overflow-hidden border-2 border-gold shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                            {safeUser.image ? (
                                <Image src={safeUser.image} alt={safeUser.name} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full bg-emerald-800 flex items-center justify-center text-gold/30">No Image</div>
                            )}
                        </div>
                    </div>

                    {/* Middle: Details */}
                    <div className="col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-serif text-gold">{safeUser.name}</h1>
                            {safeUser.isVerified && <BadgeCheck className="w-8 h-8 text-blue-400" />}
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-emerald-100/80">
                            <div>
                                <span className="block text-xs text-gold uppercase tracking-widest">Age</span>
                                <span className="text-lg">{safeUser.age || "N/A"}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-gold uppercase tracking-widest">Occupation</span>
                                <span className="text-lg">{safeUser.occupation || "N/A"}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-gold uppercase tracking-widest">Location</span>
                                <span className="text-lg">{safeUser.location || "N/A"}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-gold uppercase tracking-widest">Managed By</span>
                                <span className="text-lg">{safeUser.managedBy}</span>
                            </div>
                        </div>

                        <div>
                            <span className="block text-xs text-gold uppercase tracking-widest mb-2">Moon Phase</span>
                            <div className="flex items-center gap-4">
                                <LunarProgress percentage={safeUser.moonPhase || 0} />
                                <span className="text-sm italic text-emerald-300">New beginnings...</span>
                            </div>
                        </div>

                        <div className="bg-emerald-950/50 p-6 rounded-xl border border-emerald-800">
                            <h3 className="text-xl font-serif text-gold mb-2">About</h3>
                            <p className="text-emerald-100 leading-relaxed">
                                {safeUser.bio || "This user has not written a bio yet."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Aadhaar Blur Gate / Contact */}
                <div className="mt-8 border-t border-gold/10 pt-8">
                    <h3 className="text-2xl font-serif text-gold mb-4 flex items-center gap-2">
                        <Phone className="w-6 h-6" /> Contact Information
                    </h3>

                    {isUnlocked ? (
                        <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400 animate-pulse">
                            <p className="font-bold text-xl">{safeUser.phone}</p>
                            <p className="text-sm opacity-70">You have access to this profile.</p>
                        </div>
                    ) : (
                        <div className="relative overflow-hidden rounded-xl border border-red-900/30 bg-red-950/10 p-8 text-center group">
                            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10 flex items-center justify-center flex-col gap-4">
                                <Lock className="w-12 h-12 text-gold opacity-50" />
                                <p className="text-gold/80 font-medium">To view contact details, verify your profile or request access.</p>
                                <button className="px-6 py-2 bg-gold text-emerald-950 font-bold rounded-full hover:bg-white transition-colors shadow-lg">
                                    Request Access
                                </button>
                            </div>
                            <div className="blur-sm select-none opacity-50" aria-hidden="true">
                                <p className="text-2xl font-bold">+91 999 999 9999</p>
                                <p>Restricted Area</p>
                            </div>
                        </div>
                    )}

                    {/* Message Button - Always Visible or only if unlocked? Let's make it always visible to encourage contact */}
                    <div className="mt-6 flex justify-center">
                        <a href={`/chat?userId=${safeUser._id}`} className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg border border-emerald-500/50">
                            <MessageCircle className="w-5 h-5" />
                            Message {safeUser.name.split(" ")[0]}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
