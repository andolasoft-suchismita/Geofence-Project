import axios, { AxiosHeaders } from 'axios';
import { authHeader } from './authHeader';

// Create an Axios instance with default config
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Fallback to localhost if env not set
  headers: {
    'Content-Type': 'application/json',
  },
});

export const FormAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Fallback to localhost if env not set
  timeout: 20000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

// Add a request interceptor to attach the token
API.interceptors.request.use(
  (config) => {
    // Ensure headers are an instance of AxiosHeaders
    config.headers = new AxiosHeaders({
      ...config.headers, // Spread existing headers
      ...authHeader(), // Add Authorization header
    });

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for handling errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized - Logout user
      if (error.response.status === 401) {
        window.location.href = '/signin'; // Redirect to sign-in page
      }
    }
    return Promise.reject(error);
  }
);

export default API;
