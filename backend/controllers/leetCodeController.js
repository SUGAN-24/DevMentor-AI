import LeetCode from '../models/LeetCode.js';

const MOCK_PROBLEMS = [
  { title: 'Two Sum', topic: 'Arrays', difficulty: 'Easy', link: 'https://leetcode.com/problems/two-sum/' },
  { title: 'Valid Anagram', topic: 'Strings', difficulty: 'Easy', link: 'https://leetcode.com/problems/valid-anagram/' },
  { title: 'Clone Graph', topic: 'Graphs', difficulty: 'Medium', link: 'https://leetcode.com/problems/clone-graph/' }
];

export const getLeetCode = async (req, res, next) => {
  try {
    let problems = await LeetCode.find({});
    // Self-seeding for demo purposes
    if (problems.length === 0) {
      problems = await LeetCode.insertMany(MOCK_PROBLEMS);
    }
    res.json(problems);
  } catch (error) {
    next(error);
  }
};
