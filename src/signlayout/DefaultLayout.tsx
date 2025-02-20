import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <main className="w-full">
          <div className="mx-auto max-w-screen-2xl p-2 md:p-6 ">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
