import { useFormik } from "formik";
import * as Yup from "yup";

// 🔹 Enums for Dropdown Options
// enum GenderEnum {
//   Male = "Male",
//   Female = "Female",
//   Other = "Other",
// }

// enum RoleTypeEnum {
//   Admin = "Admin",
//   Employee = "Employee",
// }

// enum EmployeeTypeEnum {
//   FullTime = "Full-time",
//   PartTime = "Part-time",
//   Contract = "Contract",
//   Intern = "Intern",
// }

// enum DesignationEnum {
//   CEO = "ceo",
//   CTO = "cto",
//   CFO = "cfo",
//   COO = "coo",
//   CMO = "cmo",
//   MANAGER = "manager",
//   TEAM_LEAD = "team_lead",
//   SENIOR_ENGINEER = "senior_engineer",
//   SOFTWARE_ENGINEER = "software_engineer",
//   JUNIOR_ENGINEER = "junior_engineer",
//   HR_MANAGER = "hr_manager",
//   RECRUITER = "recruiter",
//   SALES_MANAGER = "sales_manager",
//   MARKETING_MANAGER = "marketing_manager",
//   INTERN = "intern",
// }


const EditProfile = ({ editData, handleSave, handleCancel }) => {
  const formik = useFormik({
    initialValues: {
      firstName: editData.firstName || "",
      lastName: editData.lastName || "",
      dob: editData.dob || "",
      phone: editData.phone || "",
      email: editData.email || "",
      gender: editData.gender || "",
      address: editData.address || "",
      emergencyContact: editData.emergencyContact || "",
      bloodGroup: editData.bloodGroup || "",
      maritalStatus: editData.maritalStatus || "",
      employeeId: editData.employeeId || "",
      companyName: editData.companyName || "",
      designation: editData.designation || "",
      roleType: editData.roleType || "",
      employeetype: editData.employeetype || "",
      department: editData.department || "",
      dateOfJoining: editData.dateOfJoining || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      dob: Yup.string().required("Date of Birth is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      gender: Yup.string().required("Gender is required"),
      address: Yup.string().required("Address is required"),
      emergencyContact: Yup.string().matches(
        /^[0-9]{10}$/,
        "Emergency Contact must be 10 digits"
      ),
      employeeId: Yup.string().required("Employee ID is required"),
      companyName: Yup.string().required("Company Name is required"),
      designation: Yup.string().required("Designation is required"),
      roleType: Yup.string().required("Role Type is required"),
      employeetype: Yup.string().required("Employee Type is required"),
      department: Yup.string().required("Department is required"),
      dateOfJoining: Yup.string().required("Date of Joining is required"),
    }),
    onSubmit: (values) => {
      handleSave(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Personal Details */}
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Personal Details</h3>
      <div className="grid grid-cols-2 gap-x-12 gap-y-10 mb-10">
        {Object.entries({
          firstName: "First Name",
          lastName: "Last Name",
          phone: "Phone",
          email: "Email",
          dob: "Date of Birth",
          gender: "Gender",
          bloodGroup: "Blood Group",
          maritalStatus: "Marital Status",
          address: "Address",
          emergencyContact: "Emergency Contact",
        }).map(([key, label]) => (
          <div key={key}>
            <strong className="text-lg text-gray-600">{label}</strong>
            <input
              type={key === "dob" ? "date" : "text"}
              name={key}
              value={formik.values[key]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border rounded-md mt-2 bg-gray-50 text-lg"
              placeholder={label}
            />
            {formik.touched[key] && formik.errors[key] && (
              <p className="text-red-500 text-sm">{formik.errors[key]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Job Details */}
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Job Details</h3>
      <div className="grid grid-cols-2 gap-x-10 gap-y-10">
        {Object.entries({
          employeeId: "Employee ID",
          companyName: "Company Name",
          designation: "Designation",
          roleType: "Role Type",
          employeetype: "Employee Type",
          department: "Department",
          dateOfJoining: "Date of Joining",
        }).map(([key, label]) => (
          <div key={key}>
            <strong className="text-lg text-gray-600">{label}</strong>
            <input
              type="text"
              name={key}
              value={formik.values[key]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border rounded-md mt-2 bg-gray-50 text-lg"
              placeholder={label}
            />
            {formik.touched[key] && formik.errors[key] && (
              <p className="text-red-500 text-sm">{formik.errors[key]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Save Changes & Cancel Buttons */}
      <div className="flex justify-end space-x-3 mt-6">
         <button
          type="button"
          className="px-9 py-3 bg-red text-white rounded-lg text-lg font-semibold hover:bg-gray-500 transition"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-2 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
