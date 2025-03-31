import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/services/authService';
import { login } from '../../redux/slices/authSlice';
import { MdEmail } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import API from '../../api/axiosInstance';
import { AppDispatch } from '../../redux/store';
import { setUserInfo } from '../../redux/slices/userSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { fetchCurrentUserAPI } from '../../api/services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Validation Schema
  const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

 const fetchUserInfo = async(user_id: string) => {
    try {
      const userInfo = await fetchCurrentUserAPI(user_id); //  Fetch user info
      // console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', userInfo)
      if (userInfo) {
        dispatch(setUserInfo(userInfo)); //  Dispatch only when data exists
      } else {
        console.warn("No user info found.");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleSignin = async (values: { email: string; password: string }) => {
    try {
      const userData = await loginUser(values.email, values.password);
      const { access_token: token } = userData;

      if (!token) {
        toast.error('Login failed: No token received!');
        return;
      }

      const { data: userDetails } = await API.get('/usersapi/users/tenants', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user_id = userDetails?.user_id;
      const company_id = userDetails?.tenants?.[0]?.id || null;
      const authData = { token, user_id, company_id };

      dispatch(login(authData));
      localStorage.setItem('authToken', JSON.stringify(authData));
      fetchUserInfo(user_id)
      toast.success('Login Successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-black">
          Welcome to OGeo!
        </h2>

        {/* Formik Form */}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SignInSchema}
          onSubmit={handleSignin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4" autoComplete="off">
              {/* Email Field */}
              <div>
                <label className="text-gray-700 mb-1 block text-lg">
                  Email
                </label>
                <div className="relative">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    title="Email"
                    className="border-gray-300 w-full rounded-lg border bg-[#EEF3FF] p-3 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                  <MdEmail className="text-gray-500 absolute right-3 top-4" />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-red"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="text-gray-700 mb-1 block text-lg">
                  Password
                </label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    title="Password"
                    className="border-gray-300 w-full rounded-lg border bg-[#EEF3FF] p-3 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-500 absolute right-3 top-4"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red"
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  title="Click Here to Reset Your Password!"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                title="Click here to sign in!"
                className="w-full rounded-lg bg-[#304FFE] p-3 text-lg font-semibold text-white transition hover:bg-blue-700"
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>

              <div className="text-gray-700 text-center">
                <p>
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    title="Click here to Sign Up!"
                    className="text-blue-500 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
