import axios from "axios";

const BASE_URL = "http://192.168.2.31:9009/attendanceapi/attendance";

export const getAttendanceReports = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/attendance_reports/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance reports:", error);
    throw error;
  }
};
