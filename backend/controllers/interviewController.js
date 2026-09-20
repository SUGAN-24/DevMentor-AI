import Interview from '../models/Interview.js';

const MOCK_QUESTIONS = [
  { category: 'React', type: 'Technical', question: 'What is the virtual DOM in React?', answer: 'The Virtual DOM is an in-memory representation...' },
  { category: 'Java', type: 'Technical', question: 'Difference between Interface and Abstract Class?', answer: 'Abstract class can have state...' },
  { category: 'React', type: 'HR', question: 'Tell me about a time you learned quickly.', answer: 'Use STAR method.' }
];

export const getInterviews = async (req, res, next) => {
  try {
    let questions = await Interview.find({});
    // Self-seeding for demo purposes
    if (questions.length === 0) {
      questions = await Interview.insertMany(MOCK_QUESTIONS);
    }
    res.json(questions);
  } catch (error) {
    next(error);
  }
};
