"use client";

import { useState } from "react";
import { Plus, Trash2, FileText, HelpCircle, MessageCircle, UserPlus, CheckCircle, Image } from "lucide-react";
import UserTable from "@/components/admin/UserTable";
import VerificationQueue from "@/components/admin/VerificationQueue";
import PhotoModeration from "@/components/admin/PhotoModeration";
import SiteControls from "@/components/admin/SiteControls";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("verification");

    // CMS State (Mock fetching for now, can implement Real fetch in Effect)
    const [cmsData, setCmsData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Forms
    const [form, setForm] = useState({ title: "", content: "", category: "General" });

    const handleCmsSubmit = async (type) => {
        setLoading(true);
        try {
            let payloadData = { ...form };
            // Map form fields to Model schemas
            if (type === 'story') {
                payloadData = { couple: form.title, story: form.content };
            } else if (type === 'faq') {
                payloadData = { question: form.title, answer: form.content };
            }

            const res = await fetch('/api/admin/cms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, action: 'create', data: payloadData })
            });

            if (res.ok) {
                alert(`${type} created successfully!`);
                setForm({ title: "", content: "", category: "General" }); // Reset form
                // Trigger refresh if needed
            } else {
                alert("Failed to create item.");
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting form.");
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'user':
                return <UserTable />;
            case 'verification':
                return <VerificationQueue />;
            case 'photos':
                return <PhotoModeration />;
            case 'site':
                return <SiteControls />;
            case 'agent':
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl text-gold">Create Agent</h3>
                        <input className="bg-emerald-900/50 border border-gold/20 p-2 text-white block w-full rounded" placeholder="Email" />
                        <button className="bg-gold text-emerald-950 px-4 py-2 rounded font-bold">Create Agent</button>
                    </div>
                );
            case 'story':
            case 'faq':
            case 'blog':
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl text-gold capitalize">Manage {activeTab}s</h3>
                        <div className="bg-emerald-900/30 p-4 rounded border border-gold/10">
                            <h4 className="font-bold text-white mb-2">Add New</h4>
                            <div className="space-y-2">
                                <input
                                    className="w-full bg-black/20 border border-gold/10 p-2 text-white rounded"
                                    placeholder={activeTab === 'faq' ? "Question" : "Title/Couple"}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                />
                                <textarea
                                    className="w-full bg-black/20 border border-gold/10 p-2 text-white rounded"
                                    placeholder={activeTab === 'faq' ? "Answer" : "Content/Story"}
                                    rows={3}
                                    onChange={e => setForm({ ...form, content: e.target.value })}
                                />
                                <button onClick={() => handleCmsSubmit(activeTab)} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
                                    <Plus className="w-4 h-4" /> Add
                                </button>
                            </div>
                        </div>

                        <div className="bg-emerald-900/30 p-4 rounded border border-gold/10">
                            <h4 className="font-bold text-white mb-2">Existing Items (Fetch from DB)</h4>
                            <p className="text-sm opacity-50">List of {activeTab}s will appear here...</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-64 space-y-2">
                <h1 className="text-xl font-bold text-gold mb-6 px-4">Admin CMS</h1>
                {[
                    { id: 'user', label: 'Users', icon: UserPlus },
                    { id: 'verification', label: 'Verifications', icon: CheckCircle },
                    { id: 'photos', label: 'Photos', icon: Image },
                    { id: 'site', label: 'Site Controls', icon: FileText },
                    { id: 'agent', label: 'Agents', icon: UserPlus },
                    { id: 'story', label: 'Stories', icon: MessageCircle },
                    { id: 'faq', label: 'FAQs', icon: HelpCircle },
                    { id: 'blog', label: 'Blogs', icon: FileText },
                ].map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === item.id ? 'bg-gold text-emerald-950 font-bold' : 'text-emerald-200 hover:bg-emerald-900'}`}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-emerald-950/50 border border-gold/10 rounded-2xl p-8 min-h-[500px]">
                {renderContent()}
            </div>
        </div>
    );
}
