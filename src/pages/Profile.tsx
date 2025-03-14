
// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import ProfilePicture from "../components/Images/profilepicture";
// // import { FaGoogle } from "react-icons/fa";

// const Profile: React.FC = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
//       {/* Header Section */}
//       <div className="flex items-center justify-between mb-4">
//         {/* <h2 className="text-xl font-semibold">Account</h2> */}
//         {/* <input
//           type="text"
//           placeholder="Search"
//           className="border p-2 rounded-md w-64"
//         /> */}
//         <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
//       </div>

//       <div>
//         <ProfilePicture/>
//         </div>

//       {/* Full Name Section */}
//       <div className="mt-6">
//         <p className="text-base text-gray-700 font-semibold">Name</p>
//         <div className="flex gap-4">
//           <input
//             type="text"
//             placeholder="First name"
//             className="border p-3 rounded-md w-full  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value=""
//           />
//           <input
//             type="text"
//             placeholder="Last name"
//             className="border p-3 rounded-md w-full  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value=""
//           />
//         </div>
//       </div>

//       {/* Contact Email */}
//       <div className="mt-6">
//         <p className="text-base text-gray-700 font-semibold ">Email</p>
//         {/* <div className="flex gap-4 mt-2"> */}
//           <input
//             type="email"
//             className="border p-3 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 "
//             placeholder="john-doe@email.com"
//           />
//           {/* <button className="px-4 py-2 bg-gray-100 rounded-md">
//             Add another email
//           </button> */}
//         </div>
//       {/* </div> */}

//       {/* Password Section */}
//       <div className="mt-6">
//         <p className="text-gray-700 font-semibold text-base">Password</p>
//         <div className="flex gap-4">
//           <div className="relative w-full">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Current Password"
//               className="border p-3 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value=""
//             />
//             <span
//               className="absolute right-3 top-3 cursor-pointer text-gray-500"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//           <div className="relative w-full">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="New Password"
//               className="border p-3 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value=""
//             />
//             <span
//               className="absolute right-3 top-3 cursor-pointer text-gray-500"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//         </div>

//         <div className="mt-6" >
//         <p className="text-gray-700 font-semibold text-base">Date of Birth</p>
//         <input
//             type="Date"
//             placeholder="DD/MM/YY"
//             className="border p-3 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value=""
//           />
//           </div>
//           <div className="mt-6">
//         <p className="text-gray-700 font-semibold text-base">Date of Joining</p>
//         <input
//             type="Date"
//             placeholder="DD/MM/YY"
//             className="border p-3 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value=""
//           />
//           </div>
//           <div className="mt-6">
//         <p className="text-gray-700 font-semibold text-base">Role</p>
//         <input
//             type="text"
//             placeholder="Admin"
//             className="border p-3 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value=""
//           />
//           </div>
//           <div className="mt-6">
//         <p className="text-gray-700 font-semibold text-base">Designation</p>
//         <input
//             type="text"
//             placeholder=""
//             className="border p-3 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value=""
//           />
//           </div>

//           <div className="mt-6">
//         <p className="text-gray-700 font-semibold text-base">Employee_ID</p>
//         <input
//             type="String"
//             placeholder=""
//             className="border p-3 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value=""
//           />
//           </div>

//           <div className="mt-6 " >
//         <p className="text-gray-700 font-semibold text-base ">Address</p>
//         <textarea
//         className="w-full p-2 border border-gray-300 rounded-md resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         rows={2} // Ensures two lines
//         maxLength={100} // Optional: Limit characters
//         placeholder="Enter your address..."
//         value=""
//         // onChange={(e) => setAddress(e.target.value)}
//       />
//           </div>

//           <div className="mt-6 " >
//         <p className="text-gray-700 font-semibold text-base">Description</p>
//         <textarea
//         className="w-full p-2 border border-gray-300 rounded-md resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         rows={2} // Ensures two lines
//         maxLength={100} // Optional: Limit characters
//         placeholder=""
//         value=""
//         />
//           </div>

//       {/* Buttons */}
//       <div className="mt-6 flex justify-between">
//         <button className="px-6 py-3 bg-[#e65558] text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition text-base">Cancel</button>
//         <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition text-base">Save</button>
//       </div>

//       </div>
//       </div>

//   );
// };

// export default Profile;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { getUserById, updateUserById } from '../api/services/profileService';
// import ProfilePicture from '../components/Images/profilepicture';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';

// /** Enums for Role and Designation */
// enum Role {
//   ADMIN = 'admin',
//   EMPLOYEE = 'employee',
// }

// enum Designation {
//   CEO = 'ceo',
//   CTO = 'cto',
//   CFO = 'cfo',
//   COO = 'coo',
//   CMO = 'cmo',
//   MANAGER = 'manager',
//   TEAM_LEAD = 'team_lead',
//   SENIOR_ENGINEER = 'senior_engineer',
//   SOFTWARE_ENGINEER = 'software_engineer',
//   JUNIOR_ENGINEER = 'junior_engineer',
//   HR_MANAGER = 'hr_manager',
//   RECRUITER = 'recruiter',
//   SALES_MANAGER = 'sales_manager',
//   MARKETING_MANAGER = 'marketing_manager',
//   INTERN = 'intern',
// }

// const Profile: React.FC = () => {
//   const [userData, setUserData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const token = useSelector((state: RootState) => state.authSlice.token);
//   const userId = 'b06acb70-1c4b-4535-bafc-f9be45b39ff3';

//   useEffect(() => {
//     if (token) {
//       fetchUserData();
//     } else {
//       console.log('No token found! User not authenticated.');
//     }
//   }, [token]);

//   const fetchUserData = async () => {
//     try {
//       // const userId = "b06acb70-1c4b-4535-bafc-f9be45b39ff3";
//       const data = await getUserById(userId);
//       setUserData(data);
//     } catch (error) {
//       console.error('Fetch failed:', error);
//     }
//   };

//   // Handle input changes
//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setUserData((prevData: any) => ({ ...prevData, [name]: value }));
//   };

//   // Handle update API call
//   const handleUpdate = async () => {
//     setLoading(true);
//     setMessage('');

//     try {
//       const updatedData = await updateUserById(userId, userData, token);
//       setMessage('Profile updated successfully!');
//       console.log('Updated Data:', updatedData);
//     } catch (error) {
//       setMessage('Failed to update profile. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-xl">
//       <h2 className="text-gray-800 text-2xl font-bold">Profile Settings</h2>

//       {message && <p className="mt-4 text-center text-lg">{message}</p>}

//       <ProfilePicture />

//       {/* Full Name */}
//       <div className="mt-6">
//         <p className="text-gray-700 text-base font-semibold">Name</p>
//         <div className="flex gap-4">
//           <input
//             type="text"
//             name="first_name"
//             className="w-full rounded-md border p-3"
//             value={userData?.first_name || ''}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="last_name"
//             className="w-full rounded-md border p-3"
//             value={userData?.last_name || ''}
//             onChange={handleInputChange}
//           />
//         </div>
//       </div>

//       {/* Email */}
//       <div className="mt-6">
//         <p className="text-gray-700 text-base font-semibold">Email</p>
//         <input
//           type="email"
//           name="email"
//           className="w-full rounded-md border p-3"
//           value={userData?.email || ''}
//           onChange={handleInputChange}
//         />
//       </div>

//       {/* Role */}
//       <div className="mt-6 flex gap-4">
//         <div className="w-1/2">
//           <p className="text-gray-700 text-base font-semibold">Role</p>
//           <select
//             name="roletype"
//             className="w-full rounded-md border p-3"
//             value={userData?.roletype || ''}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Role</option>
//             {Object.values(Role).map((role) => (
//               <option key={role} value={role}>
//                 {role.replace('_', ' ').toUpperCase()}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Designation */}
//         <div className="w-1/2">
//           <p className="text-gray-700 text-base font-semibold">Designation</p>
//           <select
//             name="designation"
//             className="w-full rounded-md border p-3"
//             value={userData?.designation || ''}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Designation</option>
//             {Object.values(Designation).map((designation) => (
//               <option key={designation} value={designation}>
//                 {designation.replace('_', ' ').toUpperCase()}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Password & Confirm Password in One Row */}
//       <div className="mt-6 flex gap-4">
//         <div className="w-1/2">
//           <p className="text-gray-700 text-base font-semibold">Password</p>
//           <input
//             type="password"
//             name="password"
//             className="w-full rounded-md border p-3"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <div className="w-1/2">
//           <p className="text-gray-700 text-base font-semibold">
//             Confirm Password
//           </p>
//           <input
//             type="password"
//             name="confirmPassword"
//             className="w-full rounded-md border p-3"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Date of Joining */}
//       <div className="mt-6">
//         <p className="text-gray-700 text-base font-semibold">Date of Joining</p>
//         <input
//           type="date"
//           name="doj"
//           className="w-full rounded-md border p-3"
//           value={userData?.doj || ''}
//           onChange={handleInputChange}
//         />
//       </div>

//       {/* Date of Birth */}
//       <div className="mt-6">
//         <p className="text-gray-700 text-base font-semibold">Date of Birth</p>
//         <input
//           type="date"
//           name="dob"
//           className="w-full rounded-md border p-3"
//           value={userData?.dob || ''}
//           onChange={handleInputChange}
//         />
//       </div>

//       {/* Employee ID */}
//       <div className="mt-6">
//         <p className="text-gray-700 text-base font-semibold">Employee ID</p>
//         <input
//           type="text"
//           name="employee_id"
//           className="w-full rounded-md border p-3"
//           value={userData?.employee_id || ''}
//           onChange={handleInputChange}
//         />
//       </div>

//       {/* Address */}
//       <div className="mt-6">
//         <p className="text-gray-700 text-base font-semibold">Address</p>
//         <textarea
//           name="address"
//           className="w-full rounded-md border p-3"
//           rows={2}
//           value={userData?.address || ''}
//           onChange={handleInputChange}
//         />
//       </div>

//       {/* Save Changes Button */}
//       <button
//         className={`mt-4 rounded-md bg-blue-500 px-4 py-2 text-white ${
//           loading ? 'cursor-not-allowed opacity-50' : ''
//         }`}
//         onClick={handleUpdate}
//         disabled={loading}
//       >
//         {loading ? 'Saving...' : 'Save Changes'}
//       </button>
//     </div>
//   );
// };

// export default Profile;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import { useState,useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import EditProfile from "../components/EditProfile";
import { getUserById,updateUser } from "../api/services/profileService";

const ProfileSettings = () => {
  const [isEditing, setIsEditing] = useState(false); 
  const [details, setDetails] = useState(null);
  const [editData, setEditData] = useState(details);
 
  const userId = "93cac93c-c846-4779-84e6-0dcc3d6b8a94";

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData(details);
  };

  const handleSave = () => {
    setDetails(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserById(userId);
        setDetails(data);
        setEditData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
     
      }
    };

    fetchUserData();
  }, []);

  // const handleSave = async () => {
  //   try {
  //     const updatedUser = await updateUser(userId, editData);
  //     setDetails(updatedUser);
  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error("Failed to update user data:", error);
  //     alert("Error updating profile. Please try again.");
  //   }
  // };

  // const handleCancel = () => {
  //   setIsEditing(false);
  // };

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto min-h-screen overflow-y-auto p-10 bg-gray-100">
      {/* Main Container */}
      <section className="bg-white shadow-md rounded-lg p-8">
        
        {/* 🔹 Profile Details Heading (Moved Above) */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Profile Details</h3>
          {!isEditing && (
            <FaEdit
              className="text-gray-500 cursor-pointer text-2xl hover:text-gray-700"
              onClick={handleEditClick}
            />
          )}
        </div>
  
        {/* 1️⃣ Profile Section */}
        <div className="flex items-center space-x-6 mb-8">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-300"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
            {details.first_name || "N/A"} {details.last_name || "N/A"}</h2>
            <p className="text-gray-500 text-lg">{details.email || "-"}</p>
          </div>
        </div>
  
        {isEditing ? (
          <EditProfile
            editData={editData}
            // setEditData={setEditData}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-14 gap-y-8">
            
            {/* 2️⃣ Personal Details Heading */}
            <div className="col-span-2 mb-2">
              <h3 className="text-2xl font-bold text-gray-800">Personal Details</h3>
            </div>
          
          {[
              ["first_name", "First Name"],
              ["last_name", "Last Name"],
              ["phone", "Phone"],
              ["email", "Email"],
              ["dob", "Date of Birth"],
              ["gender", "Gender"],
              ["blood_group", "Blood Group"],
              ["marital_status", "Marital Status"],
            ].map(([key, label]) => (
              <div key={key}>
                <strong className="text-lg text-gray-600">{label}:</strong>
                <p className="text-lg text-gray-800 mt-1">{details[key] || "-"}</p>
              </div>
            ))}

            <div className="col-span-2 grid grid-cols-2 gap-x-12">
              {[
                ["address", "Address"],
                ["emergency_contact", "Emergency Contact"],
              ].map(([key, label]) => (
                <div key={key}>
                  <strong className="text-lg text-gray-600">{label}:</strong>
                  <p className="text-lg text-gray-800 mt-1">{details[key] || "-"}</p>
                </div>
              ))}
            </div>

            <div className="col-span-2 mt-6 mb-2">
              <h3 className="text-2xl font-bold text-gray-800">Job Details</h3>
            </div>

            {[
              ["employee_id", "Employee ID"],
              ["company_name", "Company Name"],
              ["designation", "Designation"],
              ["department", "Department"],
              ["roletype", "Role Type"],
              ["employee_type", "Employee Type"],
              ["doj", "Date of Joining"],
            ].map(([key, label]) => (
              <div key={key}>
                <strong className="text-lg text-gray-600">{label}:</strong>
                <p className="text-lg text-gray-800 mt-1">{details[key] || "-"}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};


export default ProfileSettings;




