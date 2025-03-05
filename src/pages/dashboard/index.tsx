import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyPopup from '../CompanyPopup';

const Dashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const companyCreated = localStorage.getItem('companyCreated');
    console.log('companyCreated from localStorage:', companyCreated);

    if (!companyCreated) {
      console.log('Company not created, showing popup in 3 seconds...');
      const timeout = setTimeout(() => {
        console.log('showPopup is now:', true);
        setShowPopup(true);
      }, 3000);

      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, []);

  const handleCompanyCreation = () => {
    localStorage.setItem('companyCreated', 'true'); // ✅ Save that company is created
    setShowPopup(false);
    navigate('/companysettings'); // ✅ Redirect to settings after creation
  };

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      {showPopup ? (
        <CompanyPopup onClose={handleCompanyCreation} />
      ) : (
        <p>Popup should appear in 3 seconds...</p> // Debugging
      )}
    </div>
  );
};

export default Dashboard;
