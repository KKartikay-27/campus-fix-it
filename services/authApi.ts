import api from './api';

export const authApi = {
  register: (name: string, email: string, password: string) =>
    api.post('/api/auth/register', {
      name,
      email,
      password,
      role: 'student',
    }),

  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
};
