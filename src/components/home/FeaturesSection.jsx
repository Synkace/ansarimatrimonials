"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Moon, Heart } from "lucide-react";

const features = [
    {
        icon: <Shield className="w-8 h-8 text-gold" />,
        title: "Verified Profiles",
        desc: "Every profile is manually verified via Aadhaar checks to ensure authenticity."
    },
    {
        icon: <Lock className="w-8 h-8 text-gold" />,
        title: "Privacy First",
        desc: "Your contact details are hidden behind a 'Blur Gate' until you grant access."
    },
    {
        icon: <Moon className="w-8 h-8 text-gold" />,
        title: "Lunar Compatibility",
        desc: "Unique matching algorithm based on shared values and temperament."
    },
    {
        icon: <Heart className="w-8 h-8 text-gold" />,
        title: "Halal Interactions",
        desc: "Managed profiles and guided interactions to keep things respectful."
    }
];

export function FeaturesSection() {
    return (
        <section className="py-20 bg-emerald-900/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-serif text-gold mb-4">Why Choose Ansari?</h2>
                    <p className="text-emerald-200/80 max-w-xl mx-auto">We combine modern technology with traditional values to help you find your perfect match safely.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-emerald-950/50 p-6 rounded-xl border border-gold/10 hover:border-gold/30 transition-colors text-center group"
                        >
                            <div className="bg-emerald-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                            <p className="text-sm text-emerald-200/70">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
