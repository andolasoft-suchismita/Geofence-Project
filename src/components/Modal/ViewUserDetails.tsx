import React from "react";

interface ViewUserDetailsProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}
interface User {
  first_name: string;
  last_name: string;
  employee_id: string;
  email: string;
  roletype: string;
  doj: string;
  dob: string;
  designation: string;
  password: string;
}

const ViewUserDetails: React.FC<ViewUserDetailsProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">User Details</h2>
        <div className="space-y-2 text-gray-800">
          <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Employee ID:</strong> {user.employee_id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role Type:</strong> {user.roletype}</p>
          <p><strong>Designation:</strong> {user.designation}</p>
          <p><strong>Date of Joining:</strong> {user.doj}</p>
          <p><strong>Date of Birth:</strong> {user.dob}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewUserDetails;
