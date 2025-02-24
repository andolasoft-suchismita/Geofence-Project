import { useState } from "react";
import { FaCamera } from "react-icons/fa";

const ProfilePicture = () => {
  const defaultProfilePic =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [showPopup, setShowPopup] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    setShowPopup(false); // Close pop-up after selecting file
  };

  // Handle delete (reset to default)
  const handleDelete = () => {
    setProfilePic(defaultProfilePic);
    setShowPopup(false);
  };

  return (
    <div className="flex items-center gap-4 mt-4">
      {/* Profile Picture Container */}
      <div className="relative">
        <img
          src={profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />

        {/* Camera Icon Button */}
        <button
          className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600"
          onClick={() => setShowPopup(!showPopup)}
        >
          <FaCamera size={16} />
        </button>
      </div>

      {/* Floating Pop-up */}
      {showPopup && (
        <div className="absolute left-24 bg-white shadow-lg p-3 rounded-md flex flex-col gap-2 w-40">
          {/* Upload Picture */}
          <label className="cursor-pointer text-blue-600 hover:text-blue-800">
            Upload Picture
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Remove Picture */}
          <button
            className="text-red-600 hover:text-red-800"
            onClick={handleDelete}
          >
            Remove Picture
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
