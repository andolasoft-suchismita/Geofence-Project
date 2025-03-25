import API from '../axiosInstance';
import dayjs from 'dayjs';

//Create Attendance(PunchIn)
export const punchInAPI = async (
  check_in: string,
  lat: number,
  lng: number
) => {
  const formattedTime = dayjs(check_in).format('HH:mm:ss'); // Convert to required format

  const response = await API.post('/attendance/attendance/create', {
    check_in: formattedTime, // Send only time
    latitude: lat,
    longitude: lng,
  });

  return response.data;
};

//Update Attendance(PunchOut)
export const punchOutAPI = async (attendance_id: string, check_out: string) => {
  const formattedTime = dayjs(check_out).format('HH:mm:ss'); // Convert to required format

  const response = await API.patch(`/attendance/attendance/${attendance_id}`, {
    check_out: formattedTime, // Send only time
  });

  return response.data;
};

//Get attendance By Attendance Id
export const getAttendanceById = async (attendance_id: string) => {
  try {
    const response = await API.get(`/attendance/attendance/${attendance_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    throw error;
  }
};

//  Fetch attendance by date and company ID
export const getAttendanceByDate = async (
  attendance_date: string,
  company_id: string
) => {
  try {
    const response = await API.get(
      `/attendance/attendance/by-date/${attendance_date}/company/${company_id}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance:', error);
    throw error;
  }
};

//Get attendance By user ID
export const getAttendanceByUserId = async (user_id: string) => {
  try {
    const response = await API.get(`/attendance/attendance/user/${user_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user attendance:', error);
    throw error;
  }
};

// Fetch Attendance Summary by Company ID
export const getAttendanceSummary = async (
  company_id: number,
  attendance_date: string
) => {
  try {
    const response = await API.get(
      `/attendance/attendance/attendance_summary/${company_id}/date/${attendance_date}`
    );

    return {
      total: response.data.total_employees || 0,
      present: response.data.present_today || 0,
      absentees: response.data.absentees_today || 0,
      late: response.data.late_comings_today || 0,
    };
  } catch (error) {
    console.error('Error fetching attendance summary:', error);
    throw error;
  }
};
