import React from 'react';

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span className="h-10 w-10 animate-spin rounded-full border-t-4 border-gray-500"></span>
    </div>
  );
};

export default Loader; 


// you can use this loader component anywhere in your application like this:
// import Loader from '../components/Loader';

// Basic usage
// <Loader />

// With custom className
// <Loader className="py-50" />