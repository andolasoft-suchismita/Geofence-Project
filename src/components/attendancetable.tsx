import React from "react";
import { FaCheck, FaTimes, FaStar, FaExclamationTriangle, FaCalendarDay, FaPlaneDeparture } from "react-icons/fa";

interface EmployeeData {
  name: string;
  role: string;
  attendance: string[];
}

interface AttendanceTableProps {
  data: EmployeeData[];
  selectedMonth: string;  // Receiving month as a string (e.g., "February")
  selectedYear: number;
}

const statusIcons: Record<string, JSX.Element> = {
  "✔": <FaCheck className="text-green-500" />,
  "X": <FaTimes className="text-red" />,
  "★": <FaStar className="text-yellow-500" />,
  "!": <FaExclamationTriangle className="text-yellow-400" />,
  "📅": <FaCalendarDay className="text-red" />,
  "✈": <FaPlaneDeparture className="text-red" />,
};

// Function to get the number of days in a selected month
const getDaysInMonth = (year: number, month: string) => {
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth(); // Convert month name to index
  return new Date(year, monthIndex + 1, 0).getDate();
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({ data, selectedMonth, selectedYear }) => {
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-2 text-xs">
    <div className="flex items-center space-x-2 mb-2 text-[10px]">
      <p className="font-bold">Legend:</p>
      <span className="flex items-center space-x-1"><FaStar className="text-yellow-500" /> <span>Holiday</span></span>
      <span className="flex items-center space-x-1"><FaCalendarDay className="text-red" /> <span>Day Off</span></span>
      <span className="flex items-center space-x-1"><FaCheck className="text-green-500" /> <span>Present</span></span>
      <span className="flex items-center space-x-1"><FaExclamationTriangle className="text-yellow-400" /> <span>Half Day</span></span>
      <span className="flex items-center space-x-1"><FaTimes className="text-red" /> <span>Absent</span></span>
      <span className="flex items-center space-x-1"><FaPlaneDeparture className="text-red" /> <span>On Leave</span></span>
    </div>

    <table className="w-full border-collapse text-[10px] md:text-xs">
      <thead>
        <tr className="bg-blue-100">
          <th className="p-1 text-left">Employee</th>
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
            <th key={day} className="p-1 text-center">
              {day}
              <br />
              <span className="text-[8px] md:text-[10px] text-gray-500">
                {weekDays[new Date(selectedYear, new Date(`${selectedMonth} 1, ${selectedYear}`).getMonth(), day).getDay()]}
              </span>
            </th>
          ))}
          <th className="p-1 text-center">Total</th>
        </tr>
      </thead>
      <tbody>
        {data.map((employee) => (
          <tr key={employee.name} className="border-b ">
            <td className="p-1 text-[10px] md:text-xs flex items-center space-x-2">
              <img src="" alt="profile" className="w-6 h-6 rounded-full" />
              <div>
                <p className="font-medium">{employee.name}</p>
                <p className="text-[8px] md:text-[10px] text-gray-500">{employee.role}</p>
              </div>
            </td>

            {Array.from({ length: daysInMonth }, (_, i) => (
              <td key={i} className="p-1 text-center">
                {statusIcons[employee.attendance[i]] || employee.attendance[i] || "-"}
              </td>
            ))}

            <td className="p-1 text-center font-bold">
              {employee.attendance.filter((s) => s === "✔").length} / {daysInMonth}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default AttendanceTable;