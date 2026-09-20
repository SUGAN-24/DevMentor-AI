import express from 'express';
import { getLeetCode } from '../controllers/leetCodeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getLeetCode);

export default router;
