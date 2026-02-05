"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Moon, Heart } from "lucide-react";

export default function OnboardingPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/user/onboarding", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/dashboard");
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-emerald-950 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-emerald-900/50 backdrop-blur-md rounded-2xl border border-gold/20 p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <Moon className="w-12 h-12 text-gold mx-auto mb-4" />
                    <h1 className="text-3xl font-serif text-gold font-bold">Complete Your Profile</h1>
                    <p className="text-emerald-200/80">Help us find your perfect match by answering a few questions.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Details */}
                    <div className="space-y-4">
                        <h3 className="text-xl text-white font-bold border-b border-gold/20 pb-2">Basic Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gold mb-1">I am a</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-emerald-950 border border-gold/30 rounded-lg p-3 text-white focus:border-gold outline-none">
                                    <option value="male">Brother</option>
                                    <option value="female">Sister</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gold mb-1">Age</label>
                                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Years" required className="w-full bg-emerald-950 border border-gold/30 rounded-lg p-3 text-white focus:border-gold outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm text-gold mb-1">Height (cm)</label>
                                <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="e.g. 175" required className="w-full bg-emerald-950 border border-gold/30 rounded-lg p-3 text-white focus:border-gold outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm text-gold mb-1">Marital Status</label>
                                <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="w-full bg-emerald-950 border border-gold/30 rounded-lg p-3 text-white focus:border-gold outline-none">
                                    <option value="single">Single</option>
                                    <option value="divorced">Divorced</option>
                                    <option value="widowed">Widowed</option>
                                    <option value="awaiting_divorce">Awaiting Divorce</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Religious & Professional */}
                    <div className="space-y-4 pt-4">
                        <h3 className="text-xl text-white font-bold border-b border-gold/20 pb-2">Religious & Professional</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gold mb-1">Sect</label>
                                <select name="sect" value={formData.sect} onChange={handleChange} className="w-full bg-emerald-950 border border-gold/30 rounded-lg p-3 text-white focus:border-gold outline-none">
                                    <option value="Sunni">Sunni</option>
                                    <option value="Shia">Shia</option>
                                    <option value="Salafi">Salafi</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gold mb-1">Prayer Frequency</label>
                                <select name="prayerFrequency" value={formData.prayerFrequency} onChange={handleChange} className="w-full bg-emerald-950 border border-gold/30 rounded-lg p-3 text-white focus:border-gold outline-none">
                                    <option value="5x">Always (5x)</option>
                                    <option value="sometimes">Sometimes</option>
                                    <option value="jummah_only">Jummah Only</option>
                                    <option value="rarely">Rarely</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-gold mb-1">Education</label>
                                <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="Highest degree..." required className="w-full bg-emerald-950 border border-gold/30 rounded-lg p-3 text-white focus:border-gold outline-none" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-gold mb-1">Occupation</label>
                                <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="What do you do?" required className="w-full bg-emerald-950 border border-gold/30 rounded-lg p-3 text-white focus:border-gold outline-none" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-gold mb-1">Location</label>
                                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="City, Country" required className="w-full bg-emerald-950 border border-gold/30 rounded-lg p-3 text-white focus:border-gold outline-none" />
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-4 pt-4">
                        <label className="block text-sm text-gold mb-1">About Me (Bio)</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} rows="4" placeholder="Tell potential matches about yourself..." className="w-full bg-emerald-950 border border-gold/30 rounded-lg p-3 text-white focus:border-gold outline-none" />
                    </div>

                    <button disabled={loading} type="submit" className="w-full bg-gold py-4 rounded-xl text-emerald-950 font-bold text-lg hover:bg-white transition-all shadow-lg hover:shadow-gold/50 flex items-center justify-center gap-2">
                        {loading ? "Saving..." : <><Heart className="w-5 h-5 fill-emerald-950" /> Complete Profile</>}
                    </button>
                </form>
            </div>
        </div>
    );
}
