import Roadmap from '../models/Roadmap.js';

export const getRoadmaps = async (req, res, next) => {
  try {
    const roadmaps = await Roadmap.find({}).populate('author', 'name email');
    res.json(roadmaps);
  } catch (error) {
    next(error);
  }
};

export const getRoadmapById = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id).populate('author', 'name email');
    if (roadmap) {
      res.json(roadmap);
    } else {
      res.status(404);
      throw new Error('Roadmap not found');
    }
  } catch (error) {
    next(error);
  }
};

export const createRoadmap = async (req, res, next) => {
  try {
    const roadmap = new Roadmap({
      ...req.body,
      author: req.user ? req.user._id : undefined
    });
    const createdRoadmap = await roadmap.save();
    res.status(201).json(createdRoadmap);
  } catch (error) {
    next(error);
  }
};

export const updateRoadmap = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    if (roadmap) {
      // Check author authorization if needed here (skip for simplicity unless requested)
      Object.assign(roadmap, req.body);
      const updatedRoadmap = await roadmap.save();
      res.json(updatedRoadmap);
    } else {
      res.status(404);
      throw new Error('Roadmap not found');
    }
  } catch (error) {
    next(error);
  }
};

export const deleteRoadmap = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    if (roadmap) {
      await roadmap.deleteOne();
      res.json({ message: 'Roadmap removed' });
    } else {
      res.status(404);
      throw new Error('Roadmap not found');
    }
  } catch (error) {
    next(error);
  }
};
