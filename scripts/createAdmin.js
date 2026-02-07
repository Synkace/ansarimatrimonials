const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Define User Schema inline to avoid module issues during standalone script execution
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, select: false },
    phone: String,
    role: { type: String, default: 'user', enum: ['user', 'admin', 'agent'] },
    isVerified: { type: Boolean, default: false },
    verificationStatus: { type: String, default: 'unverified' },
    isProfileComplete: { type: Boolean, default: false },
    // Add other fields as loose schema if strict is not false, but for admin creation this is enough
}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ansari";

async function createAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB at", MONGODB_URI);

        const email = "admin@ansarimatrimonials.com";
        const password = "AdminSecurePassword2024!";

        // check if exists
        const existing = await User.findOne({ email });
        if (existing) {
            console.log("Admin already exists. Updating role...");
            existing.role = 'admin';
            existing.isVerified = true;
            existing.verificationStatus = 'verified';
            existing.isProfileComplete = true;
            existing.password = password; // Reset password
            await existing.save();
            console.log("Admin updated.");
        } else {
            const newAdmin = await User.create({
                name: "Super Admin",
                email,
                password,
                role: 'admin',
                isVerified: true,
                verificationStatus: 'verified',
                isProfileComplete: true,
                phone: "0000000000"
            });
            console.log("Admin created:", newAdmin.email);
        }

        console.log("Admin Credentials:");
        console.log("Email:", email);
        console.log("Password:", password);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();
