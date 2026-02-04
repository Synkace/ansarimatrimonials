import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { Moon } from "lucide-react";
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-serif text-gold mb-4">Ansari Blog</h1>
                <p className="text-emerald-200/80">Insights on Halal Dating, Marriage, and Tradition.</p>
            </div>

            {blogs.length === 0 ? (
                <div className="text-center py-20 bg-emerald-900/20 rounded-xl border border-gold/10">
                    <Moon className="w-12 h-12 text-gold/30 mx-auto mb-4" />
                    <p className="text-emerald-200/50">Coming Soon. Stay tuned for our first article.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map(blog => (
                        <article key={blog._id} className="bg-emerald-950/40 border border-gold/10 rounded-xl overflow-hidden hover:border-gold/30 transition-colors">
                            <div className="h-48 bg-emerald-900 flex items-center justify-center text-gold/20">
                                {/* Image Placeholder */}
                                <Moon className="w-12 h-12" />
                            </div>
                            <div className="p-6">
                                <span className="text-xs text-gold font-bold uppercase tracking-wider mb-2 block">{new Date(blog.createdAt).toLocaleDateString()}</span>
                                <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">{blog.title}</h2>
                                <p className="text-emerald-200/70 text-sm line-clamp-3 mb-4">{blog.content}</p>
                                <Link href={`/blog/${blog.slug}`} className="text-gold hover:underline text-sm font-bold">Read More</Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
