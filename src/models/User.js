import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true }, // Optional if using mobile OTP only, but user asked for NextAuth
    password: { type: String, select: false },
    image: { type: String },
    role: { type: String, default: 'user', enum: ['user', 'admin', 'agent'] },
    agentId: { type: String }, // ID of the agent managing this user

    isVerified: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
    unlockedProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    managedBy: { type: String, default: 'Self' },

    aadhaarNumber: { type: String, select: false },
    aadhaarImage: { type: String, select: false },

    moonPhase: { type: Number, default: 0 },
    bio: { type: String, default: 'No bio provided.' },
    phone: { type: String },

    gender: { type: String, enum: ['male', 'female'] },
    height: { type: Number }, // In cm
    maritalStatus: { type: String, enum: ['single', 'divorced', 'widowed', 'awaiting_divorce'] },
    education: { type: String },
    sect: { type: String },
    caste: { type: String }, // Optional
    prayerFrequency: { type: String, enum: ['5x', 'sometimes', 'jummah_only', 'rarely'] },

    location: { type: String },
    age: { type: Number },
    occupation: { type: String },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
