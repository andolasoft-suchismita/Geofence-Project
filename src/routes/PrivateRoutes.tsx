import { Route, Routes } from 'react-router-dom';
import DashboardHome from '../pages/dashboard';
import Calendar from '../pages/Calendar';
import Attendance from '../pages/Attendance';
import WeeklyReport from '../pages/WeeklyReport';
import CompanySettings from '../pages/CompanySettings';
import DefaultLayout from '../layout/DefaultLayout';
import NotFoundPage from '../pages/NotFoundPage';

const PrivateRoutes = () => {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="weeklyreport" element={<WeeklyReport />} />
        <Route path="companysettings" element={<CompanySettings />} />
        <Route path="*" element={<DashboardHome />} />
      </Routes>
    </DefaultLayout>
  );
};

export default PrivateRoutes;
