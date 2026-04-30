import axios from 'axios';

const api = axios.create({
  baseURL: 'https://demodelivery.now-ye.com/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'ar',
  },
});

// إضافة interceptor لتضمين التوكن في كل طلب إذا كان موجوداً
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
