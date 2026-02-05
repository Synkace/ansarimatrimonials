import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: { type: String },
    lastMessageAt: { type: Date, default: Date.now },
    unreadCount: { type: Map, of: Number }, // Map userId -> count
}, { timestamps: true });

export default mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);
