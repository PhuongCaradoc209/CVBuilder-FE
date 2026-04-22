import apiClient from '../config/appClient';

export const userService = {
  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response;
  },
  updateBasicProfile: async (data: any) => {
    const response = await apiClient.put('/auth/profile', data);
    return response;
  },
  updateExperience: async (id: string, data: any) => {
    const response = await apiClient.put(`/auth/profile/experiences/${id}`, data);
    return response;
  },
  updateEducation: async (id: string, data: any) => {
    const response = await apiClient.put(`/auth/profile/educations/${id}`, data);
    return response;
  },
  createExperience: async (data: any) => {
    const response = await apiClient.post('/auth/profile/experiences', data);
    return response;
  },
  createEducation: async (data: any) => {
    const response = await apiClient.post('/auth/profile/educations', data);
    return response;
  },
  deleteExperience: async (id: string) => {
    const response = await apiClient.delete(`/auth/profile/experiences/${id}`);
    return response;
  },
  deleteEducation: async (id: string) => {
    const response = await apiClient.delete(`/auth/profile/educations/${id}`);
    return response;
  },
  changeUserPassword: async (data: any) => {
    const response = await apiClient.put(`/auth/password`, data);
    return response;
  },
  createImageUrl: async ({ url, publicId }: any) => {
    const response = await apiClient.post(`/auth/profile/avatar`, { url, publicId });
    return response;
  },
};
