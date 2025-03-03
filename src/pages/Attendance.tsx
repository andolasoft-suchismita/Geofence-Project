import React, { useState } from "react";
import AttendanceTable from "../components/Attendancetable";

const employees = ["Dibyajyoti Mishra", "John Doe", "Jane Smith"];
const months = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
const years = [2023, 2024, 2025, 2026];

const Attendance: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleEmployeeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEmployee(event.target.value);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const data = [
    { name: "Dibyajyoti Mishra", role: "Software Intern", attendance: ["✔", "✔", "✔", "✔", "✔", "✔", "X", "✔", "✔", "!"] },
    { name: "John Doe", role: "Developer", attendance: ["✔", "✔", "X", "✔", "✔", "✔", "✔", "✔", "✔", "★"] },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>
      <div className="flex gap-4 mb-4">
        <select className="border p-2 rounded" value={selectedEmployee} onChange={handleEmployeeChange}>
          {employees.map((emp) => (
            <option key={emp} value={emp}>{emp}</option>
          ))}
        </select>

        <select className="border p-2 rounded" value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>

        <select className="border p-2 rounded" value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      
      <AttendanceTable data={data} selectedMonth={selectedMonth} selectedYear={selectedYear}/>
    </div>
  );
};

export default Attendance;
