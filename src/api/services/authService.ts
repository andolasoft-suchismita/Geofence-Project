import API from "../axiosInstance";

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await API.post("/auth/login", { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};
