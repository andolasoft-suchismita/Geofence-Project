import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyPopup from '../CompanyPopup';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/rootReducers';
// import PunchModal from '../../components/PunchModal';
// import { FaUserFriends, FaClock, FaUserMinus } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import Card from '../../components/Card';
import {
  setAttendanceSummary,
  setMonthlyReport,
} from '../../redux/slices/dashboardSlice';
import {
  getattendanceSummary,
  getattendanceReports,
} from '../../api/services/dashboardService';
 
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  // Fetch dashboard data from Redux state
  const attendanceSummary = useSelector(
    (state: RootState) => state.dashboard.attendanceSummary
  );
  const monthlyReport = useSelector(
    (state: RootState) => state.dashboard.monthlyReport
  );
  const company_id = useSelector(
    (state: RootState) => state.authSlice.company_id
  );
  // const { isPunchedIn } = useSelector((state: RootState) => state.attendance);
 
  const [showPopup, setShowPopup] = useState(false);
  const [chartKey, setChartKey] = useState(0);
 
  // Get current month name
  const getCurrentMonth = () => {
    return new Date().toLocaleString('default', { month: 'long' });
  };
 
  // Get current year
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
 
  // Fetch API Data When Component Loads
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // console.log('Fetching Attendance Summary...');
        const summaryData = await getattendanceSummary(company_id);
        // console.log('Summary Data:', summaryData); // Check response
        dispatch(setAttendanceSummary(summaryData));
 
        // console.log('📡 Fetching Attendance Reports...');
        const reportData = await getattendanceReports(
          company_id,
          getCurrentMonth(),
          getCurrentYear()
        );
        // console.log('Report Data:', reportData); // Check response
        dispatch(setMonthlyReport(reportData));
      } catch (error) {
        console.error(' Error fetching dashboard data:', error);
      }
    };
 
    if (company_id) {
      fetchDashboardData();
    }
  }, [dispatch, company_id]);
 
  // **Handle Missing Company ID**
  useEffect(() => {
    if (!company_id) {
      const timeout = setTimeout(() => setShowPopup(true), 3000);
      return () => clearTimeout(timeout);
    }
  }, [company_id]);
 
  const handleCompanyCreation = () => {
    setShowPopup(false);
    navigate('/companysettings'); // Redirect after creation
  };
 
  // Ensure chart re-renders on data update
  useEffect(() => {
    setChartKey((prev) => prev + 1);
  }, [attendanceSummary]);
 
  // Data preparation for charts
  const totalEmployees = attendanceSummary?.total_employees || 0;
  const presentToday = attendanceSummary?.present_today || 0;
  const absenteesToday = attendanceSummary?.absentees_today || 0;
  const lateComingsToday = attendanceSummary?.late_comings_today || 0;
 
  const departmentData = attendanceSummary?.department_wise_attendance
    ? Object.keys(attendanceSummary.department_wise_attendance).map((dept) => ({
        department: dept,
        present:
          attendanceSummary.department_wise_attendance[dept].present || 0,
        absent: attendanceSummary.department_wise_attendance[dept].absent || 0,
      }))
    : [];
 
  // Format department name to handle underscores and hyphens
  const formatDepartmentName = (name: string) => {
    // First replace underscores and hyphens with spaces
    const withSpaces = name.replace(/[_-]/g, ' ');
    // Then capitalize first letter of each word
    return withSpaces
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
 
  const pieData = [
    { name: 'Present', value: presentToday, color: '#578FCA' },
    { name: 'Absent', value: absenteesToday, color: '#BFBBA9' },
  ];
  const colorMapping = {
    days_absent: '#BFBBA9', // Light gray
    half_days: '#578FCA', // Blue
  };
 
  // console.log(' Department Data:', departmentData);
  // console.log(' Pie Chart Data:', pieData);
  // console.log(' Monthly Report Data:', monthlyReport);
  // const { isPunchedIn } = useSelector((state: RootState) => state.attendance);
 
  return (
    <div className="min-h-screen bg-gray p-6">
      {/* <PunchModal /> */}
 
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card title="Total Employees" count={totalEmployees} type="total" />
        <Card
          title="Present/Absent Today"
          count={`${presentToday}/${absenteesToday}`}
          type="absentees"
        />
        <Card title="Late Comings" count={lateComingsToday} type="late" />
      </div>
 
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="w-full rounded-md bg-white p-5 shadow">
          <h3 className="mb-4 text-lg font-semibold">
            Department-wise Attendance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData} width={600} height={300}>
              <XAxis 
                dataKey="department" 
                tickFormatter={formatDepartmentName}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill="#578FCA" name="Present" />
              <Bar dataKey="absent" fill="#BFBBA9" name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
 
        <div className="w-full rounded-md bg-white p-5 shadow">
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
          Monthly Attendance Summary ({getCurrentMonth()} {getCurrentYear()})
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyReport}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="days_absent"
              fill={colorMapping.days_absent}
              name="Days Absent"
            />
            <Bar
              dataKey="half_days"
              fill={colorMapping.half_days}
              name="Half Days"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
 
      <div>{showPopup && <CompanyPopup onClose={handleCompanyCreation} />}</div>
    </div>
  );
};
 
export default Dashboard;
 