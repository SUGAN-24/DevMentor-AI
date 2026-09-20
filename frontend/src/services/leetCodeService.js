import api from './api';

export const getLeetCodeProblems = async () => {
  const response = await api.get('/leetcode');
  return response.data;
};
