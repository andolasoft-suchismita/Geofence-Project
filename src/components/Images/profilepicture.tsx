import { useRef } from "react";
import { FaCamera } from "react-icons/fa";

interface ProfilePictureProps {
  profilePic: string | null;
  updateProfilePicture: (image: string) => void;
}

const ProfilePicture = ({ profilePic, updateProfilePicture }: ProfilePictureProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  return (
    <div className="relative">
      {profilePic ? (
        <img
          src={profilePic}
          alt="Profile"
          className="w-22 h-22 rounded-full object-cover border-2 border-gray-300"
        />
      ) : (
        <p>profile</p>
      )}

      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        className="absolute bottom-0 right-0 rounded-full bg-blue-500 p-2 text-white shadow-md hover:bg-blue-600"
        onClick={() => fileInputRef.current?.click()}
      >
        <FaCamera size={12} />
      </button>
    </div>
  );
};

export default ProfilePicture;
