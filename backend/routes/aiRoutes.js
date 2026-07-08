import express from 'express';
import { handleChat, analyzeResume } from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Route: POST /api/ai/chat
router.post('/chat', protect, handleChat);

// Route: POST /api/ai/analyze-resume
router.post('/analyze-resume', protect, analyzeResume);

// Route: POST /api/ai/quiz
router.post('/quiz', protect, async (req, res, next) => {
  const { getRoadmapQuiz } = await import('../controllers/aiController.js');
  getRoadmapQuiz(req, res, next);
});

// Route: POST /api/ai/resources
router.post('/resources', protect, async (req, res, next) => {
  const { getRoadmapResources } = await import('../controllers/aiController.js');
  getRoadmapResources(req, res, next);
});

export default router;
