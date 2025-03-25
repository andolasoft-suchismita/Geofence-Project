import axios from "axios";

const BASE_URL = "http://192.168.2.31:9009/attendance/attendance";

export const getAttendanceReports = async (companyId: number, month: number, year: number) => {
  const monthNames = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];
  
  const monthName = monthNames[month - 1]; // Convert numeric month to string format

  // Construct the API endpoint dynamically
  const url = `${BASE_URL}/attendance_reports/${companyId}/months/${monthName}/year${year}`;

  console.log("Fetching reports from:", url); // Debugging log

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance reports:", error);
    throw error;
  }
};
