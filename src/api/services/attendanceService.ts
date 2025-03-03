import API from "../../api/axiosInstance"; // ✅ Ensure correct path


  //  Update User
export const checkIn = async (checkInData) => {
    try {
      const response = await API.post(`/attendanceapi/attendance/create`, checkInData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };


