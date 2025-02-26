import Profile from '../pages/Profile';
import Calendar from '../pages/Calendar';
import Attendance from '../pages/Attendance';
import WeeklyReport from '../pages/WeeklyReport';
import CompanySettings from '../pages/CompanySettings';
import DefaultLayout from '../layout/DefaultLayout';
import Users from '../pages/Users';
import { Route, Routes } from 'react-router-dom';
import DashboardHome from '../pages/dashboard';
// import Users from '../pages/dashboard/Users';
// import Attendance from '../pages/dashboard/Attendance';
// import WeeklyReport from '../pages/dashboard/WeeklyReport';

const PrivateRoutes = () => {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="weeklyreport" element={<WeeklyReport />} />
        <Route path="companysettings" element={<CompanySettings />} />
        {/* <Route path="*" element={<DashboardHome />} /> */}
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/dashboard/attendance" element={<Attendance />} />
                <Route path="/dashboard/weeklyreport" element={<WeeklyReport />} /> */}
        {/* <Route path="*" element={<Navigate to="/calendar" replace />} /> */}
      </Routes>
    </DefaultLayout>
  );
};

export default PrivateRoutes;
