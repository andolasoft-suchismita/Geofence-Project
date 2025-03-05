import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
