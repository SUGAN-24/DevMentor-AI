import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Please add a title (e.g. Frontend Dev Resume)'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Please add the resume content']
    },
    analysisScore: {
      type: Number,
      default: 0
    },
    feedback: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
