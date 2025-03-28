import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducers';
import * as Yup from 'yup';

interface EditProfileProps {
  editData: any;
  setEditData: React.Dispatch<React.SetStateAction<any>>;
  handleSave: (values: any) => void;
  handleCancel: () => void;
  isEditing: boolean;
}

const EditProfile: React.FC<EditProfileProps> = ({
  editData,
  handleSave,
  handleCancel,
}) => {
  //  Fetch currentUser role from Redux
  const currentUser = useSelector(
    (state: RootState) => state.userSlice.userInfo
  );
  const isAdmin = currentUser?.is_superuser == true; // Admin role check

  const formik = useFormik({
    initialValues: {
      first_name: editData?.first_name || '',
      last_name: editData?.last_name || '',
      phone_number: editData?.phone_number || '',
      email: editData?.email || '',
      dob: editData?.dob || '',
      address: editData?.address || '',
      gender: editData?.gender || '',
      blood_group: editData?.blood_group || '',
      marital_status: editData?.marital_status || '',
      emergency_contact: editData?.emergency_contact || '',
      employee_id: editData?.employee_id || '',
      company_name: editData?.company_name || '',
      designation: editData?.designation || '',
      department: editData?.department || '',
      roletype: editData?.roletype || '',
      employee_type: editData?.employee_type || '',
      doj: editData?.doj || null,
    },
    validationSchema: Yup.object({
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
      email: Yup.string().email('Invalid email').required('Email is required'),
      phone_number: Yup.string()
        .trim()
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required'),
      dob: Yup.string().trim().required('Date of Birth is required'),
      gender: Yup.string().trim().required('Gender is required'),
      address: Yup.string().trim().required('Address is required'),
      blood_group: Yup.string().trim().required('Blood Group is required'),
      marital_status: Yup.string()
        .trim()
        .required('Marital Status is required'),
      emergency_contact: Yup.string()
        .trim()
        .matches(/^\d{10}$/, 'Emergency contact must be exactly 10 digits')
        .required('Emergency Contact is required'),

      department: Yup.string().trim().required('Department is required'),
      designation: Yup.string().trim().required('Department is required'),
      company_name: Yup.string()
        .matches(
          /^[A-Za-z0-9\s&.,'-]+$/,
          "Company name can only contain letters, numbers, spaces, and common symbols (&, ., -, ')"
        )
        .min(2, 'Company name must be at least 2 characters')
        .max(100, 'Company name cannot exceed 100 characters')
         .required('Company name is required'),
      roletype: Yup.string().required('Role is required'),
      employee_type: Yup.string().required('Role is required'),
       employee_id: Yup.string()
        
        .required('Employee Id number is required'),
    }),
    onSubmit: (values) => {
      console.log('Submitted Values:', values);
      const formattedValues = {
        ...values,
        doj: values.doj ? values.doj.split('T')[0] : null, // Ensure it's YYYY-MM-DD
      };
      handleSave(values);
    },
    enableReinitialize: true,
    validateOnChange: true, // Ensures validation runs on every change
    validateOnBlur: true, // Ensures validation runs on blur
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Personal Details Section */}
      <div>
        <h4 className="text-gray-700 mb-4 text-lg font-bold">
          Personal Details
        </h4>
        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
          {[
            ['first_name', 'First Name'],
            ['last_name', 'Last Name'],
            ['phone_number', 'Phone Number'],
            ['email', 'Email'],
            ['dob', 'Date of Birth'],
            ['gender', 'Gender'],
            ['blood_group', 'Blood Group'],
            ['marital_status', 'Marital Status'],
            ['address', 'Address'],
            ['emergency_contact', 'Emergency Contact'],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="text-gray-700 block">{label}</label>
              {name === 'gender' || name === 'marital_status' ? (
                <select
                  name={name}
                  value={
                    formik.values[name as keyof typeof formik.values] || ''
                  }
                  onChange={formik.handleChange}
                  className="w-full rounded-md border bg-gray p-3 focus:outline-blue-500"
                >
                  <option value="">Select {label}</option>
                  {name === 'gender' && (
                    <>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </>
                  )}
                  {name === 'marital_status' && (
                    <>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                    </>
                  )}
                </select>
              ) : (
                <input
                  type={name === 'dob' ? 'date' : 'text'}
                  name={name}
                  value={
                    formik.values[name as keyof typeof formik.values] || ''
                  }
                  onChange={formik.handleChange}
                  onKeyPress={(e) => {
                    if (
                      (name === 'phone_number' ||
                        name === 'emergency_contact') &&
                      !/[0-9]/.test(e.key)
                    ) {
                      e.preventDefault(); // Block non-numeric input
                    }
                  }}
                  maxLength={
                    name === 'phone_number' || name === 'emergency_contact'
                      ? 10
                      : undefined
                  }
                  className={`w-full rounded-md border p-3 focus:outline-blue-500 ${
                    name === 'email'
                      ? `text-gray-500 ${
                          isAdmin ? 'cursor-default' : 'cursor-not-allowed'
                        } bg-gray`
                      : 'bg-gray'
                  }`}
                  disabled={name === 'email' && !isAdmin}
                />
              )}
              {formik.errors[name as keyof typeof formik.errors] && (
                <p className="text-sm text-red">
                  {formik.errors[
                    name as keyof typeof formik.errors
                  ]?.toString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Job Details Section */}
      <div>
        <h4 className="text-gray-700 mb-4 text-lg font-bold">Job Details</h4>
        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
          {[
            ['employee_id', 'Employee ID'],
            ['company_name', 'Company Name'],
            ['designation', 'Designation'],
            ['department', 'Department'],

            ['doj', 'Date of Joining'],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="text-gray-700 block">{label}</label>
              <input
                type={name === 'doj' ? 'date' : 'text'}
                name={name}
                value={formik.values[name as keyof typeof formik.values]}
                onChange={formik.handleChange}
                className={`w-full rounded-md border bg-gray p-3 focus:outline-blue-500 ${
                  !isAdmin &&
                  [
                    'employee_id',
                    'company_name',

                    'doj',
                    'designation',
                    'department',
                  ].includes(name)
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-50'
                }`}
                disabled={
                  !isAdmin &&
                  [
                    'employee_id',
                    'company_name',

                    'doj',
                    'designation',
                    'department',
                  ].includes(name)
                }
              />
              {formik.errors[name as keyof typeof formik.errors] && (
                <p className="text-sm text-red">
                  {formik.errors[
                    name as keyof typeof formik.errors
                  ]?.toString()}
                </p>
              )}
            </div>
          ))}
          {/* Role Type Field */}
          <div>
            <label className="text-gray-700 block">Role Type</label>
            {isAdmin ? (
              <select
                name="roletype"
                value={formik.values.roletype || ''}
                onChange={formik.handleChange}
                className="w-full rounded-md border bg-gray p-3 focus:outline-blue-500"
              >
                <option value="">Select Role Type</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </select>
            ) : (
              <p className="text-gray-500 w-full cursor-not-allowed rounded-md border bg-gray p-3.5">
                {formik.values.roletype || 'N/A'}
              </p>
            )}
          </div>

          {/* Employee Type Field */}
          <div>
            <label className="text-gray-700 block">Employee Type</label>
            {isAdmin ? (
              <select
                name="employee_type"
                value={formik.values.employee_type || ''}
                onChange={formik.handleChange}
                className="w-full rounded-md border bg-gray p-3 focus:outline-blue-500"
              >
                <option value="">Select Employee Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
              </select>
            ) : (
              <p className="text-gray-500 w-full cursor-not-allowed rounded-md border bg-gray p-3.5">
                {formik.values.employee_type || 'N/A'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-lg bg-[#D3D3D3] px-7 py-3 transition  hover:bg-red hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-8 py-3 text-white transition hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
