import { AxiosError } from 'axios';
import { apiClient } from '../api';

export const signup = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    const response = await apiClient.post('/auth/signup', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw axiosError.response.data;
    } else {
      throw new Error('Network Error');
    }
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/login', {
      username,
      password,
    });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw axiosError.response.data;
    } else {
      throw new Error('Network Error');
    }
  }
};
