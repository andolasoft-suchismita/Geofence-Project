import API from "../axiosInstance";
//const API_BASE_URL = "http://192.168.2.31:9009/addusersapi/addusers"; 

export const getUserById = async (userId) => {
  try {
    const response = await API.get(`/addusersapi/addusers/${userId}`);
    console.log("User Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error.response?.data || error.message);
    throw error;
  }
};



// Update user details by ID

import axios from 'axios';

const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(`/addusersapi/addusers/${userId}`, updatedData);
    return response.data; // Assuming the updated user data is returned
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user data.");
  }
};

export { updateUser };
