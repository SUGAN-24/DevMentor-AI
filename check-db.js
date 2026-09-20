import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not defined in .env');
  process.exit(1);
}

// User schema definition
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

(async () => {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log('Connected to MongoDB.');
    const users = await User.find({});
    console.log('Users in database:', users);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error connecting/querying:', err);
    process.exit(1);
  }
})();
