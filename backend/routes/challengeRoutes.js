import express from 'express';
import {
  getChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge
} from '../controllers/challengeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getChallenges)
  .post(protect, createChallenge);

router.route('/:id')
  .get(getChallengeById)
  .put(protect, updateChallenge)
  .delete(protect, deleteChallenge);

export default router;
