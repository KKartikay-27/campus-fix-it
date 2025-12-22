import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) throw new Error('API base URL not defined');

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const api = {
  register: (name: string, email: string, password: string) =>
    axiosInstance.post('/api/auth/register', { name, email, password, role: 'student' }),

  login: (email: string, password: string) =>
    axiosInstance.post('/api/auth/login', { email, password }),
};

export default api;
