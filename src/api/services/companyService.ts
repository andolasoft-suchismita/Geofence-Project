import axios from "axios";
import API from "../axiosInstance";

export const getCompanyDetails = async (companyId: number) => {
  try {
    const response = await API.get(`/companyapi/company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching company data:', error);
    throw error;
  }
};

// Update company location
export const updateCompanyLocationAPI = async (companyId: number, latitude: number, longitude: number) => {
  try {
    const response = await API.put(`/companyapi/company/${companyId}/update`, {
      latitude,
      longitude,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating company location:", error);
    throw error;
  }
};
//Add Update API
export const updateCompany = async (companyId: number, updatedData: any) => {
  try {
    const response = await API.put(
      `/companyapi/company/${companyId}/update`,
      updatedData
    );
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating company:', error);
    throw error;
  }
};
