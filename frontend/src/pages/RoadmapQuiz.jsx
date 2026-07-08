import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function RoadmapQuiz() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { topic, phaseTitle, phaseDescription } = location.state || {};
  
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!topic || !phaseTitle) {
      navigate('/roadmaps');
      return;
    }

    const fetchQuiz = async () => {
      try {
        const response = await api.post('/ai/quiz', { topic, phaseTitle, phaseDescription });
        setQuestions(response.data.data);
      } catch (err) {
        console.error(err);
        setError('Failed to generate quiz. Make sure your Gemini API key is configured.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [topic, phaseTitle, phaseDescription, navigate]);

  const handleSelectOption = (optIndex) => {
    if (isFinished) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) score++;
    });
    return score;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400">AI is generating your quiz...</p>
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

  if (isFinished) {
    const score = calculateScore();
    return (
      <div className="max-w-2xl mx-auto bg-slate-900/50 border border-slate-800 p-8 rounded-3xl text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
        <p className="text-slate-400 mb-8">{phaseTitle}</p>
        
        <div className="w-48 h-48 mx-auto relative flex items-center justify-center mb-8">
          <div className="absolute inset-0 border-8 border-slate-800 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-indigo-500 rounded-full" style={{ clipPath: `polygon(0 0, 100% 0, 100% ${(score/questions.length)*100}%, 0 ${(score/questions.length)*100}%)` }}></div>
          <span className="text-5xl font-black text-white">{score}/{questions.length}</span>
        </div>

        <div className="space-y-4 mb-8 text-left">
          {questions.map((q, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <p className="font-semibold text-slate-200 mb-2">{q.question}</p>
              <p className="text-sm">
                Your answer: <span className={selectedAnswers[idx] === q.correctAnswerIndex ? 'text-emerald-400' : 'text-red-400'}>{q.options[selectedAnswers[idx]]}</span>
              </p>
              {selectedAnswers[idx] !== q.correctAnswerIndex && (
                <p className="text-sm text-emerald-400">Correct answer: {q.options[q.correctAnswerIndex]}</p>
              )}
              <p className="text-sm text-slate-500 mt-2">{q.explanation}</p>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/roadmaps')} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-colors">
          Back to Roadmaps
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="border-b border-slate-800/60 pb-6">
        <h1 className="text-3xl font-extrabold text-white">{topic} Quiz</h1>
        <p className="text-slate-400 mt-2">{phaseTitle}</p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm font-bold text-indigo-400 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {questions.length}</span>
        </div>

        <h3 className="text-xl font-medium text-white mb-8">{currentQ.question}</h3>

        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedAnswers[currentQuestionIndex] === idx 
                  ? 'border-indigo-500 bg-indigo-500/10 text-white' 
                  : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500 hover:bg-slate-900'
              }`}
            >
              <span className="inline-block w-6 font-mono text-slate-500 mr-2">{['A','B','C','D'][idx]}.</span>
              {opt}
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestionIndex] === undefined}
            className="px-6 py-3 bg-indigo-600 disabled:opacity-50 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center gap-2"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
