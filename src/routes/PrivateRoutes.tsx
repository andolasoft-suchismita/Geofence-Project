import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Profile from '../pages/Profile';
import Calendar from '../pages/Calendar';
import DefaultLayout from '../layout/DefaultLayout';

// import Users from '../pages/dashboard/Users';
// import Attendance from '../pages/dashboard/Attendance';
// import WeeklyReport from '../pages/dashboard/WeeklyReport';

const PrivateRoutes = () => {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={< Profile />} />
       
        {/* <Route path="/dashboard/users" element={<Users />} />
                <Route path="/dashboard/attendance" element={<Attendance />} />
                <Route path="/dashboard/weeklyreport" element={<WeeklyReport />} /> */}
        <Route path="*" element={<Navigate to="/calendar" replace />} />
      </Routes>
    </DefaultLayout>
  );
};

export default PrivateRoutes;
