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
  employee_id: string;
  email: string;
  roletype: string;
  doj: string;
  dob: string;
  designation: string;
  password: string;
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 ">
        
        <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold mb-4 text-blue-900">Edit User</h2>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
            placeholder="First Name"
          />
          {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}

          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
            placeholder="Last Name"
          />
          {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}

          <input
            type="text"
            name="employee_id"
            value={formData.employee_id}
            disabled
            className="w-full border p-2 rounded mb-2 bg-gray-200"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <select
            name="roletype"
            value={formData.roletype}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          {errors.roletype && <p className="text-red-500 text-sm">{errors.roletype}</p>}

          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
            placeholder="Designation"
          />
          {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}

          <input
            type="date"
            name="doj"
            value={formData.doj}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          />
          {errors.doj && <p className="text-red-500 text-sm">{errors.doj}</p>}

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="px-4 py-2 bg-orange-400 text-white rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
