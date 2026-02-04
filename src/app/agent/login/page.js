"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";

export default function AgentLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result.error) {
            setError("Invalid agent credentials");
        } else {
            router.push("/dashboard"); // Agents also use dashboard or custom portal
            router.refresh();
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-emerald-950 p-4">
            <div className="w-full max-w-sm space-y-6 bg-black/40 p-8 rounded-xl border border-emerald-800">
                <div className="text-center">
                    <Shield className="mx-auto h-10 w-10 text-emerald-400" />
                    <h2 className="mt-4 text-2xl font-bold font-serif text-white">Agent Portal</h2>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    {error && <div className="text-red-400 text-sm text-center">{error}</div>}
                    <input
                        type="email"
                        required
                        className="w-full rounded bg-emerald-900/50 border border-emerald-700 px-3 py-2 text-white placeholder-emerald-600 focus:outline-none focus:border-emerald-400"
                        placeholder="Agent Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        required
                        className="w-full rounded bg-emerald-900/50 border border-emerald-700 px-3 py-2 text-white placeholder-emerald-600 focus:outline-none focus:border-emerald-400"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                        Access Portal
                    </button>
                </form>
            </div>
        </div>
    );
}
