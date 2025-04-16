import API from '../axiosInstance';

const BASE_URL = "http://127.0.0.1:8000/attendance/attendance";

export const getAttendanceReports = async (companyId: number, month: number, year: number) => {
  const monthNames = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];

  const monthName = monthNames[month - 1]; // Convert numeric month to string format

  try {
    const response = await API.get(
      `/attendance/attendance/attendance_reports/${companyId}/months/${monthName}/year${year}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance reports:', error);
    throw error;
  }
};
