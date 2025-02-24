import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

const CompanyInfo: React.FC = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Company Name:', companyName);
    console.log('Email:', email);
    navigate('/dashboard'); // Redirect after submission
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Company Information
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Company Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-base">Company Name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="absolute right-4 top-4 text-gray-500">
                🏢
              </span>
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-base">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="absolute right-4 top-4 text-gray-500">
                📧
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mb-5">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 transition"
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
