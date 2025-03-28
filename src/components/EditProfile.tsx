
import { useFormik } from 'formik';
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
      doj: editData?.doj || '',

    },
    validationSchema: Yup.object({
      first_name: Yup.string().trim().required("First Name is required"),
      last_name: Yup.string().trim().required("Last Name is required"),
      phone_number: Yup.string()

        .trim()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
      dob: Yup.string().trim().required("Date of Birth is required"),
      gender: Yup.string().trim().required("Gender is required"),
      address: Yup.string().trim().required("Address is required"),
      blood_group: Yup.string().trim().required("Blood Group is required"),
      marital_status: Yup.string().trim().required("Marital Status is required"),
      emergency_contact: Yup.string()
        .trim()
        .matches(/^\d{10}$/, "Emergency contact must be exactly 10 digits")
        .required("Emergency Contact is required"),
      department: Yup.string().trim().required("Department is required"),
    }),
    onSubmit: (values) => {
      console.log("Submitted Values:", values); 
      handleSave(values);
    },
    enableReinitialize: true,
    validateOnChange: true, // Ensures validation runs on every change
    validateOnBlur: true,   // Ensures validation runs on blur
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
              ["first_name", "First Name"],
              ["last_name", "Last Name"],
              ["phone_number", "Phone Number"],
              ["email", "Email"],
              ["dob", "Date of Birth"],
              ["gender", "Gender"],
              ["blood_group", "Blood Group"],
              ["marital_status", "Marital Status"],
              ["address", "Address"],
              ["emergency_contact", "Emergency Contact"],
            ].map(([name, label]) => (
              <div key={name}>
                <label className="block text-gray-700">{label}</label>
                {name === "gender" || name === "marital_status" ? (
                  <select
                    name={name}
                    value={formik.values[name as keyof typeof formik.values] || ""}
                    onChange={formik.handleChange}
                    className="w-full p-3 border rounded-md bg-gray-50"
                  >
                    <option value="">Select {label}</option>
                    {name === "gender" && (
                      <>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </>
                    )}
                    {name === "marital_status" && (
                      <>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                      </>
                    )}
                  </select>
                ) : (
                  <input
                    type={name === "dob" ? "date" : "text"}
                    name={name}
                    value={formik.values[name as keyof typeof formik.values] || ""}
                    onChange={formik.handleChange}
                    onKeyPress={(e) => {
                      if (
                        (name === "phone_number" || name === "emergency_contact") &&
                        !/[0-9]/.test(e.key)
                      ) {
                        e.preventDefault(); // Block non-numeric input
                      }
                    }}
                    maxLength={
                      name === "phone_number" || name === "emergency_contact" ? 10 : undefined
                    }
                    className={`w-full p-3 border rounded-md ${
                      name === "email"
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "bg-gray-50"
                    }`}
                    disabled={name === "email"}
                  />
                )}
                {formik.errors[name as keyof typeof formik.errors] && (
                  <p className="text-red text-sm">
                    {formik.errors[name as keyof typeof formik.errors]?.toString()}
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
            ['roletype', 'Role Type'],
            ['employee_type', 'Employee Type'],
            ['doj', 'Date of Joining'],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="text-gray-700 block">{label}</label>
              <input
                type={name === 'doj' ? 'date' : 'text'}
                name={name}
                value={formik.values[name as keyof typeof formik.values]}
                onChange={formik.handleChange}
                className={`w-full p-3 border rounded-md ${
                  ["employee_id", "company_name","roletype", "employee_type", "doj"].includes(name)
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-gray-50"
                }`}
                disabled={["employee_id", "company_name","roletype", "employee_type", "doj"].includes(name)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleCancel}
          className="hover:bg-red-600 rounded-lg bg-red px-7 py-3 text-white transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-7 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Save

        </button>
      </div>
    </form>
  );
};

export default EditProfile;


