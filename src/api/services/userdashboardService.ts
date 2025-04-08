import API from '../axiosInstance';

export const fetchUserDashboardData = async (user_id: string) => {
  try {
    const response = await API.get(
      `/attendance/attendance/attendance_summary_by_user/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to fetch data';
  }
};

export default fetchUserDashboardData;
