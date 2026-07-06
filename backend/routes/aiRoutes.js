import express from 'express';
import { handleChat, analyzeResume } from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Route: POST /api/ai/chat
router.post('/chat', protect, handleChat);

// Route: POST /api/ai/analyze-resume
router.post('/analyze-resume', protect, analyzeResume);

export default router;
