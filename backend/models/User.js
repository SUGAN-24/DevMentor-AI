import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ['user', 'mentor', 'admin'],
      default: 'user',
    },
    avatar: {
      type: String,
      default: function() {
        // Generate a simple avatar based on the name
        const encodedName = encodeURIComponent(this.name || 'User');
        return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&size=128`;
      }
    },
    bio: {
      type: String,
      default: '',
      maxlength: [500, 'Bio cannot be more than 500 characters']
    },
    skills: {
      type: [String],
      default: []
    },
    problemsSolved: {
      type: Number,
      default: 0
    },
    learningStreak: {
      type: Number,
      default: 0
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it's modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
