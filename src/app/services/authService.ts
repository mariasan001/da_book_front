// src/services/authService.ts
import api from '@/lib/axios';

export const login = (username: string, password: string) =>
  api.post('/auth/login', { username, password });

export const getMe = () =>
  api.get('/auth/me');

export const logout = () =>
  api.post('/auth/logout');
