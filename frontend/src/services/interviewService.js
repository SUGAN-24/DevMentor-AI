import api from './api';

export const getInterviews = async () => {
  const response = await api.get('/interviews');
  return response.data;
};
