const BASE_URL = "http://192.168.2.31:9009/companyholidays/company-holidays";
const COMPANY_ID = 23; // Hardcoded for now

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

// Create a new holiday
// export const createHoliday = async (holidayData: { holiday_name: string; holiday_date: string }) => {
//   try {
//     const response = await fetch(`${BASE_URL}/company/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(holidayData),
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to create holiday: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error creating holiday:", error);
//     throw error;
//   }
// };



