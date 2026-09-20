import React, { useState, useEffect } from 'react';
import { getLeetCodeProblems } from '../services/leetCodeService';

const TOPICS = [
  'All',
  'Arrays',
  'Strings',
  'Trees',
  'Graphs',
  'Dynamic Programming',
  'Binary Search'
];

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];

export default function LeetCodeRecommendations() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const data = await getLeetCodeProblems();
        setProblems(data);
      } catch (error) {
        console.error('Failed to fetch leetcode problems', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const filteredProblems = problems.filter(problem => {
    const topicMatch = selectedTopic === 'All' || problem.topic === selectedTopic;
    const difficultyMatch = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
    return topicMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Hard': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/60 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-[#FFA116]" viewBox="0 0 24 24" fill="currentColor">
              {/* Simplified LeetCode icon approximation */}
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125 2.513 5.277 5.277 0 0 0 1.062 2.362 5.33 5.33 0 0 0 2.107 1.643 5.281 5.281 0 0 0 2.658.267 5.281 5.281 0 0 0 2.385-1.025l8.943-7.533a1.99 1.99 0 0 0 .265-2.784 2.016 2.016 0 0 0-2.825-.213l-8.528 7.184a.972.972 0 0 1-.61.226.963.963 0 0 1-.67-.282.97.97 0 0 1-.264-.67.973.973 0 0 1 .282-.67l3.853-4.127 5.405-5.787a1.381 1.381 0 0 0-.1-1.954 1.37 1.37 0 0 0-.962-.439zm3.179 17.636a1.365 1.365 0 1 0 0 2.731h6.666a1.365 1.365 0 1 0 0-2.731h-6.666z"/>
            </svg>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">LeetCode Prep</h1>
          </div>
          <p className="text-slate-400">Curated problem sets to master DSA concepts and ace your technical interviews.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        
        {/* Difficulty Filters */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filter by Difficulty</label>
          <div className="flex flex-wrap gap-3">
            {DIFFICULTIES.map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedDifficulty === diff 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'bg-slate-950 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Filters */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filter by Topic</label>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map(topic => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                  selectedTopic === topic
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    : 'bg-slate-950 border border-slate-800 text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
        
      </div>

      {/* Problems List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-lg font-bold text-slate-200">
            {selectedTopic === 'All' ? 'All Curated Problems' : `${selectedTopic} Problems`}
          </h2>
          <span className="text-sm font-medium text-slate-500">
            {filteredProblems.length} result{filteredProblems.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filteredProblems.length > 0 ? (
          <div className="grid gap-3">
            {filteredProblems.map((problem) => (
              <a 
                key={problem.id} 
                href={problem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/50 border border-slate-800 rounded-2xl hover:bg-slate-800/80 hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base md:text-lg font-bold text-slate-100 group-hover:text-white flex items-center gap-2">
                    {problem.title}
                    <svg className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors opacity-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {problem.topic}
                    </span>
                  </div>
                </div>
                
                <div className="shrink-0 flex items-center sm:justify-end">
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-800 bg-slate-900/20 rounded-3xl">
            <svg className="w-12 h-12 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-base font-medium text-slate-400">No problems found</h3>
            <p className="text-sm text-slate-500 mt-1">Try selecting different filters.</p>
          </div>
        )}
      </div>

    </div>
  );
}
