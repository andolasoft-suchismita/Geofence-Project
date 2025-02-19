import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Setting from './pages/Dashboard/Setting';
import Calender from './pages/Dashboard/Calender';
import Attendance from './pages/Dashboard/Attendance';
import User from './pages/Dashboard/User';
import Dashboard from './pages/Dashboard/Dashboard';
import Analytics from './pages/Dashboard/Analytics';
import Profile from './pages/Profile';
// import FormElements from './pages/Form/FormElements';
// import FormLayout from './pages/Form/FormLayout';
import Tables from './pages/Tables/Tables';
import Settings from './pages/Pages/Settings';
import ErrorPage from './pages/Pages/ErrorPage';
import MailSuccess from './pages/Pages/MailSuccess';
import Messages from './pages/Messages';
import Inbox from './pages/Inbox';
import Invoice from './pages/Invoice';
import BasicChart from './pages/Chart/BasicChart';
import AdvancedChart from './pages/Chart/AdvancedChart';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import ButtonsGroup from './pages/UiElements/ButtonsGroup';
import Breadcrumbs from './pages/UiElements/Breadcrumbs';
import Cards from './pages/UiElements/Cards';
import Dropdowns from './pages/UiElements/Dropdowns';
import Modals from './pages/UiElements/Modals';
import Tabs from './pages/UiElements/Tabs';
import Tooltips from './pages/UiElements/Tooltips';
import Notifications from './pages/UiElements/Notifications';
import Pagination from './pages/UiElements/Pagination';
import ResetPassword from './pages/Authentication/ResetPassword';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import List from './pages/UiElements/List';
import WeeklyReport from './pages/Dashboard/WeeklyReport';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Analytics Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="Analytics Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <User />
            </>
          }
        />
        <Route
          path="/attendance"
          element={
            <>
              <PageTitle title="Analytics Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Attendance />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calender />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Setting />
            </>
          }
        />
        <Route
          path="/weekly-report"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <WeeklyReport />
            </>
          }
        />
        <Route
          path="/dashboard/analytics"
          element={
            <>
              <PageTitle title="Analytics Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Analytics />
            </>
          }
        />
      
      <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        {/* <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        /> */}
        <Route
          path="/tables/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/tables/pro-tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/pages/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/pages/error-page"
          element={
            <>
              <PageTitle title="Error Page | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ErrorPage />
            </>
          }
        />
        <Route
          path="/pages/mail-success"
          element={
            <>
              <PageTitle title="Mail Success | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <MailSuccess />
            </>
          }
        />
        <Route
          path="/messages"
          element={
            <>
              <PageTitle title="Messages | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Messages />
            </>
          }
        />
        <Route
          path="/inbox"
          element={
            <>
              <PageTitle title="Inbox | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Inbox />
            </>
          }
        />
        <Route
          path="/invoice"
          element={
            <>
              <PageTitle title="Invoice | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Invoice />
            </>
          }
        />
        <Route
          path="/chart/basic-chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <BasicChart />
            </>
          }
        />
        <Route
          path="/chart/advanced-chart"
          element={
            <>
              <PageTitle title="Advanced Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AdvancedChart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/breadcrumbs"
          element={
            <>
              <PageTitle title="Breadcrumbs | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Breadcrumbs />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/ui/buttons-group"
          element={
            <>
              <PageTitle title="Buttons Groupo | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ButtonsGroup />
            </>
          }
        />
        <Route
          path="/ui/cards"
          element={
            <>
              <PageTitle title="Cards | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Cards />
            </>
          }
        />
        <Route
          path="/ui/dropdowns"
          element={
            <>
              <PageTitle title="Dropdowns | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Dropdowns />
            </>
          }
        />
        <Route
          path="/ui/list"
          element={
            <>
              <PageTitle title="List | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <List />
            </>
          }
        />
        <Route
          path="/ui/modals"
          element={
            <>
              <PageTitle title="Modals | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Modals />
            </>
          }
        />
        <Route
          path="/ui/notifications"
          element={
            <>
              <PageTitle title="Notifications | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Notifications />
            </>
          }
        />
        <Route
          path="/ui/pagination"
          element={
            <>
              <PageTitle title="Pagination | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Pagination />
            </>
          }
        />
        <Route
          path="/ui/tabs"
          element={
            <>
              <PageTitle title="Tabs | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tabs />
            </>
          }
        />
        <Route
          path="/ui/tooltips"
          element={
            <>
              <PageTitle title="Tooltips | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tooltips />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />

        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/auth/reset-password"
          element={
            <>
              <PageTitle title="Reset Password | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ResetPassword />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
