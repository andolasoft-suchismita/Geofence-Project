import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyPopup from '../CompanyPopup';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducers';
import { FaUserFriends, FaClock, FaUserMinus } from "react-icons/fa";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Dashboard = () => {
  // Monthly Present vs Absent Data;

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

  // Total Present vs Absent for Pie Chart
  const totalPresent = employeeData.reduce((sum, d) => sum + d.present, 0);
  const totalAbsent = employeeData.reduce((sum, d) => sum + d.absent, 0);
  
  const pieData = [
    { name: "Present", value: totalPresent, color: "#3B82F6" }, // Blue
    { name: "Absent", value: totalAbsent, color: "#60A5FA" }, // Light Blue
  ];

   const company_id = useSelector(
     (state: RootState) => state.authSlice.company_id
   );
   useEffect(() => {
     if (!company_id) {
       const timeout = setTimeout(() => setShowPopup(true), 3000);
       return () => clearTimeout(timeout);
     }
   }, [company_id]); // Reacts to Redux state updates


  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const companyCreated = localStorage.getItem('companyCreated');
    console.log('companyCreated from localStorage:', companyCreated);

    if (!companyCreated) {
      console.log('Company not created, showing popup in 3 seconds...');
      const timeout = setTimeout(() => {
        console.log('showPopup is now:', true);
        setShowPopup(true);
      }, 3000);

      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, []);

  const handleCompanyCreation = () => {
    localStorage.setItem('companyCreated', 'true'); // ✅ Save that company is created
    setShowPopup(false);
    navigate('/companysettings'); // ✅ Redirect to settings after creation
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between rounded-md bg-white p-4 shadow">
        <input
          type="text"
          placeholder="Search"
          className="w-1/3 rounded-md border px-4 py-2"
        />
        <div className="flex items-center space-x-3">
          <span className="font-semibold">David Clark</span>
          <div className="bg-gray-400 h-10 w-10 rounded-full"></div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="rounded-md bg-white p-5 shadow">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Total Employees</h3>
            <FaUserFriends className="text-2xl text-blue-500" />
          </div>
          <p className="mt-2 text-2xl font-bold">
            {totalPresent + totalAbsent}
          </p>
          {/* <p className="text-blue-500 text-sm">+12% from last month</p> */}
        </div>

        <div className="rounded-md bg-white p-5 shadow">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Absentees Today</h3>
            <FaUserMinus className="text-2xl text-blue-400" />{' '}
            {/* Updated icon */}
          </div>
          <p className="mt-2 text-2xl font-bold">{employeeData[11].absent}</p>
          {/* <p className="text-blue-400 text-sm">-10% from last month</p> */}
        </div>

        <div className="rounded-md bg-white p-5 shadow">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Late Comings</h3>
            <FaClock className="text-2xl text-blue-500" /> {/* Clock Icon */}
          </div>
          <p className="mt-2 text-2xl font-bold">23</p>{' '}
          {/* Placeholder value */}
          {/* <p className="text-blue-500 text-sm">+5% from last month</p> */}
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        {/* Updated Bar Chart - Present vs Absent */}
        <div className="rounded-md bg-white p-5 shadow">
          <h3 className="mb-4 text-lg font-semibold">
            Monthly Attendance Summary
          </h3>
          <BarChart width={500} height={300} data={employeeData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="present" fill="#3B82F6" name="Present" /> {/* Blue */}
            <Bar dataKey="absent" fill="#60A5FA" name="Absent" />{' '}
            {/* Light Blue */}
          </BarChart>
        </div>

        {/* Updated Pie Chart - Overall Present vs Absent */}
        <div className="rounded-md bg-white p-5 shadow">
          <h3 className="mb-4 text-lg font-semibold">Overall Attendance</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
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
        </div>
      </div>
      <div>{showPopup && <CompanyPopup onClose={handleCompanyCreation} />}</div>
    </div>
    <div>
    <h1>Welcome to Dashboard</h1>
    {showPopup ? (
      <CompanyPopup onClose={handleCompanyCreation} />
    ) : (
      <p>Popup should appear in 3 seconds...</p> // Debugging
    )}
  </div>
  </>
  );
};

export default Dashboard;
