import api from './api';

export const getRoadmaps = async () => {
  const response = await api.get('/roadmaps');
  return response.data;
};

export const getRoadmapById = async (id) => {
  const response = await api.get(`/roadmaps/${id}`);
  return response.data;
};

export const createRoadmap = async (roadmapData) => {
  const response = await api.post('/roadmaps', roadmapData);
  return response.data;
};

export const updateRoadmap = async (id, roadmapData) => {
  const response = await api.put(`/roadmaps/${id}`, roadmapData);
  return response.data;
};

export const deleteRoadmap = async (id) => {
  const response = await api.delete(`/roadmaps/${id}`);
  return response.data;
};
