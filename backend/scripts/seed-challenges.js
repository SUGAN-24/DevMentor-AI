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
  },
  { title: "Binary Search", description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.", difficulty: "Easy", tags: ["Binary Search"], testCases: [{ input: "nums = [-1,0,3,5,9,12], target = 9", expectedOutput: "4" }] },
  { title: "Search a 2D Matrix", description: "Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix.", difficulty: "Medium", tags: ["Binary Search", "Matrix"], testCases: [{ input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", expectedOutput: "true" }] },
  { title: "Koko Eating Bananas", description: "Return the minimum integer k such that she can eat all the bananas within h hours.", difficulty: "Medium", tags: ["Binary Search"], testCases: [{ input: "piles = [3,6,7,11], h = 8", expectedOutput: "4" }] },
  { title: "Find Minimum in Rotated Sorted Array", description: "Given the sorted rotated array nums of unique elements, return the minimum element of this array.", difficulty: "Medium", tags: ["Binary Search"], testCases: [{ input: "nums = [3,4,5,1,2]", expectedOutput: "1" }] },
  { title: "Search in Rotated Sorted Array", description: "Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.", difficulty: "Medium", tags: ["Binary Search"], testCases: [{ input: "nums = [4,5,6,7,0,1,2], target = 0", expectedOutput: "4" }] },
  { title: "Time Based Key-Value Store", description: "Design a time-based key-value data structure that can store multiple values for the same key at different time stamps.", difficulty: "Medium", tags: ["Binary Search", "Design"], testCases: [{ input: "['TimeMap', 'set', 'get']", expectedOutput: "[null, null, 'bar']" }] },
  { title: "Median of Two Sorted Arrays", description: "Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.", difficulty: "Hard", tags: ["Binary Search"], testCases: [{ input: "nums1 = [1,3], nums2 = [2]", expectedOutput: "2.0" }] },
  { title: "Reverse Nodes in k-Group", description: "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.", difficulty: "Hard", tags: ["Linked List"], testCases: [{ input: "head = [1,2,3,4,5], k = 2", expectedOutput: "[2,1,4,3,5]" }] },
  { title: "Merge Two Sorted Lists", description: "Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.", difficulty: "Easy", tags: ["Linked List"], testCases: [{ input: "list1 = [1,2,4], list2 = [1,3,4]", expectedOutput: "[1,1,2,3,4,4]" }] },
  { title: "Reorder List", description: "You are given the head of a singly linked-list. Reorder the list.", difficulty: "Medium", tags: ["Linked List"], testCases: [{ input: "head = [1,2,3,4]", expectedOutput: "[1,4,2,3]" }] },
  { title: "Remove Nth Node From End of List", description: "Given the head of a linked list, remove the nth node from the end of the list and return its head.", difficulty: "Medium", tags: ["Linked List"], testCases: [{ input: "head = [1,2,3,4,5], n = 2", expectedOutput: "[1,2,3,5]" }] },
  { title: "Copy List with Random Pointer", description: "Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes.", difficulty: "Medium", tags: ["Linked List"], testCases: [{ input: "head = [[7,null],[13,0],[11,4]]", expectedOutput: "[[7,null],[13,0],[11,4]]" }] },
  { title: "Add Two Numbers", description: "You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.", difficulty: "Medium", tags: ["Linked List", "Math"], testCases: [{ input: "l1 = [2,4,3], l2 = [5,6,4]", expectedOutput: "[7,0,8]" }] },
  { title: "Linked List Cycle", description: "Given head, the head of a linked list, determine if the linked list has a cycle in it.", difficulty: "Easy", tags: ["Linked List", "Two Pointers"], testCases: [{ input: "head = [3,2,0,-4], pos = 1", expectedOutput: "true" }] },
  { title: "Find the Duplicate Number", description: "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. Return the duplicate number.", difficulty: "Medium", tags: ["Linked List", "Two Pointers"], testCases: [{ input: "nums = [1,3,4,2,2]", expectedOutput: "2" }] },
  { title: "Invert Binary Tree", description: "Given the root of a binary tree, invert the tree, and return its root.", difficulty: "Easy", tags: ["Trees"], testCases: [{ input: "root = [4,2,7,1,3,6,9]", expectedOutput: "[4,7,2,9,6,3,1]" }] },
  { title: "Diameter of Binary Tree", description: "Given the root of a binary tree, return the length of the diameter of the tree.", difficulty: "Easy", tags: ["Trees"], testCases: [{ input: "root = [1,2,3,4,5]", expectedOutput: "3" }] },
  { title: "Balanced Binary Tree", description: "Given a binary tree, determine if it is height-balanced.", difficulty: "Easy", tags: ["Trees"], testCases: [{ input: "root = [3,9,20,null,null,15,7]", expectedOutput: "true" }] },
  { title: "Same Tree", description: "Given the roots of two binary trees p and q, write a function to check if they are the same or not.", difficulty: "Easy", tags: ["Trees"], testCases: [{ input: "p = [1,2,3], q = [1,2,3]", expectedOutput: "true" }] },
  { title: "Subtree of Another Tree", description: "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values.", difficulty: "Easy", tags: ["Trees"], testCases: [{ input: "root = [3,4,5,1,2], subRoot = [4,1,2]", expectedOutput: "true" }] },
  { title: "Binary Tree Right Side View", description: "Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.", difficulty: "Medium", tags: ["Trees", "BFS"], testCases: [{ input: "root = [1,2,3,null,5,null,4]", expectedOutput: "[1,3,4]" }] },
  { title: "Count Good Nodes in Binary Tree", description: "Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.", difficulty: "Medium", tags: ["Trees", "DFS"], testCases: [{ input: "root = [3,1,4,3,null,1,5]", expectedOutput: "4" }] },
  { title: "Validate Binary Search Tree", description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).", difficulty: "Medium", tags: ["Trees", "BST"], testCases: [{ input: "root = [2,1,3]", expectedOutput: "true" }] },
  { title: "Kth Smallest Element in a BST", description: "Given the root of a binary search tree, and an integer k, return the kth smallest value.", difficulty: "Medium", tags: ["Trees", "BST"], testCases: [{ input: "root = [3,1,4,null,2], k = 1", expectedOutput: "1" }] },
  { title: "Construct Binary Tree from Preorder and Inorder Traversal", description: "Given two integer arrays preorder and inorder, construct and return the binary tree.", difficulty: "Medium", tags: ["Trees", "Array"], testCases: [{ input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", expectedOutput: "[3,9,20,null,null,15,7]" }] },
  { title: "Binary Tree Maximum Path Sum", description: "A path in a binary tree is a sequence of nodes. Return the maximum path sum of any non-empty path.", difficulty: "Hard", tags: ["Trees", "DFS"], testCases: [{ input: "root = [1,2,3]", expectedOutput: "6" }] },
  { title: "Implement Trie (Prefix Tree)", description: "A trie (pronounced as 'try') or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.", difficulty: "Medium", tags: ["Trie", "Design"], testCases: [{ input: "['Trie', 'insert', 'search']", expectedOutput: "[null, null, true]" }] },
  { title: "Design Add and Search Words Data Structure", description: "Design a data structure that supports adding new words and finding if a string matches any previously added string.", difficulty: "Medium", tags: ["Trie", "Design"], testCases: [{ input: "['WordDictionary', 'addWord', 'search']", expectedOutput: "[null, null, true]" }] },
  { title: "Word Search II", description: "Given an m x n board of characters and a list of strings words, return all words on the board.", difficulty: "Hard", tags: ["Trie", "Backtracking"], testCases: [{ input: "board = [['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']], words = ['oath','pea','eat','rain']", expectedOutput: "['eat','oath']" }] },
  { title: "K Closest Points to Origin", description: "Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin.", difficulty: "Medium", tags: ["Heap", "Math"], testCases: [{ input: "points = [[1,3],[-2,2]], k = 1", expectedOutput: "[[-2,2]]" }] },
  { title: "Task Scheduler", description: "Given a characters array tasks, representing the tasks a CPU needs to do, and an integer n, return the least number of units of times that the CPU will take.", difficulty: "Medium", tags: ["Heap", "Greedy"], testCases: [{ input: "tasks = ['A','A','A','B','B','B'], n = 2", expectedOutput: "8" }] },
  { title: "Design Twitter", description: "Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.", difficulty: "Medium", tags: ["Heap", "Design"], testCases: [{ input: "['Twitter', 'postTweet', 'getNewsFeed']", expectedOutput: "[null, null, [5]]" }] },
  { title: "Find Median from Data Stream", description: "Implement the MedianFinder class that can add a number to the data structure and return the median.", difficulty: "Hard", tags: ["Heap", "Design"], testCases: [{ input: "['MedianFinder', 'addNum', 'findMedian']", expectedOutput: "[null, null, 1.5]" }] },
  { title: "Subsets", description: "Given an integer array nums of unique elements, return all possible subsets (the power set).", difficulty: "Medium", tags: ["Backtracking"], testCases: [{ input: "nums = [1,2,3]", expectedOutput: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" }] },
  { title: "Combination Sum", description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations where the chosen numbers sum to target.", difficulty: "Medium", tags: ["Backtracking"], testCases: [{ input: "candidates = [2,3,6,7], target = 7", expectedOutput: "[[2,2,3],[7]]" }] },
  { title: "Permutations", description: "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.", difficulty: "Medium", tags: ["Backtracking"], testCases: [{ input: "nums = [1,2,3]", expectedOutput: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" }] },
  { title: "Subsets II", description: "Given an integer array nums that may contain duplicates, return all possible subsets (the power set).", difficulty: "Medium", tags: ["Backtracking"], testCases: [{ input: "nums = [1,2,2]", expectedOutput: "[[],[1],[1,2],[1,2,2],[2],[2,2]]" }] },
  { title: "Combination Sum II", description: "Given a collection of candidate numbers and a target number, find all unique combinations in candidates where the candidate numbers sum to target.", difficulty: "Medium", tags: ["Backtracking"], testCases: [{ input: "candidates = [10,1,2,7,6,1,5], target = 8", expectedOutput: "[[1,1,6],[1,2,5],[1,7],[2,6]]" }] },
  { title: "Word Search", description: "Given an m x n grid of characters board and a string word, return true if word exists in the grid.", difficulty: "Medium", tags: ["Backtracking"], testCases: [{ input: "board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = 'ABCCED'", expectedOutput: "true" }] },
  { title: "Palindrome Partitioning", description: "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.", difficulty: "Medium", tags: ["Backtracking"], testCases: [{ input: "s = 'aab'", expectedOutput: "[['a','a','b'],['aa','b']]" }] },
  { title: "Letter Combinations of a Phone Number", description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.", difficulty: "Medium", tags: ["Backtracking"], testCases: [{ input: "digits = '23'", expectedOutput: "['ad','ae','af','bd','be','bf','cd','ce','cf']" }] },
  { title: "N-Queens", description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.", difficulty: "Hard", tags: ["Backtracking"], testCases: [{ input: "n = 4", expectedOutput: "[['.Q..','...Q','Q...','..Q.'],['..Q.','Q...','...Q','.Q..']]" }] },
  { title: "Max Area of Island", description: "You are given an m x n binary matrix grid. An island is a group of 1's (representing land). Find the maximum area of an island.", difficulty: "Medium", tags: ["Graph", "DFS"], testCases: [{ input: "grid = [[0,1,1,0],[0,1,1,0],[0,0,0,0]]", expectedOutput: "4" }] },
  { title: "Clone Graph", description: "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.", difficulty: "Medium", tags: ["Graph", "DFS"], testCases: [{ input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", expectedOutput: "[[2,4],[1,3],[2,4],[1,3]]" }] },
  { title: "Pacific Atlantic Water Flow", description: "Given an m x n matrix of heights, find all coordinates that can flow to both the Pacific and Atlantic oceans.", difficulty: "Medium", tags: ["Graph", "DFS"], testCases: [{ input: "heights = [[1,2,2],[3,2,3],[2,4,5]]", expectedOutput: "[[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]" }] },
  { title: "Surrounded Regions", description: "Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.", difficulty: "Medium", tags: ["Graph", "DFS"], testCases: [{ input: "board = [['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']]", expectedOutput: "[['X','X','X','X'],['X','X','X','X'],['X','X','X','X'],['X','O','X','X']]" }] },
  { title: "Rotting Oranges", description: "Given an m x n grid, return the minimum number of minutes that must elapse until no cell has a fresh orange.", difficulty: "Medium", tags: ["Graph", "BFS"], testCases: [{ input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", expectedOutput: "4" }] },
  { title: "Walls and Gates", description: "You are given an m x n grid rooms initialized with gates (0) and empty rooms (INF). Fill each empty room with the distance to its nearest gate.", difficulty: "Medium", tags: ["Graph", "BFS"], testCases: [{ input: "rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1]]", expectedOutput: "[[3,-1,0,1],[2,2,1,-1]]" }] },
  { title: "Course Schedule II", description: "Given the total number of courses numCourses and a list of the prerequisite pairs, return the ordering of courses you should take to finish all courses.", difficulty: "Medium", tags: ["Graph", "Topological Sort"], testCases: [{ input: "numCourses = 2, prerequisites = [[1,0]]", expectedOutput: "[0,1]" }] },
  { title: "Redundant Connection", description: "Return an edge that can be removed so that the resulting graph is a tree of n nodes.", difficulty: "Medium", tags: ["Graph", "Union Find"], testCases: [{ input: "edges = [[1,2],[1,3],[2,3]]", expectedOutput: "[2,3]" }] },
  { title: "Number of Connected Components in an Undirected Graph", description: "Given n nodes labeled from 0 to n - 1 and a list of edges, return the number of connected components.", difficulty: "Medium", tags: ["Graph", "Union Find"], testCases: [{ input: "n = 5, edges = [[0,1],[1,2],[3,4]]", expectedOutput: "2" }] }
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
