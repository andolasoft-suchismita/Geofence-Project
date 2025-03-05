
import { useState, useEffect, Fragment } from 'react';
import {Calendar as BigCalendar,momentLocalizer,Event} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { authHeader } from '../api/authHeader';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showList, setShowList] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // "holiday" or "event"
  const [newEntry, setNewEntry] = useState({ name: '', date: '', time: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);

  //const today = moment().startOf('day'); // Get today's date

useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const headers = authHeader();
        const response = await fetch(
          'http://192.168.2.31:9009/companyholidaysapi/company-holidays/company/23',
          { headers }
        );

        if (!response.ok)
          throw new Error(`Failed to fetch holidays: ${response.status}`);

        const data = await response.json();

        const holidayEvents = data.map((holiday) => ({
          id: holiday.id,
          title: holiday.holiday_name,
          start: new Date(holiday.holiday_date),
          end: new Date(holiday.holiday_date),
          allDay: true,
          type: 'holiday',
        }));

        setEvents(holidayEvents);
        setHolidays(data);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchHolidays();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent({
      id: event.id,
      title: event.title,
      date: moment(event.start).format('MMM D, YYYY'),
      time:
        event.type === 'event' ? moment(event.start).format('hh:mm A') : null,
    });
    setModalType('event-details');
  };

  const handleDeleteEntry = async (id) => {
    if (!id) return;
    
    try {
      const headers = authHeader();
      const response = await fetch(
        `http://127.0.0.1:8000/companyholidaysapi/company-holidays/${id}`,
        {
          method: 'DELETE',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (!response.ok) throw new Error('Failed to delete the holiday');
  
      console.log(`Deleted holiday with ID: ${id}`);
  
      // Update the state by removing the deleted holiday
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      setHolidays((prevHolidays) => prevHolidays.filter((holiday) => holiday.id !== id));
  
      setModalType(''); // Close the modal after deleting
    } catch (error) {
      console.error('Error deleting holiday:', error);
    }
  };
  
  
const handleCreateEntry = async () => {
    if (
      !newEntry.name ||
      !newEntry.date ||
      (modalType === 'event' && !newEntry.time)
    )
      return;

    const entryData = {
      holiday_name: newEntry.name,
      holiday_date: newEntry.date,
      holiday_time: newEntry.time,
      company_id: 23,
    };

    try {
      const headers = authHeader();
      const response = await fetch(
        'http://192.168.2.31:9009/companyholidaysapi/company-holidays/',
        {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entryData),
        }
      );

      if (!response.ok) throw new Error('Failed to create entry');

      const newEntryResponse = await response.json();
      console.log('Entry Created:', newEntryResponse);

      const newEvent = {
        id: newEntryResponse.id,
        title: newEntryResponse.holiday_name,
        start: new Date(
          `${newEntryResponse.holiday_date}T${
            newEntryResponse.holiday_time || '00:00'
          }`
        ),
        end: new Date(
          `${newEntryResponse.holiday_date}T${
            newEntryResponse.holiday_time || '00:00'
          }`
        ),
        allDay: modalType === 'holiday',
        type: modalType,
      };

      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setHolidays((prevHolidays) => [...prevHolidays, newEntryResponse]);

      setNewEntry({ name: '', date: '', time: '' });
      setModalType('');
    } catch (error) {
      console.error('Error creating entry:', error);
    }
  };

  // Highlighting Today's Date
  // const dayPropGetter = (event) => {
  //   const dayPropGetter = (date) => {
  //     const isToday = moment(date).isSame(currentDate, 'day');
  //     if (isToday) {
  //       return {
  //         className: 'highlight-today',
  //         style: { backgroundColor: '#ffeb3b', color: '#000', fontWeight: 'bold' }
  //       };
  //     }
  //     return {};
  //   };

  return (
    <div className="relative p-4">
      {!showList ? (
        <div className="relative rounded-lg bg-white p-4 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-black">Holiday Calendar</h2>
              <div className="flex gap-4">
              <button
                onClick={() => setShowList(true)}
                className="rounded-md bg-blue-600 px-5 py-2 text-white shadow-lg"
              >
                See All Holiday List
              </button>
              <div className="relative">
                <button
                  className="rounded-md bg-green-600 px-4 py-2 text-white shadow-lg"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  + Add
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-48 max-w-xs overflow-hidden rounded-md border bg-white shadow-lg">
                    <button
                      onClick={() => {
                        setModalType('holiday');
                        setIsDropdownOpen(false);
                      }}
                      className="text-gray-800 hover:bg-gray-100 block w-full px-4 py-2 text-left"
                    >
                      Holiday
                    </button>
                    <button
                      onClick={() => {
                        setModalType('event');
                        setIsDropdownOpen(false);
                      }}
                      className="text-gray-800 hover:bg-gray-100 block w-full px-4 py-2 text-left"
                    >
                      Event
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={handleEventClick}
          
          />
        </div>
      ) : (
        <div className="mx-auto w-3/4 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-center text-2xl font-bold text-black">
            All Holiday List
          </h2>
          <ul className="space-y-3 text-black">
            {holidays.map((holiday) => (
              <li
                key={holiday.id}
                className="bg-gray-100 rounded-lg p-3 shadow-md"
              >
                <p className="font-semibold">{holiday.holiday_name}</p>
                <p className="text-gray-600">
                  {moment(holiday.holiday_date).format('MMM D, YYYY')}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowList(false)}
              className="rounded-md bg-blue-600 px-5 py-2 text-white shadow-lg"
            >
              Back to Calendar
            </button>
          </div>
        </div>
      )}

     <Transition appear show={modalType !== ''} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setModalType('')}>
          <div className="fixed inset-0 bg-black bg-opacity-30" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-96 rounded-lg bg-white p-6 text-black shadow-xl relative">
                 {/* Close Button */}
                <button
                  onClick={() => setModalType('')}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
                >
                 <XMarkIcon className="w-6 h-6" />
                </button>

              <div className="mb-4 flex items-center justify-between">
              <Dialog.Title className="text-lg font-bold">
                 {modalType === "event-details" && selectedEvent ? (
                  <>
                  <p className="mb-2 font-semibold">Event: {selectedEvent.title}</p>
                  <p className="text-gray-600 mb-2">Date: {selectedEvent.date}</p>
                  {selectedEvent.time && <p className="text-gray-600 mb-4">Time: {selectedEvent.time}</p>}
                  <button 
                        onClick={() => handleDeleteEntry(selectedEvent.id)} 
                        className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white"
                      >
                        Delete
                      </button>
                    </>
                ) : modalType === "holiday-details" && selectedEvent ? (
                  <>
                    <p className="mb-2 font-semibold">Holiday: {selectedEvent.title}</p>
                    <p className="text-gray-600 mb-2">Date: {selectedEvent.date}</p>
                    <button 
                        onClick={() => handleDeleteEntry(selectedEvent.id)} 
                        className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white"
                      >
                        Delete
                      </button>
                    </>
                  ) : modalType === "event" ? (
                    <p className="mb-2 font-semibold">Create Event</p>
                  ) : modalType === "holiday" ? (
                    <p className="mb-2 font-semibold">Create Holiday</p>
                  ) : null}
                </Dialog.Title>
                </div>
            {modalType !== 'event-details' && modalType !== 'holiday-details' && (
                <>
                  <div className="mb-4">
                    <label className="text-gray-700 block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      value={newEntry.name}
                      onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
                      className="w-full rounded-md border p-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-gray-700 block text-sm font-medium">Date</label>
                    <input
                      type="date"
                      value={newEntry.date}
                      onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                      className="w-full rounded-md border p-2"
                    />
                  </div>
                  {modalType === 'event' && (
                    <div className="mb-4">
                      <label className="text-gray-700 block text-sm font-medium">Time</label>
                      <input
                        type="time"
                        value={newEntry.time}
                        onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
                        className="w-full rounded-md border p-2"
                      />
                    </div>
                  )}
                  <button onClick={handleCreateEntry} className="rounded-md bg-green-600 px-5 py-2 text-white">
                    Save
                  </button>
                </>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
export default MyCalendar
