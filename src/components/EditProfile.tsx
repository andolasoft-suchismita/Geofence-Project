import { useFormik } from "formik";
import * as Yup from "yup";

interface EditProfileProps {
  editData: any;
  setEditData: React.Dispatch<React.SetStateAction<any>>;
  handleSave: (values: any) => void;
  handleCancel: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  editData,
  handleSave,
  handleCancel,
}) => {
  const formik = useFormik({
    initialValues: {
      first_name: editData?.first_name || "",
      last_name: editData?.last_name || "",
      phone_number: editData?.phone_number || "",
      email: editData?.email || "",
      dob: editData?.dob || "",
      address: editData?.address || "",
      gender: editData?.gender || "",
      blood_group: editData?.blood_group || "",
      marital_status: editData?.marital_status || "",
      emergency_contact: editData?.emergency_contact || "",
      employee_id: editData?.employee_id || "",
      company_name: editData?.company_name || "",
      designation: editData?.designation || "",
      department: editData?.department || "",
      roletype: editData?.roletype || "",
      employee_type: editData?.employee_type || "",
      doj: editData?.doj || "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First Name is required"),
      last_name: Yup.string().required("Last Name is required"),
      phone_number: Yup.string()
        .matches(/^\d{10}$/, "Invalid phone number")
        .required("Phone number is required"),
      dob: Yup.string().required("Date of Birth is required"),
      gender: Yup.string().required("Gender is required"),
      address: Yup.string().required("Address is required"),
      blood_group: Yup.string().required("Blood Group is required"),
      marital_status: Yup.string().required("Marital Status is required"),
      emergency_contact: Yup.string()
        .matches(/^\d{10}$/, "Invalid emergency contact number")
        .required("Emergency Contact is required"),
      company_name: Yup.string().required("Company Name is required"),
      department: Yup.string().required("Department is required"),
    }),
    onSubmit: (values) => {
      handleSave(values);
    },
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Personal Details Section */}
      <div>
        <h4 className="text-lg font-bold text-gray-700 mb-4">
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
                  value={formik.values[name as keyof typeof formik.values]}
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
                  value={formik.values[name as keyof typeof formik.values]}
                  onChange={formik.handleChange}
                  className={`w-full p-3 border rounded-md ${
                    name === "email" ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-gray-50"
                  }`}
                  disabled={name === "email"}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Job Details Section */}
      <div>
        <h4 className="text-lg font-bold text-gray-700 mb-4">Job Details</h4>
        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
          {[
            ["employee_id", "Employee ID"],
            ["company_name", "Company Name"],
            ["designation", "Designation"],
            ["department", "Department"],
            ["roletype", "Role Type"],
            ["employee_type", "Employee Type"],
            ["doj", "Date of Joining"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block text-gray-700">{label}</label>
              <input
                type={name === "doj" ? "date" : "text"}
                name={name}
                value={formik.values[name as keyof typeof formik.values]}
                onChange={formik.handleChange}
                className={`w-full p-3 border rounded-md ${
                  ["employee_id", "roletype", "employee_type", "doj"].includes(name)
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-gray-50"
                }`}
                disabled={["employee_id", "roletype", "employee_type", "doj"].includes(name)}
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
          className="px-7 py-3 bg-red text-white rounded-lg hover:bg-red-600 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
