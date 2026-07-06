import Resume from '../models/Resume.js';

export const getUserResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user._id });
    res.json(resumes);
  } catch (error) {
    next(error);
  }
};

export const getResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (resume) {
      // Ensure user owns resume
      if (resume.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to view this resume');
      }
      res.json(resume);
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  } catch (error) {
    next(error);
  }
};

export const createResume = async (req, res, next) => {
  try {
    const resume = new Resume({
      ...req.body,
      user: req.user._id
    });
    const createdResume = await resume.save();
    res.status(201).json(createdResume);
  } catch (error) {
    next(error);
  }
};

export const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (resume) {
      if (resume.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to delete this resume');
      }
      await resume.deleteOne();
      res.json({ message: 'Resume removed' });
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  } catch (error) {
    next(error);
  }
};
