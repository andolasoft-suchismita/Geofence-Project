import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ProfilePicture from "../components/Images/profilepicture";
// import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const Profile: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-xl">
      {/* Header Section */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-gray-800 text-2xl font-bold">Profile Settings</h2>
      </div>

      <div>
        <ProfilePicture />
      </div>

      {/* Full Name Section */}
      <div className="mt-6">
        <p className="text-gray-700 text-base font-semibold">Name</p>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="First name"
            className="w-full rounded-md border p-3  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value=""
          />
          <input
            type="text"
            placeholder="Last name"
            className="w-full rounded-md border p-3  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value=""
          />
        </div>
      </div>

      {/* Contact Email */}
      <div className="mt-6">
        <p className="text-gray-700 text-base font-semibold ">Email</p>
        {/* <div className="flex gap-4 mt-2"> */}
        <input
          type="email"
          className="w-full rounded-md border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 "
          placeholder="john-doe@email.com"
          
        />
        {/* <button className="px-4 py-2 bg-gray-100 rounded-md">
            Add another email
          </button> */}
      </div>
      {/* </div> */}

      {/* Password Section */}
      <div className="mt-6">
        <p className="text-gray-700 text-base font-semibold">Password</p>
        <div className="flex gap-4">
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Current Password"
              className="w-full rounded-md border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value=""
            />
            <span
              className="text-gray-500 absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
              className="w-full rounded-md border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value=""
            />
            <span
              className="text-gray-500 absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-700 text-base font-semibold">Date of Birth</p>
          <input
            type="Date"
            placeholder="DD/MM/YY"
            className="w-full rounded-md border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value=""
          />
        </div>
        <div className="mt-6">
          <p className="text-gray-700 text-base font-semibold">
            Date of Joining
          </p>
          <input
            type="Date"
            placeholder="DD/MM/YY"
            className="w-full rounded-md border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value=""
          />
        </div>
        <div className="mt-6">
          <p className="text-gray-700 text-base font-semibold">Role</p>
          <input
            type="text"
            placeholder="Admin"
            className="w-full rounded-md border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value=""
          />
        </div>
        <div className="mt-6">
          <p className="text-gray-700 text-base font-semibold">Designation</p>
          <input
            type="text"
            placeholder=""
            className="w-full rounded-md border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value=""
          />
        </div>

        <div className="mt-6">
          <p className="text-gray-700 text-base font-semibold">Employee_ID</p>
          <input
            type="String"
            placeholder=""
            className="w-full rounded-md border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value=""
          />
        </div>

        <div className="mt-6 ">
          <p className="text-gray-700 text-base font-semibold ">Address</p>
          <textarea
            className="border-gray-300 w-full resize-none rounded-md border p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={2} // Ensures two lines
            maxLength={100} // Optional: Limit characters
            placeholder="Enter your address..."
            value=""
            // onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mt-6 ">
          <p className="text-gray-700 text-base font-semibold">Description</p>
          <textarea
            className="border-gray-300 w-full resize-none rounded-md border p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={2} // Ensures two lines
            maxLength={100} // Optional: Limit characters
            placeholder=""
            value=""
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            className="hover:bg-gray-600 rounded-lg bg-[#e65558] px-6 py-3 text-base font-semibold text-white shadow-md transition"
            onClick={() => navigate(-1)} // This will close and go back
          >
            Cancel
          </button>
          <button className="rounded-lg bg-blue-500 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;


