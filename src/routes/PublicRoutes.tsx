
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from '../pages/Authentication/SignUp';
import SignIn from '../pages/Authentication/SignIn';
import { showToast } from '../utils/toast';
import CompanyInfo from '../pages/Authentication/companyinfo';

const PublicRoutes = () => {

    return (
        <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/companyinfo" element={< CompanyInfo/>} />
            <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
    );
};

export default PublicRoutes;
