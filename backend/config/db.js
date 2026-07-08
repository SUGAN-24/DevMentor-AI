import mongoose from 'mongoose';
import { config } from './index.js';

export const connectDB = async () => {
  try {
    const options = {
      // Give Atlas more time to respond in case of DNS/network delays
      serverSelectionTimeoutMS: 30000,
    };

    const conn = await mongoose.connect(config.mongodbUri, options);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database] Error connecting to MongoDB: ${error.message}`);
    // Print additional details for network-related errors
    if (error.name === 'MongoNetworkError' || /timed out/i.test(error.message)) {
      console.error('[Database] Detailed error:', error);
    }
    // Exit process with failure in production, log only in development
    if (config.nodeEnv === 'production') {
      process.exit(1);
    }
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[Database] MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
  console.error(`[Database] MongoDB connection error: ${err.message}`);
});
