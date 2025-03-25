import API from '../axiosInstance';

const API_URL = "http://192.168.2.31:9009/attendance/attendance/attendance_summary_by_user";

export const fetchUserDashboardData = async (user_id: string) => {
    try {
      const response = await API.get(`${API_URL}/${user_id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to fetch data";
    }
};

export default fetchUserDashboardData;




