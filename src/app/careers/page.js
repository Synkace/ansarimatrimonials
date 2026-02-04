import { Briefcase } from "lucide-react";

export default function CareersPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
            <h1 className="text-4xl font-serif text-gold mb-6">Join the Team</h1>
            <p className="text-xl text-emerald-200 mb-16 max-w-2xl mx-auto">
                Help us build the future of matrimonial matchmaking. We are always looking for talented developers, designers, and relationship managers.
            </p>

            <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="bg-emerald-900/30 p-8 rounded-xl border border-gold/10 hover:border-gold/50 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white">Full Stack Developer</h3>
                        <span className="bg-gold/20 text-gold text-xs px-2 py-1 rounded">Remote</span>
                    </div>
                    <p className="text-emerald-200/70 text-sm mb-6">Expert in Next.js, Node.js, and MongoDB needed to scale our platform.</p>
                    <div className="flex items-center gap-2 text-gold text-sm font-bold">
                        <Briefcase className="w-4 h-4" /> Apply Now
                    </div>
                </div>

                <div className="bg-emerald-900/30 p-8 rounded-xl border border-gold/10 hover:border-gold/50 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white">Relationship Manager (Agent)</h3>
                        <span className="bg-gold/20 text-gold text-xs px-2 py-1 rounded">Mumbai</span>
                    </div>
                    <p className="text-emerald-200/70 text-sm mb-6">Empathetic individuals to guide families through the matchmaking process.</p>
                    <div className="flex items-center gap-2 text-gold text-sm font-bold">
                        <Briefcase className="w-4 h-4" /> Apply Now
                    </div>
                </div>
            </div>

            <div className="mt-16 bg-gradient-to-r from-emerald-900 to-emerald-800 p-8 rounded-2xl">
                <h3 className="text-2xl font-serif text-white mb-2">Don't see your role?</h3>
                <p className="text-emerald-200 mb-6">Send your resume to careers@ansari.com</p>
            </div>
        </div>
    );
}
