import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request Interceptor: Tự động gắn Token vào mỗi request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Xử lý lỗi hệ thống tập trung (ví dụ: Logout khi hết hạn token)
apiClient.interceptors.response.use(
  (response) => response.data, // Chỉ trả về data để code ở tầng trên gọn hơn
  (error: AxiosError) => {
    console.log('API Error:', error.response);
    if (error.response?.status === 401 && (error.response.data as any)?.message !== 'Incorrect current password') {
      // Logic Logout hoặc Refresh Token ở đây
      window.localStorage.removeItem('access_token');
      window.location.href = '/login'; // Redirect về trang login
    }
    return Promise.reject(error);
  },
);

export default apiClient;
