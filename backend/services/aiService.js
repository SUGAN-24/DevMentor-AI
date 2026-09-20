import { getGeminiClient } from '../config/gemini.js';

/**
 * Handles conversational queries to Google Gemini.
 * @param {string} prompt The user's input prompt.
 * @param {Array} history Optional previous conversation history.
 */
export const generateChatResponse = async (prompt, history = []) => {
  try {
    const aiClient = getGeminiClient();
    
    // We use gemini-flash-lite-latest for fast chat responses
    const model = aiClient.getGenerativeModel({
      model: 'gemini-flash-lite-latest',
      systemInstruction: 'You are an expert programming mentor named DevMentor AI. Your goal is to help users learn programming, fix bugs, and understand complex system designs. Keep answers concise, and use markdown code blocks for code snippets.'
    });

    // Formatting history for GoogleGenerativeAI SDK
    // The SDK expects history format: { role: 'user' | 'model', parts: [{ text: string }] }
    let formattedHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Gemini API requires the first message in history to be from the 'user'
    while (formattedHistory.length > 0 && formattedHistory[0].role !== 'user') {
      formattedHistory.shift();
    }

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

/**
 * Generates a multiple-choice quiz for a roadmap phase using Gemini.
 */
export const generateRoadmapQuiz = async (topic, phaseTitle, phaseDescription) => {
  try {
    const aiClient = getGeminiClient();
    const model = aiClient.getGenerativeModel({ model: 'gemini-flash-lite-latest' });

    const prompt = `
      You are an expert programming instructor. Generate a 5-question multiple choice quiz for a student learning about:
      Topic: ${topic}
      Phase: ${phaseTitle}
      Description: ${phaseDescription}

      Return ONLY a JSON array of objects with this exact structure, no markdown wrappers, no other text:
      [
        {
          "question": "The question text",
          "options": ["A", "B", "C", "D"],
          "correctAnswerIndex": 0,
          "explanation": "Why this is correct"
        }
      ]
    `;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' }
    });

    return JSON.parse((await result.response).text());
  } catch (error) {
    console.error('[AI Service] Error generating quiz:', error);
    throw new Error('Failed to generate quiz from AI Service.');
  }
};

/**
 * Generates learning resources for a roadmap phase using Gemini.
 */
export const generateRoadmapResources = async (topic, phaseTitle, phaseDescription) => {
  try {
    const aiClient = getGeminiClient();
    const model = aiClient.getGenerativeModel({ model: 'gemini-flash-lite-latest' });

    const prompt = `
      You are an expert programming instructor. Recommend learning resources for a student learning about:
      Topic: ${topic}
      Phase: ${phaseTitle}
      Description: ${phaseDescription}

      Provide exactly 3 documentation/article links and 2 video search terms or links.
      Return ONLY a JSON array of objects with this exact structure, no markdown wrappers:
      [
        {
          "title": "Resource title",
          "type": "article" | "video" | "documentation",
          "url": "https://...",
          "description": "Short description of what this covers"
        }
      ]
    `;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' }
    });

    return JSON.parse((await result.response).text());
  } catch (error) {
    console.error('[AI Service] Error generating resources:', error);
    throw new Error('Failed to generate resources from AI Service.');
  }
};
