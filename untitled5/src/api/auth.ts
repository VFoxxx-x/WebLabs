import api from './axios';
import type {User} from '../types';

export const register = async (email: string, password: string) => {
    const response = await api.post('/Auth/register', { email, password });
    return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await api.post('/Auth/login', { email, password });
    console.log('Raw response:', response.data);
    // Сервер возвращает { code, msg, data: { token, user } }
    const { token, user } = response.data;
    console.log('Login success, token:', token);
    return { token, user };
};

export const getProfile = async () => {
    const response = await api.get('/Auth/profile');
    return response.data as User;
};
