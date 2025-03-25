import React from 'react';
import { FaTimes } from 'react-icons/fa';
import moment from 'moment';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string; // Optional field
  gender?: string;
  marital_status?: string;
  blood_group?: string;
  emergency_contact?: string;
  address?: string;
  employee_id: number;
  company_name?: string;
  designation?: string;
  roletype: string;
  employee_type?: string;
  department?: string;
  doj: string;
  dob: string;
}

interface ViewUserDetailsProps {
  isOpen: boolean;
  user?: User | null; // Make user optional to prevent errors
  onClose: () => void;
}

const ViewUserDetails: React.FC<ViewUserDetailsProps> = ({
  isOpen,
  user,
  onClose,
}) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 z-9999 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative h-auto max-h-[90vh] w-11/12 max-w-5xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-red-500 absolute right-3"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-gray-800 mb-4 border-b pb-2 text-xl font-semibold">
          User Details
        </h2>

        {/* User Details */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <DetailItem label="First Name" value={user.first_name} />
          <DetailItem label="Last Name" value={user.last_name} />
          <DetailItem label="Email" value={user.email} />
          <DetailItem label="Phone Number" value={user.phone_number} />
          <DetailItem label="Gender" value={user.gender} />
          <DetailItem label="Marital Status" value={user.marital_status} />
          <DetailItem label="Blood Group" value={user.blood_group} />
          <DetailItem
            label="Emergency Contact"
            value={user.emergency_contact}
          />
          <DetailItem label="Address" value={user.address} />
          <DetailItem label="Employee ID" value={String(user.employee_id)} />
          <DetailItem label="Company Name" value={user.company_name} />
          <DetailItem
            label="Designation"
            value={user.designation
              .replace(/_/g, ' ') 
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          />

          <DetailItem
            label="Role Type"
            value={user.roletype
              .replace(/_/g, ' ') 
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          />

          <DetailItem label="Employee Type" value={user.employee_type} />
          <DetailItem label="Department" value={user.department} />
          <DetailItem
            label="Date of Joining"
            value={
              moment(user.doj).isValid()
                ? moment(user.doj).format('DD-MM-YYYY')
                : 'N/A'
            }
          />
          <DetailItem
            label="Date of Birth"
            value={
              moment(user.dob).isValid()
                ? moment(user.dob).format('DD-MM-YYYY')
                : 'N/A'
            }
          />
        </div>

        {/* Close Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Detail Item Component
const DetailItem: React.FC<{
  label: string;
  value: string | null | undefined;
}> = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-800">{value ? value : 'N/A'}</span>
  </div>
);

export default ViewUserDetails;
