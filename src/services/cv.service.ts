import apiClient from '@/config/appClient';
import type { BaseResponse, CV, CVCreateInput, CVUpdateInput } from './types';

export const cvService = {
  /**
   * Get all CVs for the authenticated user
   */
  getAll: async (): Promise<BaseResponse<CV[]>> => {
    return apiClient.get('/cv');
  },

  /**
   * Get a specific CV by ID
   */
  getById: async (id: string): Promise<BaseResponse<CV>> => {
    return apiClient.get(`/cv/${id}`);
  },

  /**
   * Create a new CV
   */
  create: async (data: CVCreateInput): Promise<BaseResponse<CV>> => {
    return apiClient.post('/cv', data);
  },

  /**
   * Update an existing CV
   */
  update: async (id: string, data: CVUpdateInput): Promise<BaseResponse<CV>> => {
    return apiClient.put(`/cv/${id}`, data);
  },

  /**
   * Delete a CV by ID
   */
  delete: async (id: string): Promise<BaseResponse<any>> => {
    return apiClient.delete(`/cv/${id}`);
  },
};
