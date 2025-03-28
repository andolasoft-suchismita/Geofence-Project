// import { useEffect, useRef, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { logout } from '../../redux/slices/authSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserById } from '../../api/services/profileService'; // Import your API function

// const DropdownUser = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [profile, setProfile] = useState({
//     name: '',
//     designation: '',
//     image: '',
//   });

//   const trigger = useRef<any>(null);
//   const dropdown = useRef<any>(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const userId = useSelector((state: any) => state.authSlice.user_id);

//   // Fetch profile data
//   useEffect(() => {
//     const getProfileData = async () => {
//       if (!userId) return; // Prevent unnecessary API calls if userId is missing

//       try {
//         const data = await getUserById(userId); // Fetch user data
//         const formattedName = `${data?.first_name || 'User'} ${
//           data?.last_name || 'Name'
//         }`
//           .replace(/_/g, ' ')
//           .split(' ')
//           .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//           .join(' ');

//         const formattedDesignation = (data?.designation || 'User Designation')
//           .replace(/_/g, ' ')
//           .split(' ')
//           .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//           .join(' ');
//         setProfile({
//           name: formattedName,
//           designation: formattedDesignation,
//           image: data?.profile_pic || '/deafault user.avif',
//         });
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     getProfileData();
//   }, [userId]); // Refetch when userId changes

//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.clear(); // Clears all data from local storage
//     navigate('/signin');
//   };

//   useEffect(() => {
//     const clickHandler = (event: MouseEvent) => {
//       if (
//         dropdown.current &&
//         trigger.current &&
//         !dropdown.current.contains(event.target as Node) &&
//         !trigger.current.contains(event.target as Node)
//       ) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener('click', clickHandler);
//     return () => document.removeEventListener('click', clickHandler);
//   }, [dropdownOpen]);

//   return (
//     <div className="relative">
//       <Link
//         ref={trigger}
//         onClick={() => setDropdownOpen(!dropdownOpen)}
//         className="flex items-center gap-4"
//         to="#"
//       >
//         <span className="hidden text-right lg:block">
//           <span className="text-md block font-medium text-black dark:text-white">
//             {profile.name}
//           </span>
//           <span className="block text-sm">{profile.designation}</span>
//         </span>

//         <span className="h-12 w-12 rounded-full">
//           <img
//             src={profile.image}
//             alt="User"
//             className="h-full w-full rounded-full"
//           />
//         </span>
//       </Link>

//       {/* Dropdown menu */}
//       <div
//         ref={dropdown}
//         className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
//           dropdownOpen ? 'block' : 'hidden'
//         }`}
//       >
//         <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
//           <li>
//             <Link
//               to="/profile"
//               className="flex items-center gap-3.5 text-sm font-medium hover:text-primary lg:text-base"
//             >
//               My Profile
//             </Link>
//           </li>
         
//         </ul>

//         <button
//           onClick={handleLogout}
//           className="hover:text-red-600 block w-full py-4 text-center text-sm font-medium"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DropdownUser;



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
        const formattedName = `${data?.first_name || 'User'} ${
          data?.last_name || 'Name'
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
          <ul className="flex flex-col gap-4 border-b border-stroke px-6 py-6 dark:border-strokedark">
            <li className="text-center">
              <button
                onClick={handleProfileClick}
                className="block w-full text-sm font-medium text-gray-700 hover:text-primary lg:text-base"
              >
                My Profile
              </button>
            </li>
          </ul>

          <button
            onClick={handleLogout}
            className="block w-full py-4 text-center text-base font-semibold text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownUser;

