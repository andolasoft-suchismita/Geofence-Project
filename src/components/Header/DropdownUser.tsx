import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../api/services/profileService';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    designation: '',
    image: '',
  });

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Get current route

  const userId = useSelector((state: any) => state.authSlice.user_id);

  // Fetch profile data
  useEffect(() => {
    const getProfileData = async () => {
      if (!userId) return; // Prevent unnecessary API calls if userId is missing

      try {
        const data = await getUserById(userId);
        const formattedName = `${data?.first_name || 'User'} ${data?.last_name || 'Name'
          }`
          .replace(/_/g, ' ')
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        const formattedDesignation = (data?.designation || 'User Designation')
          .replace(/_/g, ' ')
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        setProfile({
          name: formattedName,
          designation: formattedDesignation,
          image: data?.profile_pic || '/default-user.avif',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    getProfileData();
  }, [userId]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/signin');
  };

  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (
        dropdown.current &&
        trigger.current &&
        !dropdown.current.contains(event.target as Node) &&
        !trigger.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, []);

  // Close dropdown when clicking "My Profile" or when navigating to the profile page
  const handleProfileClick = () => {
    setDropdownOpen(false);
    navigate('/profile');
  };

  // Hide dropdown when already on the profile page
  useEffect(() => {
    if (location.pathname === '/profile') {
      setDropdownOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="relative">
      <button
        ref={trigger}
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center gap-4 focus:outline-none"
      >
        <span className="hidden text-right lg:block">
          <span className="text-md block font-medium text-black dark:text-white">
            {profile.name}
          </span>
          <span className="block text-sm">{profile.designation}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img
            src={profile.image}
            alt="User"
            className="h-full w-full rounded-full"
          />
        </span>
      </button>

      {/* Dropdown menu */}
      {dropdownOpen && (
        <div
          ref={dropdown}
          className="absolute right-0 mt-4 w-56 flex flex-col rounded-md border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark"
        >
          <div className="flex flex-col border-b border-stroke dark:border-strokedark">
            <button
              onClick={handleProfileClick}
              className="block w-full py-4 text-center text-base font-semibold text-gray-700 transition-all duration-200 hover:bg-blue-500 hover:text-white active:bg-blue-700"
            >
              My Profile
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="block w-full py-4 text-center text-base font-semibold text-red-600 transition-all duration-200 hover:bg-blue-500 hover:text-white active:bg-blue-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownUser;

