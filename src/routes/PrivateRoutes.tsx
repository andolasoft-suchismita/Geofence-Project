import Profile from '../pages/Profile';
import MyCalendar from '../pages/Calendar';
import Attendance from '../pages/Attendance';
import WeeklyReport from '../pages/WeeklyReport';
import CompanySettings from '../pages/CompanySettings';
import DefaultLayout from '../layout/DefaultLayout';
import Users from '../pages/Users';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import DashboardHome from '../pages/Dashboard';
import NotFoundPage from '../pages/NotFoundPage';
import Userdashboard from '../pages/Dashboard/UserDashboard';
import { RootState } from '../redux/rootReducers';
import { useEffect } from 'react';
// import Users from '../pages/dashboard/Users';
// import Attendance from '../pages/dashboard/Attendance';
// import WeeklyReport from '../pages/dashboard/WeeklyReport';

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const currentUser = useSelector(
      (state: RootState) => state.userSlice.userInfo
    );
    console.log("Fetched User Info:", currentUser); // Debugging user data

  const isAdmin = currentUser?.is_superuser == true || currentUser?.roletype === "admin";
  console.log("Is Admin?", isAdmin);


  if (!isAdmin) {
    return <Navigate to="/user-dashboard" replace />;

  }

  return children;
};


const PrivateRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.userSlice.userInfo);


  useEffect(() => {
    console.log("Current User Role in PrivateRoutes:", currentUser?.roletype);
    if (location.pathname === '/') {
      navigate('/user-dashboard');
    }
  }, [location.pathname]);

  return (
    <DefaultLayout>
      <Routes>
         {/* User Dashboard */}
        <Route path="/user-dashboard" element={<Userdashboard />} />

         {/* Common Pages */}
         <Route path="/attendance" element={<Attendance />} />
         <Route path="/calendar" element={<MyCalendar />} />
         <Route path="/profile" element={<Profile />} />


        {/* Admin-Only Routes (Wrapped in AdminRoute) */} {/* Admin Dashboard */}
        <Route path="/dashboard" element={<AdminRoute><DashboardHome /></AdminRoute>} />
        <Route path="/users" element={<AdminRoute><Users /></AdminRoute>} />
        <Route path="/companysettings" element={<AdminRoute><CompanySettings /></AdminRoute>} />
        <Route path="/weeklyreport" element={<AdminRoute><WeeklyReport /></AdminRoute>} />




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
