
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Calendar from '../pages/Calendar';
import DefaultLayout from '../layout/DefaultLayout';

const PrivateRoutes = () => {
    return (
        <DefaultLayout>
            <Routes>
                <Route path="/calendar" element={<Calendar />} />
                <Route path="*" element={<Navigate to="/calendar" replace />} />
            </Routes>
        </DefaultLayout>
    );
};

export default PrivateRoutes;
