import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
    couple: { type: String, required: true },
    story: { type: String, required: true },
    image: { type: String }, // URL or Path
}, { timestamps: true });

export default mongoose.models.Story || mongoose.model('Story', StorySchema);
