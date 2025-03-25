import { useState } from "react";

const EventModal = ({ setIsOpen, addEvent }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    type: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.date || !formData.type) return;

    setLoading(true);
    setError("");

    const eventData = {
      company_id: 23, // Adjust if dynamic
      event_name: formData.name,
      event_date: formData.date,
      event_time: `${formData.time}:00.000Z`, // Ensuring correct format
      event_type: formData.type,
      description: formData.description,
    };

    try {
      const response = await fetch(
        "http://192.168.2.31:9009/companyevent/company-events/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const newEvent = {
        id: Date.now(),
        title: formData.name,
        start: new Date(`${formData.date}T${formData.time}`),
        type: "event",
        description: formData.description,
      };

      addEvent(newEvent);
      setIsOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
      <div className="relative w-full max-w-lg bg-white p-6 rounded-lg shadow-lg z-[1001]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Create Event</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-gray-900 text-xl"
          >
            ✖
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Event Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Event Name"
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium">Event Date</label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Event Time</label>
            <input
              type="time"
              name="time"
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Event Type</label>
          <input
            type="text"
            name="type"
            placeholder="Enter Event Type"
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Enter Description"
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="mt-2 text-gray-500 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EventModal;
