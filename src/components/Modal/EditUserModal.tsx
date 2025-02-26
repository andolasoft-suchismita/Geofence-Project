import React, { useState, useEffect } from "react";

interface EditUserModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
  roletype: string;
  doj: string;
  dob: string;
  designation: string;
  hashed_password: string;
}

export enum CompanyDesignation {
  CEO = 'ceo',
  CTO = 'cto',
  CFO = 'cfo',
  COO = 'coo',
  CMO = 'cmo',
  MANAGER = 'manager',
  TEAM_LEAD = 'team_lead',
  SENIOR_ENGINEER = 'senior_engineer',
  SOFTWARE_ENGINEER = 'software_engineer',
  JUNIOR_ENGINEER = 'junior_engineer',
  HR_MANAGER = 'hr_manager',
  RECRUITER = 'recruiter',
  SALES_MANAGER = 'sales_manager',
  MARKETING_MANAGER = 'marketing_manager',
  INTERN = 'intern',
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, user, onClose, onSave }) => {
  const [formData, setFormData] = useState<User | null>(user);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(user);
    setErrors({});
  }, [user]);

  if (!isOpen || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 mt-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg ">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-lg font-semibold text-blue-900">
            Edit User
          </h2>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="mb-2 w-full rounded border p-2"
            placeholder="First Name"
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm">{errors.first_name}</p>
          )}

          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="mb-2 w-full rounded border p-2"
            placeholder="Last Name"
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm">{errors.last_name}</p>
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mb-2 w-full rounded border p-2"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <select
            name="roletype"
            value={formData.roletype}
            onChange={handleChange}
            className="mb-2 w-full rounded border p-2"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          {errors.roletype && (
            <p className="text-red-500 text-sm">{errors.roletype}</p>
          )}

          {/* Designation */}
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="mb-2 w-full rounded border p-2"
          >
            <option value="">Select Designation</option>
            {Object.values(CompanyDesignation).map((designation) => (
              <option key={designation} value={designation}>
                {designation.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>
          {errors.designation && (
            <p className="text-red-500 text-sm">{errors.designation}</p>
          )}

          <input
            type="date"
            name="doj"
            value={formData.doj}
            onChange={handleChange}
            className="mb-2 w-full rounded border p-2"
          />
          {errors.doj && <p className="text-red-500 text-sm">{errors.doj}</p>}

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="mb-2 w-full rounded border p-2"
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

          <input
            type="password"
            name="hashed_password"
            value={formData.hashed_password}
            onChange={handleChange}
            className="mb-2 w-full rounded border p-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              className="rounded bg-orange-400 px-4 py-2 text-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
