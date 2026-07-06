import dotenv from 'dotenv';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env in the root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const requiredEnv = ['JWT_SECRET'];

// Validate that required env variables are present (optional warnings for development, throw in production)
const missingEnv = requiredEnv.filter((envVar) => !process.env[envVar]);

if (missingEnv.length > 0) {
  const errorMessage = `Missing required environment variables: ${missingEnv.join(', ')}`;
  if (process.env.NODE_ENV === 'production') {
    throw new Error(errorMessage);
  } else {
    console.warn(`[WARNING] ${errorMessage}`);
  }
}

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/devmentor',
  jwt: {
    secret: process.env.JWT_SECRET || 'devmentor_secret_key_for_local_development_only',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
  },
};
