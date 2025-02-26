import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CompanyInfo from "./companyinfo";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleRePasswordVisibility = () => setShowRePassword((prev) => !prev);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-[900px] h-[500px] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 bg-gradient-to-r from-blue-500 to-blue-700 text-white flex flex-col items-center justify-center p-6">
          <img src="/ogeo-logo.webp" alt="OGEO Logo" className="w-16 mb-3" />
          <h2 className="text-2xl font-bold">Welcome to Spacer</h2>
          <p className="text-center text-sm mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget vulputate velit.
          </p>
        </div>

        {/* Right Side with Sliding Effect */}
        <div className="w-1/2 relative overflow-hidden">
          <motion.div
            animate={{ x: step === 1 ? 0 : "-100%" }}
            transition={{ type: "tween", duration: 0.5 }}
            className="absolute top-0 left-0 w-full h-full"
          >
            {/* Sign Up Form */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center text-blue-700">Sign-up</h2>
              <Formik
                initialValues={{ name: "", email: "", password: "", rePassword: "" }}
                validationSchema={validationSchema}
                onSubmit={() => setStep(2)}
              >
                <Form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-base">Full Name</label>
                    <Field name="name" type="text" placeholder="Enter your name" className="w-full p-3 border rounded-lg bg-gray-100" />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-base">Email</label>
                    <div className="relative">
                      <Field name="email" type="email" placeholder="Enter your email" className="w-full p-3 border rounded-lg bg-gray-100" />
                      <MdEmail className="absolute right-3 top-4 text-gray-500" />
                    </div>
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-base">Password</label>
                    <div className="relative">
                      <Field name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" className="w-full p-3 border rounded-lg bg-gray-100" />
                      <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-4 text-gray-500">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-base">Confirm Password</label>
                    <div className="relative">
                      <Field name="rePassword" type={showRePassword ? "text" : "password"} placeholder="Confirm your password" className="w-full p-3 border rounded-lg bg-gray-100" />
                      <button type="button" onClick={toggleRePasswordVisibility} className="absolute right-3 top-4 text-gray-500">
                        {showRePassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <ErrorMessage name="rePassword" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                    Next ➡️
                  </button>
                </Form>
              </Formik>
            </div>
          </motion.div>

           {step === 2 && (
            <div className=" absolute w-full h-full flex flex-col items-center top-0">
              <button 
              onClick={() => setStep(1)} 
              className="w-full bg-red-500 text-white rounded-lg hover:bg-red-600 transition ">
                ⬅️ Back
              </button>
              <CompanyInfo/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;




































