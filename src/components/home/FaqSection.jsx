"use client";

import { MOCK_FAQS } from "@/lib/mockData";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function FaqSection() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="py-20 bg-emerald-900/20">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif text-gold mb-4">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    {MOCK_FAQS.map((faq, i) => (
                        <div key={i} className="border border-gold/10 rounded-lg overflow-hidden bg-emerald-950/30">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-emerald-900/30 transition-colors"
                            >
                                <span className="font-medium text-white">{faq.question}</span>
                                {openIndex === i ? <Minus className="w-5 h-5 text-gold" /> : <Plus className="w-5 h-5 text-gold" />}
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: "auto" }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-4 pt-0 text-emerald-200/70 text-sm">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link href="/faq">
                        <button className="px-6 py-2 border border-gold text-gold rounded-full hover:bg-gold hover:text-emerald-950 transition-colors text-sm font-bold">
                            View Help Center
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
