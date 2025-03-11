import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/services/authService';
import { login } from '../../redux/slices/authSlice';
import { showToast } from '../../utils/toast';
import { MdEmail } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import API from '../../api/axiosInstance';

import { Formik, Form, Field, ErrorMessage } from 'formik'; //Use Formik for form handling
import * as Yup from 'yup'; //Use Yup for validation schema

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Validation Schema
  const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSignin = async (values: { email: string; password: string }) => {
    try {
      // Step 1: Login and get the access token
      const userData = await loginUser(values.email, values.password);
      const token = userData.access_token;

      if (!token) {
        showToast('Login failed: No token received!', 'error');
        return;
      }
      // Step 2: Fetch user details from the tenants API
      const userDetailsResponse = await API.get('/usersapi/users/tenants', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user_id = userDetailsResponse.data?.user_id;
      const company_id = userDetailsResponse.data?.tenants?.[0]?.id || null;
      // Step 3: Store data in Redux
      dispatch(login({ token, user_id, company_id }));
      // Step 4: Show success message and navigate
      showToast('Login Successful!', 'success');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
      showToast('Invalid credentials', 'error');
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
                  Don’t have an account?{' '}
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
