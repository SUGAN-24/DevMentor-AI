import React, { useState } from 'react';

const CATEGORIES = [
  'Java', 'Python', 'React', 'Node.js', 
  'DBMS', 'Operating Systems', 'Computer Networks'
];

const QUESTION_TYPES = ['Technical', 'HR', 'Aptitude'];

// Generate some mock questions to demonstrate the UI
const MOCK_QUESTIONS = [
  {
    id: 1,
    category: 'React',
    type: 'Technical',
    question: 'What is the virtual DOM in React, and how does it improve performance?',
    answer: 'The Virtual DOM is an in-memory representation of the Real DOM. React compares the updated Virtual DOM with the pre-update version (diffing), determines exactly what changed, and then updates only those specific parts of the Real DOM (reconciliation). This minimizes expensive direct DOM manipulations, significantly boosting performance.'
  },
  {
    id: 2,
    category: 'React',
    type: 'Technical',
    question: 'Explain the difference between useEffect and useLayoutEffect.',
    answer: '`useEffect` runs asynchronously AFTER the browser has painted the DOM. It is good for data fetching and most side effects. `useLayoutEffect` runs synchronously IMMEDIATELY after DOM mutations but before the browser paints. It should only be used when you need to read layout from the DOM and synchronously re-render to prevent flickering.'
  },
  {
    id: 3,
    category: 'Java',
    type: 'Technical',
    question: 'What is the difference between an Interface and an Abstract Class in Java?',
    answer: 'An abstract class can have both abstract and concrete methods, and can contain instance variables. A class can extend only one abstract class. An interface (prior to Java 8) could only have abstract methods, but now supports default and static methods. A class can implement multiple interfaces.'
  },
  {
    id: 4,
    category: 'DBMS',
    type: 'Technical',
    question: 'Explain the concept of ACID properties in Database Management Systems.',
    answer: 'ACID stands for Atomicity (all operations in a transaction succeed or none do), Consistency (database moves from one valid state to another), Isolation (concurrent transactions do not interfere with each other), and Durability (once committed, data is saved permanently even in crashes).'
  },
  {
    id: 5,
    category: 'Node.js',
    type: 'Technical',
    question: 'How does Node.js handle concurrency despite being single-threaded?',
    answer: 'Node.js uses an event-driven, non-blocking I/O model. It has a single main thread that executes JavaScript code, but delegates heavy I/O operations (like file system access or network requests) to the internal C++ thread pool (libuv). When the I/O operation completes, a callback is pushed to the event queue, which the event loop eventually executes.'
  },
  // Generic HR Questions
  {
    id: 101,
    category: 'React', // Showing HR under all to simplify, or mapped specific
    type: 'HR',
    question: 'Tell me about a time you had to learn a new technology (like React) under a tight deadline.',
    answer: 'Focus on the STAR method: Situation (project needs), Task (learn React in 1 week), Action (took crash courses, read official docs, built small prototypes), Result (successfully delivered the feature on time and shared knowledge with the team).'
  },
  {
    id: 102,
    category: 'Java',
    type: 'HR',
    question: 'How do you handle disagreements with a senior developer regarding system architecture?',
    answer: 'Emphasize communication and objective reasoning. Explain that you would ask questions to understand their perspective, present your own arguments backed by data or documentation, and ultimately support the team\'s final decision gracefully.'
  },
  // Aptitude
  {
    id: 201,
    category: 'Operating Systems',
    type: 'Aptitude',
    question: 'If a computer processes 1,000 instructions per second, how many instructions does it process in 2.5 minutes?',
    answer: '2.5 minutes = 150 seconds. 150 seconds * 1,000 instructions/second = 150,000 instructions.'
  },
  {
    id: 202,
    category: 'Python',
    type: 'Aptitude',
    question: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
    answer: '42. The differences are 4, 6, 8, 10... so the next difference is 12. 30 + 12 = 42.'
  }
];

export default function InterviewPrep() {
  const [selectedCategory, setSelectedCategory] = useState('React');
  const [selectedType, setSelectedType] = useState('Technical');
  const [revealedAnswers, setRevealedAnswers] = useState(new Set());

  // Filter questions based on selections
  const filteredQuestions = MOCK_QUESTIONS.filter(
    (q) => q.category === selectedCategory && q.type === selectedType
  );

  const toggleAnswer = (id) => {
    setRevealedAnswers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="border-b border-slate-800/60 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Interview Preparation</h1>
        <p className="text-slate-400 mt-2">Practice Technical, HR, and Aptitude questions across major domains to ace your interviews.</p>
      </div>

      {/* Filters Area */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Question Type Filter */}
        <div className="space-y-3 relative z-10">
          <label className="text-sm font-semibold text-slate-300 uppercase tracking-widest">Question Type</label>
          <div className="flex flex-wrap gap-3">
            {QUESTION_TYPES.map(type => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setRevealedAnswers(new Set()); // Reset reveals on type change
                }}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                  selectedType === type
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-950 border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-3 relative z-10">
          <label className="text-sm font-semibold text-slate-300 uppercase tracking-widest">Domain / Technology</label>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setRevealedAnswers(new Set()); // Reset reveals on category change
                }}
                className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-inner'
                    : 'bg-slate-950/50 border border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {selectedCategory} - {selectedType} Questions
          </h2>
          <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg border border-slate-700">
            {filteredQuestions.length} Items
          </span>
        </div>

        {filteredQuestions.length > 0 ? (
          <div className="grid gap-6">
            {filteredQuestions.map((q, index) => {
              const isRevealed = revealedAnswers.has(q.id);
              return (
                <div 
                  key={q.id} 
                  className="bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden"
                >
                  <div className="flex gap-4">
                    <span className="text-3xl font-black text-slate-800 select-none">
                      Q{index + 1}
                    </span>
                    <div className="flex-1 space-y-4">
                      
                      {/* Question Text */}
                      <h3 className="text-lg md:text-xl font-bold text-slate-100 leading-snug">
                        {q.question}
                      </h3>

                      {/* Answer Area (Hidden / Revealed) */}
                      <div className={`transition-all duration-500 ease-in-out ${isRevealed ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <div className="p-5 bg-slate-950 border border-indigo-500/20 rounded-2xl relative">
                          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 rounded-l-2xl"></div>
                          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2 block">Answer Guidelines</span>
                          <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                            {q.answer}
                          </p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-4 border-t border-slate-800/60 mt-4">
                        <button
                          onClick={() => toggleAnswer(q.id)}
                          className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                            isRevealed 
                              ? 'text-slate-400 hover:text-slate-300' 
                              : 'text-indigo-400 hover:text-indigo-300'
                          }`}
                        >
                          <svg 
                            className={`w-5 h-5 transition-transform duration-300 ${isRevealed ? 'rotate-180' : ''}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          {isRevealed ? 'Hide Answer' : 'Reveal Answer'}
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-16 border border-dashed border-slate-800 bg-slate-900/20 rounded-3xl">
            <svg className="w-16 h-16 text-slate-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-lg font-medium text-slate-400">More questions coming soon!</h3>
            <p className="text-sm text-slate-600 mt-1 max-w-sm text-center">We are continuously adding new {selectedType.toLowerCase()} questions for {selectedCategory}. Check back later.</p>
          </div>
        )}
      </div>

    </div>
  );
}
