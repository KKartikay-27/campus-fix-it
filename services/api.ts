import axios from 'axios';
import { Platform } from 'react-native';

// For web, use localhost, for mobile, use the local IP
const isWeb = Platform.OS === 'web';
const LOCAL_IP = '192.168.29.3'; // Your local IP address
const PORT = '7224';

const API_BASE_URL = isWeb 
  ? `http://localhost:${PORT}` 
  : `http://${LOCAL_IP}:${PORT}`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000, // 10 seconds timeout
});

const api = {
  register: (name: string, email: string, password: string) =>
    axiosInstance.post('/api/auth/register', { name, email, password, role: 'student' }),

  login: (email: string, password: string) =>
    axiosInstance.post('/api/auth/login', { email, password }),
};

export default api;
