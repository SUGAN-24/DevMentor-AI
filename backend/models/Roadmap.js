import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title for the roadmap'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please add a description']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    steps: [
      {
        title: {
          type: String,
          required: true
        },
        details: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Roadmap = mongoose.model('Roadmap', roadmapSchema);

export default Roadmap;
