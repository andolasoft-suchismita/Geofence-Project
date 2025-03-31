import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import {
  UserRoleType,
  CompanyDesignation,
  CompanyDepartment,
} from '../constants/enum';
interface UserFormProps {
  onClose: () => void;
  formType: string;
  selectedItem: any;
  addUser: (values: any) => {};
  updateUser: (id: string, values: any) => {};
}

export interface User {
  id: string;
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
  designation: CompanyDesignation;
  roletype: UserRoleType;
  employee_type?: string;
  department?: string;
  doj: string;
  dob: string;
}

const UserForm: React.FC<UserFormProps> = ({
  onClose,
  formType = 'create',
  selectedItem = null,
  addUser,
  updateUser,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative h-auto max-h-[90vh] w-11/12 max-w-5xl overflow-y-auto rounded-lg bg-gray p-6 shadow-lg">
        <Formik
          initialValues={{
            first_name: selectedItem ? selectedItem?.first_name : '',
            last_name: selectedItem ? selectedItem?.last_name : '',
            // employee_id: '',
            email: selectedItem ? selectedItem?.email : '',
            roletype: selectedItem ? selectedItem?.roletype : UserRoleType.USER,
            doj: selectedItem?.doj ? selectedItem.doj.split('T')[0] : '',
            dob: selectedItem?.dob ? selectedItem.dob.split('T')[0] : '',
            designation: selectedItem ? selectedItem?.designation : '',
            department: selectedItem ? selectedItem?.department : '',
            hashed_password: selectedItem ? selectedItem?.hashed_password : '',
            gender: selectedItem ? selectedItem?.gender : '', // Add this
            employee_type: selectedItem ? selectedItem?.employee_type : '', // Add this
          }}
          validationSchema={Yup.object({
            first_name: Yup.string()
              .matches(
                /^[A-Za-z\s'-]+$/,
                'First name can only contain letters, spaces, hyphens, and apostrophes'
              )
              .min(2, 'First name must be at least 2 characters')
              .max(50, 'First name cannot exceed 50 characters')
              .required('First name is required'),
            last_name: Yup.string()
              .matches(
                /^[A-Za-z\s'-]+$/,
                'Last name can only contain letters, spaces, hyphens, and apostrophes'
              )
              .min(2, 'Last name must be at least 2 characters')
              .max(50, 'Last name cannot exceed 50 characters')
              .required('Last name is required'),
            // employee_id: Yup.string().required('Employee ID is required'),
            email: Yup.string()
              .email('Invalid email')
              .required('Email is required'),
            roletype: Yup.string()
              .oneOf(Object.values(UserRoleType), 'Invalid role')
              .required('Role is required'),
            doj: Yup.date().required('Date of Joining is required'),
            dob: Yup.date().required('Date of Birth is required'),
            designation: Yup.string()
              .oneOf(Object.values(CompanyDesignation), 'Invalid designation')
              .required('Designation is required'),
            department: Yup.string()
              .oneOf(Object.values(CompanyDepartment), 'Invalid department')
              .required('Department is required'),
            hashed_password: Yup.string()
              .min(8, 'Password must be at least 8 characters')
              .matches(
                /[A-Z]/,
                'Password must contain at least one uppercase letter'
              )
              .matches(
                /[a-z]/,
                'Password must contain at least one lowercase letter'
              )
              .matches(/\d/, 'Password must contain at least one number')
              .matches(
                /[@$!%*?&]/,
                'Password must contain at least one special character'
              )
              .required('Password is required'),
            gender: Yup.string()
              .oneOf(['Male', 'Female', 'Other'])
              .required('Gender is required'), // Add this
            employee_type: Yup.string()
              .oneOf(['Full-time', 'Part-time', 'Intern'])
              .required('Employee Type is required'), // Add this
          })}
          onSubmit={(values, { resetForm }) => {
            formType?.toLowerCase() === 'edit' && selectedItem
              ? updateUser(selectedItem?.id, values)
              : addUser(values);
            resetForm();
          }}
        >
          {({ }) => (
            <Form className="">
              <div className="mb-6 flex ">
                <h2 className=" text-center text-xl font-semibold text-black">
                  {formType === 'edit' ? 'Edit User' : 'Add User'}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-600 hover:text-red-500 absolute right-3"
                >
                  <FaTimes size={18} />
                </button>
              </div>
              {/* First Name & Last Name */}
              <div className="mb-2 grid grid-cols-2 gap-4 ">
                <div>
                  <label className="block">First Name</label>
                  <Field
                    placeholder="Enter first name"
                    name="first_name"
                    className="w-full rounded-lg border p-2 focus:outline-blue-500 "
                  />
                  <ErrorMessage
                    name="first_name"
                    className="text-sm text-red"
                    component="div"
                  />
                </div>
                <div>
                  <label className="block">Last Name</label>
                  <Field
                    placeholder="Enter last name"
                    name="last_name"
                    className="w-full rounded-lg border p-2 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="last_name"
                    className="text-sm text-red"
                    component="div"
                  />
                </div>
              </div>

              {/* Employee ID & Email */}
              <div className="mb-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="block">Email</label>
                  <Field
                    autoComplete="off"
                    name="email"
                    type="email"
                    placeholder="Enter your email.."
                    className="w-full rounded-lg border p-2 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    className="text-sm text-red"
                    component="div"
                  />
                </div>
                <div>
                  <label className="block">Department</label>
                  <Field
                    as="select"
                    name="department"
                    className="w-full rounded-lg border p-2 focus:outline-blue-500"
                  >
                    <option value="">Select Departmemt</option>
                    {Object.values(CompanyDepartment).map((role) => (
                      <option key={role} value={role}>
                        {role.toUpperCase()}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="department"
                    className="text-sm text-red"
                    component="div"
                  />
                </div>
              </div>

              {/* Role Type Dropdown */}
              <div className="mb-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="block">Role Type</label>
                  <Field
                    as="select"
                    name="roletype"
                    className="w-full rounded-lg border p-2 focus:outline-blue-500"
                  >
                    <option value="">Select Role</option>
                    {Object.values(UserRoleType).map((role) => (
                      <option key={role} value={role}>
                        {role.toUpperCase()}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="roletype"
                    className="text-sm text-red"
                    component="div"
                  />
                </div>

                {/* Designation Dropdown */}
                <div>
                  <label className="block">Designation</label>
                  <Field
                    as="select"
                    name="designation"
                    className="w-full rounded-lg border p-2 focus:outline-blue-500"
                  >
                    <option value="">-- Select Designation --</option>
                    {Object.values(CompanyDesignation).map((role) => (
                      <option key={role} value={role}>
                        {role.replace('_', ' ').toUpperCase()}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="designation"
                    component="div"
                    className="text-sm text-red"
                  />
                </div>
              </div>
              <div className="mb-2 grid grid-cols-2 gap-4">
                {/* Gender Field */}
                <div>
                  <label className="block">Gender</label>
                  <Field
                    as="select"
                    name="gender"
                    className="w-full rounded-lg border p-2 focus:outline-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-sm text-red"
                  />
                </div>

                {/* Employee Type Field */}
                <div>
                  <label className="block">Employee Type</label>
                  <Field
                    as="select"
                    name="employee_type"
                    className="w-full rounded-lg border p-2 focus:outline-blue-500"
                  >
                    <option value="">Select Employee Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Intern">Intern</option>
                  </Field>
                  <ErrorMessage
                    name="employee_type"
                    component="div"
                    className="text-sm text-red"
                  />
                </div>
              </div>
              {/* Date of Joining & Date of Birth */}
              <div className="mb-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="block">Date of Joining</label>
                  <Field
                    name="doj"
                    type="date"
                    className="w-full rounded-lg border p-2 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="doj"
                    component="div"
                    className="text-sm text-red"
                  />
                </div>
                <div>
                  <label className="block">Date of Birth</label>
                  <Field
                    name="dob"
                    type="date"
                    className="w-full rounded-lg border p-2 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="dob"
                    component="div"
                    className="text-sm text-red"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block">Password</label>
                <Field
                  name="hashed_password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Enter password"
                  className="w-full rounded-lg border p-2 focus:outline-blue-500"
                />
                <ErrorMessage
                  name="hashed_password"
                  className="text-sm text-red"
                  component="div"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-500 absolute right-3 top-9"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="text- rounded bg-[#D3D3D3] px-7 py-2 hover:bg-red hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                >
                  {formType === 'edit' ? 'Save' : 'Add User'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserForm;
