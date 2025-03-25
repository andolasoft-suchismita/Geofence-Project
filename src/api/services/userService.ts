import API from '../axiosInstance';

//  Fetch All Users
export const fetchUsersAPI = async (company_id: number) => {
  try {
    // const response = await API.get('/v1/users');
    const response = await API.get(
      `/company/company/${company_id}/employees`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//  Create a New User
export const createUserAPI = async (userData: any) => {
  try {
    const response = await API.post('/users/users/', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//  Update User
export const updateUserAPI = async (id: string, userData: Partial<any>) => {
  try {
    const response = await API.put(`/users/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

//  Delete User
export const deleteUserAPI = async (id: string) => {
  try {
    await API.delete(`/users/users/${id}`);
    return id; // Return deleted user ID for Redux state update
  } catch (error) {
    throw error;
  }
};

// Fetch User Details by ID
export const fetchUserDetailsAPI = async (id: string) => {
  try {
    const response = await API.get(`/users/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//fetch current user by id
export const fetchCurrentUserAPI = async (user_id: string) => {
  try {
    const response = await API.get(`/users/users/${user_id}`); // Ensure correct API route
    console.log("Fetched User Data:", response.data);
 
    return response.data;
  } catch (error) {
    throw error;
  }
};