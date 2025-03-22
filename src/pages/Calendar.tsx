import { useState, useEffect } from "react";
const localizer = momentLocalizer(moment);
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import HolidayModal from "../components/Holiday/HolidayModal";
import EventModal from "../components/Holiday/EventModal";
import DetailsModal from "../components/Holiday/DetailsModal";
import { fetchHolidays } from "../api/services/holidayService";


const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);


  useEffect(() => {
    const loadHolidays = async () => {
      try {
        const holidayEvents = await fetchHolidays();
        setEvents(holidayEvents);
      } catch (error) {
        console.error("Failed to load holidays:", error);
      }
    };

    loadHolidays();
  }, []);

 
const handleAddEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };
 
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {/* Header with title and + Add button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Calendar</h2>

        {/* Add Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
          >
            + Add
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 z-[50] mt-2 w-40 bg-white border rounded-md shadow-md">
              <button
                onClick={() => { setIsHolidayModalOpen(true); setIsDropdownOpen(false); }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Holiday
              </button>
              <button
                onClick={() => { setIsEventModalOpen(true); setIsDropdownOpen(false); }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Event
              </button>
            </div>
          )}
        </div>
      </div>

      
     
      {/* Calendar UI */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
      />

      {/* Modals */}
      {isHolidayModalOpen && <HolidayModal setIsOpen={setIsHolidayModalOpen} addEvent={handleAddEvent} />}
      {isEventModalOpen && <EventModal setIsOpen={setIsEventModalOpen} addEvent={handleAddEvent} />}
      {isDetailsModalOpen && <DetailsModal event={selectedEvent} setIsOpen={setIsDetailsModalOpen} />}
    </div>
  );
};

export default CalendarPage;
