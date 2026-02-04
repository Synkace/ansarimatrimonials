"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, BadgeCheck } from "lucide-react";
import Link from "next/link";
import LunarProgress from "./LunarProgress";

export default function MihrabCard({ user, isUnlocked }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-sm mx-auto bg-gradient-to-b from-emerald-900 to-emerald-950 border border-gold/30 rounded-b-xl overflow-hidden shadow-2xl"
        >
            {/* Mihrab Arch Header */}
            <div className="relative h-64 w-full bg-emerald-800 mihrab-mask overflow-hidden border-b-4 border-gold">
                {user.image ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={user.image}
                            alt={user.name}
                            fill
                            className="object-cover"
                        />
                        {/* Apply blur if not unlocked */}
                        {!isUnlocked && (
                            <div className="absolute inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center">
                                <Lock className="w-12 h-12 text-gold opacity-80" />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-emerald-700 text-gold/20">
                        No Image
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                    <h2 className="text-2xl font-serif text-gold">{user.name}</h2>
                    {user.isVerified && <BadgeCheck className="w-5 h-5 text-blue-400" />}
                </div>

                <p className="text-emerald-200 text-sm italic">{user.bio || "Searching for the one..."}</p>

                <div className="flex justify-center gap-4 text-xs text-emerald-100/60">
                    <span>{user.age || "24"} yrs</span>
                    <span>•</span>
                    <span>{user.occupation || "Professional"}</span>
                    <span>•</span>
                    <span>{user.location || "India"}</span>
                </div>

                {/* Lunar Progress */}
                <div className="flex justify-center py-2">
                    <LunarProgress percentage={user.moonPhase || 0} />
                </div>

                {/* Action Button */}
                <Link href={`/profile/${user._id}`}>
                    <button className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-yellow-800 text-white font-bold rounded-full shadow-lg hover:shadow-gold/50 transition-all active:scale-95 w-full border border-gold/50">
                        View Profile
                    </button>
                </Link>
            </div>
        </motion.div>
    );
}
