import express from 'express';
import {
  getUserResumes,
  getResumeById,
  createResume,
  deleteResume
} from '../controllers/resumeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All resume routes require authentication
router.use(protect);

router.route('/')
  .get(getUserResumes)
  .post(createResume);

router.route('/:id')
  .get(getResumeById)
  .delete(deleteResume);

export default router;
