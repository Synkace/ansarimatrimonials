import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function stripSensitiveData(user, requestingUser) {
    if (!user) return null;
    // Handle if user is Mongoose document
    const u = user.toObject ? user.toObject() : user;

    // 1. Admin gets everything
    if (requestingUser?.role === 'admin') return u;

    // 2. Self gets everything
    if (requestingUser?._id && u._id && requestingUser._id.toString() === u._id.toString()) return u;

    // 3. Unlocked profile gets everything
    // Check if requestingUser has u._id in unlockedProfiles
    // unlockedProfiles might be array of IDs or Objects
    const isUnlocked = requestingUser?.unlockedProfiles?.some(
        (id) => id.toString() === u._id.toString()
    );

    if (isUnlocked) {
        return u;
    }

    // 4. Default: Strip sensitive
    const { phone, aadhaarNumber, aadhaarImage, password, ...safeUser } = u;
    return safeUser;
}
