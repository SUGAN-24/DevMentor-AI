import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    type: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Interview', interviewSchema);
