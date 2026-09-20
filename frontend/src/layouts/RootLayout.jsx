import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bot, 
  Code2, 
  Map, 
  FileText, 
  GraduationCap, 
  TerminalSquare 
} from 'lucide-react';

export default function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasNotification, setHasNotification] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'AI Assistant', href: '/chat', icon: Bot },
    { name: 'Challenges', href: '/challenges', icon: Code2 },
    { name: 'Roadmaps', href: '/roadmaps', icon: Map },
    { name: 'Resume Analyzer', href: '/resume-analyzer', icon: FileText },
    { name: 'Interview Prep', href: '/interview-prep', icon: GraduationCap },
    { name: 'LeetCode Prep', href: '/leetcode-recommendations', icon: TerminalSquare },
  ];

  const handleNewSession = () => {
    navigate('/chat');
    // Dispatch a custom event so AIChat can clear its history
    setTimeout(() => {
      window.dispatchEvent(new Event('clear-chat-history'));
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden selection:bg-indigo-500/30">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/60 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center px-8 border-b border-slate-800/60">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
              DevMentor AI
            </span>
          </Link>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
                }`}
              >
                <item.icon 
                  className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="font-medium tracking-wide">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-6 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.6)]"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Snippet */}
        <Link to="/profile" className="p-4 border-t border-slate-800/60 m-4 rounded-2xl bg-slate-800/30 backdrop-blur-md hover:bg-slate-800/60 transition-colors block group">
          <div className="flex items-center gap-3">
            <img src="https://ui-avatars.com/api/?name=Jane+Doe&background=6366f1&color=fff" alt="Avatar" className="w-10 h-10 rounded-xl shadow-md group-hover:ring-2 group-hover:ring-indigo-500 transition-all" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-200 truncate group-hover:text-white transition-colors">Jane Doe</p>
              <p className="text-xs text-slate-500 truncate group-hover:text-indigo-300 transition-colors">jane.doe@example.com</p>
            </div>
          </div>
        </Link>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950 to-slate-950">
        
        {/* Top Navbar */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 border-b border-slate-800/40 bg-slate-950/40 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center relative group">
              <svg className="w-5 h-5 absolute left-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mentors, topics..." 
                className="w-80 bg-slate-900/50 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-full py-2.5 pl-10 pr-10 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-300"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setHasNotification(false)}
              className="relative p-2.5 rounded-full bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 group-hover:animate-wiggle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {hasNotification && (
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
              )}
            </button>
            <button 
              onClick={handleNewSession}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Session
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

