import Profile from '../pages/Profile';
import MyCalendar from '../pages/Calendar';
import Attendance from '../pages/Attendance';
import UserAttendance from '../pages/userAttendance';
import WeeklyReport from '../pages/WeeklyReport';
import CompanySettings from '../pages/CompanySettings';
import DefaultLayout from '../layout/DefaultLayout';
import Users from '../pages/Users';
import DashboardHome from '../pages/Dashboard/index';
import Userdashboard from '../pages/Dashboard/UserDashboard';
import NotFoundPage from '../pages/NotFoundPage';
import { Navigate } from 'react-router-dom';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducers';


  // if (userRole !== 'admin') {
  //   return <Navigate to="/dashboard" replace />;

  // }

const PrivateRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  

 // Fetch currentUser role from Redux
 const currentUser = useSelector((state: RootState) => state.userSlice.userInfo);
 const isAdmin = currentUser?.is_superuser === true || currentUser?.roletype === 'admin';

 useEffect(() => {
   if (location.pathname === '/') {
     navigate('/user-dashboard');
   }
   
   // Restrict users from accessing admin-only routes manually
   if (!isAdmin && ['/users', '/companysettings'].includes(location.pathname)) {
     navigate('/dashboard'); // Redirect non-admins to the dashboard
   }
 }, [location.pathname, isAdmin, navigate]);

 return (
   <DefaultLayout>
      <Routes>
        {isAdmin ? (
          <Route path="/dashboard" element={<DashboardHome />} />
        ) : (
          <Route path="/dashboard" element={<Userdashboard />} />
        )}

        {isAdmin ? (
          <Route path="/attendance" element={<Attendance />} />
        ) : (
          <Route path="/attendance" element={<UserAttendance />} />
        )}

        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/profile" element={<Profile />} />

        {/*  Restrict Admin Pages to Admins Only */}
        {isAdmin ? (
          <>
            <Route path="/users" element={<Users />} />
            <Route path="/weeklyreport" element={<WeeklyReport />} />
            <Route path="/companysettings" element={<CompanySettings />} />
          </>
        ) : (
          //  Redirect non-admin users to dashboard if they try accessing restricted pages
          <>
            <Route path="/users" element={<Navigate to="/dashboard" replace />} />
            <Route path="/weeklyreport" element={<Navigate to="/dashboard" replace />} />
            <Route path="/companysettings" element={<Navigate to="/dashboard" replace />} />
          </>
        )}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </DefaultLayout>
  );
};

export default PrivateRoutes; 