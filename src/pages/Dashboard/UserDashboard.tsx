import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../redux/slices/userdashboardSlice';
import { RootState, AppDispatch } from '../../redux/store';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import PunchModal from '../../components/PunchModal';
import {resetDashboardData} from "../../redux/slices/userdashboardSlice"
import { logout } from "../../redux/slices/authSlice"; 


const Userdashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout()); // Clears authentication
    dispatch(resetDashboardData()); // Clears dashboard data
    localStorage.removeItem("reduxState"); // Clear persisted state
    window.location.reload(); // Force a fresh state on next load
    console.log("Dashboard data reset after logout!");
  };

  const user_id = useSelector((state: RootState) => state.authSlice.user_id);
  const { data, loading, error } = useSelector(
    (state: RootState) => state.userdashboard
  );
  const user = useSelector((state: RootState) => state.authSlice.user);
  //  Fetch currentUser from Redux
  const currentUser = useSelector(
    (state: RootState) => state.userSlice.userInfo
  );

  useEffect(() => {
    dispatch(resetDashboardData()); // Clear dashboard data first
    if (user_id) {
      dispatch(fetchDashboardData(user_id));
    }
  }, [dispatch, user_id]);

  useEffect(() => {
    return () => {
      dispatch(resetDashboardData()); // Clears dashboard data when component unmounts
    };
  }, [dispatch]);

  // Extract attendance data
  const attendanceData = [
    { name: 'Present', value: data?.total_present_days ?? 0 },
    { name: 'Absent', value: data?.total_absent_days ?? 0 },
  ];

  // Prepare line chart data from API response
  const loginOvertimeData = data?.login_overtime_trends
    ? Object.keys(data.login_overtime_trends).map((month) => ({
        month,
        loginHours: data.login_overtime_trends[month].login_hours,
        overtime: data.login_overtime_trends[month].overtime,
        companyHours: data.login_overtime_trends[month].company_hours,
      }))
    : [];

  console.log('User data', user);

  return (
    <div className="bg-gray-100 flex min-h-screen flex-col p-2">
      {loading ? (
        <p className="text-gray-500 mt-2">Loading...</p>
      ) : error ? (
        <p className="text-red-500 mt-2">{error}</p>
      ) : (
        <>
          <h1 className="text-gray-800  text-3xl font-bold">
            Welcome, {currentUser?.first_name} {currentUser?.last_name}
          </h1>

          <div className="mb-8 flex justify-end">
            <PunchModal isInsideGeofence={true} loading={false} />
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Upcoming Holiday Card */}
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h2 className="text-gray-700 text-xl font-semibold">
                Upcoming Holiday
              </h2>
              {data?.upcoming_holiday ? (
                <>
                  <p className="text-gray-500 mt-2 font-semibold">
                    {data.upcoming_holiday.name}
                  </p>
                  <p className="text-gray-600 font-semibold">
                    {data.upcoming_holiday.date}
                  </p>
                </>
              ) : (
                <p className="text-gray-500 mt-2">No upcoming holidays</p>
              )}
            </div>

            {/* Total Invested Time Card */}
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h2 className="text-gray-700 text-xl font-semibold">
                Total Invested Time
              </h2>
              <p className="text-gray-600 text-md mt-2 font-semibold">
                {data?.total_invested_time ?? 0} hrs
              </p>
            </div>

            {/* Total Overtime Card */}
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h2 className="text-gray-700 text-xl font-semibold">
                Total Overtime
              </h2>
              <p className="text-gray-600 text-md mt-2 font-semibold">
                {data?.total_overtime ?? 0} hrs
              </p>
            </div>
          </div>

          {/* Summary Section */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Attendance Summary (Pie Chart) */}
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h2 className="text-gray-700 mb-4 text-lg font-semibold">
                Attendance Summary
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={attendanceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                  >
                    <Cell fill="#063970" />
                    <Cell fill="#2596be" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Login & Overtime Hours (Line Chart) */}
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h2 className="text-gray-700 mb-4 text-lg font-semibold">
                Login & Overtime Hours
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={loginOvertimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="loginHours"
                    stroke="#4CAF50"
                    name="Login Hours"
                  />
                  <Line
                    type="monotone"
                    dataKey="overtime"
                    stroke="#FF5722"
                    name="Overtime"
                  />
                  <Line
                    type="monotone"
                    dataKey="companyHours"
                    stroke="#2196F3"
                    name="Company Hours"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Userdashboard;
