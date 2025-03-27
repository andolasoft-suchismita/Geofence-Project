
import API from '../../api/axiosInstance';

export const getattendanceSummary = async (company_id: number) => {
  try {
    const attendance_date = new Date().toISOString().split('T')[0];
    const response = await API.get(
      `/attendance/attendance/attendance_summary/${company_id}/date/${attendance_date}`
    );
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance summary:', error);
    throw error;
  }
};

export const getattendanceReports = async (
  company_id: number,
  month_name: string,
  year: number
) => {
  try {
    const formattedMonth = `months/${month_name.toLowerCase()}`;
    const formattedYear = `year${year}`;
    const response = await API.get(
      `/attendance/attendance/attendance_reports/${company_id}/${formattedMonth}/${formattedYear}`
    );
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance reports:', error);
    throw error;
  }
};
