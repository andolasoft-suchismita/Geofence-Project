import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RootState } from './redux/store';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';

const App = () => {
  const authToken = useSelector((state: RootState) => state?.authSlice?.token);
  const userId = useSelector((state: RootState) => state?.authSlice?.user_id);

  // console.log({ authToken, userId });

  return (
    <>
      <Routes>
        {authToken && userId ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}
      </Routes>
    </>
  );
};
export default App;
