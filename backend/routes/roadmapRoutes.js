import express from 'express';
import {
  getRoadmaps,
  getRoadmapById,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap
} from '../controllers/roadmapController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getRoadmaps)
  .post(protect, createRoadmap);

router.route('/:id')
  .get(getRoadmapById)
  .put(protect, updateRoadmap)
  .delete(protect, deleteRoadmap);

export default router;
