import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from repo root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not defined in .env');
  process.exit(1);
}

const opts = {
  serverSelectionTimeoutMS: 20000,
};

(async () => {
  try {
    console.log('Testing MongoDB connection to:', uri.split('@')[1] || uri);
    await mongoose.connect(uri, opts);
    console.log('Connected to MongoDB successfully.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:');
    console.error(err);
    process.exit(1);
  }
})();
