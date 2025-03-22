// import { useState,useEffect } from 'react';
// import { FaEdit } from "react-icons/fa";
// import EditProfile from "../components/EditProfile";
// import { getUserById,updateUser } from "../api/services/profileService";
// import ProfilePicture from "../components/Images/profilepicture";


// const ProfileSettings = () => {
//   const [isEditing, setIsEditing] = useState(false); 
//   const [details, setDetails] = useState(null);
//   const [editData, setEditData] = useState(details);
 
//   const userId = "93cac93c-c846-4779-84e6-0dcc3d6b8a94";

//    useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const data = await getUserById(userId);
       
//         setDetails(data);
//         setEditData(data);
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
     
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleEditClick = () => {
//     setIsEditing(true);
//     setEditData(details);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//   };
  

//   const handleSave = async (updatedData: any) => {
//    try {
//       await updateUser(userId, updatedData);
//       console.log("User updated successfully");
      
//       setDetails(updatedData);
//       setIsEditing(false); // Exit edit mode
  
//     } catch (error) {
//       console.error("Failed to update user:", error);
//     }
//   };

//   const updateProfilePicture = async (base64String: string) => {
//     try {
//       const updatedData = { ...details, profile_pic: base64String };
//       await updateUser(userId, updatedData);
//       setDetails(updatedData);
//     } catch (error) {
//       console.error("Error updating profile picture:", error);
//     }
//   };
  
//    if (!details) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="w-2xl max-w-4xl mx-auto min-h-screen overflow-y-auto bg-gray-100">
//       {/* Main Container */}
//       <section className="bg-white shadow-md rounded-lg p-8">
//         {/* 🔹 Profile Details Heading */}
//         <div className="flex items-center justify-between mb-8">
//           <h3 className="text-2xl font-bold text-gray-800">Profile Details</h3>
//           {!isEditing && (
//            <div className="relative group">
//            <FaEdit
//              className="text-gray-500 cursor-pointer text-2xl hover:text-gray-700 ml-auto"
//              onClick={handleEditClick}
//            />
//            {/* Tooltip */}
//            <span className="absolute right-0 hidden group-hover:flex bg-gray-800 text-black text-sm px-2 py-1 rounded shadow-md">
//              Edit
//            </span>
//          </div>
//           )}
//         </div>
  
//         {/* 1️⃣ Profile Section */}
//         <div className="flex items-center space-x-6 mb-8">
//         <ProfilePicture 
//          profilePic={details.profile_pic}
//          updateProfilePicture={updateProfilePicture}
//          />
            
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">
//             {details.first_name || "N/A"} {details.last_name || "N/A"}</h2>
//             <p className="text-gray-500 text-lg">{details.email || "-"}</p>
//           </div>
//         </div>
  
//         {isEditing ? (
//           <EditProfile
//             editData={editData}
//             setEditData={setEditData} 
//             handleSave={handleSave}
//             handleCancel={handleCancel}
//           />
//         ) : (
//           <div className="grid grid-cols-2 gap-x-14 gap-y-8">
            
//             {/* 2️⃣ Personal Details Heading */}
//             <div className="col-span-2 mb-2">
//               <h3 className="text-2xl font-bold text-gray-800">Personal Details</h3>
//             </div>
          
//           {[
//               ["first_name", "First Name"],
//               ["last_name", "Last Name"],
//               ["phone_number", "Phone number"],
//               ["email", "Email"],
//               ["dob", "Date of Birth"],
//               ["gender", "Gender"],
//               ["blood_group", "Blood Group"],
//               ["marital_status", "Marital Status"],
//             ].map(([key, label]) => (
//               <div key={key}>
//                 <strong className="text-lg text-gray-600">{label}:</strong>
//                 <p className="text-lg text-gray-800 mt-1">{details[key] || "-"}</p>
//               </div>
//             ))}

//             <div className="col-span-2 grid grid-cols-2 gap-x-12">
//               {[
//                 ["address", "Address"],
//                 ["emergency_contact", "Emergency Contact"],
//               ].map(([key, label]) => (
//                 <div key={key}>
//                   <strong className="text-lg text-gray-600">{label}:</strong>
//                   <p className="text-lg text-gray-800 mt-1">{details[key] || "-"}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="col-span-2 mt-6 mb-2">
//               <h3 className="text-2xl font-bold text-gray-800">Company Details</h3>
//             </div>

//             {[
//               ["employee_id", "Employee ID"],
//               ["company_name", "Company Name"],
//               ["designation", "Designation"],
//               ["department", "Department"],
//               ["roletype", "Role Type"],
//               ["employee_type", "Employee Type"],
//               ["doj", "Date of Joining"],
//             ].map(([key, label]) => (
//               <div key={key}>
//                 <strong className="text-lg text-gray-600">{label}:</strong>
//                 <p className="text-lg text-gray-800 mt-1">{details[key] || "-"}</p>
//               </div>
//             ))}
//           </div>
//           )}
//         </section>
        
//     </div>
//   );
// };

// export default ProfileSettings;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    try {
      await updateUser(userId, updatedData);
      setDetails(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user:", error);
      setError("Error updating profile. Try again.");
    }
  };

  const updateProfilePicture = async (base64String: string) => {
    try {
      const updatedData = { ...details, profile_pic: base64String };
      await updateUser(userId, updatedData);
      setDetails(updatedData);
    } catch (error) {
      console.error("Error updating profile picture:", error);
      setError("Failed to update profile picture.");
    }
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
          <ProfilePicture profilePic={details.profile_pic} updateProfilePicture={updateProfilePicture} />
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


