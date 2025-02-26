import { FormAPI } from '../axiosInstance';

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await FormAPI.post('/v1/auth/jwt/login', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
