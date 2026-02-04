import mongoose from 'mongoose';

const FaqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, default: 'General' },
}, { timestamps: true });

export default mongoose.models.Faq || mongoose.model('Faq', FaqSchema);
