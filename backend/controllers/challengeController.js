import Challenge from '../models/Challenge.js';

export const getChallenges = async (req, res, next) => {
  try {
    const challenges = await Challenge.find({});
    res.json(challenges);
  } catch (error) {
    next(error);
  }
};

export const getChallengeById = async (req, res, next) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (challenge) {
      res.json(challenge);
    } else {
      res.status(404);
      throw new Error('Challenge not found');
    }
  } catch (error) {
    next(error);
  }
};

export const createChallenge = async (req, res, next) => {
  try {
    const challenge = new Challenge(req.body);
    const createdChallenge = await challenge.save();
    res.status(201).json(createdChallenge);
  } catch (error) {
    next(error);
  }
};

export const updateChallenge = async (req, res, next) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (challenge) {
      Object.assign(challenge, req.body);
      const updatedChallenge = await challenge.save();
      res.json(updatedChallenge);
    } else {
      res.status(404);
      throw new Error('Challenge not found');
    }
  } catch (error) {
    next(error);
  }
};

export const deleteChallenge = async (req, res, next) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (challenge) {
      await challenge.deleteOne();
      res.json({ message: 'Challenge removed' });
    } else {
      res.status(404);
      throw new Error('Challenge not found');
    }
  } catch (error) {
    next(error);
  }
};
