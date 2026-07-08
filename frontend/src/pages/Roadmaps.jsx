import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TOPICS = [
  'Java', 'Python', 'React', 'Node.js', 
  'Full Stack Development', 'Machine Learning', 
  'Data Structures', 'DBMS'
];

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

// Mock data generator for roadmaps
const generateRoadmapData = (topic, level) => {
  const nodeCount = level === 'Beginner' ? 4 : level === 'Intermediate' ? 6 : 8;
  const nodes = [];
  
  for (let i = 1; i <= nodeCount; i++) {
    nodes.push({
      id: i,
      title: `${topic} Phase ${i}: ${level} Concepts`,
      description: `Master the core concepts of phase ${i}. This includes hands-on projects and theoretical foundations essential for ${level.toLowerCase()} ${topic} developers.`,
      duration: `${i * 2} Weeks`
    });
  }

  // Inject some specific mock data for a few known paths to make it look realistic
  if (topic === 'React' && level === 'Beginner') {
    return [
      { id: 1, title: 'HTML, CSS & JS Fundamentals', description: 'Brush up on ES6+, DOM manipulation, flexbox, and grid.', duration: '2 Weeks' },
      { id: 2, title: 'React Basics & JSX', description: 'Understand components, props, state, and the virtual DOM.', duration: '3 Weeks' },
      { id: 3, title: 'Hooks & State Management', description: 'Learn useState, useEffect, useContext, and custom hooks.', duration: '3 Weeks' },
      { id: 4, title: 'Routing & API Fetching', description: 'Implement React Router and fetch data from REST APIs.', duration: '2 Weeks' }
    ];
  }

  return nodes;
};

export default function Roadmaps() {
  const [selectedTopic, setSelectedTopic] = useState('React');
  const [selectedLevel, setSelectedLevel] = useState('Beginner');
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState(generateRoadmapData('React', 'Beginner'));

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      setRoadmap(generateRoadmapData(selectedTopic, selectedLevel));
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="border-b border-slate-800/60 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Learning Roadmaps</h1>
        <p className="text-slate-400 mt-2">Generate customized step-by-step learning paths for your tech stack.</p>
      </div>

      {/* Generator Controls */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Select Topic</label>
            <select 
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
            >
              {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Select Level</label>
            <select 
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
            >
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Generating...
              </>
            ) : (
              'Generate Roadmap'
            )}
          </button>
        </div>
      </div>

      {/* Roadmap Visualization */}
      <div className="pt-8">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-white">
            {selectedLevel} {selectedTopic} Path
          </h2>
          <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider rounded-full">
            {roadmap.length} Milestones
          </span>
        </div>

        {/* Connected Cards Timeline */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-6 space-y-12 pb-8">
          {roadmap.map((node, index) => (
            <div key={node.id} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div className="absolute left-[-9px] top-6 w-4 h-4 rounded-full bg-indigo-500 ring-4 ring-slate-950 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
              
              {/* Card */}
              <div className="bg-slate-900/50 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-6 transition-all duration-300 hover:bg-slate-800/50 shadow-xl group">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1 block">
                      Phase {index + 1}
                    </span>
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors">
                      {node.title}
                    </h3>
                  </div>
                  <div className="shrink-0 bg-slate-950 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-slate-300">{node.duration}</span>
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {node.description}
                </p>
                
                <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-4">
                  <Link 
                    to="/roadmaps/resources" 
                    state={{ topic: selectedTopic, phaseTitle: node.title, phaseDescription: node.description }}
                    className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                  >
                    View Resources
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link 
                    to="/roadmaps/quiz" 
                    state={{ topic: selectedTopic, phaseTitle: node.title, phaseDescription: node.description }}
                    className="text-sm font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    Take Quiz
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
