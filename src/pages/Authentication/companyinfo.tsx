import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API, { FormAPI } from '../../api/axiosInstance';
import { showToast } from '../../utils/toast';
interface CompanyInfoProps {
  userData: {
    // name: string;
    email: string;
    password: string;
    rePassword: string;
  };
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ userData }) => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const companyValues = {
      name: companyName,
      email: email,
    };

    const token = localStorage.getItem('token'); // Retrieve stored token

    if (!token) {
      showToast('Authentication failed. Please log in again.', 'error');
      return navigate('/signin'); // Redirect if token is missing
    }

    try {
      const response = await API.post(
        '/companyapi/company/create',
        companyValues,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201 || response.status === 200) {
        showToast('Company created successfully!', 'success');
        navigate('/dashboard'); // Move to dashboard after success
      } else {
        showToast('Failed to create company. Try again!', 'error');
      }
    } catch (error: any) {
      console.error(
        'Error creating company:',
        error.response?.data || error.message
      );
      showToast('An error occurred. Please try again!', 'error');
    }
  };

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-blue-500">
          Company Information
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Company Name Input */}
          <div className="mb-4">
            <label className="text-gray-700 block text-base">
              Company Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="border-gray-300 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-gray-500 absolute right-4 top-4">🏢</span>
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="text-gray-700 block text-base">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-gray-500 absolute right-4 top-4">📧</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mb-5">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 p-3 text-white transition hover:bg-blue-700"
            >
              Create Account
            </button>
            <div className="mt-6 text-center">
              <p>
                Already have an account?{' '}
                <Link to="/Authentication/SignIn" className="text-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyInfo;
