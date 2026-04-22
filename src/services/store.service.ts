import appClient from '../config/appClient';

export const storeService = {
  uploadImage: async (image: any) => {
    const formData = new FormData();

    formData.append('avatar', image);

    const response = await appClient.post('/upload/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};
