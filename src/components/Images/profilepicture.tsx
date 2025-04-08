import { useRef, useState } from "react";
import { FaCamera, FaTrash, FaUser } from "react-icons/fa"; // Added FaUser for placeholder icon
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface ProfilePictureProps {
  profilePic: string | null;
  updateProfilePicture: (image: string | null) => void;
  isEditing: boolean;

  isDetailsView: boolean;
}

const ProfilePicture = ({ profilePic, updateProfilePicture, isEditing, isDetailsView }: ProfilePictureProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateProfilePicture(base64String);
        toast.success("Profile picture updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePicture = () => {

    updateProfilePicture(null);
    toast.info("Profile picture removed.");
  };

  return (
    <div
      className="relative w-24 h-24 group"
      onMouseEnter={() => isEditing && setIsHovered(true)}
      onMouseLeave={() => isEditing && setIsHovered(false)}
    >
      {profilePic ? (
        <div className="relative group">
          <img
            src={profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          {isEditing && !isDetailsView && (
            <div 
              onClick={handleRemovePicture}
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 cursor-pointer rounded-full"
            >
              <span className="text-white font-medium">Remove</span>
            </div>
          )}
        </div>
      ) : (
        // <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-200 border-2 border-gray-300">
        // <FaUser className="text-gray-500" size={60} />

        <div className="w-24 h-24 rounded-full border-2 border-gray-300">
          <img
            src="/default_picture-2.webp"
            alt="Default Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      )}

      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {isEditing && !isDetailsView && (
        <button
          className="absolute bottom-0 right-2 rounded-full bg-blue-500 p-2 text-white shadow-md hover:bg-blue-600"
          onClick={() => fileInputRef.current?.click()}
        >
          <FaCamera size={14} />
        </button>
      )}

    </div>
  );
};

export default ProfilePicture;
