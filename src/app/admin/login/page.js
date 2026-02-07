"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Shield, Loader2, AlertCircle } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid admin credentials");
                setLoading(false);
            } else {
                // Successful login
                router.push("/admin");
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-emerald-950 p-4">
            <div className="w-full max-w-md bg-emerald-900/50 backdrop-blur-xl border border-gold/20 rounded-2xl p-8 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4 border border-gold/30">
                        <Shield className="w-8 h-8 text-gold" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-gold">Admin Portal</h1>
                    <p className="text-emerald-100/50 text-sm mt-2">Authorized Personnel Only</p>
                </div>

                {error && (
                    <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-3 mb-6 flex items-center gap-3 text-red-200 text-sm">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-emerald-100/70 mb-1.5 font-medium">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-emerald-950/50 border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-white/20"
                            placeholder="admin@ansarimatrimonials.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-emerald-100/70 mb-1.5 font-medium">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-emerald-950/50 border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-white/20"
                            placeholder="••••••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-linear-to-r from-gold to-amber-500 text-emerald-950 font-bold py-3.5 rounded-lg hover:shadow-lg hover:shadow-gold/20 transition-all disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" /> Authenticating...
                            </>
                        ) : (
                            "Access Dashboard"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
