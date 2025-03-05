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

// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// ✅ Component to handle map clicks and update position
const LocationMarker = ({ position, setPosition, setLocation }: {
  position: { lat: number; lng: number };
  setPosition: (pos: { lat: number; lng: number }) => void;
  setLocation: (location: string) => void;
}) => {
  const map = useMapEvents({
    click(e) {
      const newPosition = { lat: e.latlng.lat, lng: e.latlng.lng };
      setPosition(newPosition);

      // Reverse Geocode
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newPosition.lat}&lon=${newPosition.lng}`)
        .then((res) => res.json())
        .then((data) => setLocation(data.display_name))
        .catch(() => alert("Failed to get address"));
    },
  });

  useEffect(() => {
    if (position && map) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);


  return position ? <Marker position={position} icon={customIcon} draggable /> : null;
};
// Validation Schema
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
});


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


 const handleUpdateCompany = async (values: any, { setSubmitting }: any) => {
   if (!company_id) {
     showToast('No company selected!');
     return;
   }

   try {
     console.log('Submitting data:', values); // Debugging
     await validationSchema.validate(values); //  Explicit validation check

     const updatedCompany = await updateCompany(company_id, values);
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
      {!loading && (
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
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdateCompany}
          enableReinitialize={true} // Ensure data updates correctly
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-8 flex items-center justify-between">
                <div className="w-2/3">
                  <label className="block text-lg text-black">
                    Company Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
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
                    accept=""
                    className="hidden"
                    onChange={(e) =>
                      setLogo(
                        e.target.files?.[0]
                          ? URL.createObjectURL(e.target.files[0])
                          : null
                      )
                    }
                  />
                </div>
              </div>

              <div className="mb-8 grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg text-black">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-lg text-black">Contact</label>
                  <Field
                    
                    name="phone"
                    className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-lg text-black">Website</label>
                  <Field
                  
                    name="website"
                    className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="website"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-lg text-black">Address</label>
                <Field
                  name="address"
                  className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-8 grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg text-black">Country</label>
                  <Field
                    name="country"
                    className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-lg text-black">State</label>
                  <Field
                    name="state"
                    className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-lg text-black">City</label>
                  <Field
                    name="city"
                    className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-lg text-black">Zip Code</label>
                  <Field
                    name="zip_code"
                    className="border-gray-300 w-full rounded-lg border p-3 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="zip_code"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <MapContainer
                center={position}
                zoom={12}
                style={{ height: '250px', width: '100%' }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker position={position} setPosition={setPosition} />
              </MapContainer>

              <div className="mt-4 flex justify-end gap-4">
                <button
                  type="button"
                  className="hover:bg-red-600 rounded-lg bg-orange-500 px-6 py-3 text-white"
                  onClick={() => navigate(-1)} // Navigate back to the previous page
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
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
