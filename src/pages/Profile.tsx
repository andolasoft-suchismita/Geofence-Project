import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa"; // Importing cross icon
import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";
import { getUserById, updateUser } from "../api/services/profileService";
import ProfilePicture from "../components/Images/profilepicture";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState<any>(null);
  const [editData, setEditData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const userId = useSelector((state: RootState) => state.authSlice.user_id);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<any>(null);

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
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update user:", error);
      setError("Error updating profile. Try again.");
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const updateProfilePicture = async (base64String: string) => {
    try {
      const updatedData = { ...details, profile_pic: base64String || null };
      await updateUser(userId, updatedData);
      setDetails(updatedData);
    } catch (error) {
      console.error('Error updating profile picture:', error);
      setError('Failed to update profile picture.');
    }
  };

  if (loading)
    return <div className="text-gray-600 text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="w-2xl max-w-4xl mx-auto min-h-screen overflow-y-auto bg-gray-100">
      <section className="bg-white shadow-md rounded-lg p-8 relative">
        {/* Cross Button (Top-Right Corner) */}
        {isEditing && (
          <button
            className="absolute top-4 right-4 p-2 bg-gray-300 rounded-full text-gray-700 hover:bg-gray-400"
            onClick={handleCancel}
          >
            <FaTimes size={18} />
          </button>
        )}

        {/* 🔹 Header */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-800">Profile Details</h3>
        </div>

        {/* 🔹 Profile Info */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-6">
            <ProfilePicture
              profilePic={details.profile_pic}
              updateProfilePicture={updateProfilePicture}
              isEditing={isEditing}
              isDetailsView={!isEditing}
            />
            <div>
              <h2 className="text-2xl font-bold text-grey-800">
                {details.first_name || "N/A"} {details.last_name || "N/A"}
              </h2>
              <p className="text-grey-800 text-lg">{details.email || "-"}</p>
            </div>
          </div>

          {/*  Edit Button (Right of Profile Picture) */}
          {!isEditing && (
            <button
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}
        </div>

        {isEditing ? (
          <EditProfile
            isEditing={isEditing}
            editData={editData}
            setEditData={setEditData}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-14 gap-y-8">
            <div className="col-span-2 mb-0">
              <h3 className="text-2xl font-bold text-grey-800">Personal Details</h3>
            </div>

            {[
              ['first_name', 'First Name'],
              ['last_name', 'Last Name'],
              ['phone_number', 'Phone Number'],
              ['email', 'Email'],
              ['dob', 'Date of Birth'],
              ['gender', 'Gender'],
              ['blood_group', 'Blood Group'],
              ['marital_status', 'Marital Status'],
            ].map(([key, label]) => (
              <div key={key}>
                <strong className="text-gray-600 text-lg">{label}:</strong>
                <p className="text-gray-800 mt-1 text-lg">
                  {details[key] || '-'}
                </p>
              </div>
            ))}

            <div className="col-span-2 grid grid-cols-2 gap-x-12">
              {[
                ['address', 'Address'],
                ['emergency_contact', 'Emergency Contact'],
              ].map(([key, label]) => (
                <div key={key}>
                  <strong className="text-gray-600 text-lg">{label}:</strong>
                  <p className="text-gray-800 mt-1 text-lg">
                    {details[key] || '-'}
                  </p>
                </div>
              ))}
            </div>

            <div className="col-span-2 mt-6 mb-2">
              <h3 className="text-2xl font-bold text-gray-800">Company Details</h3>
            </div>

            {[
              ['employee_id', 'Employee ID'],
              ['company_name', 'Company Name'],
              ['designation', 'Designation'],
              ['department', 'Department'],
              ['roletype', 'Role Type'],
              ['employee_type', 'Employee Type'],
              ['doj', 'Date of Joining'],
            ].map(([key, label]) => (
              <div key={key}>
                <strong className="text-gray-600 text-lg">{label}:</strong>
                <p className="text-gray-800 mt-1 text-lg">
                  {details[key] || '-'}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfileSettings;
