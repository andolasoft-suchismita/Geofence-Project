import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MdEmail } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import CompanyInfo from './companyinfo';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API, { FormAPI } from '../../api/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
// import API from '../../api/axiosInstance';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigation
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleRePasswordVisibility = () => setShowRePassword((prev) => !prev);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'At least 8 characters;must contain at least one uppercase,lowercase, digit,and special character.'
      )
      .required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSignUp = async (values: any) => {
    try {
      console.log('Registering user:', values);

      const data = {
        email: values.email,
        password: values.password,
        is_superuser: true,
        is_verified: true,
      };

      // Register user
      await API.post('/v1/auth/register', data);

      // console.log('Logging in...');
      const loginData = new URLSearchParams();
      loginData.append('username', data.email);
      loginData.append('password', data.password);

      // Login and get token
      const userResponse = await FormAPI.post('/v1/auth/jwt/login', loginData);

      const token = userResponse.data?.access_token;
      if (!token) {
        // console.error('Login failed: No token received!');
        toast.error('Login failed. Please try again!');
        return;
      }

      // Fetch user details for `user_id` and `company_id`
      const userDetailsResponse = await API.get('/usersapi/users/tenants', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user_id = userDetailsResponse.data?.user_id;
      const company_id = userDetailsResponse.data?.tenants?.[0]?.id || null;

      if (!user_id) {
        console.warn('No user_id found!');
        toast.error('Failed to fetch user details!');
        return;
      }

      // Store token, user_id, and company_id in Redux
      dispatch(login({ token, user_id, company_id }));

      toast.success('SignUp Successfully!');
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error(error.response?.data?.detail || 'Something went wrong!');
    }
  };
  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center">
      <div className="flex h-[500px] w-[900px] overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Left Side */}
        <div className="flex w-1/2 flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
          <img src="/ogeo-logo.webp" alt="OGEO Logo" className="mb-3 w-16" />
          <h2 className="text-2xl font-bold">Welcome to OGeo</h2>
          <p className="mt-2 text-center text-sm">
            Seamless Check-Ins, Powered by Geofence Magic!🌐
          </p>
        </div>

        {/* Right Side with Sliding Effect */}
        <div className="relative w-1/2 overflow-hidden">
          {/* Sign Up Form */}
          <div className="p-8">
            <h2 className="text-center text-2xl font-bold text-blue-700">
              Sign-up
            </h2>
            <Formik
              initialValues={{
                email: '',
                password: '',
                rePassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSignUp}
            >
              <Form className="space-y-4" autoComplete="off">
                <div>
                  <label className="text-gray-700 block text-base">Email</label>
                  <div className="relative">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      title="Email"
                      className="bg-gray-100 w-full rounded-lg border p-3"
                    />
                    <MdEmail className="text-gray-500 absolute right-3 top-4" />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-xs text-red sm:text-sm md:text-sm lg:text-sm"
                  />
                </div>

                <div>
                  <label className="text-gray-700 block text-base">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      name="password"
                      autoComplete="new-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      title="Password"
                      className="bg-gray-100 w-full rounded-lg border p-3"
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
                    className="mt-1 text-xs text-red sm:text-sm md:text-sm lg:text-sm"
                  />
                </div>

                <div>
                  <div className="mb-4">
                    <label className="text-gray-700 block text-base">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Field
                        name="rePassword"
                        type={showRePassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        title="Re-enter your password to confirm!"
                        className="bg-gray-100 w-full rounded-lg border p-3 "
                      />
                      <button
                        type="button"
                        onClick={toggleRePasswordVisibility}
                        className="text-gray-500 absolute right-3 top-4"
                      >
                        {showRePassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <ErrorMessage
                      name="rePassword"
                      component="div"
                      className="mt-1 text-xs text-red sm:text-sm md:text-sm lg:text-sm "
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  title="Click here to signUp!"
                  className="w-full rounded-lg bg-blue-600 p-3 text-white transition hover:bg-blue-700 "
                >
                  SignUp
                </button>
                <div className="text-gray-700 text-center">
                  <p>
                    Already have an account?{' '}
                    <Link to="/signin" className="ver:underline text-blue-500">
                      Sign In
                    </Link>
                  </p>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
