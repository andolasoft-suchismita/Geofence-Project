import React, { useState } from "react";
// import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { FaCheck, FaTimes, FaStar, FaExclamationTriangle, FaCalendarDay, FaPlaneDeparture } from "react-icons/fa";

interface EmployeeData {
  name: string;
  role: string;
  attendance: string[];
}

interface AttendanceTableProps {
  data: EmployeeData[];
}

const statusIcons: Record<string, JSX.Element> = {
  "✔": <FaCheck className="text-green-500" />,
  "X": <FaTimes className="text-gray-400" />,
  "★": <FaStar className="text-yellow-500" />,
  "!": <FaExclamationTriangle className="text-yellow-400" />,
  "📅": <FaCalendarDay className="text-red" />,
  "✈": <FaPlaneDeparture className="text-red" />,
};

// Function to get number of days in a selected month
const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  
const AttendanceTable: React.FC<AttendanceTableProps> = ({ data }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const weekDays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  
    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedMonth(parseInt(event.target.value));
    };
  
    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedYear(parseInt(event.target.value));
    };


 return (
    <div>
    {/* Dropdowns for Selecting Month and Year */}
    <div className="flex space-x-2 mb-4">
      <select className="border p-2 rounded" value={selectedMonth} onChange={handleMonthChange}>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(2025, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>

      <select className="border p-2 rounded" value={selectedYear} onChange={handleYearChange}>
        {Array.from({ length: 5 }, (_, i) => (
          <option key={i} value={2025 - i}>
            {2025 - i}
          </option>
        ))}
      </select>
    </div>

    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      {/* Attendance Legend */}
      <div className="flex items-center space-x-4 mb-4 text-sm">
        <p className="font-bold">Note:</p>
        <span className="flex items-center space-x-1"><FaStar className="text-yellow-500" /> <span>Holiday</span></span>
        <span className="flex items-center space-x-1"><FaCalendarDay className="text-red-500" /> <span>Day Off</span></span>
        <span className="flex items-center space-x-1"><FaCheck className="text-green-500" /> <span>Present</span></span>
        <span className="flex items-center space-x-1"><FaExclamationTriangle className="text-yellow-400" /> <span>Half Day</span></span>
        <span className="flex items-center space-x-1"><FaTimes className="text-gray-400" /> <span>Absent</span></span>
        <span className="flex items-center space-x-1"><FaPlaneDeparture className="text-red-600" /> <span>On Leave</span></span>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="p-2 text-left">Employee</th>
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
              <th key={day} className="p-2 text-center">
                {day}
                <br />
                <span className="text-xs text-gray-500">
                  {weekDays[new Date(selectedYear, selectedMonth - 1, day).getDay()]}
                </span>
              </th>
            ))}
            <th className="p-2 text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee.name} className="border-b">
              {/* Employee Info */}
              <td className="p-2 flex items-center space-x-2">
                <img src="" alt="profile" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-medium">{employee.name}</p>
                  <p className="text-xs text-gray-500">{employee.role}</p>
                </div>
              </td>

              {/* Attendance Data */}
              {Array.from({ length: daysInMonth }, (_, i) => (
                <td key={i} className="p-2 text-center">
                  {statusIcons[employee.attendance[i]] || employee.attendance[i] || "-"}
                </td>
              ))}

              {/* Total Attendance */}
              <td className="p-2 text-center font-bold">
                {employee.attendance.filter((s) => s === "✔").length} / {daysInMonth}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default AttendanceTable;