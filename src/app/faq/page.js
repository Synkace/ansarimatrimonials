import dbConnect from "@/lib/mongodb";
import Faq from "@/models/Faq";

export const dynamic = 'force-dynamic';

export default async function FaqPage() {
    await dbConnect();
    const faqs = await Faq.find({}).sort({ createdAt: -1 });

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-serif text-gold mb-4">Help Center & FAQ</h1>
                <p className="text-emerald-200/80">
                    Find answers to common questions about safety, matchmaking, and privacy.
                </p>
            </div>

            <div className="space-y-8">
                {faqs.length === 0 ? (
                    <div className="text-center text-emerald-200/50">No FAQs currently available.</div>
                ) : (
                    faqs.map((faq) => (
                        <div key={faq._id} className="bg-emerald-900/20 p-6 rounded-xl border border-gold/10">
                            <h3 className="text-xl font-bold text-gold mb-2">{faq.question}</h3>
                            <p className="text-emerald-100/80 leading-relaxed">{faq.answer}</p>
                        </div>
                    ))
                )}

                <div className="bg-emerald-900/20 p-6 rounded-xl border border-gold/10">
                    <h3 className="text-xl font-bold text-gold mb-2">How do I report misuse?</h3>
                    <p className="text-emerald-100/80 leading-relaxed">
                        You can report any suspicious activity directly from a user's profile or via our <a href="/report" className="text-gold underline">Report Misuse</a> page.
                    </p>
                </div>
            </div>
        </div>
    );
}
