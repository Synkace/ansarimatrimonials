import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { adminAuth } from "@/lib/firebaseAdmin";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                identifier: { label: "Identifier", type: "text" }, // Phone, Email, Username
                password: { label: "Password", type: "password" },
                phone: { label: "Phone", type: "text" }, // For passing phone from client
                firebaseToken: { label: "Firebase Token", type: "text" },
                isOtp: { label: "isOtp", type: "text" },
                name: { label: "Name", type: "text" },
                email: { label: "Email", type: "text" },
                username: { label: "Username", type: "text" },
                gender: { label: "Gender", type: "text" }
            },
            async authorize(credentials, req) {
                console.log("DEBUG_AUTH: Attempting login for", credentials.phone || credentials.identifier);
                await dbConnect();

                // --- 1. OTP / Firebase Token Login ---
                if (credentials.isOtp === 'true') {
                    const { firebaseToken, name, gender, email, username, password } = credentials;

                    // Verify Firebase Token
                    let decodedToken;
                    try {
                        decodedToken = await adminAuth.verifyIdToken(firebaseToken);
                    } catch (error) {
                        console.error("Firebase token verification failed:", error);
                        throw new Error("Invalid verification token");
                    }

                    const verifiedPhone = decodedToken.phone_number; // E.164 format from Firebase

                    // Check if User Exists
                    let user = await User.findOne({ phone: verifiedPhone });

                    if (!user) {
                        // Create New User
                        try {
                            const userData = {
                                name: name || "New User",
                                phone: verifiedPhone,
                                isVerified: true, // Verified via OTP
                                role: 'user',
                                gender: gender || 'male',
                            };

                            // Add optional fields if provided and checks pass
                            if (email) userData.email = email;
                            if (username) userData.username = username;

                            if (password) {
                                userData.password = await bcrypt.hash(password, 10);
                            }

                            user = await User.create(userData);
                        } catch (err) {
                            console.error("User creation failed:", err);
                            if (err.code === 11000) {
                                throw new Error("User with this Email or Username already exists");
                            }
                            throw new Error("Failed to create user");
                        }
                    } else {
                        // User exists
                        // Optional: Update password if provided (Account Recovery / Setting Password)
                        // Since they verified OTP, they own the account.
                        if (password) {
                            user.password = await bcrypt.hash(password, 10);
                            await user.save();
                        }
                    }

                    const userData = {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        isVerified: user.isVerified,
                        isProfileComplete: user.isProfileComplete
                    };
                    console.log("DEBUG_AUTH: Success! User data being sent to session (OTP):", userData);
                    return userData;
                }

                // --- 2. Password Login ---
                const { identifier, password } = credentials;

                const user = await User.findOne({
                    $or: [
                        { email: identifier },
                        { username: identifier },
                        { phone: identifier }, // Exact match
                        { phone: identifier.startsWith('+') ? identifier : `+91${identifier}` } // Try adding country code
                    ]
                }).select("+password");

                if (!user) {
                    throw new Error("User not found");
                }

                if (!user.password) {
                    throw new Error("Please login with OTP and set a password");
                }

                const isValid = await bcrypt.compare(password, user.password);
                if (!isValid) {
                    throw new Error("Invalid password");
                }

                const userData = {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    isVerified: user.isVerified,
                    isProfileComplete: user.isProfileComplete
                };
                console.log("DEBUG_AUTH: Success! User data being sent to session (Password):", userData);
                return userData;
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (user?.isProfileComplete) {
                return '/dashboard';
            } else {
                return '/onboarding';
            }
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id || user._id;
                token.role = user.role;
                token.isVerified = user.isVerified;
                token.isProfileComplete = user.isProfileComplete;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.isVerified = token.isVerified;
                session.user.isProfileComplete = token.isProfileComplete;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
        newUser: '/onboarding',
        error: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
