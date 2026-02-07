import { MOCK_USERS } from "@/lib/mockData";
import MihrabCard from "@/components/ui/MihrabCard";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { Search } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function DiscoverPage() {
    await dbConnect();

    // Try to fetch real users first
    // Try to fetch real users first
    const realUsers = await User.find({ role: 'user', isProfileComplete: true }).limit(20).lean();

    // If no real users, use mock data
    let displayUsers = [];

    if (realUsers.length > 0) {
        displayUsers = realUsers.map(u => ({
            ...u,
            _id: u._id.toString(),
            unlockedProfiles: [] // Public page, no unlocks
        }));
    } else {
        displayUsers = MOCK_USERS;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-10 space-y-4">
                <h1 className="text-4xl font-serif text-gold">Discover Matches</h1>
                <p className="text-emerald-200/80 max-w-2xl mx-auto">
                    Explore profiles of verified potential partners. Values, compatibility, and tradition - all in one place.
                </p>

                {/* Search Bar Placeholder */}
                <div className="max-w-md mx-auto relative">
                    <input
                        type="text"
                        placeholder="Search by location, profession..."
                        className="w-full bg-emerald-900/50 border border-gold/30 rounded-full py-3 px-6 pl-12 text-white placeholder-emerald-400/70 focus:outline-none focus:border-gold"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold w-5 h-5" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {displayUsers.map(user => (
                    <div key={user._id} className="relative">
                        <MihrabCard user={user} isUnlocked={false} />
                        {user.isVerified ? (
                            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Verified
                            </div>
                        ) : (
                            <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-lg z-10">
                                New Member
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
