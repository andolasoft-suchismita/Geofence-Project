// import DefaultLayout from '../../layout/DefaultLayout';
// const Dashboard: React.FC = () => {
    

//     return (
//       <DefaultLayout children={''}>
        
//       </DefaultLayout>
//     );
//   };
  
//   export default Dashboard;


import DefaultLayout from '../../layout/DefaultLayout';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const [totalEmployees, setTotalEmployees] = useState(10);
  const [presentCount, setPresentCount] = useState(1);
  const [absentCount, setAbsentCount] = useState(2);
  const [attendanceLogs, setAttendanceLogs] = useState([]);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch("/api/attendance-summary"); // Replace with your API
      const data = await response.json();

      setTotalEmployees(data.total);
      setPresentCount(data.present);
      setAbsentCount(data.absent);
      setAttendanceLogs(data.logs);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const chartData = [
    { name: "Present", value: presentCount, color: "#22c55e" }, // Green
    { name: "Absent", value: absentCount, color: "#ef4444" }, // Red
  ];

  return (
    <DefaultLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800">Attendance Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6">
          <div className="p-6 bg-blue-500 text-white rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold">Total Employees</h2>
            <p className="text-3xl font-bold">{totalEmployees}</p>
          </div>
          <div className="p-6 bg-green-500 text-white rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold">Present</h2>
            <p className="text-3xl font-bold">{presentCount}</p>
          </div>
          <div className="p-6 bg-yellow-500 text-white rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold">Absent</h2>
            <p className="text-3xl font-bold">{absentCount}</p>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Attendance Overview</h2>
          {totalEmployees > 0 && (
  <ResponsiveContainer width="100%" height={300}>
         <PieChart> 
         <Pie 
            data={chartData} 
            dataKey="value" 
            nameKey="name" 
            cx="50%" 
            cy="50%" 
            outerRadius={100} 
            fill="#8884d8"
            label
            >
            {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
    </Pie>
    <Tooltip />
  </PieChart>

        
  </ResponsiveContainer>
)}


        </div>

        {/* Attendance Logs */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Recent Attendance Logs</h2>
          <ul className="mt-4 space-y-3">
            {attendanceLogs.map((log, index) => (
              <li key={index} className={`p-3 rounded-md ${log.status === 'Present' ? 'bg-green-100' : 'bg-red-100'}`}>
                {log.name} - {log.time} {log.status === 'Present' ? '✅' : '❌'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
