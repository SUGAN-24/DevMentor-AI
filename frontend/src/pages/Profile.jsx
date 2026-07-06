import React, { useState } from 'react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock Profile Data
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=6366f1&color=fff&size=128',
    bio: 'Passionate full-stack developer learning advanced algorithms and React performance optimization techniques.',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Python', 'Java'],
    problemsSolved: 142,
    learningStreak: 12,
    progress: 78 // percentage
  });

  // Edit State
  const [editForm, setEditForm] = useState({ ...profile });
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...profile });
    setIsEditing(false);
    setNewSkill('');
  };

  const removeSkill = (skillToRemove) => {
    setEditForm(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !editForm.skills.includes(newSkill.trim())) {
      setEditForm(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex items-end justify-between border-b border-slate-800/60 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">My Profile</h1>
          <p className="text-slate-400 mt-2">Manage your account details and view your learning progress.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="hidden sm:flex px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl font-semibold transition-colors items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Basic Info & Avatar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 w-full h-32 bg-gradient-to-br from-indigo-600/20 to-violet-600/20 pointer-events-none"></div>
            
            <div className="relative">
              <img 
                src={profile.avatar} 
                alt="Profile Avatar" 
                className="w-32 h-32 rounded-full border-4 border-slate-900 shadow-xl object-cover relative z-10"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 z-20 w-8 h-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center border-2 border-slate-900 shadow-md transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              )}
            </div>

            <h2 className="mt-6 text-2xl font-bold text-white">{profile.name}</h2>
            <p className="text-slate-400 font-medium">{profile.email}</p>

            {/* Stats Summary */}
            <div className="w-full mt-8 grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-6">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-indigo-400">{profile.problemsSolved}</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Problems</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-amber-500">{profile.learningStreak}</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Day Streak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Edit Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
            
            {isEditing ? (
              // Edit Form
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Edit Profile Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">Full Name</label>
                    <input 
                      type="text" 
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">Email Address</label>
                    <input 
                      type="email" 
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Bio</label>
                  <textarea 
                    rows={3}
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none custom-scrollbar"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-300">Technical Skills</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {editForm.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-slate-800 text-slate-300 text-sm font-medium rounded-lg flex items-center gap-2 border border-slate-700">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="text-slate-500 hover:text-red-400 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </span>
                    ))}
                  </div>
                  <form onSubmit={addSkill} className="flex gap-2">
                    <input 
                      type="text" 
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a new skill..."
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                    <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors">
                      Add
                    </button>
                  </form>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button onClick={handleCancel} className="px-5 py-2.5 bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-800 rounded-xl font-semibold transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/20 transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              // Display Mode
              <div className="space-y-8 animate-fade-in">
                
                {/* About Me */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">About Me</h3>
                  <p className="text-slate-200 leading-relaxed text-[15px]">
                    {profile.bio}
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {profile.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-lg text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Learning Progress Section */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Current Track Progress</h3>
                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <span className="text-sm font-semibold text-slate-200 block">Full Stack Development Roadmap</span>
                        <span className="text-xs text-slate-500">Phase 4 / 8</span>
                      </div>
                      <span className="text-lg font-black text-emerald-400">{profile.progress}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full relative"
                        style={{ width: `${profile.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
