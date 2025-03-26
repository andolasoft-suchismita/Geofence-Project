import Profile from '../pages/Profile';
import MyCalendar from '../pages/Calendar';
import Attendance from '../pages/Attendance';
import UserAttendance from '../pages/userAttendance';
import WeeklyReport from '../pages/WeeklyReport';
import CompanySettings from '../pages/CompanySettings';
import DefaultLayout from '../layout/DefaultLayout';
import Users from '../pages/Users';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import DashboardHome from '../pages/Dashboard';
import Dashboard from '../pages/Dashboard/UserDashboard';
import NotFoundPage from '../pages/NotFoundPage';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducers';

const PrivateRoutes = () => {
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [location.pathname]);
  //  Fetch currentUser role from Redux
  const currentUser = useSelector(
    (state: RootState) => state.userSlice.userInfo
  );
  const isAdmin =
    currentUser?.is_superuser == true || currentUser?.roletype == 'admin'; // Admin role check

  return (
    <DefaultLayout>
      <Routes>
        {/* <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
        {isAdmin ? (
          <Route path="/dashboard" element={<DashboardHome />} />
        ) : (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
        {isAdmin ? (
          <Route path="/attendance" element={<Attendance />} />
        ) : (
          <Route path="/attendance" element={<UserAttendance />} />
        )}
        <Route path="/weeklyreport" element={<WeeklyReport />} />
        <Route path="/companysettings" element={<CompanySettings />} />
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />

        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </DefaultLayout>
  );
};

export default PrivateRoutes;
