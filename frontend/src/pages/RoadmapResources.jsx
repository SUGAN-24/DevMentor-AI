import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function RoadmapResources() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { topic, phaseTitle, phaseDescription } = location.state || {};
  
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!topic || !phaseTitle) {
      navigate('/roadmaps');
      return;
    }

    const fetchResources = async () => {
      try {
        const response = await api.post('/ai/resources', { topic, phaseTitle, phaseDescription });
        setResources(response.data.data);
      } catch (err) {
        console.error(err);
        setError('Failed to generate resources. Make sure your Gemini API key is configured.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [topic, phaseTitle, phaseDescription, navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400">AI is curating the best resources for you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl text-center">
        <p>{error}</p>
        <button onClick={() => navigate('/roadmaps')} className="mt-4 px-4 py-2 bg-slate-800 rounded-lg text-white hover:bg-slate-700">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="border-b border-slate-800/60 pb-6">
        <button onClick={() => navigate('/roadmaps')} className="text-indigo-400 text-sm hover:text-indigo-300 mb-4 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Roadmaps
        </button>
        <h1 className="text-3xl font-extrabold text-white">{topic} Resources</h1>
        <p className="text-slate-400 mt-2">{phaseTitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res, idx) => (
          <a
            key={idx}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all shadow-xl hover:shadow-indigo-500/10 flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                res.type === 'video' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                res.type === 'documentation' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {res.type}
              </span>
              <svg className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-slate-100 group-hover:text-white mb-2">{res.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed flex-1">{res.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
