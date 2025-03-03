import axios from "axios";

const BASE_URL = "http://192.168.2.31:9009/companyapi/company";

// ✅ Function to fetch company details
export const getCompanyDetails = async (companyId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${companyId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching company details:", error);
    throw error;
  }
};


// import axios from "axios";

// export const getCompanyDetails = async () => {
//   try {
//     const token = localStorage.getItem("authToken"); // Retrieve the token

//     const response = await axios.get("http://localhost:8000/api/company-details", {
//       headers: {
//         Authorization: `Bearer ${token}`, // Include the token
//         "Content-Type": "application/json",
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching company details:", error);
//     throw error;
//   }
// };

