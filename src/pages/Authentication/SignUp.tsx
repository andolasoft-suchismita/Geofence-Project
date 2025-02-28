import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CompanyInfo from "./companyinfo";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, [step]);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleRePasswordVisibility = () => setShowRePassword((prev) => !prev);

  const validationSchema = Yup.object({
    name: Yup.string().required(""),
    email: Yup.string().email("Invalid email").required(""),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required(""),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required(""),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-[1100px] h-[600px] bg-white rounded-lg shadow-lg">
        {/* Left Side */}
        <div className="w-1/2 bg-gradient-to-r from-blue-500 to-blue-700 text-white flex flex-col items-center justify-center p-6">
          <img src="/ogeo-logo.webp" alt="OGEO Logo" className="w-16 mb-3" />
          <h2 className="text-2xl font-bold">Welcome to OGeo</h2>
          <p className="text-center text-sm mt-2">
          Seamless Check-Ins, Powered by Geofence Magic!🌐
          </p>
        </div>

        {/* Right Side with Animated Sliding Effect */}
        <div className="w-1/2 relative p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="signup"
                initial={{ x: "0" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.5 }}
                className="absolute top-0 left-0 w-full h-full bg-white p-4"
              >
                {/* Sign Up Form */}
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-center text-blue-700">Sign-up</h2>
                  <Formik
                    initialValues={formData}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                      setFormData(values); // Store form data before moving forward
                      setStep(2);
                    }}
                  >
                    {({ values }) => (
                      <Form className="space-y-5">
                        <div>
                          <label className="block text-gray-700 text-base">Full Name</label>
                          <Field name="name" type="text" placeholder="Enter your name*" className="w-full p-3 border rounded-lg bg-gray-100" />
                          <ErrorMessage name="name" component="div" className="text-red text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-gray-700 text-base">Email</label>
                          <div className="relative">
                            <Field name="email" type="email" placeholder="Enter your email*" className="w-full p-3 border rounded-lg bg-gray-100" />
                            <MdEmail className="absolute right-4 top-5 text-gray-500" />
                          </div>
                          <ErrorMessage name="email" component="div" className="text-red text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-gray-700 text-base">Password</label>
                          <div className="relative">
                            <Field name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password*" className="w-full p-3 border rounded-lg bg-gray-100" />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-4 text-gray-500">
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                          <ErrorMessage name="password" component="div" className="text-red text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-gray-700 text-base">Confirm Password</label>
                          <div className="relative">
                            <Field name="rePassword" type={showRePassword ? "text" : "password"} placeholder="Confirm your password*" className="w-full p-3 border rounded-lg bg-gray-100" />
                            <button type="button" onClick={toggleRePasswordVisibility} className="absolute right-3 top-4 text-gray-500">
                              {showRePassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                          <ErrorMessage name="rePassword" component="div" className="text-red text-sm mt-1" />
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition text-lg">
                          Next ➡️
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <div className="absolute w-full h-full flex flex-col items-center top-0">
                <CompanyInfo setStep={setStep} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SignUp;





































