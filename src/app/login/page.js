"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Moon, Smartphone, Mail, Lock } from "lucide-react";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-emerald-950 text-gold">Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}

function LoginForm() {
    const [identifier, setIdentifier] = useState(""); // Phone, Email, or Username
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [loginMethod, setLoginMethod] = useState("otp"); // 'otp' or 'password'
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const recaptchaVerifierRef = useRef(null);

    const router = useRouter();
    const searchParams = useSearchParams();

    // Prefill from signup redirect
    useEffect(() => {
        const phone = searchParams.get("phone");
        if (phone) {
            setIdentifier(phone);
        }
    }, [searchParams]);

    // Initialize Recaptcha once using useRef (prevents duplicates)
    useEffect(() => {
        if (!recaptchaVerifierRef.current) {
            recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                },
                'expired-callback': () => {
                    // Response expired. Ask user to solve reCAPTCHA again.
                }
            });
        }

        // Cleanup on unmount
        return () => {
            if (recaptchaVerifierRef.current) {
                recaptchaVerifierRef.current.clear();
                recaptchaVerifierRef.current = null;
            }
        };
    }, []);

    const isPhone = (input) => /^\+?[0-9\s-]{10,}$/.test(input);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!isPhone(identifier)) {
            setError("Please enter a valid phone number for OTP login.");
            setLoading(false);
            return;
        }

        const formattedPhone = identifier.startsWith("+") ? identifier : `+91${identifier}`; // Default to +91 if checking simple match

        try {
            const appVerifier = recaptchaVerifierRef.current;
            const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
            setConfirmationResult(confirmation);
            setIsOtpSent(true);
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to send OTP");
            // Reset recaptcha on error
            if (recaptchaVerifierRef.current) {
                try {
                    recaptchaVerifierRef.current.clear();
                    recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
                        'size': 'invisible',
                        'callback': (response) => { }
                    });
                } catch (resetErr) {
                    console.error("Recaptcha reset error:", resetErr);
                }
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

            // Pass extra params if coming from signup
            const name = searchParams.get("name");
            const gender = searchParams.get("gender");

            const res = await signIn("credentials", {
                redirect: false,
                phone: user.phoneNumber,
                firebaseToken: idToken,
                isOtp: true,
                name,
                gender,
                callbackUrl: '/dashboard'
            });

            if (res?.error) {
                setError(res.error);
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            console.error(err);
            setError("Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await signIn("credentials", {
                redirect: false,
                identifier,
                password,
                isOtp: false,
                callbackUrl: '/dashboard'
            });

            if (res?.error) {
                setError("Invalid credentials");
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            console.error(err);
            setError("Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-emerald-950 p-4">
            {/* Hidden Recaptcha Container */}
            <div id="recaptcha-container"></div>

            <div className="w-full max-w-md space-y-8 bg-emerald-900/50 p-8 rounded-2xl border border-gold/30 backdrop-blur-md shadow-2xl">
                <div className="text-center">
                    <Moon className="mx-auto h-12 w-12 text-gold" />
                    <h2 className="mt-6 text-3xl font-bold font-serif text-gold">Welcome Back</h2>
                    <p className="mt-2 text-sm text-emerald-200">
                        {isOtpSent ? "Enter the OTP sent to your phone" : "Login to manage your profile"}
                    </p>
                </div>

                {error && <div className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded">{error}</div>}

                {!isOtpSent ? (
                    <form className="mt-8 space-y-6" onSubmit={loginMethod === 'otp' ? handleSendOtp : handlePasswordLogin}>
                        <div className="space-y-4">
                            <div className="relative">
                                {loginMethod === 'otp' ? (
                                    <Smartphone className="absolute left-3 top-3.5 text-gold w-5 h-5" />
                                ) : (
                                    <Mail className="absolute left-3 top-3.5 text-gold w-5 h-5" />
                                )}
                                <input
                                    type="text"
                                    required
                                    className="w-full pl-10 rounded-md border border-gold/30 bg-emerald-950/50 px-3 py-3 text-white placeholder-emerald-400 focus:border-gold focus:outline-none"
                                    placeholder={loginMethod === 'otp' ? "Mobile Number" : "Phone, Email or Username"}
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                />
                            </div>

                            {loginMethod === 'password' && (
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3.5 text-gold w-5 h-5" />
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-10 rounded-md border border-gold/30 bg-emerald-950/50 px-3 py-3 text-white placeholder-emerald-400 focus:border-gold focus:outline-none"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gold py-2 px-4 rounded-md text-emerald-950 font-bold hover:bg-white transition-colors disabled:opacity-50"
                        >
                            {loading ? "Processing..." : (loginMethod === 'otp' ? "Send OTP" : "Login")}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setLoginMethod(loginMethod === 'otp' ? 'password' : 'otp');
                                    setError(null);
                                }}
                                className="text-sm text-emerald-300 hover:text-white underline"
                            >
                                {loginMethod === 'otp' ? "Login with Password" : "Login via OTP"}
                            </button>
                        </div>
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
                            {loading ? "Verifying..." : "Verify & Login"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsOtpSent(false);
                                setOtp("");
                                if (recaptchaVerifierRef.current) {
                                    try {
                                        recaptchaVerifierRef.current.clear();
                                        recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
                                            'size': 'invisible',
                                            'callback': (response) => { }
                                        });
                                    } catch (err) {
                                        console.error("Recaptcha reset error:", err);
                                    }
                                }
                            }}
                            className="w-full text-emerald-400 text-sm hover:text-white"
                        >
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
