import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/services/authService';
import { login } from '../../redux/slices/authSlice';
import { showToast } from '../../utils/toast';
import {MdEmail} from 'react-icons/md';
import{FaEye,FaEyeSlash} from 'react-icons/fa';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  const handleSignin = async (e: any) => {
    e.preventDefault();

    try {
      const userData = await loginUser(username, password);

      dispatch(
        login({
          token: userData.access_token,
        })
      );

      showToast('Login Successful!', 'success');
      navigate('/dashboard');
    } catch (error) {
      showToast('Invalid credentials', 'error');
    }
  };

  return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">Sign In</h2>
         
//             <form onSubmit={(e) => handleSignin(e)} >
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-base">
//                   Email
//                 </label>
//                 <div className="relative">
                
//                   <input
//                     type="email"
//                     placeholder="Enter your email"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"

//                   />  
//                 </div>
//               </div>
              

//               <div className="mb-4">
//                 <label className="block text-gray-700 text-base">
//                   Password
//                 </label>
//                 <div className="relative">
                
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />

                  
//                 </div>
//               </div>

//               <div className="mb-5">
//               <button
//               type="submit"
//               className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 transition"
//             >
//               Sign In
//             </button>
//           </div>
                
//               <div className="text-center text-gray-700">
//                 <p>
//                   Don’t have any account?{' '}
//                   <Link to="/signup" className="text-blue-500 hover:underline">
//                     Sign Up
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
      
    
//   );
// };

// export default SignIn;


<div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Logo */}
      {/* <div className="absolute top-10 left-10">
        <span className="text-3xl font-semibold text-black">OGeo</span>
      </div> */}

      {/* Form Container */}
      <div className="w-full max-w-md">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Welcome to OGeo !
        </h2>

        {/* Form */}
        <form onSubmit={handleSignin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 text-lg mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-[#EEF3FF] focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <MdEmail className="absolute right-3 top-4 text-gray-500" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 text-lg mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-[#EEF3FF] focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-4 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-blue-500 text-sm hover:underline">
              Forgot Password
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-[#304FFE] text-white text-lg font-semibold p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
          <div className="text-center text-gray-700">
                <p>
                  Don’t have any account?{' '}
                  <Link to="/signup" className="text-blue-500 hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;