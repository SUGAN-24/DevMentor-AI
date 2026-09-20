import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const progressStats = [
    { label: 'Total Sessions', value: user?.progress || '0', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500/10' },
    { label: 'Problems Solved', value: user?.problemsSolved || '0', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'from-violet-500 to-purple-500', bg: 'bg-violet-500/10' },
    { label: 'Current Streak', value: `${user?.learningStreak || 0} Days`, icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'from-emerald-400 to-teal-500', bg: 'bg-emerald-500/10' },
  ];

  // We can fetch real recent activity if a model existed, but we'll leave it as a static showcase for now
  // or hide it if we don't have real data. We'll leave it as placeholder since there's no backend for it.
  const recentActivity = [
    { id: 1, title: 'React Hooks Deep Dive', mentor: 'Sarah Jenkins', time: '2 hours ago', status: 'Completed' },
    { id: 2, title: 'System Design Interview Prep', mentor: 'David Chen', time: 'Yesterday', status: 'Reviewed' },
    { id: 3, title: 'Node.js Performance Tuning', mentor: 'Alex Rivera', time: '3 days ago', status: 'Completed' },
  ];

  const quickActions = [
    { title: 'Find a Roadmap', desc: 'Browse learning paths in your field', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', route: '/roadmaps' },
    { title: 'Resume Review', desc: 'Get feedback on your CV', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', route: '/resume-analyzer' },
    { title: 'Interview Prep', desc: 'Practice with an AI agent', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z', route: '/interview-prep' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      
      {/* Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-slate-800/60 p-8 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[20rem] h-[20rem] bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Welcome back, <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{user?.name ? user.name.split(' ')[0] : 'User'}!</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              You are on a <span className="text-white font-semibold">{user?.learningStreak || 0}-day streak</span>. Keep up the great work! Your next scheduled session is in 2 days.
            </p>
          </div>
          <button 
            onClick={() => navigate('/roadmaps')}
            className="whitespace-nowrap px-6 py-3 bg-white text-indigo-950 font-bold rounded-xl shadow-xl shadow-white/10 hover:shadow-white/20 hover:scale-105 transition-all duration-300">
            View Learning Path
          </button>
        </div>
      </div>

      {/* Grid Layout for Stats & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Progress Stats Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Your Progress</h2>
            <button onClick={() => navigate('/profile')} className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">View detailed analytics &rarr;</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {progressStats.map((stat, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg}`}>
                  <svg className={`w-6 h-6 text-transparent bg-clip-text bg-gradient-to-br ${stat.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="divide-y divide-slate-800/60">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                        <svg className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-200 group-hover:text-white transition-colors">{activity.title}</h4>
                        <p className="text-sm text-slate-500">with {activity.mentor} &bull; {activity.time}</p>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <span className="px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Column */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Quick Actions</h2>
          <div className="space-y-4">
            {quickActions.map((action, idx) => (
              <button 
                key={idx} 
                onClick={() => navigate(action.route)}
                className="w-full text-left bg-slate-900/50 border border-slate-800 p-5 rounded-2xl hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-colors text-slate-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">{action.title}</h4>
                  <p className="text-sm text-slate-500 mt-0.5">{action.desc}</p>
                </div>
              </button>
            ))}

            {/* AI Assistant Promo Card */}
            <div className="mt-8 relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="relative z-10 space-y-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">Ask DevMentor AI</h3>
                <p className="text-sm text-slate-400">Stuck on a problem? Our AI agent is ready to help you debug and learn.</p>
                <button 
                  onClick={() => navigate('/chat')}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm font-semibold text-slate-200 transition-colors mt-2">
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
