export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string; // Optional field
  gender?: string;
  marital_status?: string;
  blood_group?: string;
  emergency_contact?: string;
  address?: string;
  employee_id: number;
  company_name?: string;
  designation?: string;
  roletype: string;
  employee_type?: string;
  department?: string;
  doj: string;
  dob: string;
}
