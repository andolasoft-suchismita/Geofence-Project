import API from './axiosInstance';

export const signup = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await API.post('/signup', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
