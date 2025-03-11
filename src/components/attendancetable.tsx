// import React, { useState } from "react";
// // import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
// import { FaCheck, FaTimes, FaStar, FaExclamationTriangle, FaCalendarDay, FaPlaneDeparture } from "react-icons/fa";

// interface EmployeeData {
//   name: string;
//   role: string;
//   attendance: string[];
// }

// interface AttendanceTableProps {
//   data: EmployeeData[];
// }

// const statusIcons: Record<string, JSX.Element> = {
//   "✔": <FaCheck className="text-green-500" />,
//   "X": <FaTimes className="text-gray-400" />,
//   "★": <FaStar className="text-yellow-500" />,
//   "!": <FaExclamationTriangle className="text-yellow-400" />,
//   "📅": <FaCalendarDay className="text-red" />,
//   "✈": <FaPlaneDeparture className="text-red" />,
// };

// // Function to get number of days in a selected month
// const getDaysInMonth = (year: number, month: number) => {
//     return new Date(year, month, 0).getDate();
//   };

  
// const AttendanceTable: React.FC<AttendanceTableProps> = ({ data }) => {
//     const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
//     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
//     const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
//     const weekDays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  
//     const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//       setSelectedMonth(parseInt(event.target.value));
//     };
  
//     const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//       setSelectedYear(parseInt(event.target.value));
//     };


//  return (
//     <div>
//     {/* Dropdowns for Selecting Month and Year */}
//     {/* <div className="flex space-x-2 mb-4">
//       <select className="border p-2 rounded" value={selectedMonth} onChange={handleMonthChange}>
//         {Array.from({ length: 12 }, (_, i) => (
//           <option key={i + 1} value={i + 1}>
//             {new Date(2025, i).toLocaleString("default", { month: "long" })}
//           </option>
//         ))}
//       </select>

//       <select className="border p-2 rounded" value={selectedYear} onChange={handleYearChange}>
//         {Array.from({ length: 5 }, (_, i) => (
//           <option key={i} value={2025 - i}>
//             {2025 - i}
//           </option>
//         ))}
//       </select>
//     </div> */}

//     <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
//       {/* Attendance Legend */}
//       <div className="flex items-center space-x-4 mb-4 text-sm">
//         <p className="font-bold">Note:</p>
//         <span className="flex items-center space-x-1"><FaStar className="text-yellow-500" /> <span>Holiday</span></span>
//         <span className="flex items-center space-x-1"><FaCalendarDay className="text-red-500" /> <span>Day Off</span></span>
//         <span className="flex items-center space-x-1"><FaCheck className="text-green-500" /> <span>Present</span></span>
//         <span className="flex items-center space-x-1"><FaExclamationTriangle className="text-yellow-400" /> <span>Half Day</span></span>
//         <span className="flex items-center space-x-1"><FaTimes className="text-gray-400" /> <span>Absent</span></span>
//         <span className="flex items-center space-x-1"><FaPlaneDeparture className="text-red-600" /> <span>On Leave</span></span>
//       </div>

//       {/* Table */}
//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-gray-100 text-sm">
//             <th className="p-2 text-left">Employee</th>
//             {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
//               <th key={day} className="p-2 text-center">
//                 {day}
//                 <br />
//                 <span className="text-xs text-gray-500">
//                   {weekDays[new Date(selectedYear, selectedMonth - 1, day).getDay()]}
//                 </span>
//               </th>
//             ))}
//             <th className="p-2 text-center">Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((employee) => (
//             <tr key={employee.name} className="border-b">
//               {/* Employee Info */}
//               <td className="p-2 flex items-center space-x-2">
//                 <img src="" alt="profile" className="w-8 h-8 rounded-full" />
//                 <div>
//                   <p className="font-medium">{employee.name}</p>
//                   <p className="text-xs text-gray-500">{employee.role}</p>
//                 </div>
//               </td>

//               {/* Attendance Data */}
//               {Array.from({ length: daysInMonth }, (_, i) => (
//                 <td key={i} className="p-2 text-center">
//                   {statusIcons[employee.attendance[i]] || employee.attendance[i] || "-"}
//                 </td>
//               ))}

//               {/* Total Attendance */}
//               <td className="p-2 text-center font-bold">
//                 {employee.attendance.filter((s) => s === "✔").length} / {daysInMonth}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );
// };

// export default AttendanceTable;

//////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useMemo, useEffect } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { attendanceData } from "../data/attendanceData";

const getMonthOptions = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentYear = new Date().getFullYear();
  return months.map((month, index) => ({
    label: `${month} ${currentYear}`,
    value: `${currentYear}-${index + 1}`, // Format: YYYY-MM
  }));
};

// Employee Details Modal (Centered inside Attendance Table)
const EmployeeDetailsModal = ({ employee, onClose }) => {
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), "yyyy-MM"));
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  useEffect(() => {
    const startDate = startOfMonth(new Date(selectedMonth));
    const endDate = endOfMonth(new Date(selectedMonth));
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    const newAttendanceHistory = dateRange.map(date => ({
      date: format(date, "d MMM, EEE"), // Example: 1 Mar, Fri
      checkIn: employee.attendanceDetails?.find(d => d.date === format(date, "yyyy-MM-dd"))?.checkIn || "-",
      checkOut: employee.attendanceDetails?.find(d => d.date === format(date, "yyyy-MM-dd"))?.checkOut || "-",
      workingHours: employee.attendanceDetails?.find(d => d.date === format(date, "yyyy-MM-dd"))?.workingHours || "-",
      overtime: employee.attendanceDetails?.find(d => d.date === format(date, "yyyy-MM-dd"))?.overtime || "-",
    }));

    setAttendanceHistory(newAttendanceHistory);
  }, [selectedMonth, employee]);

  const columns = useMemo(() => [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "checkIn", header: "Check-In" },
    { accessorKey: "checkOut", header: "Check-Out" },
    { accessorKey: "workingHours", header: "Work Hour" },
    { accessorKey: "overtime", header: "Overtime" },
  ], []);

  const table = useReactTable({
    data: attendanceHistory,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white w-[70%] max-w-4xl rounded-lg shadow-lg overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-gray-100 p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={employee.profile} alt={employee.name} className="w-12 h-12 rounded-full shadow-md" />
            <div>
              <h2 className="text-lg font-semibold">{employee.name}</h2>
              <p className="text-sm text-gray-500">{employee.designation}</p>
            </div>
          </div>
          <div>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="p-2 border rounded text-gray-700 bg-white"
            >
              {getMonthOptions().map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-2xl">✖</button>
        </div>

        {/* Attendance Table inside Modal */}
        <div className="p-4 max-h-[400px] overflow-auto">
          <table className="w-full rounded-md">
            <thead className="bg-gray-200 text-gray-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-4 text-center font-semibold">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

// Attendance Table Component
const AttendanceTable = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const columns = [
    {
      accessorKey: "name",
      header: "Employee",
      cell: ({ row }) => (
        <div
          className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition"
          onClick={() => setSelectedEmployee(row.original)}
        >
          <img src={row.original.profile} alt={row.original.name} className="w-10 h-10 rounded-full shadow-md" />
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    { accessorKey: "checkIn", header: "Check-In", cell: ({ getValue }) => <span className="block text-center">{getValue()}</span> },
    { accessorKey: "checkOut", header: "Check-Out", cell: ({ getValue }) => <span className="block text-center">{getValue()}</span> },
    { accessorKey: "workingHours", header: "Working Hours", cell: ({ getValue }) => <span className="block text-center">{getValue()}</span> },
    { accessorKey: "overtime", header: "Overtime", cell: ({ getValue }) => <span className="block text-center">{getValue()}</span> },
  ];

  const table = useReactTable({
    data: attendanceData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative"> {/* Relative container for modal centering */}
      <table className="w-full border-collapse shadow-lg rounded-lg">
        <thead className="bg-[#4B5563] text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-4 text-center text-sm font-semibold">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="even:bg-gray-100 hover:bg-gray-50 transition duration-200">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4 text-center text-gray-800">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEmployee && <EmployeeDetailsModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />}
    </div>
  );
};

export default AttendanceTable;
