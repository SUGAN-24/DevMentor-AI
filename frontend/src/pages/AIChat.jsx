import React, { useState, useRef, useEffect } from 'react';

// A simple utility to render markdown code blocks to basic HTML for our chat
const parseMessage = (text) => {
  if (!text) return '';
  // Basic parsing for code blocks
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, index) => {
    if (part.startsWith('```') && part.endsWith('```')) {
      const content = part.replace(/^```[a-z]*\n?/i, '').replace(/```$/, '');
      return (
        <pre key={index} className="bg-slate-900/80 p-4 rounded-xl overflow-x-auto my-3 border border-slate-700 font-mono text-sm shadow-inner text-emerald-400">
          <code>{content}</code>
        </pre>
      );
    } else {
      // Very basic paragraph rendering
      return (
        <span key={index} className="whitespace-pre-wrap leading-relaxed">
          {part}
        </span>
      );
    }
  });
};

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hello! I am DevMentor AI. How can I help you with your code today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // In development, the proxy is usually configured, or we assume backend on port 5000
      const response = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: userMessage,
          history: messages 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch AI response');
      }

      setMessages(prev => [...prev, { role: 'model', text: data.data.text }]);
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred while connecting to DevMentor AI.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
      
      {/* Chat Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
          <h2 className="text-lg font-bold text-slate-100">DevMentor AI Agent</h2>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scroll-smooth">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-4 max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className="shrink-0 pt-1">
                {msg.role === 'user' ? (
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">ME</span>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Bubble */}
              <div className={`px-6 py-4 rounded-2xl text-[15px] ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-sm shadow-md' 
                  : 'bg-slate-800 text-slate-200 border border-slate-700/50 rounded-tl-sm shadow-md'
              }`}>
                {parseMessage(msg.text)}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex w-full justify-start animate-fade-in">
            <div className="flex gap-4 max-w-[85%] md:max-w-[75%]">
              <div className="shrink-0 pt-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                  <svg className="w-6 h-6 text-white animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              </div>
              <div className="px-6 py-4 rounded-2xl bg-slate-800 border border-slate-700/50 rounded-tl-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center my-4 animate-fade-in">
            <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-950/90 border-t border-slate-800 shrink-0">
        <form onSubmit={handleSend} className="relative max-w-4xl mx-auto flex items-end gap-3 bg-slate-900 border border-slate-700 rounded-2xl p-2 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask a programming question... (Shift+Enter for new line)"
            className="flex-1 max-h-32 min-h-[44px] bg-transparent resize-none outline-none text-slate-200 placeholder-slate-500 px-3 py-2.5 custom-scrollbar text-[15px]"
            rows={1}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="shrink-0 p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white rounded-xl shadow-lg transition-colors flex items-center justify-center cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
