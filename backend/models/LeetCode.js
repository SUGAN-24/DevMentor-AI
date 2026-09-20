import mongoose from 'mongoose';

const leetCodeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    topic: { type: String, required: true },
    difficulty: { type: String, required: true },
    link: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('LeetCode', leetCodeSchema);
