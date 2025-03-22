import API from "../axiosInstance";

// Fetch user profile by ID
export const getUserById = async (id: string) => {
  try {
    const response = await API.get(`/users/users/${id}`);
    console.log("Fetched User Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error.response?.data || error.message);
    throw error;
  }
};

// Update user profile (both fields and profile picture)
export const updateUser = async (id: string, updatedData: any) => {
  try {
    const response = await API.put(`/users/users/${id}`, updatedData);
    console.log("Updated User Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error.response?.data || error.message);
    throw error;
  }
};
