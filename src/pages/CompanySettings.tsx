import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet-control-geocoder';
import L from "leaflet";
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanyData } from '../redux/slices/companySlice';
import {
  getCompanyDetails,
  updateCompany,
} from '../api/services/companyService';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationDialog from '../components/ConfirmationDialog';
import Loader from '../components/Loader';
import Button from '../components/Button';

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string()

    .matches(
      /^[A-Za-z0-9\s&.,'-]+$/,
      "Company name can only contain letters, numbers, spaces, and common symbols (&, ., -, ')"
    )
    .min(2, 'Company name must be at least 2 characters')
    .required('Company name is required')
    .max(100, 'Company name cannot exceed 100 characters'),

  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  zip_code: Yup.string()
    .required('Zip Code is required')
    .matches(/^\d{6}$/, 'Zip Code must be exactly 6 digits'),
  website: Yup.string().url('Invalid URL').required('Website is required'),
  working_hours: Yup.number()
    .min(1, 'Working hours must be at least 1 hour')
    .max(12, 'Working hours cannot exceed 12 hours')
    .required('Working hours are required'),

  holidays: Yup.array()
    .of(
      Yup.string().oneOf([
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ])
    )
    .min(1, 'At least one holiday must be selected')
    .required('Holidays are required'),
});

const holidayOptions = [
  { value: 'Sunday', label: 'Sunday' },
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
];


const GeocoderControl = ({ setFieldValue }: { setFieldValue: Function }) => {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on('markgeocode', function (e: any) {
        const latlng = e.geocode.center;
        L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
        map.setView(latlng, 13);

        // Update Formik fields with selected location
        setFieldValue('latitude', latlng.lat);
        setFieldValue('longitude', latlng.lng);
      })
      .addTo(map);

    return () => {
      map.removeControl(geocoder);
    };
  }, [map, setFieldValue]);

  return null;
};
const getCoordinates = async () => {
  return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: parseFloat(position.coords.latitude.toFixed(6)), // Round to 6 decimals
          lng: parseFloat(position.coords.longitude.toFixed(6)),
        });
      },
      () => {
        alert('⚠️ Failed to get location. Please enable GPS and try again.');
        reject({ lat: 0, lng: 0 });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // High accuracy mode
    );
  });
};



const CompanySettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const company_id = useSelector(
    (state: RootState) => state.authSlice.company_id
  );
  const company = useSelector((state: RootState) => state.company);

  const [loading, setLoading] = useState(true);

  const [logo, setLogo] = useState<string | null>(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string); // Store Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = async () => {
    try {
      if (!company_id) {
        toast.error('No company selected!');
        return;
      }

      const updatedCompany = await updateCompany(company_id, {
        ...company,
        logo: null
      });

      dispatch(setCompanyData(updatedCompany));
      setLogo(null);
      toast.success('Company logo removed successfully!');
      setShowConfirmationDialog(false);
    } catch (error) {
      console.error('Error removing logo:', error);
      toast.error('Failed to remove company logo');
    }
  };

  
  useEffect(() => {
    const fetchCompany = async () => {
      if (company_id) {
        try {
          const data = await getCompanyDetails(company_id);
          dispatch(setCompanyData(data));
          if (data.logo) {
            setLogo(data.logo); // Set logo from API
          }
        } catch (error) {
          // console.error('Error fetching company data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCompany();
  }, [company_id, dispatch]);

  const handleUpdateCompany = async (values: any, { setSubmitting }: any) => {
    if (!company_id) {
      toast.error('No company selected!');
      return;
    }

    try {
      await validationSchema.validate(values);
      const coordinates = await getCoordinates();
      const payload = {
        ...values,
        latitude: String(coordinates.lat),
        longitude: String(coordinates.lng),
        week_off: Array.isArray(values.holidays)
          ? values.holidays.join(',')
          : '',
        logo: logo || company.logo,
      };

      // console.log('Sending Data:', payload);

      const updatedCompany = await updateCompany(company_id, payload);

      dispatch(setCompanyData(updatedCompany));
      toast.success('Company updated successfully!');
      setSubmitting(false);
    } catch (error) {
      console.error('Validation/API Error:', error);
      toast.error(error.message || 'Failed to update company details.');
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto w-full max-w-6xl rounded-lg bg-white p-8 shadow-lg">
      {loading ? (
       <Loader className=" py-70" />
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
            description: company?.description || '',
            working_hours: company?.working_hours
              ? String(company.working_hours)
              : '',
            holidays: company?.week_off ? company.week_off.split(',') : [],
            logo: company?.logo || '',
            longitude: company?.longitude || '',
            latitude: company?.latitude || '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdateCompany}
          validateOnChange={true}
          validateOnBlur={true}
          enableReinitialize={true}
          validateOnMount={true}

          // Ensure data updates correctly
        >
          {({ values, isSubmitting, setFieldValue, setFieldTouched }) => (
            <Form>
              <h2 className="text-gray-800 mb-2 text-2xl font-bold ">
                Company Settings
              </h2>

              <div className="mb-8 flex items-center justify-between">
                <div className="w-full">
                  <label className="text-gray-700 block text-base  font-semibold">
                    Company Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Your Comapany Name"
                    onChange={(e) => {
                      setFieldValue('name', e.target.value);
                      setFieldTouched('name', true, false); // Forces validation on change
                    }}
                    className="border-gray-100 w-full rounded-lg border bg-gray p-3 focus:outline-blue-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-sm text-red"
                  />
                </div>
                {/* Company logo */}
                <div className="relative flex w-1/3 justify-end">
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <div className="group relative flex h-24 w-24 items-center justify-center">
                      {logo ? (
                        <>
                          <img
                            src={logo}
                            alt="Company Logo"
                            title="Click here to Upload Logo"
                            className="h-full w-full object-contain"
                          />
                          <div 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setShowConfirmationDialog(true);
                            }}
                            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 cursor-pointer"
                          >
                            <span className="text-white font-medium">Remove</span>
                          </div>
                        </>
                      ) : (
                        <img
                          src="https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg"
                          title="Upload Company Logo Here"
                          alt="Company Logo"
                          className="h-full w-full object-contain"
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
                    onChange={(e) => {
                      setFieldValue('email', e.target.value);
                      setFieldTouched('email', true, false); // Forces validation on change
                    }}
                    className="border-gray-300 w-full rounded-lg border bg-gray p-3 focus:outline-blue-500"
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
                    className="border-gray-300 w-full rounded-lg border bg-gray p-3 focus:outline-blue-500"
                    onChange={(e) => {
                      setFieldValue('phone', e.target.value);
                      setFieldTouched('phone', true, false); // Forces validation on change
                    }}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-sm text-red"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="text-gray-700 block text-base font-semibold">
                  Website
                </label>
                <Field
                  name="website"
                  placeholder="Enter Your Comapany Website"
                  className="border-gray-300 w-full rounded-lg border bg-gray p-3 focus:outline-blue-500"
                  onChange={(e) => {
                    setFieldValue('website', e.target.value);
                    setFieldTouched('website', true, false); // Forces validation on change
                  }}
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
                  as="textarea"
                  name="address"
                  placeholder="Enter your Company Address...."
                  className="border-gray-300 w-full rounded-lg border bg-gray p-3 focus:outline-blue-500"
                  onChange={(e) => {
                    setFieldValue('address', e.target.value);
                    setFieldTouched('address', true, false);
                  }}
                />
                
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-sm text-red"
                />
              </div>

              <div className="mb-8 grid grid-cols-2 gap-6">
                <div>
                  <div className="relative">
                    <label className="text-gray-700 block text-base font-semibold">
                      Country
                    </label>
                    <CountryDropdown
                      name="country"
                      value={values.country || ''}
                      onChange={(val) => {
                        setFieldValue('country', val);
                        setFieldTouched('country', true, false);
                      }}
                      className="border-gray-300  w-full appearance-none rounded rounded-lg  border bg-gray p-3 focus:outline-blue-500"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-3 mt-6 flex items-center">
                      ▼
                    </span>
                  </div>
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
                  <div className="relative">
                    <RegionDropdown
                      name="state"
                      country={values.country ?? ''}
                      value={values.state || ''}
                      onChange={(val) => setFieldValue('state', val)}
                      className="border-gray-300  w-full appearance-none rounded rounded-lg  border bg-gray p-3 focus:outline-blue-500"
                    />
                    <span className="text-gray-500 pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      ▼
                    </span>
                  </div>
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
                    className="border-gray-300 w-full rounded-lg border bg-gray p-3 focus:outline-blue-500"
                    onChange={(e) => {
                      setFieldValue('city', e.target.value);
                      setFieldTouched('city', true, false); // Forces validation on change
                    }}
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
                    className="border-gray-300 w-full rounded-lg border bg-gray p-3 focus:outline-blue-500"
                    onChange={(e) => {
                      setFieldValue('working_hours', e.target.value);
                      setFieldTouched('working_hours', true, false); // Forces validation on change
                    }}
                  />
                  <ErrorMessage
                    name="working_hours"
                    component="div"
                    className="text-sm text-red"
                  />
                </div>

                <div>
                  <label className=" block text-base font-semibold">
                    Week Off
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
                              'holidays',
                              selectedOptions.map((option) => option.value),
                              setFieldTouched('holidays', true, false)
                            );
                          }}
                          className="w-full"
                          styles={{
                            control: (base) => ({
                              ...base,
                              border: '1px solid ', // Match border-gray-300
                              borderRadius: '0.4rem', // Match rounded-lg
                              padding: '0.3rem', // Match p-3
                              fontSize: '1rem', // Match text size
                              width: '100%', // Ensure full width
                              backgroundColor: '#f3f4f6',
                            }),
                            menuList: (base) => ({
                              ...base,
                              maxHeight: '150px', // Set max height for scrollbar
                              overflowY: 'auto', // Enable vertical scrolling
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
                    type="text"
                    placeholder="Ex-751010"
                    maxLength={6}
                    className="border-gray-300 w-full rounded-lg border bg-gray p-3 focus:outline-blue-500"
                    onKeyPress={(e) => {
                      // Allow only numbers
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      // Remove any non-numeric characters
                      const value = e.target.value.replace(/\D/g, '');
                      setFieldValue('zip_code', value);
                      setFieldTouched('zip_code', true, false);
                    }}
                  />
                  <ErrorMessage
                    name="zip_code"
                    component="div"
                    className="text-sm text-red"
                  />
                </div>
              </div>
              <div className='mb-2'>
                <label className="text-gray-700 block text-base text-base font-semibold">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Write something here about your company..."
                  className="border-gray-300 w-full rounded-lg border bg-gray p-3 focus:outline-blue-500"
                />
              </div>
              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                className="h-96 w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <GeocoderControl setFieldValue={setFieldValue} />

                <Marker
                  position={[
                    values.latitude || 20.5937,
                    values.longitude || 78.9629,
                  ]}
                  draggable={true}
                  eventHandlers={{
                    dragend: (e) => {
                      const latlng = e.target.getLatLng();
                      setFieldValue('latitude', latlng.lat);
                      setFieldValue('longitude', latlng.lng);
                    },
                    click: (e) => {
                      const latlng = e.latlng;
                      setFieldValue('latitude', latlng.lat);
                      setFieldValue('longitude', latlng.lng);
                    },
                  }}
                >
                  <Popup>Selected Location</Popup>
                </Marker>
              </MapContainer>

              <div className="mt-4 flex justify-end gap-4">
                <Button
                  title='Cancel'
                  type="button"
                  variant="cancel"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button
                  title='Save'
                  type="submit"
                  variant="save"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}

      <ConfirmationDialog
        isOpen={showConfirmationDialog}
        onClose={() => setShowConfirmationDialog(false)}
        onConfirm={handleRemoveLogo}
        title="Remove Company Logo"
        message="Are you sure you want to remove the company logo? This action cannot be undone."
      />
    </div>
  );
};

export default CompanySettings;
