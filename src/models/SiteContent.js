import mongoose from "mongoose";

const SiteContentSchema = new mongoose.Schema({
    section: { type: String, required: true, unique: true }, // e.g., 'hero', 'footer', 'contact'
    content: { type: mongoose.Schema.Types.Mixed, default: {} }, // Flexible JSON content
    lastUpdatedBy: { type: String, default: 'Admin' }
}, { timestamps: true });

export default mongoose.models.SiteContent || mongoose.model("SiteContent", SiteContentSchema);
