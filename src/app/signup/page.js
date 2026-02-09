"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Moon, Smartphone, Mail, Lock, User, Hash } from "lucide-react";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { signIn } from "next-auth/react";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        username: "",
        password: "",
        gender: "male"
    });
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Initialize Recaptcha
    useEffect(() => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'signup-recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved
                }
            });
        }
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { phone } = formData;
        if (!phone || phone.length < 10) {
            setError("Please enter a valid phone number");
            setLoading(false);
            return;
        }

        const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;

        try {
            const appVerifier = window.recaptchaVerifier;
            const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
            setConfirmationResult(confirmation);
            setIsOtpSent(true);
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to send OTP");
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.render().then(widgetId => {
                    window.recaptchaVerifier.reset(widgetId);
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const result = await confirmationResult.confirm(otp);
            const user = result.user;
            const idToken = await user.getIdToken();

            // Sign in with redirect: false to prevent NextAuth interfering
            const res = await signIn("credentials", {
                redirect: false,
                phone: user.phoneNumber,
                firebaseToken: idToken,
                isOtp: true,
                ...formData
            });
            console.log("DEBUG_SIGNIN_RES:", res);

            if (res?.error) {
                alert("Auth Error: " + res.error);
            } else {
                // Force it manually to onboarding - existing logic will redirect to dashboard if profile is complete
                window.location.href = '/onboarding';
            }
        } catch (err) {
            console.error(err);
            setError("Invalid OTP or Registration Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-emerald-950 p-4">
            <div id="signup-recaptcha-container"></div>

            <div className="w-full max-w-md space-y-8 bg-emerald-900/50 p-8 rounded-2xl border border-gold/30 backdrop-blur-md shadow-2xl">
                <div className="text-center">
                    <Moon className="mx-auto h-12 w-12 text-gold" />
                    <h2 className="mt-6 text-3xl font-bold font-serif text-gold">Join Ansari</h2>
                    <p className="mt-2 text-sm text-emerald-200">Begin your journey to a blessed union</p>
                </div>

                {error && <div className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded">{error}</div>}

                {!isOtpSent ? (
                    <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 text-gold w-5 h-5" />
                                <input
                                    type="text"
                                    required
                                    className="w-full pl-10 rounded-md border border-gold/30 bg-emerald-950/50 px-3 py-3 text-white placeholder-emerald-400 focus:border-gold focus:outline-none"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="relative">
                                <Smartphone className="absolute left-3 top-3.5 text-gold w-5 h-5" />
                                <input
                                    type="tel"
                                    required
                                    className="w-full pl-10 rounded-md border border-gold/30 bg-emerald-950/50 px-3 py-3 text-white placeholder-emerald-400 focus:border-gold focus:outline-none"
                                    placeholder="Mobile Number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-gold w-5 h-5" />
                                <input
                                    type="email"
                                    className="w-full pl-10 rounded-md border border-gold/30 bg-emerald-950/50 px-3 py-3 text-white placeholder-emerald-400 focus:border-gold focus:outline-none"
                                    placeholder="Email (Optional)"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="relative">
                                <Hash className="absolute left-3 top-3.5 text-gold w-5 h-5" />
                                <input
                                    type="text"
                                    className="w-full pl-10 rounded-md border border-gold/30 bg-emerald-950/50 px-3 py-3 text-white placeholder-emerald-400 focus:border-gold focus:outline-none"
                                    placeholder="Username (Optional)"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-gold w-5 h-5" />
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-10 rounded-md border border-gold/30 bg-emerald-950/50 px-3 py-3 text-white placeholder-emerald-400 focus:border-gold focus:outline-none"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>

                            <select
                                className="w-full rounded-md border border-gold/30 bg-emerald-950/50 px-3 py-3 text-white focus:border-gold focus:outline-none"
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            >
                                <option value="male">Groom seeking Bride</option>
                                <option value="female">Bride seeking Groom</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gold py-2 px-4 rounded-md text-emerald-950 font-bold hover:bg-white transition-colors disabled:opacity-50"
                        >
                            {loading ? "Sending OTP..." : "Verify Number & Continue"}
                        </button>
                    </form>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleVerifyOtp}>
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
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gold py-2 px-4 rounded-md text-emerald-950 font-bold hover:bg-white transition-colors disabled:opacity-50"
                        >
                            {loading ? "Regsatering..." : "Verify & Register"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsOtpSent(false);
                                setOtp("");
                                if (window.recaptchaVerifier) {
                                    window.recaptchaVerifier.render().then(widgetId => {
                                        window.recaptchaVerifier.reset(widgetId);
                                    });
                                }
                            }}
                            className="w-full text-emerald-400 text-sm hover:text-white"
                        >
                            Change Number
                        </button>
                    </form>
                )}

                <div className="text-center text-sm">
                    <span className="text-emerald-300">Already a member? </span>
                    <Link href="/login" className="font-medium text-gold hover:text-white">Login</Link>
                </div>
            </div>
        </div>
    );
}
