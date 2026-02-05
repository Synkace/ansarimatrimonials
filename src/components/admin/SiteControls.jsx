"use client";

import { useEffect, useState } from "react";
import { Save, Loader } from "lucide-react";

export default function SiteControls() {
    const [heroData, setHeroData] = useState({
        heading: "Ansar (the helpers)",
        subheading: "Connecting hearts with faith and tradition. Join thousands of happy couples.",
        ctaText: "Start Your Journey"
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchHeroContent();
    }, []);

    const fetchHeroContent = async () => {
        try {
            const res = await fetch('/api/admin/cms?type=site-content&section=hero');
            const data = await res.json();
            if (data.content && Object.keys(data.content).length > 0) {
                setHeroData(data.content);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/admin/cms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'site-content',
                    data: {
                        section: 'hero',
                        content: heroData
                    }
                })
            });
            if (res.ok) {
                alert("Hero content updated successfully!");
            } else {
                alert("Failed to update.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-emerald-400">Loading Configuration...</div>;

    return (
        <div className="space-y-8">
            <h3 className="text-xl text-gold font-serif">Site Customization: Homepage Hero</h3>

            <div className="bg-emerald-900/40 border border-gold/20 p-6 rounded-xl space-y-4">
                <div>
                    <label className="block text-emerald-200 text-sm font-bold mb-2">Main Heading</label>
                    <input
                        className="w-full bg-black/20 border border-gold/10 rounded p-3 text-white focus:border-gold/50 outline-none"
                        value={heroData.heading}
                        onChange={(e) => setHeroData({ ...heroData, heading: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-emerald-200 text-sm font-bold mb-2">Subheading</label>
                    <textarea
                        className="w-full bg-black/20 border border-gold/10 rounded p-3 text-white focus:border-gold/50 outline-none"
                        rows={3}
                        value={heroData.subheading}
                        onChange={(e) => setHeroData({ ...heroData, subheading: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-emerald-200 text-sm font-bold mb-2">CTA Button Text</label>
                    <input
                        className="w-full md:w-1/2 bg-black/20 border border-gold/10 rounded p-3 text-white focus:border-gold/50 outline-none"
                        value={heroData.ctaText}
                        onChange={(e) => setHeroData({ ...heroData, ctaText: e.target.value })}
                    />
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-gold hover:bg-yellow-500 text-emerald-950 px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                        {saving ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Live Preview Hint */}
            <div className="text-emerald-400 text-sm italic">
                Changes will be reflected on the homepage immediately after refresh.
            </div>
        </div>
    );
}
