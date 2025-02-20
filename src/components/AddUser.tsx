// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// interface UserFormProps {
//   onClose: () => void;
// }

// const UserForm: React.FC<UserFormProps> = ({ onClose }) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
//         <h2 className="text-xl font-semibold mb-4">Add User</h2>
        
//         <Formik
//           initialValues={{
//             firstName: "",
//             lastName: "",
//             employeeId: "",
//             email: "",
//             role: "",
//             doj: "",
//             dob: "",
//             idNo: "",
//             profilePicture: null,
//             password: "",
//           }}
//           validationSchema={Yup.object({
//             firstName: Yup.string().required("First name is required"),
//             lastName: Yup.string().required("Last name is required"),
//             employeeId: Yup.string().required("Employee ID is required"),
//             email: Yup.string().email("Invalid email").required("Email is required"),
//             role: Yup.string().required("Role is required"),
//             doj: Yup.date().required("Date of Joining is required"),
//             dob: Yup.date().required("Date of Birth is required"),
//             idNo: Yup.string().required("ID No. is required"),
//             profilePicture: Yup.mixed().required("Profile Picture is required"),
//             password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//           })}
//           onSubmit={(values, { resetForm }) => {
//             console.log("User Data:", values);
//             resetForm();
//             onClose(); // Close modal after submission
//           }}
//         >
//           {({ setFieldValue }) => (
//             <Form className="space-y-4">
//               {/* First Name & Last Name */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block">First Name</label>
//                   <Field name="firstName" className="border p-2 w-full rounded" />
//                   <ErrorMessage name="firstName" className="text-red-500 text-sm" component="div" />
//                 </div>
//                 <div>
//                   <label className="block">Last Name</label>
//                   <Field name="lastName" className="border p-2 w-full rounded" />
//                   <ErrorMessage name="lastName" className="text-red-500 text-sm" component="div" />
//                 </div>
//               </div>

//               {/* Employee ID & Email */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block">Employee ID</label>
//                   <Field name="employeeId" className="border p-2 w-full rounded" />
//                   <ErrorMessage name="employeeId" className="text-red-500 text-sm" component="div" />
//                 </div>
//                 <div>
//                   <label className="block">Email</label>
//                   <Field name="email" type="email" className="border p-2 w-full rounded" />
//                   <ErrorMessage name="email" className="text-red-500 text-sm" component="div" />
//                 </div>
//               </div>

//               {/* Role & Date of Joining */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block">Role</label>
//                   <Field name="role" className="border p-2 w-full rounded" />
//                   <ErrorMessage name="role" className="text-red-500 text-sm" component="div" />
//                 </div>
//                 <div>
//                   <label className="block">Date of Joining</label>
//                   <Field name="doj" type="date" className="border p-2 w-full rounded" />
//                   <ErrorMessage name="doj" className="text-red-500 text-sm" component="div" />
//                 </div>
//               </div>

//               {/* Date of Birth & ID No. */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block">Date of Birth</label>
//                   <Field name="dob" type="date" className="border p-2 w-full rounded" />
//                   <ErrorMessage name="dob" className="text-red-500 text-sm" component="div" />
//                 </div>
//                 <div>
//                   <label className="block">ID No.</label>
//                   <Field name="idNo" className="border p-2 w-full rounded" />
//                   <ErrorMessage name="idNo" className="text-red-500 text-sm" component="div" />
//                 </div>
//               </div>

//               {/* Profile Picture */}
//               <div>
//                 <label className="block">Profile Picture</label>
//                 <input type="file" onChange={(event) => setFieldValue("profilePicture", event.currentTarget.files?.[0])} className="border p-2 w-full rounded" />
//                 <ErrorMessage name="profilePicture" className="text-red-500 text-sm" component="div" />
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block">Password</label>
//                 <Field name="password" type="password" className="border p-2 w-full rounded" />
//                 <ErrorMessage name="password" className="text-red-500 text-sm" component="div" />
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-between mt-4">
//                 <button type="button" onClick={onClose} className="bg-green-500 text-white px-4 py-2 rounded">
//                   Cancel
//                 </button>
//                 <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
//                   Add User
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default UserForm;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface UserFormProps {
  onClose: () => void;
}
const users = JSON.parse(localStorage.getItem("users") || "[]");
console.log(users); // Logs all stored user data


const UserForm: React.FC<UserFormProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-15">
      <div className="bg-gray py-8 px-6 rounded-lg shadow-lg w-[500px] text-black">
        
        
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            employeeId: "",
            email: "",
            role: "",
            doj: "",
            dob: "",
            idNo: "",
            profilePicture: null,
            password: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            employeeId: Yup.string().required("Employee ID is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            role: Yup.string().required("Role is required"),
            doj: Yup.date().required("Date of Joining is required"),
            dob: Yup.date().required("Date of Birth is required"),
            idNo: Yup.string().required("ID No. is required"),
            // profilePicture: Yup.mixed().required("Profile Picture is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
          })}
          onSubmit={(values, { resetForm }) => {
            const existingUsers = JSON.parse(localStorage.getItem("users") || "[]"); // Get existing users or empty array
            const updatedUsers = [...existingUsers, values]; // Append new user
            localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save to localStorage
          
            console.log("User Data Saved:", values);
            resetForm();
            setTimeout(() => onClose(), 300); // Close form after submission
          }}
          
          
        >
          {({ }) => (
            <Form className="">
                <h2 className="text-xl font-semibold mb-6 text-center">Add User</h2>
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block">First Name<span className="text-orange-900 text-2xl">*</span></label>
                  <Field name="firstName" className="border p-2 w-full rounded" />
                  <ErrorMessage name="firstName" className="text-orange-900 text-sm" component="div" />
                </div>
                <div>
                  <label className="block">Last Name<span className="text-orange-900 text-2xl">*</span></label>
                  <Field name="lastName" className="border p-2 w-full rounded" />
                  <ErrorMessage name="lastName" className="text-orange-900 text-sm" component="div" />
                </div>
              </div>

              {/* Employee ID & Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block">Employee ID<span className="text-orange-900 text-2xl">*</span></label>
                  <Field name="employeeId" className="border p-2 w-full rounded" />
                  <ErrorMessage name="employeeId" className="text-orange-900 text-sm" component="div" />
                </div>
                <div>
                  <label className="block">Email<span className="text-orange-900 text-2xl">*</span></label>
                  <Field name="email" type="email" className="border p-2 w-full rounded" />
                  <ErrorMessage name="email" className="text-orange-900 text-sm" component="div" />
                </div>
              </div>

              {/* Role & Date of Joining */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block">Role<span className="text-orange-900 text-2xl">*</span></label>
                  <Field name="role" className="border p-2 w-full rounded" />
                  <ErrorMessage name="role" className="text-orange-900 text-sm" component="div" />
                </div>
                <div>
                  <label className="block">Date of Joining<span className="text-orange-900 text-2xl">*</span></label>
                  <Field name="doj" type="date" className="border p-2 w-full rounded" />
                  <ErrorMessage name="doj" className="text-orange-900 text-sm" component="div" />
                </div>
              </div>

              {/* Date of Birth & ID No. */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block">Date of Birth<span className="text-orange-900 text-2xl">*</span></label>
                  <Field name="dob" type="date" className="border p-2 w-full rounded" />
                  <ErrorMessage name="dob" className="text-orange-900 text-sm" component="div" />
                </div>
                <div>
                  <label className="block">ID No.<span className="text-orange-900 text-2xl">*</span></label>
                  <Field name="idNo" className="border p-2 w-full rounded" />
                  <ErrorMessage name="idNo" className="text-orange-900 text-sm" component="div" />
                </div>
              </div>

              

              {/* Password */}
              <div>
                <label className="block">Password<span className="text-orange-900 text-2xl">*</span></label>
                <Field name="password" type="password" className="border p-2 w-full rounded" />
                <ErrorMessage name="password" className="text-orange-900 text-sm" component="div" />
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Add User
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserForm;
