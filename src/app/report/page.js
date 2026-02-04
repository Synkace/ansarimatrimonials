export default function ReportPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <h1 className="text-4xl font-serif text-red-400 text-center mb-6">Report Misuse</h1>
            <p className="text-center text-emerald-200 mb-12">
                We take safety seriously. If you have witnessed any suspicious behavior, harassment, or fake profiles, please report it immediately.
            </p>

            <form className="bg-red-950/20 p-8 rounded-2xl border border-red-500/20 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-emerald-300 mb-2">Type of Issue</label>
                    <select className="w-full bg-emerald-950 border border-emerald-700 rounded-lg p-3 text-white outline-none focus:border-red-400">
                        <option>Fake Profile / Impersonation</option>
                        <option>Harassment / Abusive Behaviour</option>
                        <option>Scam / Fraud</option>
                        <option>Inappropriate Content</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-emerald-300 mb-2">Profile URL / ID (Optional)</label>
                    <input type="text" className="w-full bg-emerald-950 border border-emerald-700 rounded-lg p-3 text-white outline-none focus:border-red-400" placeholder="e.g. ansarimatrimonials.com/profile/123" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-emerald-300 mb-2">Details</label>
                    <textarea rows={5} className="w-full bg-emerald-950 border border-emerald-700 rounded-lg p-3 text-white outline-none focus:border-red-400" placeholder="Please provide as much detail as possible..." />
                </div>

                <button className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg transition-colors">
                    Submit Report
                </button>
            </form>
        </div>
    );
}
