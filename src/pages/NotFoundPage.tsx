import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-gray-100 flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-gray-800 mb-4 text-6xl font-bold">404</h1>
      <p className="text-gray-600 mb-8 text-xl">Page not found</p>
      <Link
        to="/dashboard"
        className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
