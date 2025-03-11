import API from '../axiosInstance';

export const punchInAPI = async (check_in: string) => {
  const response = await API.post('/attendanceapi/attendance/create', {
    check_in,
  });
  return response.data; //  Returns full attendance object with `id`
};

export const punchOutAPI = async (attendance_id: string, check_out: string) => {
  const response = await API.put(`/attendanceapi/attendance/${attendance_id}`, {
    check_out,
  });
  return response.data; //  Returns updated attendance data
};
