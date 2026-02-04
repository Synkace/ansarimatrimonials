import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
    type: { type: String, required: true },
    target: { type: String }, // User ID or Profile URL
    details: { type: String, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'resolved', 'dismissed'] },
    submittedBy: { type: String }, // Optional User ID if logged in
}, { timestamps: true });

export default mongoose.models.Report || mongoose.model('Report', ReportSchema);
