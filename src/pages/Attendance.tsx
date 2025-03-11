// import React, { useState } from "react";
// import AttendanceTable from "../components/attendancetable";

// const employees = ["Dibyajyoti Mishra", "John Doe", "Jane Smith"];
// const months = [
//   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
// ];
// const years = [2023, 2024, 2025, 2026];

// const Attendance: React.FC = () => {
//   const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
//   const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//   const handleEmployeeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedEmployee(event.target.value);
//   };

//   const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedMonth(event.target.value);
//   };

//   const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedYear(Number(event.target.value));
//   };

//   const data = [
//     { name: "Dibyajyoti Mishra", role: "Software Intern", attendance: ["✔", "✔", "✔", "✔", "✔", "✔", "X", "✔", "✔", "!"] },
//     { name: "John Doe", role: "Developer", attendance: ["✔", "✔", "X", "✔", "✔", "✔", "✔", "✔", "✔", "★"] },
//   ];

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Attendance</h2>
//       <div className="flex gap-4 mb-4">
//         <select className="border p-2 rounded" value={selectedEmployee} onChange={handleEmployeeChange}>
//           {employees.map((emp) => (
//             <option key={emp} value={emp}>{emp}</option>
//           ))}
//         </select>

//         <select className="border p-2 rounded" value={selectedMonth} onChange={handleMonthChange}>
//           {months.map((month) => (
//             <option key={month} value={month}>{month}</option>
//           ))}
//         </select>

//         <select className="border p-2 rounded" value={selectedYear} onChange={handleYearChange}>
//           {years.map((year) => (
//             <option key={year} value={year}>{year}</option>
//           ))}
//         </select>
//       </div>
      
//       <AttendanceTable data={data} />
//     </div>
//   );
// };

// export default Attendance;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState,  useEffect } from "react";
import AttendanceTable from "../components/attendancetable";
import { FaChevronLeft, FaChevronRight, FaSearch, FaCalendarAlt} from "react-icons/fa";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Attendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    // Function to fetch attendance data
    const fetchAttendance = async (date: Date) => {
      setLoading(true);
      setError(null);
  
      const formattedDate = format(date, "yyyy-MM-dd");
      const url = `http://192.168.2.31:9009/attendanceapi/attendance/by-date/${formattedDate}`;
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch attendance`);
        }
  
        const data = await response.json();
        setAttendanceData(data); // Store the fetched attendance data
      } catch (err) {
        setError(err.message);
        setAttendanceData([]); // Reset data on error
      } finally {
        setLoading(false);
      }
    };
  
    // Fetch data when the selected date changes
    useEffect(() => {
      fetchAttendance(selectedDate);
    }, [selectedDate]);
  

 const handlePrevDate = () => {
    setSelectedDate((prev) => new Date(prev.setDate(prev.getDate() - 1)));
  };

  const handleNextDate = () => {
    setSelectedDate((prev) => new Date(prev.setDate(prev.getDate() + 1)));
  };

   const handleSearch = () => {
  console.log("Searching for:", searchQuery);
};

  return (
    <div className="p-2">
      {/* Date Selector & Buttons */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <FaChevronLeft onClick={handlePrevDate} className="cursor-pointer text-gray-600 hover:text-black" />
          <span className="text-lg font-bold">{format(selectedDate, "EEEE, dd MMMM yyyy")}</span>
          <FaChevronRight onClick={handleNextDate} className="cursor-pointer text-gray-600 hover:text-black" />
        </div>
      </div>  
  
      {/* Attendance Summary */}
      <div className="flex gap-4 mb-6">
        {/* Present Summary */}
        <div className="bg-white p-4 shadow rounded-lg w-1/3">
          <h3 className="text-lg font-bold">Present Summary</h3>
          <div className="grid grid-cols-3 gap-4 mt-2 text-center">
            <div>
              <p className="text-sm text-gray-500">On time</p>
              <p className="text-xl font-bold">265</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Late clock-in</p>
              <p className="text-xl font-bold">62</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Early clock-in</p>
              <p className="text-xl font-bold">224</p>
            </div>
          </div>
        </div>
  
        {/* Not Present Summary */}
        <div className="bg-white p-4 shadow rounded-lg w-1/3">
          <h3 className="text-lg font-bold">Not Present Summary</h3>
          <div className="grid grid-cols-2 gap-4 mt-2 text-center">
            <div>
              <p className="text-sm text-gray-500">Absent</p>
              <p className="text-xl font-bold">42</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">No clock-in</p>
              <p className="text-xl font-bold">36</p>
            </div>
          </div>
        </div>
  
        {/* Leave Summary */}
        <div className="bg-white p-4 shadow rounded-lg w-1/3">
          <h3 className="text-lg font-bold">Leave Summary</h3>
          <div className="grid grid-cols-2 gap-4 mt-2 text-center">
            <div>
              <p className="text-sm text-gray-500">Day off</p>
              <p className="text-xl font-bold">0</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time off</p>
              <p className="text-xl font-bold">0</p>
            </div>
          </div>
        </div>
      </div>
  
      {/* Filters Section */}
      <div className="flex space-x-4 mb-6">
        {/* Search Bar */}
        <div className="relative flex items-center shadow-md rounded-lg w-72">
            <input
              type="text"
              placeholder="Search employee"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 pl-3 py-2 rounded-lg focus:outline-none w-full"
            />
            <button
              onClick={() => handleSearch()} // Call search function when clicked
              className="absolute right-3 text-gray-400 hover:text-gray-600"
            >
              <FaSearch />
            </button>
          </div>
  
        {/* Date Range Dropdown */}
        <div className="relative shadow-md rounded-lg flex items-center px-4 py-2 bg-white cursor-pointer">
          <FaCalendarAlt className="mr-2 text-gray-500" />
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            isClearable={true}
            className="focus:outline-none bg-transparent"
            placeholderText="Select Date Range"
          />
        </div>
        </div>

      <div className="p-4">
        <AttendanceTable />
      </div>
    </div>
  );
};
export default Attendance;


