import express from 'express';

import aiRoutes from './aiRoutes.js';
import authRoutes from './authRoutes.js';
import challengeRoutes from './challengeRoutes.js';
import roadmapRoutes from './roadmapRoutes.js';
import resumeRoutes from './resumeRoutes.js';
import interviewRoutes from './interviewRoutes.js';
import leetCodeRoutes from './leetCodeRoutes.js';

const router = express.Router();

// Mount routes
router.use('/ai', aiRoutes);
router.use('/auth', authRoutes);
router.use('/challenges', challengeRoutes);
router.use('/roadmaps', roadmapRoutes);
router.use('/resumes', resumeRoutes);
router.use('/interviews', interviewRoutes);
router.use('/leetcode', leetCodeRoutes);

/**
 * @route   GET /api/health
 * @desc    API Healthcheck endpoint
 * @access  Public
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'DevMentor AI API Service is online and healthy',
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});

export default router;
