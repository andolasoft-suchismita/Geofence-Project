import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyPopup from '../CompanyPopup';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducers';

const Dashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
 const company_id = useSelector(
   (state: RootState) => state.authSlice.company_id
 );
  useEffect(() => {
   if (!company_id) {
      const timeout = setTimeout(() => setShowPopup(true), 3000);
      return () => clearTimeout(timeout);
    }
  }, [company_id]); // Reacts to Redux state updates

    
  const handleCompanyCreation = () => {
    setShowPopup(false);
    navigate('/companysettings'); // Redirect after creation
  };


  return (
    <div>{showPopup && <CompanyPopup onClose={handleCompanyCreation} />}</div>
  );
};

export default Dashboard;
