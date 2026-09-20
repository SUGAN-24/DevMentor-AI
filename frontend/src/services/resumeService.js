import api from './api';

export const getUserResumes = async () => {
  const response = await api.get('/resumes');
  return response.data;
};

export const getResumeById = async (id) => {
  const response = await api.get(`/resumes/${id}`);
  return response.data;
};

export const createResume = async (resumeData) => {
  const response = await api.post('/resumes', resumeData);
  return response.data;
};

export const deleteResume = async (id) => {
  const response = await api.delete(`/resumes/${id}`);
  return response.data;
};
