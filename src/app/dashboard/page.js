import MihrabCard from "@/components/ui/MihrabCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    // Force onboarding if not verified/completed
    if (!session.user.isVerified) {
        redirect("/onboarding");
    }

    // Fetch users meant for feed (exclude self handled in query if we had session here, simplified for now)
    // Limit 20
    const users = await User.find({}).limit(20).lean();

    // Convert _id to string to pass to client component
    const cleanUsers = users.map(u => ({
        ...u,
        _id: u._id.toString(),
        unlockedProfiles: u.unlockedProfiles?.map(id => id.toString()) || []
    }));

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-serif text-gold mb-2">Lunar Unions</h1>
                <p className="text-emerald-200/80">Discover your other half by the light of the moon.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {cleanUsers.map(user => (
                    <MihrabCard key={user._id} user={user} isUnlocked={false} />
                ))}
            </div>

            {cleanUsers.length === 0 && (
                <div className="text-center py-20 text-emerald-400 opacity-50">
                    The stars are aligning... No profiles yet.
                </div>
            )}
        </div>
    );
}
