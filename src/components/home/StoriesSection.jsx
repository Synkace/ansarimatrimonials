"use client";

import Link from "next/link";
import Image from "next/image";
import { MOCK_STORIES } from "@/lib/mockData";

export function StoriesSection() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-serif text-gold mb-2">Success Stories</h2>
                        <p className="text-emerald-200/80">Real people, real love, by the will of Allah.</p>
                    </div>
                    <Link href="/stories">
                        <button className="text-gold hover:text-white underline underline-offset-4 decoration-gold/50">View All Stories</button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {MOCK_STORIES.map((story) => (
                        <div key={story.id} className="relative group overflow-hidden rounded-xl border border-gold/20 aspect-[4/5]">
                            {/* Placeholder Image Logic - using div if no image */}
                            <div className="absolute inset-0 bg-emerald-800 flex items-center justify-center text-gold/20 font-serif text-6xl">
                                ”
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-xl font-bold text-gold mb-1">{story.couple}</h3>
                                <p className="text-white/90 text-sm line-clamp-3">"{story.story}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
