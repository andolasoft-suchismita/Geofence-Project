// const BASE_URL = "http://192.168.2.31:9009/companyholidays/company-holidays";
// const COMPANY_ID = 23; 

// // Fetch holidays
// export const fetchHolidays = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/company/${COMPANY_ID}`);

//     if (!response.ok) {
//       throw new Error(`Failed to fetch holidays: ${response.status}`);
//     }

//     const data = await response.json();

//     return data.map((holiday: any) => ({
//       id: holiday.id,
//       title: holiday.holiday_name,
//       start: new Date(holiday.holiday_date),
//       end: new Date(holiday.holiday_date),
//       allDay: true,
//       type: "holiday",
//     }));
//   } catch (error) {
//     console.error("Error fetching holidays:", error);
//     throw error;
//   }
// };


const BASE_URL = "http://192.168.2.31:9009/companyholidays/company-holidays";
const COMPANY_ID = 23;

// Fetch holidays
export const fetchHolidays = async () => {
  try {
    const response = await fetch(`${BASE_URL}/company/${COMPANY_ID}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch holidays: ${response.status}`);
    }

    const data = await response.json();

    return data.map((holiday: any) => ({
      id: holiday.id,
      title: holiday.holiday_name,
      start: new Date(holiday.holiday_date),
      end: new Date(holiday.holiday_date),
      allDay: true,
      type: "holiday",
    }));
  } catch (error) {
    console.error("Error fetching holidays:", error);
    throw error;
  }
};

// Create a holiday
export const createHoliday = async (holidayData: any) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(holidayData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error creating holiday");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating holiday:", error);
    throw error;
  }
};

// Update a holiday
export const updateHoliday = async (holidayId: number, holidayData: any) => {
  try {
    const response = await fetch(`${BASE_URL}/${holidayId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(holidayData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error updating holiday");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating holiday:", error);
    throw error;
  }
};

// Delete a holiday
export const deleteHoliday = async (holidayId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/${holidayId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error deleting holiday: ${response.status}`);
    }

    return true; // Success
  } catch (error) {
    console.error("Error deleting holiday:", error);
    throw error;
  }
};
