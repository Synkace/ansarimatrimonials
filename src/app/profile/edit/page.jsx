"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        gender: "male",
        height: "",
        maritalStatus: "single",
        education: "",
        sect: "Sunni",
        caste: "",
        prayerFrequency: "5x",
        bio: "",
        location: "",
        occupation: "",
        age: ""
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/api/auth/signin");
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/user/onboarding');
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) {
                        setFormData(prev => ({
                            ...prev,
                            ...data.user,
                            name: data.user.name || session?.user?.name || ""
                        }));
                    }
                }
            } catch (error) {
                console.error("Failed to load profile:", error);
            } finally {
                setLoading(false);
            }
        };

        if (session) {
            fetchProfile();
        }
    }, [session, status, router]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/user/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.refresh();
                router.push(`/profile/${session.user.id}`);
            } else {
                alert("Failed to save profile. Please try again.");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-emerald-950">
                <Loader2 className="w-8 h-8 text-gold animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-emerald-950 pb-20 pt-8">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="mb-6 flex items-center justify-between">
                    <Link href={`/profile/${session?.user?.id}`} className="text-emerald-100/70 hover:text-gold flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Back to Profile
                    </Link>
                    <h1 className="text-2xl font-serif text-gold font-bold">Edit Profile</h1>
                </div>

                <div className="bg-emerald-900/40 border border-gold/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Section: Basic Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-emerald-100 border-b border-white/10 pb-2">Basic Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gold/80 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-emerald-950/50 border border-emerald-700 rounded-lg p-3 text-white focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gold/80 mb-1">I am a</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full bg-emerald-950/50 border border-emerald-700 rounded-lg p-3 text-white focus:border-gold outline-none"
                                    >
                                        <option value="male">Brother</option>
                                        <option value="female">Sister</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gold/80 mb-1">Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="Years"
                                        className="w-full bg-emerald-950/50 border border-emerald-700 rounded-lg p-3 text-white focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gold/80 mb-1">Height (cm)</label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        placeholder="e.g. 175"
                                        className="w-full bg-emerald-950/50 border border-emerald-700 rounded-lg p-3 text-white focus:border-gold outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Status & Religion */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-emerald-100 border-b border-white/10 pb-2">Status & Religion</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gold/80 mb-1">Marital Status</label>
                                    <select
                                        name="maritalStatus"
                                        value={formData.maritalStatus}
                                        onChange={handleChange}
                                        className="w-full bg-emerald-950/50 border border-emerald-700 rounded-lg p-3 text-white focus:border-gold outline-none"
                                    >
                                        <option value="single">Single</option>
                                        <option value="divorced">Divorced</option>
                                        <option value="widowed">Widowed</option>
                                        <option value="awaiting_divorce">Awaiting Divorce</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gold/80 mb-1">Prayer Frequency</label>
                                    <select
                                        name="prayerFrequency"
                                        value={formData.prayerFrequency}
                                        onChange={handleChange}
                                        className="w-full bg-emerald-950/50 border border-emerald-700 rounded-lg p-3 text-white focus:border-gold outline-none"
                                    >
                                        <option value="5x">Always (5x)</option>
                                        <option value="sometimes">Sometimes</option>
                                        <option value="jummah_only">Jummah Only</option>
                                        <option value="rarely">Rarely</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gold/80 mb-1">Sect</label>
                                    <input
                                        type="text"
                                        name="sect"
                                        value={formData.sect}
                                        onChange={handleChange}
                                        placeholder="e.g. Sunni"
                                        className="w-full bg-emerald-950/50 border border-emerald-700 rounded-lg p-3 text-white focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gold/80 mb-1">Caste (Optional)</label>
                                    <input
                                        type="text"
                                        name="caste"
                                        value={formData.caste || ""}
                                        onChange={handleChange}
                                        placeholder="e.g. Pathan"
                                        className="w-full bg-emerald-950/50 border border-emerald-700 rounded-lg p-3 text-white focus:border-gold outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Professional & Bio */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-emerald-100 border-b border-white/10 pb-2">Professional & Bio</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gold/80 mb-1">Education</label>
                                    <input
                                        type="text"
                                        name="education"
                                        value={formData.education}
                                        onChange={handleChange}
                                        placeholder="e.g. Bachelors in CS"
                                        className="w-full bg-emerald-950/50 border border-emerald-700 rounded-lg p-3 text-white focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gold/80 mb-1">Occupation</label>
                                    <input
                                        type="text"
                                        name="occupation"
                                        value={formData.occupation}
                                        onChange={handleChange}
                                        placeholder="e.g. Software Engineer"
                                        className="w-full bg-emerald-950/50 border border-emerald-700 rounded-lg p-3 text-white focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gold/80 mb-1">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Mumbai, India"
                                        className="w-full bg-emerald-950/50 border border-emerald-700 rounded-lg p-3 text-white focus:border-gold outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gold/80 mb-1">Bio / About Me</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Describe yourself, your family, and what you are looking for..."
                                        className="w-full bg-emerald-950/50 border border-emerald-700 rounded-lg p-3 text-white focus:border-gold outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-8 py-3 bg-gradient-to-r from-gold to-yellow-600 text-emerald-950 font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
