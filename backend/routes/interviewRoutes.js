import express from 'express';
import { getInterviews } from '../controllers/interviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getInterviews);

export default router;
