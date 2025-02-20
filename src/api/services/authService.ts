import  { FormAPI } from "../axiosInstance";

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await FormAPI.post("/auth/jwt/login", { username, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};
