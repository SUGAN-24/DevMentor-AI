import React, { useState, useEffect } from 'react';
import { getChallenges } from '../services/challengeService';

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const data = await getChallenges();
        setChallenges(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching challenges:', err);
        setError('Failed to load challenges. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          challenge.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = filterDifficulty === 'All' || challenge.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
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
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/60 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Coding Challenges</h1>
          <p className="text-slate-400">Master algorithms and data structures to prepare for your next interview.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-700/30 rounded-2xl text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/50 p-4 border border-slate-800 rounded-2xl">
        {/* Search */}
        <div className="relative w-full sm:w-96 shrink-0">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by title or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="w-full sm:w-auto flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 sm:pb-0">
          {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                filterDifficulty === diff 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'bg-slate-950 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 mx-auto border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-slate-400">Loading challenges...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Challenge Count */}
          <div className="text-sm text-slate-400">
            Showing <span className="text-indigo-400 font-semibold">{filteredChallenges.length}</span> of <span className="text-slate-300 font-semibold">{challenges.length}</span> challenges
          </div>

          {/* Grid of Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map(challenge => (
            <div key={challenge._id} className="group relative flex flex-col justify-between bg-slate-900/40 border border-slate-800 rounded-3xl p-6 hover:bg-slate-800/60 hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300 shadow-xl overflow-hidden">
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-transparent group-hover:from-indigo-500/5 transition-colors duration-500"></div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-1">{challenge.title}</h3>
                  <span className={`shrink-0 px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>
                
                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                  {challenge.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {challenge.tags?.map((tag, idx) => (
                    <div key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-medium">
                      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {tag}
                    </div>
                  ))}
                </div>

                {/* Test Case Preview */}
                {challenge.testCases && challenge.testCases.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 shadow-inner">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Input</span>
                      <code className="text-xs text-emerald-400 font-mono break-all">{challenge.testCases[0].input}</code>
                    </div>
                    <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 shadow-inner">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Output</span>
                      <code className="text-xs text-amber-400 font-mono break-all">{challenge.testCases[0].expectedOutput}</code>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="relative z-10 pt-6 mt-auto">
                <button className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-200 font-semibold border border-slate-700 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white transition-all shadow-lg">
                  Solve Challenge
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-12 border border-dashed border-slate-700 rounded-3xl bg-slate-900/20">
            <svg className="w-16 h-16 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-slate-300">No challenges found</h3>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
          </div>
        </>
      )}
    </div>
  );
}