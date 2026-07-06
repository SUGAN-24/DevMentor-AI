import { getGeminiClient } from '../config/gemini.js';

/**
 * Handles conversational queries to Google Gemini.
 * @param {string} prompt The user's input prompt.
 * @param {Array} history Optional previous conversation history.
 */
export const generateChatResponse = async (prompt, history = []) => {
  try {
    const aiClient = getGeminiClient();
    
    // We use gemini-1.5-flash for fast chat responses
    const model = aiClient.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: 'You are an expert programming mentor named DevMentor AI. Your goal is to help users learn programming, fix bugs, and understand complex system designs. Keep answers concise, and use markdown code blocks for code snippets.'
    });

    // Formatting history for GoogleGenerativeAI SDK
    // The SDK expects history format: { role: 'user' | 'model', parts: [{ text: string }] }
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 2000,
      }
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('[AI Service] Error generating chat response:', error);
    throw new Error('Failed to generate response from AI Service.');
  }
};
