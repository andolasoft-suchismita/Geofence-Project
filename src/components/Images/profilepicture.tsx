import { useRef, useState, useCallback } from "react";
import { FaCamera, FaTrash, FaUser, FaTimes } from "react-icons/fa"; // Added FaUser for placeholder icon and FaTimes for close button
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


interface ProfilePictureProps {
  profilePic: string | null;
  updateProfilePicture: (image: string | null) => void;
  isEditing: boolean;

  isDetailsView: boolean;
}

const ProfilePicture = ({ profilePic, updateProfilePicture, isEditing, isDetailsView }: ProfilePictureProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5,
  });
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [showLargeImage, setShowLargeImage] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setTempImage(base64String);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePicture = () => {
    updateProfilePicture(null);
    toast.info("Profile picture removed.");
  };

  const handleCropComplete = useCallback(async () => {
    if (imgRef.current && crop.width && crop.height) {
      const canvas = document.createElement('canvas');
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(
          imgRef.current,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        const croppedImage = canvas.toDataURL('image/jpeg');
        updateProfilePicture(croppedImage);
        setShowCropModal(false);
        setTempImage(null);
        toast.success("Profile picture updated successfully!");
      }
    }
  }, [crop, updateProfilePicture]);

  return (
    <>
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
              className={`w-24 h-24 rounded-full object-cover border-2 border-gray-300 ${isDetailsView ? 'cursor-pointer hover:opacity-90 transition-opacity duration-200' : ''}`}
              onClick={() => isDetailsView && setShowLargeImage(true)}
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

      {/* Crop Modal */}
      {showCropModal && tempImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-2xl w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Crop Image</h3>
            <div className="max-h-[60vh] overflow-auto">
              <ReactCrop
                crop={crop}
                onChange={c => setCrop(c)}
                aspect={1}
                circularCrop
              >
                <img
                  ref={imgRef}
                  src={tempImage}
                  alt="Crop me"
                  className="max-w-full"
                />
              </ReactCrop>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setShowCropModal(false);
                  setTempImage(null);
                }}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCropComplete}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Crop & Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Large Image Modal */}
      {showLargeImage && profilePic && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setShowLargeImage(false)}
        >
          <div className="relative w-64 h-64">
            <button
              onClick={() => setShowLargeImage(false)}
              className="absolute -top-8 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <FaTimes size={20} />
            </button>
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePicture;
