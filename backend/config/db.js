import mongoose from 'mongoose';
import { config } from './index.js';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

export const connectDB = async () => {
  try {
    const options = {
      // Give Atlas more time to respond in case of DNS/network delays
      serverSelectionTimeoutMS: 3000,
    };

    try {
      const conn = await mongoose.connect(config.mongodbUri, options);
      console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (err) {
      console.warn(`[Database] Error connecting to MongoDB: ${err.message}. Falling back to memory server...`);
      mongoServer = await MongoMemoryServer.create({ 
        binary: { version: '6.0.14' },
        instance: { launchTimeout: 60000 }
      });
      const uri = mongoServer.getUri();
      await mongoose.disconnect();
      const conn = await mongoose.connect(uri, options);
      console.log(`[Database] MongoDB Memory Server Connected: ${conn.connection.host}`);
    }
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
