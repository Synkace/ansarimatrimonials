import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                phone: { label: "Phone", type: "text" },
                otp: { label: "OTP", type: "text" },
                isOtp: { label: "isOtp", type: "text" }
            },
            async authorize(credentials, req) {
                await dbConnect();

                // OTP Login Logic
                if (credentials.isOtp === 'true') {
                    const { phone, otp } = credentials;
                    if (otp !== "123456") throw new Error("Invalid OTP");

                    // Find or Create User by Phone
                    let user = await User.findOne({ phone });
                    if (!user) {
                        user = await User.create({
                            name: "New User",
                            phone,
                            isVerified: false,
                            role: 'user',
                            email: `${phone}@ansari.com` // Placeholder email to satisfy Schema if needed
                        });
                    }
                    return { id: user._id.toString(), email: user.email, name: user.name, role: user.role };
                }

                // Simple login logic
                const user = await User.findOne({ email: credentials.email }).select("+password");
                if (!user) {
                    throw new Error("No user found");
                }

                // Logic to check password (plain text for simplicity in this generated code, use bcrypt in real prod)
                if (user.password !== credentials.password) {
                    throw new Error("Invalid password");
                }

                return { id: user._id.toString(), email: user.email, name: user.name, role: user.role };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
                token.isVerified = user.isVerified;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
                session.user.isVerified = token.isVerified;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
