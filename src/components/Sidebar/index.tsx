import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiClock,
  FiFileText,
  FiSettings,
} from 'react-icons/fi'; // Importing icons from react-icons
import { RootState } from '../../redux/store';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
// const type = "user"
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // State for toggling Settings menu
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === 'true' ? true : false
  );

  //  Fetch currentUser role from Redux
  const currentUser = useSelector(
    (state: RootState) => state.userSlice.userInfo
  );
  const isAdmin = currentUser?.is_superuser == true; // Admin role check

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 text-4xl text-white lg:py-6.5 ">
        <NavLink to="/">
          {/* <img src={Logo} alt="Logo" /> */}
          OGeo
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out
                     ${isActive ? 'bg-graydark text-white' : 'text-bodydark1'} 
                    hover:bg-graydark dark:hover:bg-meta-4`
                  }
                >
                  <FiHome size={18} />
                  Dashboard
                </NavLink>
              </li>

              {isAdmin && (
                <li>
                  <NavLink
                    to="/users"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out
                    ${isActive ? 'bg-graydark text-white' : 'text-bodydark1'}
                    hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <FiUsers size={18} />
                    Users
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink
                  to="/attendance"
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out
                    ${isActive ? 'bg-graydark text-white' : 'text-bodydark1'}
                    hover:bg-graydark dark:hover:bg-meta-4`
                  }
                >
                  <FiClock size={18} />
                  Attendance
                </NavLink>
              </li>

              {isAdmin && (
                <li>
                  <NavLink
                    to="/weeklyreport"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out
                    ${isActive ? 'bg-graydark text-white' : 'text-bodydark1'}
                    hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <FiFileText size={18} />
                    Report
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink
                  to="/calendar"
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out
                    ${isActive ? 'bg-graydark text-white' : 'text-bodydark1'}
                    hover:bg-graydark dark:hover:bg-meta-4`
                  }
                >
                  <FiClock size={18} />
                  Calendar
                </NavLink>
              </li>
              {isAdmin && (
                <li>
                  <NavLink
                    to="/companysettings"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out
                    ${isActive ? 'bg-graydark text-white' : 'text-bodydark1'}
                    hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <FiSettings size={18} />
                    Settings
                  </NavLink>
                </li>
              )}

              {/* <li>
                <button
                  className="flex w-full items-center justify-between rounded-sm py-2 px-4 font-medium text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4"
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                >
                  <span className="flex items-center gap-2">
                    <FiSettings size={18} /> Settings
                  </span>
                  {isSettingsOpen ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                </button>

                {/* Submenu */}
              {/* {isSettingsOpen && (
                  <ul className="ml-8 mt-2 space-y-2">
                    <li>
                      <NavLink to="/profilesetting" className="sidebar-sub-link">
                       Profile Setting
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/companysetting" className="sidebar-sub-link">
                         Company Setting
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li> */}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
