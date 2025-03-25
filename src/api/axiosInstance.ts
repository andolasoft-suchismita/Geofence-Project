import axios, { AxiosHeaders } from 'axios';
import { authHeader } from './authHeader';
import { handleLogout } from 'utils/logout';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

// Create an Axios instance with default config
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const FormAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000, // 20 seconds timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

// Add a request interceptor to attach the token
API.interceptors.request.use(
  (config) => {
    config.headers = new AxiosHeaders({
      ...config.headers,
      ...authHeader(),
    });

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for handling errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      history.push('/signin'); // Redirect to sign-in page
    }
    return Promise.reject(error);
  }
);

export default API;
