import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './index.js';

let aiClient = null;

if (config.gemini.apiKey) {
  try {
    aiClient = new GoogleGenerativeAI(config.gemini.apiKey);
    console.log('[AI] Google Gemini AI Client initialized successfully.');
  } catch (error) {
    console.error(`[AI] Error initializing Google Gemini client: ${error.message}`);
  }
} else {
  console.warn('[AI] WARNING: GEMINI_API_KEY is not defined. AI features will fail until a key is supplied.');
}

export const getGeminiClient = () => {
  if (!aiClient) {
    // If not initialized, try initializing on demand
    if (config.gemini.apiKey) {
      aiClient = new GoogleGenerativeAI(config.gemini.apiKey);
      return aiClient;
    }
    throw new Error('Google Gemini API client is not initialized. Please verify your GEMINI_API_KEY.');
  }
  return aiClient;
};
