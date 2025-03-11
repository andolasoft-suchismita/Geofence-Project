import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API from '../api/axiosInstance'; // Import axios instance
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { login } from '../redux/slices/authSlice';
import { showToast } from '../utils/toast';

const CompanyPopup = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const { token, user_id } = useSelector((state: RootState) => state.authSlice);

  // Validation Schema
  const validationSchema = Yup.object({
    companyName: Yup.string().required('Company Name is required'),
    companyEmail: Yup.string()
      .email('Invalid email')
      .required('Company Email is required'),
  });

  // Form Submission Handler with API Call
  const handleSubmit = async (
    values: { companyName: string; companyEmail: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await API.post(
        '/companyapi/company/create',
        {
          name: values.companyName,
          email: values.companyEmail,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newCompanyId = response.data?.id || null;

      // Update Redux store with new company_id
      dispatch(login({ token, user_id, company_id: newCompanyId }));
      showToast('Company created Successfully!')
      onClose(); // Close popup after successful creation
    } catch (error) {
      showToast('Error creating company');
      console.error('Error creating company:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 mt-15 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="relative w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">Create Your Company</h2>

        {/* Formik Form */}
        <Formik
          initialValues={{ companyName: '', companyEmail: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="text-gray-700 block text-sm font-medium">
                  Company Name*
                </label>
                <Field
                  type="text"
                  name="companyName"
                  className="mt-1 w-full rounded-md border p-2 focus:outline-blue-500"
                  placeholder="Enter company name"
                />
                <ErrorMessage
                  name="companyName"
                  component="div"
                  className="text-sm text-orange-900"
                />
              </div>

              <div className="mb-4">
                <label className="text-gray-700 block text-sm font-medium">
                  Company Email*
                </label>
                <Field
                  type="email"
                  name="companyEmail"
                  className="mt-1 w-full rounded-md border p-2 focus:outline-blue-500"
                  placeholder="Enter company email"
                />
                <ErrorMessage
                  name="companyEmail"
                  component="div"
                  className="text-sm text-orange-900"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Company'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CompanyPopup;
