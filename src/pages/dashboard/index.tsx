import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyPopup from '../CompanyPopup';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducers';
// import { FaUserFriends, FaClock, FaUserMinus } from "react-icons/fa";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import PunchModal from '../../components/PunchModal';
import { ResponsiveContainer } from 'recharts';
import Card from '../../components/Card';

const Dashboard = () => {
  // Monthly Present vs Absent Data
  const employeeData = [
    { month: "Jan", present: 900, absent: 100 },
    { month: "Feb", present: 850, absent: 150 },
    { month: "Mar", present: 920, absent: 80 },
    { month: "Apr", present: 890, absent: 110 },
    { month: "May", present: 870, absent: 130 },
    { month: "Jun", present: 910, absent: 90 },
    { month: "Jul", present: 950, absent: 50 },
    { month: "Aug", present: 920, absent: 80 },
    { month: "Sep", present: 880, absent: 120 },
    { month: "Oct", present: 940, absent: 60 },
    { month: "Nov", present: 930, absent: 70 },
    { month: "Dec", present: 960, absent: 40 },
  ];
 // Department-wise Present vs Absent Data
 const departmentData = [
  { department: "HR", present: 30, absent: 5 },
  { department: "IT", present: 100, absent: 15 },
  { department: "Finance", present: 40, absent: 10 },
  { department: "Marketing", present: 50, absent: 8 },
  { department: "Digital marketing", present: 60, absent: 12 },
];

const totalEmployees = 100;
const absenteesToday = 5;
const lateComings = 10;


// Total Present vs Absent for Pie Chart
const totalPresent = employeeData.reduce((sum, d) => sum + d.present, 0);
const totalAbsent = employeeData.reduce((sum, d) => sum + d.absent, 0);

const [chartKey, setChartKey] = useState(0);
useEffect(() => {
  setChartKey((prev) => prev + 1);
}, []);


const pieData = [
  { name: "Present", value: totalPresent, color: "#578FCA"}, // Blue
  { name: "Absent", value: totalAbsent, color: "#BFBBA9" }, // Red
];

const [showPopup, setShowPopup] = useState(false);
const navigate = useNavigate();
const company_id = useSelector(
  (state: RootState) => state.authSlice.company_id
);
useEffect(() => {
  if (!company_id) {
    const timeout = setTimeout(() => setShowPopup(true), 3000);
    return () => clearTimeout(timeout);
  }
}, [company_id]); // Reacts to Redux state updates

const handleCompanyCreation = () => {
  setShowPopup(false);
  navigate('/companysettings'); // Redirect after creation
};

const { isPunchedIn } = useSelector((state: RootState) => state.attendance);

return (
  <div className="bg-gray min-h-screen p-6">
    <PunchModal />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card title="Total Employees" count={totalPresent + totalAbsent} type="total" />
      <Card title="Absentees Today" count={employeeData[0]?.absent || 0} type="absentees" />
      <Card title="Late Comings" count={lateComings} type="late" />
    </div>
 


    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-md bg-white p-5 shadow  w-full">
      <h3 className="mb-4 text-lg font-semibold">Department-wise Attendance</h3>
       <ResponsiveContainer width="100%" height={300}> 
      <BarChart data={departmentData}  width={600} height={300}>
        <XAxis dataKey="department" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="present" fill="#578FCA" name="Present" />
        <Bar dataKey="absent" fill="#BFBBA9" name="Absent" />
      </BarChart>
      </ResponsiveContainer>
    </div>

      <div className="rounded-md bg-white p-5 shadow w-full">
        <h3 className="mb-4 text-lg font-semibold">Overall Attendance</h3>
        <ResponsiveContainer width="100%" height={300}>
        <PieChart key={chartKey}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="mt-6 rounded-md bg-white p-5 shadow">
    <h3 className="mb-4 text-lg font-semibold">
          Monthly Attendance Summary
        </h3>
        <ResponsiveContainer width="100%" height={300}>
        <BarChart data={employeeData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="present" fill="#578FCA" name="Present" />
          <Bar dataKey="absent" fill="#BFBBA9" name="Absent" />
        </BarChart>
        </ResponsiveContainer>
      </div>
      

    <div>{showPopup && <CompanyPopup onClose={handleCompanyCreation} />}</div>
  </div>
);
};

export default Dashboard;
