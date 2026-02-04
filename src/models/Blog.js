import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    content: { type: String, required: true },
    author: { type: String, default: 'Ansari Team' },
    image: { type: String },
    tags: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
