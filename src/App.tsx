import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RootState } from './redux/store';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';

const App = () => {
  const authToken = useSelector((state: RootState) => state?.authSlice?.token);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(authToken);

  useEffect(() => {
    if (authToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [authToken]);

  console.log('isAuthenticated', isAuthenticated);

  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <Route path="/*" element={<PrivateRoutes />} />
         
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}
      </Routes>
    </>
  );
};
export default App;
