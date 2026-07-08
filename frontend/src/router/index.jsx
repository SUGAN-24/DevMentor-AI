import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import RootLayout from '../layouts/RootLayout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AIChat from '../pages/AIChat';
import Challenges from '../pages/Challenges';
import Roadmaps from '../pages/Roadmaps';
import ResumeAnalyzer from '../pages/ResumeAnalyzer';
import RoadmapQuiz from '../pages/RoadmapQuiz';
import RoadmapResources from '../pages/RoadmapResources';
import InterviewPrep from '../pages/InterviewPrep';
import LeetCodeRecommendations from '../pages/LeetCodeRecommendations';
import Profile from '../pages/Profile';
import ProtectedRoute from '../components/ProtectedRoute';

// Wraps the entire app in AuthProvider so useAuth() works everywhere
function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,  // AuthProvider wraps ALL routes
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/',
        element: <ProtectedRoute />, // Protects everything below it
        children: [
          {
            path: '/',
            element: <RootLayout />, // Now RootLayout only renders if logged in
            children: [
              {
                path: '/',
                element: <Dashboard />,
              },
              {
                path: '/chat',
                element: <AIChat />,
              },
              {
                path: '/challenges',
                element: <Challenges />,
              },
              {
                path: '/roadmaps',
                element: <Roadmaps />,
              },
              {
                path: '/roadmaps/quiz',
                element: <RoadmapQuiz />,
              },
              {
                path: '/roadmaps/resources',
                element: <RoadmapResources />,
              },
              {
                path: '/resume-analyzer',
                element: <ResumeAnalyzer />,
              },
              {
                path: '/interview-prep',
                element: <InterviewPrep />,
              },
              {
                path: '/leetcode-recommendations',
                element: <LeetCodeRecommendations />,
              },
              {
                path: '/profile',
                element: <Profile />,
              },
            ]
          }
        ],
      },
    ],
  },
]);
