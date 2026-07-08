import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Challenge from '../models/Challenge.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from repo root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not defined in .env');
  process.exit(1);
}

const opts = {
  serverSelectionTimeoutMS: 20000,
};

const challengesData = [
  // Arrays & Hashing
  {
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'Easy',
    tags: ['Arrays & Hashing'],
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1,2]' }
    ]
  },
  {
    title: 'Contains Duplicate',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    difficulty: 'Easy',
    tags: ['Arrays & Hashing'],
    testCases: [
      { input: 'nums = [1,2,3,1]', expectedOutput: 'true' },
      { input: 'nums = [1,2,3,4]', expectedOutput: 'false' }
    ]
  },
  {
    title: 'Valid Anagram',
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    difficulty: 'Easy',
    tags: ['Arrays & Hashing'],
    testCases: [
      { input: 's = "anagram", t = "nagaram"', expectedOutput: 'true' },
      { input: 's = "rat", t = "car"', expectedOutput: 'false' }
    ]
  },
  {
    title: 'Group Anagrams',
    description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
    difficulty: 'Medium',
    tags: ['Arrays & Hashing'],
    testCases: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]' }
    ]
  },
  {
    title: 'Top K Frequent Elements',
    description: 'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.',
    difficulty: 'Medium',
    tags: ['Arrays & Hashing'],
    testCases: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', expectedOutput: '[1,2]' },
      { input: 'nums = [4,1,1,1,2,2,3], k = 1', expectedOutput: '[1]' }
    ]
  },

  // Stack
  {
    title: 'Valid Parentheses',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    difficulty: 'Easy',
    tags: ['Stack'],
    testCases: [
      { input: 's = "()"', expectedOutput: 'true' },
      { input: 's = "()[]{}"', expectedOutput: 'true' },
      { input: 's = "([{}])"', expectedOutput: 'true' }
    ]
  },
  {
    title: 'Min Stack',
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
    difficulty: 'Medium',
    tags: ['Stack'],
    testCases: [
      { input: '["MinStack","push","push","push","getMin","pop","top","getMin"]', expectedOutput: '[null,null,null,null,-3,null,0,-2]' }
    ]
  },
  {
    title: 'Evaluate Reverse Polish Notation',
    description: 'Evaluate the value of an arithmetic expression in Reverse Polish Notation.',
    difficulty: 'Medium',
    tags: ['Stack'],
    testCases: [
      { input: 'tokens = ["2","1","+","3","*"]', expectedOutput: '9' },
      { input: 'tokens = ["4","13","5","/","+"]', expectedOutput: '6' }
    ]
  },
  {
    title: 'Largest Rectangle in Histogram',
    description: 'Given an array of integers heights representing the histogram\'s bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.',
    difficulty: 'Hard',
    tags: ['Stack'],
    testCases: [
      { input: 'heights = [2,1,5,6,2,3]', expectedOutput: '10' }
    ]
  },

  // Linked List
  {
    title: 'Reverse Linked List',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    difficulty: 'Easy',
    tags: ['Linked List'],
    testCases: [
      { input: 'head = [1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]' }
    ]
  },
  {
    title: 'LRU Cache',
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
    difficulty: 'Medium',
    tags: ['Linked List', 'Design'],
    testCases: [
      { input: '["LRUCache", "put", "put", "get"]\n[[2], [1, 1], [2, 2], [1]]', expectedOutput: '[null, null, null, 1]' }
    ]
  },
  {
    title: 'Merge K Sorted Lists',
    description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    difficulty: 'Hard',
    tags: ['Linked List', 'Heap'],
    testCases: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', expectedOutput: '[1,1,2,3,4,4,5,6]' }
    ]
  },

  // Trees & BFS
  {
    title: 'Binary Tree Level Order Traversal',
    description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values. (i.e., from left to right, level by level).',
    difficulty: 'Medium',
    tags: ['Trees', 'BFS'],
    testCases: [
      { input: 'root = [3,9,20,null,null,15,7]', expectedOutput: '[[3],[9,20],[15,7]]' }
    ]
  },
  {
    title: 'Maximum Depth of Binary Tree',
    description: 'Given the root of a binary tree, return its maximum depth.',
    difficulty: 'Easy',
    tags: ['Trees', 'DFS'],
    testCases: [
      { input: 'root = [3,9,20,null,null,15,7]', expectedOutput: '3' }
    ]
  },
  {
    title: 'Lowest Common Ancestor of a Binary Search Tree',
    description: 'Given a binary search tree (BST) of unique values, find the lowest common ancestor (LCA) of two given nodes in the BST.',
    difficulty: 'Medium',
    tags: ['Trees', 'BST'],
    testCases: [
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', expectedOutput: '6' }
    ]
  },
  {
    title: 'Serialize and Deserialize Binary Tree',
    description: 'Design an algorithm to serialize and deserialize a binary tree.',
    difficulty: 'Hard',
    tags: ['Trees', 'Design'],
    testCases: [
      { input: 'root = [1,2,3,null,null,4,5]', expectedOutput: '[1,2,3,null,null,4,5]' }
    ]
  },

  // Two Pointers & Array
  {
    title: 'Trapping Rain Water',
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    difficulty: 'Hard',
    tags: ['Two Pointers', 'Array'],
    testCases: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6' }
    ]
  },
  {
    title: '3Sum',
    description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
    difficulty: 'Medium',
    tags: ['Two Pointers', 'Array'],
    testCases: [
      { input: 'nums = [-1,0,1,2,-1,-4]', expectedOutput: '[[-1,-1,2],[-1,0,1]]' }
    ]
  },
  {
    title: 'Container With Most Water',
    description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).',
    difficulty: 'Medium',
    tags: ['Two Pointers'],
    testCases: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', expectedOutput: '49' }
    ]
  },

  // Dynamic Programming
  {
    title: 'Climbing Stairs',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    difficulty: 'Easy',
    tags: ['Dynamic Programming'],
    testCases: [
      { input: 'n = 2', expectedOutput: '2' },
      { input: 'n = 3', expectedOutput: '3' }
    ]
  },
  {
    title: 'Coin Change',
    description: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.',
    difficulty: 'Medium',
    tags: ['Dynamic Programming'],
    testCases: [
      { input: 'coins = [1,2,5], amount = 5', expectedOutput: '1' },
      { input: 'coins = [2], amount = 3', expectedOutput: '-1' }
    ]
  },
  {
    title: 'Longest Increasing Subsequence',
    description: 'Given an integer array nums, return the length of the longest strictly increasing subsequence.',
    difficulty: 'Medium',
    tags: ['Dynamic Programming'],
    testCases: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', expectedOutput: '4' }
    ]
  },
  {
    title: 'Edit Distance',
    description: 'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.',
    difficulty: 'Hard',
    tags: ['Dynamic Programming', 'String'],
    testCases: [
      { input: 'word1 = "horse", word2 = "ros"', expectedOutput: '3' }
    ]
  },

  // String
  {
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    difficulty: 'Medium',
    tags: ['String', 'Sliding Window'],
    testCases: [
      { input: 's = "abcabcbb"', expectedOutput: '3' },
      { input: 's = "bbbbb"', expectedOutput: '1' }
    ]
  },
  {
    title: 'Regular Expression Matching',
    description: 'Given an input string s and a pattern p, implement regular expression matching with support for \'.\' and \'*\'.',
    difficulty: 'Hard',
    tags: ['String', 'Dynamic Programming'],
    testCases: [
      { input: 's = "aa", p = "a"', expectedOutput: 'false' },
      { input: 's = "aa", p = "a*"', expectedOutput: 'true' }
    ]
  },

  // Graph
  {
    title: 'Number of Islands',
    description: 'Given an m x n 2D binary grid grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands.',
    difficulty: 'Medium',
    tags: ['Graph', 'BFS', 'DFS'],
    testCases: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expectedOutput: '1' }
    ]
  },
  {
    title: 'Course Schedule',
    description: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.',
    difficulty: 'Medium',
    tags: ['Graph', 'Topological Sort'],
    testCases: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', expectedOutput: 'true' }
    ]
  },
  {
    title: 'Word Ladder',
    description: 'Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.',
    difficulty: 'Hard',
    tags: ['Graph', 'BFS'],
    testCases: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', expectedOutput: '5' }
    ]
  },

  // Heap
  {
    title: 'Kth Largest Element in an Array',
    description: 'Given an integer array nums and an integer k, return the kth largest element in the array.',
    difficulty: 'Medium',
    tags: ['Heap', 'Sorting'],
    testCases: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', expectedOutput: '5' }
    ]
  },
  {
    title: 'Reorganize String',
    description: 'Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.',
    difficulty: 'Medium',
    tags: ['Heap', 'Greedy'],
    testCases: [
      { input: 's = "aab"', expectedOutput: '"aba"' }
    ]
  },

  // Bit Manipulation
  {
    title: 'Number of 1 Bits',
    description: 'Write a function that takes an unsigned integer and returns the number of \'1\' bits it has.',
    difficulty: 'Easy',
    tags: ['Bit Manipulation'],
    testCases: [
      { input: 'n = 11 (binary: 1011)', expectedOutput: '3' }
    ]
  },
  {
    title: 'Single Number',
    description: 'Given a non-empty array of integers nums, every element appears twice except for one element that appears once. Find that single element.',
    difficulty: 'Easy',
    tags: ['Bit Manipulation'],
    testCases: [
      { input: 'nums = [2,2,1]', expectedOutput: '1' }
    ]
  }
];

(async () => {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(uri, opts);
    console.log('[Seed] Connected to MongoDB successfully.');

    // Clear existing challenges
    await Challenge.deleteMany({});
    console.log('[Seed] Cleared existing challenges');

    // Insert new challenges
    const createdChallenges = await Challenge.insertMany(challengesData);
    console.log(`[Seed] ✅ Successfully added ${createdChallenges.length} challenges`);

    // Print summary
    const stats = {};
    createdChallenges.forEach(challenge => {
      challenge.tags.forEach(tag => {
        stats[tag] = (stats[tag] || 0) + 1;
      });
    });

    console.log('\n[Seed] Challenges by domain:');
    Object.entries(stats)
      .sort((a, b) => b[1] - a[1])
      .forEach(([domain, count]) => {
        console.log(`  • ${domain}: ${count} challenges`);
      });

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('[Seed] Error:', err);
    process.exit(1);
  }
})();
