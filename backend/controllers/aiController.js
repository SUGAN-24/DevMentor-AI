import { generateChatResponse } from '../services/aiService.js';
import { getGeminiClient } from '../config/gemini.js';

/**
 * @desc    Handle chat message and interact with Gemini AI
 * @route   POST /api/ai/chat
 * @access  Public
 */
export const handleChat = async (req, res, next) => {
  try {
    const { prompt, history } = req.body;

    if (!prompt) {
      res.status(400);
      throw new Error('Please provide a prompt message.');
    }

    const aiResponse = await generateChatResponse(prompt, history || []);

    res.status(200).json({
      success: true,
      data: {
        text: aiResponse,
        role: 'model'
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Analyze uploaded resume PDF using Gemini 1.5 Flash
 * @route   POST /api/ai/analyze-resume
 * @access  Public
 */
export const analyzeResume = async (req, res, next) => {
  try {
    const { pdfBase64 } = req.body;

    if (!pdfBase64) {
      res.status(400);
      throw new Error('Please provide the resume PDF as a base64 encoded string.');
    }

    const aiClient = getGeminiClient();
    const model = aiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      Analyze the provided software engineering/developer resume.
      Evaluate the resume formatting, structure, and readability.
      Provide a response in JSON format strictly matching the following schema:
      {
        "atsScore": number (out of 100 representing how well optimized it is for technical recruitment systems),
        "summary": string (a concise 2-3 sentence summary of the resume evaluation),
        "missingSkills": string[] (a list of typical technical skills, frameworks, or tools the candidate is missing for a modern software engineering career path based on their profile),
        "improvements": string[] (a list of actionable structural, grammatical, or formatting improvements to optimize their resume)
      }
    `;

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                data: pdfBase64,
                mimeType: 'application/pdf'
              }
            },
            { text: prompt }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json'
      }
    });

    const response = await result.response;
    const jsonText = response.text();

    // Parse safety check
    let parsedData;
    try {
      parsedData = JSON.parse(jsonText);
    } catch (e) {
      throw new Error('AI returned an invalid JSON response structure.');
    }

    res.status(200).json({
      success: true,
      data: parsedData
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Generate a quiz for a roadmap phase
 * @route   POST /api/ai/quiz
 * @access  Public (Protected via auth in routes)
 */
export const getRoadmapQuiz = async (req, res, next) => {
  try {
    const { topic, phaseTitle, phaseDescription } = req.body;
    if (!topic || !phaseTitle) {
      res.status(400);
      throw new Error('Please provide topic and phaseTitle.');
    }

    // Dynamic import to avoid circular dependencies if any, but since we are in controller we can just import at top.
    // Wait, let's just import it at the top of the file in another chunk.
    const { generateRoadmapQuiz } = await import('../services/aiService.js');
    
    const quiz = await generateRoadmapQuiz(topic, phaseTitle, phaseDescription);
    
    res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Generate resources for a roadmap phase
 * @route   POST /api/ai/resources
 * @access  Public (Protected via auth in routes)
 */
export const getRoadmapResources = async (req, res, next) => {
  try {
    const { topic, phaseTitle, phaseDescription } = req.body;
    if (!topic || !phaseTitle) {
      res.status(400);
      throw new Error('Please provide topic and phaseTitle.');
    }

    const { generateRoadmapResources } = await import('../services/aiService.js');
    
    const resources = await generateRoadmapResources(topic, phaseTitle, phaseDescription);
    
    res.status(200).json({
      success: true,
      data: resources
    });
  } catch (error) {
    next(error);
  }
};
