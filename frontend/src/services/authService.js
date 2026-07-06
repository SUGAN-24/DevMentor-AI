import api from './api';

/**
 * Register a new user
 * @param {Object} userData { name, email, password }
 * @returns {Promise<Object>} user data + token
 */
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response.data) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }
  return response.data;
};

/**
 * Login user
 * @param {Object} credentials { email, password }
 * @returns {Promise<Object>} user data + token
 */
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  if (response.data) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }
  return response.data;
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem('userInfo');
};

/**
 * Get current user profile (Verify token)
 * @returns {Promise<Object>} user data
 */
export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};
