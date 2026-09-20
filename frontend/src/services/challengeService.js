import api from './api';

export const getChallenges = async () => {
  const response = await api.get('/challenges');
  return response.data;
};

export const getChallengeById = async (id) => {
  const response = await api.get(`/challenges/${id}`);
  return response.data;
};

export const createChallenge = async (challengeData) => {
  const response = await api.post('/challenges', challengeData);
  return response.data;
};

export const updateChallenge = async (id, challengeData) => {
  const response = await api.put(`/challenges/${id}`, challengeData);
  return response.data;
};

export const deleteChallenge = async (id) => {
  const response = await api.delete(`/challenges/${id}`);
  return response.data;
};
