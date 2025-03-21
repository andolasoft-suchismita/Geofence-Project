import { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanyData } from '../redux/slices/companySlice';
import {
  getCompanyDetails,
  updateCompany,
} from '../api/services/companyService';
import { RootState } from '../redux/store';
import { showToast } from '../utils/toast';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from "react-select";

// Custom Marker Icon

const customIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Map Click Handler
const LocationMarker = ({
  position,
  setPosition,
}: {
  position: { lat: number; lng: number };
  setPosition: (pos: { lat: number; lng: number }) => void;
}) => {
  const map = useMap();

  useEffect(() => {
    if (position) map.setView([position.lat, position.lng], 12);
  }, [position, map]);

  useMapEvents({
    click(e) {
      const newPosition = { lat: e.latlng.lat, lng: e.latlng.lng };
      setPosition(newPosition);

      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newPosition.lat}&lon=${newPosition.lng}`
      )
        .then((res) => res.json())
        .then((data) => setPosition(newPosition))
        .catch(() => alert('Failed to get address'));
    },
  });

  return position ? (
    <Marker 
      position={[position.lat, position.lng]} 
      icon={customIcon} 
      draggable={true} 
    />
  ) : null;
};// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required('Company Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  zip_code: Yup.string().required('Zip Code is required'),
  website: Yup.string().url('Invalid URL').required('Website is required'),                                                                         
    working_hours: Yup.number()
      .min(1, 'Working hours must be at least 1 hour')
      .max(24, 'Working hours cannot exceed 24 hours')
      .required('Working hours are required'),
  
    holidays: Yup.array()
      .of(Yup.string().oneOf(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]))
      .min(1, 'At least one holiday must be selected')
      .required('Holidays are required'),
  });


const holidayOptions = [
  { value: "Sunday", label: "Sunday" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
];

const CompanySettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const company_id = useSelector(
    (state: RootState) => state.authSlice.company_id
  );
  const company = useSelector((state: RootState) => state.company);

  const [loading, setLoading] = useState(true);

  const [logo, setLogo] = useState<string | null>(null);
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 28.6139,
    lng: 77.209,
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string); // Store Base64 string
      };
      reader.readAsDataURL(file);
    }
  };


  useEffect(() => {
    const fetchCompany = async () => {
      if (company_id) {
        try {
          const data = await getCompanyDetails(company_id);
          dispatch(setCompanyData(data));
        } catch (error) {
          console.error('Error fetching company data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCompany();
  }, [company_id, dispatch]);

  // const handleUpdateCompany = async (values: any, { setSubmitting }: any) => {
  //   if (!company_id) {
  //     showToast('No company selected!');
  //     return;
  //   }

  //   try {
  //     console.log('Submitting data:', values); // Debugging
  //     await validationSchema.validate(values); //  Explicit validation check

  //     const updatedCompany = await updateCompany(company_id, values);
  //     dispatch(setCompanyData(updatedCompany));
  //     showToast('Company updated successfully!');
  //     setSubmitting(false);
  //   } catch (error) {
  //     console.error('Validation/API Error:', error);
  //     showToast(error.message || 'Failed to update company details.');
  //     setSubmitting(false);
  //   }
  // };
  
  const handleUpdateCompany = async (values: any, { setSubmitting }: any) => {
    if (!company_id) {
      showToast('No company selected!');
      return;
    }

    try {
      await validationSchema.validate(values);

       const payload = {
      ...values,
      holidays: Array.isArray(values.holidays) ? values.holidays : [values.holidays], // Convert to array if needed
      logo: logo || company.logo, // Keep existing logo if not updated
    };

    console.log("Sending Data:", payload); // Debugging
    
    const updatedCompany = await updateCompany(company_id, payload);

      // const updatedCompany = await updateCompany(company_id, {
      //   ...values,
      //   logo: logo || company.logo, // Include logo (keep old one if not changed)
      // });

      dispatch(setCompanyData(updatedCompany));
      showToast('Company updated successfully!');
      setSubmitting(false);
    } catch (error) {
      console.error('Validation/API Error:', error);
      showToast(error.message || 'Failed to update company details.');
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto w-full max-w-6xl rounded-lg bg-white p-8 shadow-lg">
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
        </div>
      ) : (
        <Formik
          initialValues={{
            name: company?.name || '',
            email: company?.email || '',
            phone: company?.phone || '',
            address: company?.address || '',
            country: company?.country || '',
            state: company?.state || '',
            city: company?.city || '',
            zip_code: company?.zip_code || '',
            website: company?.website || '',
            working_hours: "",
            holidays: [], 
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdateCompany}
          enableReinitialize={true} // Ensure data updates correctly
        >
          {({ isSubmitting }) => (
            <Form>
              <h2 className="text-gray-800 text-2xl font-bold">
                Company Settings
              </h2>
              <div className="mb-8 flex items-center justify-between">
                <div className="w-2/3">
                  <label className="text-gray-700 block text-base  font-semibold">
                    Company Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Your Comapany Name"
                    className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-sm text-red"
                  />
                </div>

                <div className="flex w-1/3 justify-end">
                  <label
                    htmlFor="logo-upload"
                    className="relative cursor-pointer"
                  >
                    <div className="border-gray-300 bg-gray-100 relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border">
                      {logo ? (
                        <img
                          src={logo}
                          alt="Company Logo"
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <img
                          src="https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg"
                          title="Upload Company Logo Here"
                          alt="Company Logo"
                          className="h-full w-full"
                        />
                      )}
                    </div>
                  </label>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </div>
              </div>

              <div className="mb-8 grid grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-700 block text-base font-semibold">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                    placeholder="Your Company Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-red"
                  />
                </div>
                <div>
                  <label className="text-gray-700 block text-base font-semibold">
                    Contact
                  </label>
                  <Field
                    name="phone"
                    placeholder="Enter Your Phone No."
                    className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-sm text-red"
                  />
                </div>
              </div>
              
              <div  className="mb-8">
                <label className="text-gray-700 block text-base font-semibold">
                  Website
                </label>
                <Field
                  name="website"
                  placeholder="Enter Your Comapany Website"
                  className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                />
                <ErrorMessage
                  name="website"
                  component="div"
                  className="text-sm text-red"
                />

              </div>
              <div className="mb-8">
          <label className="text-gray-700 block text-base font-semibold">
                  Address
                </label>
                <Field
                  name="address"
                  placeholder="Enter your Company Address...."
                  className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-sm text-red"
                />
              </div>

              <div className="mb-8 grid grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-700 block text-base font-semibold">
                    Country
                  </label>
                  <Field
                    name="country"
                    placeholder="Ex-India"
                    className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-sm text-red"
                  />
                </div>
                <div>
                  <label className="text-gray-700 block text-base font-semibold">
                    State
                  </label>
                  <Field
                    name="state"
                    placeholder="Ex-Odisha"
                    className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-sm text-red"
                  />
                </div>
                <div>
                  <label className="text-gray-700 block text-base font-semibold">
                    City
                  </label>
                  <Field
                    name="city"
                    placeholder="Ex-Bhubaneswar"
                    className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-sm text-red"
                  />
                </div>

                <div>
  <label className="text-gray-700 block text-base font-semibold">
    Working Hours
  </label>
  <Field
    type="number"
    name="working_hours"
    placeholder="Enter working hours per day"
    className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
  />
  <ErrorMessage
    name="working_hours"
    component="div"
    className="text-sm text-red"
  />
</div>
   
  <div>
  <label className=" block text-base font-semibold">
    Select Holidays
  </label>
  <Field name="holidays">
    {({ field, form }: any) => (
      <div className="w-full">
        <Select
          isMulti
          options={holidayOptions}
          value={holidayOptions.filter((option) =>
            field.value.includes(option.value)
          )}
          onChange={(selectedOptions) => {
            form.setFieldValue(
              "holidays",
              selectedOptions.map((option) => option.value)
            );
          }}
          className="w-full"
          styles={{
            control: (base) => ({
              ...base,
              border: "1px solid ", // Match border-gray-300
              borderRadius: "0.4rem", // Match rounded-lg
              padding: "0.4rem", // Match p-3
              fontSize: "1rem", // Match text size
              width: "100%", // Ensure full width
            }),
          }}
        />
      </div>
    )}
  </Field>
  <ErrorMessage
    name="holidays"
    component="div"
    className="text-sm text-red"
  />
</div>      

       

                <div>
                  <label className="text-gray-700 block text-base text-base font-semibold">
                    Zip Code
                  </label>
                  <Field
                    name="zip_code"
                    placeholder="Ex-751010"
                    className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="zip_code"
                    component="div"
                    className="text-sm text-red"
                  />
                </div>
              </div>
              {/* <MapContainer
                center={position}
                zoom={12}
                style={{ height: '250px', width: '100%' }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker position={position} setPosition={setPosition} />
              </MapContainer> */}

              <div className="mt-4 flex justify-end gap-4">
                <button
                  type="button"
                  className="rounded-lg bg-red px-6 py-3 text-white hover:bg-[#FF0000]"
                  onClick={() => navigate(-1)} // Navigate back to the previous page
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default CompanySettings;
