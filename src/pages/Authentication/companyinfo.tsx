import React  from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import SignUp from "./SignUp";

const CompanyInfo = ({ setStep }) => {
  const initialValues = {
    companyName: "",
    email: "",
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = (values) => {
    console.log("Company Name:", values.companyName);
    console.log("Email:", values.email);
    // Navigate or perform the next action after successful submission
  };

  return (
    <div className="flex items-center justify-center h-full bg-white w-full p-8 overflow-y-auto">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Company Information
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            {/* Company Name Input */}
            <div>
              <label className="block text-gray-700 text-base">
                Company Name
              </label>
              <div className="relative">
                <Field
                  type="text"
                  name="companyName"
                  placeholder="Enter Company Name"
                  className="w-full p-3 border rounded-lg bg-gray-100"
                />
                <span className="absolute right-3 top-4 text-gray-500">🏢</span>
              </div>
              <ErrorMessage
                name="companyName"
                component="div"
                className="text-red text-sm mt-1"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-700 text-base">Email</label>
              <div className="relative">
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="w-full p-3 border rounded-lg bg-gray-100"
                />
                <span className="absolute right-3 top-4 text-gray-500">📧</span>
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red text-sm mt-1"
              />
            </div>

            {/* Buttons Section */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Previous Step Button */}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full md:w-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                ⬅️ Back...
              
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full md:w-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Create Account
              </button>
            </div>
            
               <div className="mt-6 text-center">
                 <p>
                   Already have an account?{' '}
                   <Link to="/signin" className="text-blue-500 hover:underline">
                    Sign In
                   </Link>
                 </p>
               </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CompanyInfo;

