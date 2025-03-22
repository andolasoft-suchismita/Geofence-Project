import Profile from '../pages/Profile';
import MyCalendar from '../pages/Calendar';
import Attendance from '../pages/Attendance';
import WeeklyReport from '../pages/WeeklyReport';
import CompanySettings from '../pages/CompanySettings';
import DefaultLayout from '../layout/DefaultLayout';
import Users from '../pages/Users';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import DashboardHome from '../pages/Dashboard';
import UserDashboard from '../pages/Dashboard/UserDashboard';
import NotFoundPage from '../pages/NotFoundPage';

import { useEffect } from 'react';
// import Users from '../pages/dashboard/Users';
// import Attendance from '../pages/dashboard/Attendance';
// import WeeklyReport from '../pages/dashboard/WeeklyReport';

const PrivateRoutes = () => {
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [location.pathname]);

  return (
    <DefaultLayout>
      <Routes>
        {/* <Route path="/dashboard" element={<DashboardHome />} /> */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/weeklyreport" element={<WeeklyReport />} />
        <Route path="/companysettings" element={<CompanySettings />} />
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFoundPage />} />
        {/* <Route path="/profile/:userId" element={<Profile />} /> */}

        {/* <Route path="*" element={<NotFoundPage />} /> */}
        {/* <Route path="/dashboard/attendance" element={<Attendance />} />
                <Route path="/dashboard/weeklyreport" element={<WeeklyReport />} /> */}
        {/* <Route path="*" element={<Navigate to="/calendar" replace />} /> */}
      </Routes>
    </DefaultLayout>
  );
};

export default PrivateRoutes;
