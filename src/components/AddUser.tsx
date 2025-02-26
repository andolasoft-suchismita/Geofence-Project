import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
  // employee_id: string;
  email: string;
  roletype: string;
  doj: string;
  dob: string;
  designation: string;
  hashed_password: string;
}

// Enum for Designations
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

const UserForm: React.FC<UserFormProps> = ({
  onClose,
  formType = 'create',
  selectedItem = null,
  addUser,
  updateUser,
}) => {




  return (
    <div className="fixed inset-0 mt-15 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[500px] rounded-lg bg-gray px-6 py-8 text-black shadow-lg">
        <Formik
          initialValues={{
            first_name: selectedItem ? selectedItem?.first_name : '',
            last_name: selectedItem ? selectedItem?.last_name : '',
            // employee_id: '',
            email: selectedItem ? selectedItem?.email : '',
            roletype: selectedItem ? selectedItem?.roletype : '',
            doj: selectedItem ? selectedItem?.doj : '',
            dob: selectedItem ? selectedItem?.dob : '',
            designation: selectedItem ? selectedItem?.designation : '',
            hashed_password: selectedItem ? selectedItem?.hashed_password : '',
          }}
          validationSchema={Yup.object({
            first_name: Yup.string().required('First name is required'),
            last_name: Yup.string().required('Last name is required'),
            // employee_id: Yup.string().required('Employee ID is required'),
            email: Yup.string()
              .email('Invalid email')
              .required('Email is required'),
            roletype: Yup.string().required('Role is required'),
            doj: Yup.date().required('Date of Joining is required'),
            dob: Yup.date().required('Date of Birth is required'),
            designation: Yup.string()
              .oneOf(Object.values(CompanyDesignation), 'Invalid designation')
              .required('Designation is required'),
            hashed_password: Yup.string()
              .min(6, 'Password must be at least 6 characters')
              .required('Password is required'),
          })}
          onSubmit={(values, { resetForm }) => {
            (formType?.toLowerCase() === 'edit' && selectedItem) ? updateUser(selectedItem?.id, values) : addUser(values);
            resetForm();
          }}
        >
          {({ }) => (
            <Form className="">
              <h2 className="mb-6 text-center text-xl font-semibold">
                Add User
              </h2>
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block">
                    First Name
                    <span className="text-2xl text-orange-900">*</span>
                  </label>
                  <Field
                    name="first_name"
                    className="w-full rounded border p-2"
                  />
                  <ErrorMessage
                    name="first_name"
                    className="text-sm text-orange-900"
                    component="div"
                  />
                </div>
                <div>
                  <label className="block">
                    Last Name<span className="text-2xl text-orange-900">*</span>
                  </label>
                  <Field
                    name="last_name"
                    className="w-full rounded border p-2"
                  />
                  <ErrorMessage
                    name="last_name"
                    className="text-sm text-orange-900"
                    component="div"
                  />
                </div>
              </div>

              {/* Employee ID & Email */}
              <div className="grid  gap-4">
                {/* <div>
                  <label className="block">
                    Employee ID
                    <span className="text-2xl text-orange-900">*</span>
                  </label>
                  <Field
                    name="employee_id"
                    autoComplete="off"
                    className="w-full rounded border p-2"
                  />
                  <ErrorMessage
                    name="employee_id"
                    className="text-sm text-orange-900"
                    component="div"
                  />
                </div> */}
                <div>
                  <label className="block">
                    Email<span className="text-2xl text-orange-900">*</span>
                  </label>
                  <Field
                    autoComplete="off"
                    name="email"
                    type="email"
                    className="w-full rounded border p-2"
                  />
                  <ErrorMessage
                    name="email"
                    className="text-sm text-orange-900"
                    component="div"
                  />
                </div>
              </div>

              {/* Role Type Dropdown */}
              <div>
                <label className="block">
                  Role Type<span className="text-2xl text-orange-900">*</span>
                </label>
                <Field
                  name="roletype"
                  as="select"
                  className="w-full rounded border p-2"
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </Field>
                <ErrorMessage
                  name="roletype"
                  className="text-sm text-orange-900"
                  component="div"
                />
              </div>

              {/* Designation Dropdown */}
              <div>
                <label className="block">
                  Designation<span className="text-2xl text-orange-900">*</span>
                </label>
                <Field
                  as="select"
                  name="designation"
                  className="w-full rounded border p-2"
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
                  className="text-sm text-orange-900"
                />
              </div>

              {/* Date of Joining & Date of Birth */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block">
                    Date of Joining
                    <span className="text-2xl text-orange-900">*</span>
                  </label>
                  <Field
                    name="doj"
                    type="date"
                    className="w-full rounded border p-2"
                  />
                  <ErrorMessage
                    name="doj"
                    component="div"
                    className="text-sm text-orange-900"
                  />
                </div>
                <div>
                  <label className="block">
                    Date of Birth
                    <span className="text-2xl text-orange-900">*</span>
                  </label>
                  <Field
                    name="dob"
                    type="date"
                    className="w-full rounded border p-2"
                  />
                  <ErrorMessage
                    name="dob"
                    component="div"
                    className="text-sm text-orange-900"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block">
                  Password<span className="text-2xl text-orange-900">*</span>
                </label>
                <Field
                  name="hashed_password"
                  type="password"
                  autoComplete="new-password"
                  className="w-full rounded border p-2"
                />
                <ErrorMessage
                  name="password"
                  className="text-sm text-orange-900"
                  component="div"
                />
              </div>

              {/* Buttons */}
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded bg-[#e65558] px-4 py-2 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Add User
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
