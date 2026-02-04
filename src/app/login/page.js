"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Moon, Smartphone } from "lucide-react";

export default function LoginPage() {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (phone.length < 10) return setError("Invalid phone number"); // Basic check

        const res = await fetch('/api/auth/otp', {
            method: 'POST',
            body: JSON.stringify({ phone })
        });

        if (res.ok) {
            setOtpSent(true);
            setError(null);
            alert("OTP Sent: 123456"); // Mock user feedback
        } else {
            setError("Failed to send OTP");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            phone,
            otp,
            isOtp: true // Flag to tell backend this is OTP login
        });

        if (result.error) {
            setError("Invalid OTP or Phone");
        } else {
            router.push("/dashboard");
            router.refresh();
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-emerald-950 p-4">
            <div className="w-full max-w-md space-y-8 bg-emerald-900/50 p-8 rounded-2xl border border-gold/30 backdrop-blur-md shadow-2xl">
                <div className="text-center">
                    <Moon className="mx-auto h-12 w-12 text-gold" />
                    <h2 className="mt-6 text-3xl font-bold font-serif text-gold">Welcome</h2>
                    <p className="mt-2 text-sm text-emerald-200">Login with Mobile Number</p>
                </div>

                {!otpSent ? (
                    <form className="mt-8 space-y-6" onSubmit={handleSendOtp}>
                        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
                        <div>
                            <div className="relative">
                                <Smartphone className="absolute left-3 top-3 text-gold w-5 h-5" />
                                <input
                                    type="tel"
                                    required
                                    className="w-full pl-10 rounded-md border border-gold/30 bg-emerald-950/50 px-3 py-3 text-white placeholder-emerald-400 focus:border-gold focus:outline-none"
                                    placeholder="Mobile Number (e.g. 9876543210)"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-gold py-2 px-4 rounded-md text-emerald-950 font-bold hover:bg-white">
                            Send OTP
                        </button>
                    </form>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
                        <div>
                            <input
                                type="text"
                                required
                                className="w-full rounded-md border border-gold/30 bg-emerald-950/50 px-3 py-3 text-white placeholder-emerald-400 focus:border-gold focus:outline-none text-center tracking-widest text-2xl"
                                placeholder="• • • • • •"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                            />
                        </div>
                        <button type="submit" className="w-full bg-gold py-2 px-4 rounded-md text-emerald-950 font-bold hover:bg-white">
                            Verify & Login
                        </button>
                        <button type="button" onClick={() => setOtpSent(false)} className="w-full text-emerald-400 text-sm hover:text-white">
                            Change Number
                        </button>
                    </form>
                )}

                <div className="text-center text-sm">
                    <span className="text-emerald-300">New here? </span>
                    <Link href="/signup" className="font-medium text-gold hover:text-white">Sign up</Link>
                </div>
            </div>
        </div>
    );
}
