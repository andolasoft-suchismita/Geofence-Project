import { useState } from "react";
import moment from "moment";

const HolidayModal = ({ setIsOpen, addEvent }) => {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    type: "",
    description: "",
    durationType: "Full Day", // Default selection
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.startDate || !formData.type) return;

    let holidays = [];

    // Check if durationType is Multiple Days
    if (formData.durationType === "Multiple Days") {
      if (!formData.endDate || formData.endDate < formData.startDate) {
        alert("Please select a valid end date.");
        return;
      }

      let currentDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      while (currentDate <= endDate) {
        holidays.push({
          company_id: 23, // Replace this with the actual company ID
          holiday_name: formData.name,
          holiday_date: moment(currentDate).format("YYYY-MM-DD"), // Holiday date (single day)
          start_date: moment(currentDate).format("YYYY-MM-DD"),
          end_date: moment(currentDate).format("YYYY-MM-DD"),
          status: "Active", // Assuming 'Active' status, adjust as needed
          holiday_type: formData.type,
          description: formData.description,
          is_recurring: false, // Adjust based on your logic
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else {
      holidays.push({
        company_id: 23, // Replace this with the actual company ID
        holiday_name: formData.name,
        holiday_date: moment(formData.startDate).format("YYYY-MM-DD"),
        start_date: moment(formData.startDate).format("YYYY-MM-DD"),
        end_date: moment(formData.startDate).format("YYYY-MM-DD"),
        status: "Active", // Assuming 'Active' status, adjust as needed
        holiday_type: formData.type,
        description: formData.description,
        is_recurring: false, // Adjust based on your logic
      });
    }

    // Call API to create the holiday
    try {
      const response = await fetch('http://192.168.2.31:9009/companyholidays/company-holidays/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(holidays[0]), // Send the first holiday (if multiple, send them all)
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Something went wrong'}`);
      } else {
        alert('Holiday created successfully');
        addEvent(holidays); // Update the calendar with new holiday
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error creating holiday:', error);
      alert('Error creating holiday. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
      <div className="relative w-full max-w-lg bg-white p-6 rounded-lg shadow-lg z-[1001]">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Create Holiday</h2>

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
        >
          ✖
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Holiday Name*/}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Holiday Name</label>
            <input
              type="text"
              name="name"
              placeholder="Add Holiday"
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          {/* Holiday Type & Duration */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium">Holiday Type</label>
              <select
                name="type"
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              >
                <option value="">Select Type</option>
                <option value="Public">Public</option>
                <option value="National">National</option>
                <option value="Religious">Religious</option>
                <option value="Company-specific">Company-specific</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Duration</label>
              <select
                name="durationType"
                value={formData.durationType}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              >
                <option value="Full Day">Full Day</option>
                <option value="Half Day">Half Day</option>
                <option value="Multiple Days">Multiple Days</option>
              </select>
            </div>
          </div>

          {/* Start Date & End Date*/}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium">Start Date</label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">End Date</label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
                disabled={formData.durationType !== "Multiple Days"}
              />
            </div>
          </div>

          {/* Description*/}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Add Description</label>
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-500 border px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HolidayModal;
