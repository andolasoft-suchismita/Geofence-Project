import API from "../axiosInstance";

const API_BASE_URL = "http://192.168.2.31:9009/addusersapi/addusers"; 

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

export const updateUser = async (userId, updatedData) => {
  try {
    const response = await API.put(`/addusersapi/addusers/users/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
