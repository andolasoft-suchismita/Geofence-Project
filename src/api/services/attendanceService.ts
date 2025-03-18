import API from '../axiosInstance';

 import dayjs from 'dayjs';

 export const punchInAPI = async (
   check_in: string,
   lat: number,
   lng: number
 ) => {
   const formattedTime = dayjs(check_in).format('HH:mm:ss'); // Convert to required format

   const response = await API.post('/attendanceapi/attendance/create', {
     check_in: formattedTime, // Send only time
     latitude: lat,
     longitude: lng,
   });

   return response.data;
 };
export const punchOutAPI = async (attendance_id: string, check_out: string) => {
  const formattedTime = dayjs(check_out).format('HH:mm:ss'); // Convert to required format

  const response = await API.patch(
    `/attendanceapi/attendance/${attendance_id}`,
    {
      check_out: formattedTime, // Send only time
    }
  );

  return response.data;
};

export const getAttendanceById = async (attendance_id: string) => {
  try {
    const response = await API.get(
      `/attendanceapi/attendance/${attendance_id}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    throw error;
  }
};
//  Fetch attendance by date and company ID
export const getAttendanceByDate = async (attendance_date: string, company_id: string) => {
  try {
    const response = await API.get(
      `/attendanceapi/attendance/by-date/${attendance_date}/company/${company_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance:", error);
    throw error;
  }
};
export const getAttendanceByUserId = async (user_id: string) => {
  try {
    const response = await API.get(`/attendanceapi/attendance/user/${user_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user attendance:', error);
    throw error;
  }
};
