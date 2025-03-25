import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../redux/slices/userdashboardSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user_id = useSelector((state: RootState) => state.authSlice.user_id);
  const { data, loading, error } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    if (user_id) {
      dispatch(fetchDashboardData(user_id));
    }
  }, [dispatch, user_id]);

  // Extract attendance data
  const attendanceData = [
    { name: "Present", value: data?.total_present_days ?? 0 },
    { name: "Absent", value: data?.total_absent_days ?? 0 },
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

  return (
    <div className="min-h-screen flex flex-col p-2 bg-gray-100">
      {loading ? (
        <p className="text-gray-500 mt-2">Loading...</p>
      ) : error ? (
        <p className="text-red-500 mt-2">{error}</p>
      ) : (
        <>
          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Upcoming Holiday Card */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Upcoming Holiday</h2>
              {data?.upcoming_holiday ? (
                <>
                  <p className="text-gray-500 font-semibold mt-2">{data.upcoming_holiday.name}</p>
                  <p className="text-gray-600 font-semibold">{data.upcoming_holiday.date}</p>
                </>
              ) : (
                <p className="text-gray-500 mt-2">No upcoming holidays</p>
              )}
            </div>

            {/* Total Invested Time Card */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Total Invested Time</h2>
              <p className="text-gray-600 font-semibold mt-2 text-md">{data?.total_invested_time ?? 0} hrs</p>
            </div>

            {/* Total Overtime Card */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Total Overtime</h2>
              <p className="text-gray-600 font-semibold mt-2 text-md">{data?.total_overtime ?? 0} hrs</p>
            </div>
          </div>

          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* Attendance Summary (Pie Chart) */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Attendance Summary</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={attendanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                    <Cell fill="#063970" />
                    <Cell fill="#2596be" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Login & Overtime Hours (Line Chart) */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Login & Overtime Hours</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={loginOvertimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="loginHours" stroke="#4CAF50" name="Login Hours" />
                  <Line type="monotone" dataKey="overtime" stroke="#FF5722" name="Overtime" />
                  <Line type="monotone" dataKey="companyHours" stroke="#2196F3" name="Company Hours" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
