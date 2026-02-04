import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Story from "@/models/Story";

export const dynamic = 'force-dynamic';

export default async function StoriesPage() {
    await dbConnect();
    const stories = await Story.find({}).sort({ createdAt: -1 });

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-serif text-gold mb-4">Success Stories</h1>
                <p className="text-emerald-200/80 max-w-2xl mx-auto">
                    Read about the beautiful unions made possible through Ansari Matrimonials.
                    Users can submit their own stories to inspire others.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {stories.length === 0 ? (
                    <div className="md:col-span-2 text-center py-10 text-emerald-200/50">
                        No stories yet. Be the first to share yours!
                    </div>
                ) : (
                    stories.map(story => (
                        <div key={story._id} className="bg-emerald-900/30 border border-gold/20 rounded-xl overflow-hidden flex flex-col md:flex-row">
                            <div className="md:w-1/3 bg-emerald-800 min-h-[200px] relative">
                                {/* Image Placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center text-gold/20 font-serif text-8xl">”</div>
                            </div>
                            <div className="p-6 md:w-2/3 flex flex-col justify-center">
                                <h3 className="text-2xl font-serif text-gold mb-2">{story.couple}</h3>
                                <p className="italic text-emerald-100/80">"{story.story}"</p>
                            </div>
                        </div>
                    ))
                )}

                {/* "Submit Your Story" Card */}
                <div className="bg-gold/10 border border-gold border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-bold text-gold mb-2">Have a Success Story?</h3>
                    <p className="text-emerald-200 text-sm mb-4">Inspire others by sharing your journey.</p>
                    <button className="px-6 py-2 bg-gold text-emerald-950 font-bold rounded-full hover:bg-white transition-colors">Submit Story</button>
                </div>
            </div>
        </div>
    );
}
