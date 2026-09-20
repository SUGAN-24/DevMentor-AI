import api from './api';
import axios from 'axios';

// Get base URL for requests that might not use the configured instance
const baseURL = api.defaults.baseURL || '/api';

export const sendChatMessage = async (prompt, history = []) => {
  const response = await api.post('/ai/chat', { prompt, history });
  return response.data;
};

// Needs to be multipart/form-data for file upload if we change backend to use multer,
// But backend aiController currently expects { pdfBase64: string }
export const analyzeResume = async (pdfBase64) => {
  const response = await api.post('/ai/analyze-resume', { pdfBase64 });
  return response.data;
};

export const getRoadmapQuiz = async (topic, phaseTitle, phaseDescription) => {
  const response = await api.post('/ai/quiz', { topic, phaseTitle, phaseDescription });
  return response.data;
};

export const getRoadmapResources = async (topic, phaseTitle, phaseDescription) => {
  const response = await api.post('/ai/resources', { topic, phaseTitle, phaseDescription });
  return response.data;
};
