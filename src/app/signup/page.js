"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Moon } from "lucide-react";

export default function SignupPage() {
    const [formData, setFormData] = useState({ name: "", phone: "", gender: "male" });
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        // For now, redirect to login to use OTP flow
        // In real app: Create user -> Verify OTP
        router.push(`/login?phone=${formData.phone}`);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-emerald-950 p-4">
            <div className="w-full max-w-md space-y-8 bg-emerald-900/50 p-8 rounded-2xl border border-gold/30 backdrop-blur-md shadow-2xl">
                <div className="text-center">
                    <Moon className="mx-auto h-12 w-12 text-gold" />
                    <h2 className="mt-6 text-3xl font-bold font-serif text-gold">Join Ansar (the helpers)</h2>
                    <p className="mt-2 text-sm text-emerald-200">Begin your journey to a blessed union</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                    {error && <div className="text-red-400 text-sm text-center">{error}</div>}
                    <div className="space-y-4">
                        <input
                            type="text"
                            required
                            className="w-full rounded-md border border-gold/30 bg-emerald-950/50 px-3 py-3 text-white placeholder-emerald-400 focus:border-gold focus:outline-none"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <input
                            type="tel"
                            required
                            className="w-full rounded-md border border-gold/30 bg-emerald-950/50 px-3 py-3 text-white placeholder-emerald-400 focus:border-gold focus:outline-none"
                            placeholder="Mobile Number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        <select
                            className="w-full rounded-md border border-gold/30 bg-emerald-950/50 px-3 py-3 text-white focus:border-gold focus:outline-none"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        >
                            <option value="male">Groom seeking Bride</option>
                            <option value="female">Bride seeking Groom</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-gold py-2 px-4 rounded-md text-emerald-950 font-bold hover:bg-white transition-colors">
                        Continue
                    </button>
                </form>

                <div className="text-center text-sm">
                    <span className="text-emerald-300">Already a member? </span>
                    <Link href="/login" className="font-medium text-gold hover:text-white">Login</Link>
                </div>
            </div>
        </div>
    );
}
