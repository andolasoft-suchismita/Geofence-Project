import axios from "axios";

// Create an Axios instance with default config
const API = axios.create({
    baseURL: "https://your-api-url.com/api", // Replace with your actual API URL
    timeout: 10000, // 10 seconds timeout
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to attach the token
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor for handling errors globally
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle 401 Unauthorized - Logout user
            if (error.response.status === 401) {
                localStorage.removeItem("authToken");
                window.location.href = "/signin"; // Redirect to sign-in page
            }
        }
        return Promise.reject(error);
    }
);

export default API;
