// import { useState } from "react";
// import { FaCamera } from "react-icons/fa";

// const ProfilePicture = () => {
//   const defaultProfilePic =
//     "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

//   const [profilePic, setProfilePic] = useState(defaultProfilePic);
//   const [showPopup, setShowPopup] = useState(false);

//   // Handle file selection
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePic(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//     setShowPopup(false); // Close pop-up after selecting file
//   };

//   // Handle delete (reset to default)
//   const handleDelete = () => {
//     setProfilePic(defaultProfilePic);
//     setShowPopup(false);
//   };

//   return (
//     <div className="flex items-center gap-4 mt-4">
//       {/* Profile Picture Container */}
//       <div className="relative">
//         <img
//           src={profilePic}
//           alt="Profile"
//           className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
//         />

//         {/* Camera Icon Button */}
//         <button
//           className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600"
//           onClick={() => setShowPopup(!showPopup)}
//         >
//           <FaCamera size={16} />
//         </button>
//       </div>

//       {/* Floating Pop-up */}
//       {showPopup && (
//         <div className="absolute left-24 bg-white shadow-lg p-3 rounded-md flex flex-col gap-2 w-40">
//           {/* Upload Picture */}
//           <label className="cursor-pointer text-blue-600 hover:text-blue-800">
//             Upload Picture
//             <input
//               type="file"
//               accept="image/png, image/jpeg"
//               className="hidden"
//               onChange={handleFileChange}
//             />
//           </label>

//           {/* Remove Picture */}
//           <button
//             className="text-red-600 hover:textw-red-800"
//             onClick={handleDelete}
//           >
//             Remove Picture
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePicture;
import { useRef, useState } from "react";
import { FaCamera, FaTrash } from "react-icons/fa";

interface ProfilePictureProps {
  profilePic: string | null;
  updateProfilePicture: (image: string | null) => void;
  isEditing: boolean;
}

const ProfilePicture = ({ profilePic, updateProfilePicture , isEditing }: ProfilePictureProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const defaultProfilePic = "default_picture-2.webp"; // Ensure this image is available in 'public' folder
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateProfilePicture(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePicture = () => {
    updateProfilePicture(null); // Reset to default
  };

  return (
    <div
      className="relative w-26 h-26"
      onMouseEnter={() =>  isEditing && profilePic && setIsHovered(true)} // Only enable hover if a picture is uploaded
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={profilePic || defaultProfilePic}
        alt="Profile"
        className="w-full h-full rounded-full object-cover border-2 border-gray-300"
      />

      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

       {/* Overlay on Hover */}
       {isEditing &&  profilePic && isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <button
            className=" text-white px-3 py-1 rounded shadow-md hover:bg-red-600"
            onClick={handleRemovePicture}
          >
            {/* <FaTrash size={14}></FaTrash> */}
            Remove
          </button>
        </div>
      )}

      {/* Upload Button */}
      {isEditing && (
      <button
        className="absolute bottom-0 right-0 rounded-full bg-blue-500 p-1.5 text-white shadow-md hover:bg-blue-600"
        onClick={() => fileInputRef.current?.click()}
      >
        <FaCamera size={16} />
      </button>
      )}
      {/* Delete Button (Only shows on hover) */}
      {/* {profilePic && isHovered && (
        <button
          className="absolute top-0 right-0 rounded-full bg-black p-1 shadow-md hover:bg-red-600"
          onClick={handleRemovePicture}
        >
          <FaTrash size={14} />
        </button>
      )} */}
    </div>
  );
};

export default ProfilePicture;
