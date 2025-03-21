// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CompanyState {
  
//   id: string;
//   name: string;
//   email: string;
//   contact: string;
//   address1: string;
//   address2: string;
//   country: string;
//   state: string;
//   city: string;
//   zipCode: string;
//   location: { lat: number; lng: number };
//   logo: string | null;
// }

// const initialState: CompanyState = {
//   id: "",
//   name: "",
//   email: "",
//   contact: "",
//   address1: "",
//   address2: "",
//   country: "",
//   state: "",
//   city: "",
//   zipCode: "",
//   location: { lat: 28.6139, lng: 77.209 },
//   logo: null,
// };

// const companySlice = createSlice({
//   name: "company",
//   initialState,
//   reducers: {
//     setCompanyData: (state, action: PayloadAction<CompanyState>) => {
//       return { ...state, ...action.payload }; // ✅ Ensures persistence
//     },
//   },
// });

// export const { setCompanyData } = companySlice.actions;
// export default companySlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CompanyState {
  
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  logo: string ;
  website: string;
  description: string;
  reg_no: string;
  working_hours: string;
  week_off: string;
}

const initialState: CompanyState = {
  id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  country: '',
  state: '',
  city: '',
  zip_code: '',
  latitude: 0,
  longitude: 0,
  logo: '',
  website: '',
  description: '',
  reg_no: '',
  working_hours: '',
  week_off: '',
};


const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyData: (state, action: PayloadAction<CompanyState>) => {
      return { ...state, ...action.payload }; // Ensures persistence
    },
  },
});

export const { setCompanyData } = companySlice.actions;
export default companySlice.reducer;
