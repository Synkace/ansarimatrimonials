export default function ReferralPage() {
    return (
        <div className="container mx-auto px-4 py-16 text-center max-w-3xl">
            <h1 className="text-4xl font-serif text-gold mb-6">Referral Program</h1>
            <p className="text-lg text-emerald-200 mb-12">
                Help your friends seek their happiness and earn rewards.
            </p>

            <div className="bg-emerald-900/40 border border-dashed border-gold p-12 rounded-2xl mb-12">
                <h2 className="text-3xl font-bold text-white mb-2">EARN500</h2>
                <p className="text-emerald-400 text-sm uppercase tracking-widest mb-8">Your Unique Referral Code</p>

                <button className="px-8 py-3 bg-gold text-emerald-950 font-bold rounded-lg hover:bg-white transition-colors">
                    Copy Code
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div>
                    <div className="w-12 h-12 bg-white text-emerald-950 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                    <h3 className="font-bold text-gold">Share Code</h3>
                    <p className="text-sm text-emerald-200/70 mt-2">Send your unique code to friends and family.</p>
                </div>
                <div>
                    <div className="w-12 h-12 bg-white text-emerald-950 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                    <h3 className="font-bold text-gold">They Signup</h3>
                    <p className="text-sm text-emerald-200/70 mt-2">They get 10% off on their first premium plan.</p>
                </div>
                <div>
                    <div className="w-12 h-12 bg-white text-emerald-950 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                    <h3 className="font-bold text-gold">You Earn</h3>
                    <p className="text-sm text-emerald-200/70 mt-2">Receive 500 Credits for every successful subscription.</p>
                </div>
            </div>
        </div>
    );
}
