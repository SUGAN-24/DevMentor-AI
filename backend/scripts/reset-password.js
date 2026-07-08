import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not defined in .env');
  process.exit(1);
}

const [,, emailArg, newPassword] = process.argv;
if (!emailArg || !newPassword) {
  console.error('Usage: node reset-password.js user@example.com newPassword123');
  process.exit(1);
}

const email = emailArg.toLowerCase().trim();

(async () => {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 20000 });
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found for', email);
      await mongoose.disconnect();
      process.exit(2);
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    console.log('Password reset successfully for', email);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error resetting password:', err);
    process.exit(1);
  }
})();
