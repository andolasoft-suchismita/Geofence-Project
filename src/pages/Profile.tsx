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

import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";
import { getUserById, updateUser } from "../api/services/profileService";
import ProfilePicture from "../components/Images/profilepicture";
import { RootState } from "../redux/store";
 
const ProfileSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState<any>(null);
  const [editData, setEditData] = useState<any>(null);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  // ✅ Get logged-in user ID from Redux state
  const userId = useSelector((state: RootState) => state.authSlice.user_id); // Get user ID from Redux
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
 
  // const [userDetails, setUserDetails] = useState<any>(null);
 
  useEffect(() => {
        const fetchUserDetails = async () => {
          if (!userId) return;
   
          try {
            const data = await getUserById(userId);
            setUserDetails(data);
            setDetails(data);
          } catch (error) {
            console.error("Error fetching user details:", error);
          } finally {
            setLoading(false);
          }
        };
   
        fetchUserDetails();
      }, [userId]);
 
  const handleEditClick = () => {
    setIsEditing(true);
    setEditData(details);
  };
 
  const handleCancel = () => {
    setIsEditing(false);
  };
 
  const handleSave = async (updatedData: any) => {
  //   try {
  //     await updateUser(userId, updatedData);
  //     setDetails(updatedData);
  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error("Failed to update user:", error);
  //     setError("Error updating profile. Try again.");
  //   }
  // };
  try {
    const updatedData = { ...editData };
    await updateUser(userId, updatedData);
    setDetails(updatedData);
    setIsEditing(false);
  } catch (error) {
    console.error("Failed to update user:", error);
    setError("Error updating profile. Try again.");
  }
};

 
  const updateProfilePicture = async (base64String: string) => {
  //   try {
  //     const updatedData = { ...details, profile_pic: base64String };
  //     await updateUser(userId, updatedData);
  //     setDetails(updatedData);
  //   } catch (error) {
  //     console.error("Error updating profile picture:", error);
  //     setError("Failed to update profile picture.");
  //   }
  // };
  setEditData((prevData: any) => ({
    ...prevData,
    profile_pic: base64String,  // Store in editData instead of updating details
  }));
};
 
  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
 
  return (
    <div className="w-2xl max-w-4xl mx-auto min-h-screen overflow-y-auto bg-gray-100">
      {/* Profile Card */}
      <section className="bg-white shadow-md rounded-lg p-8">
        {/* 🔹 Header */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-800">Profile Details</h3>
          {!isEditing && (
            <div className="relative group">
              <FaEdit
                className="text-gray-500 cursor-pointer text-2xl hover:text-gray-700"
                onClick={handleEditClick}
              />
              {/* Tooltip */}
              <span className="absolute top-8 left-[-20px] hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Edit
              </span>
            </div>
          )}
        </div>
 
        {/* 🔹 Profile Info */}
        <div className="flex items-center space-x-6 mb-8">
          <ProfilePicture 
          profilePic={details.profile_pic} 
          updateProfilePicture={updateProfilePicture} 
          isEditing={isEditing} 
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {details.first_name || "N/A"} {details.last_name || "N/A"}
            </h2>
            <p className="text-gray-500 text-lg">{details.email || "-"}</p>
          </div>
        </div>
 
        {isEditing ? (
          <EditProfile editData={editData} setEditData={setEditData} handleSave={handleSave} handleCancel={handleCancel} />
        ) : (
          <div className="grid grid-cols-2 gap-x-14 gap-y-8">
            {/* 🔹 Personal Details */}
            <div className="col-span-2 mb-2">
              <h3 className="text-2xl font-bold text-gray-800">Personal Details</h3>
            </div>
 
            {[
              ["first_name", "First Name"],
              ["last_name", "Last Name"],
              ["phone_number", "Phone Number"],
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
 
            {/* 🔹 Additional Info */}
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
 
            {/* 🔹 Company Details */}
            <div className="col-span-2 mt-6 mb-2">
              <h3 className="text-2xl font-bold text-gray-800">Company Details</h3>
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