import apiClient from '../config/appClient';

interface User {
  email: string;
  password: string;
}


export const authService = {
  getUser: async (user: User) => {
    const response = await apiClient.post('/auth/login', user);
    return response;
  },
};
