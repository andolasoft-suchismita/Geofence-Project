import API from "../axiosInstance";
import { User } from "../../redux/slices/userSlice"; // Import User interface


//  Fetch All Users
export const fetchUsersAPI = async () => {
    try {
        const response = await API.get("/users/me");
        return response.data;
    } catch (error) {
        throw error;
    }
};

//  Create a New User
export const createUserAPI = async (userData: User) => {
    try {
        const response = await API.post("/adduserapi", userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
//  Update User
export const updateUser = async (id: string, userData: Partial<User>) => {
    try {
        const response = await API.put(`/updateuserapi/${id}`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//  Delete User
export const deleteUser = async (id: string) => {
    try {
        await API.delete(`/deleteuserapi/${id}`);
        return id; // Return deleted user ID for Redux state update
    } catch (error) {
        throw error;
    }
};

