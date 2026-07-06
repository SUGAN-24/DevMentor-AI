import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT token if it exists
api.interceptors.request.use(
  (config) => {
    // Get token from local storage
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Automatically log out user if token is invalid or expired
    if (error.response && error.response.status === 401) {
      // Avoid infinite loops if the request was to login
      if (error.config.url !== '/auth/login') {
        localStorage.removeItem('userInfo');
        // Optional: you can redirect to login page here using window.location or emit an event
        window.location.href = '/login';
      }
    }
    
    // Pass the error message back to the caller
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export default api;
