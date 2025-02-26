// // import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

// // const Calendar = () => {
// //   return (
// //     <>
// //       <Breadcrumb pageName="Calendar" />

// //       {/* <!-- ====== Calendar Section Start ====== --> */}
// //       <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
// //         <table className="w-full">
// //           <thead>
// //             <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
// //               <th className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
// //                 <span className="hidden lg:block"> Sunday </span>
// //                 <span className="block lg:hidden"> Sun </span>
// //               </th>
// //               <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
// //                 <span className="hidden lg:block"> Monday </span>
// //                 <span className="block lg:hidden"> Mon </span>
// //               </th>
// //               <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
// //                 <span className="hidden lg:block"> Tuesday </span>
// //                 <span className="block lg:hidden"> Tue </span>
// //               </th>
// //               <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
// //                 <span className="hidden lg:block"> Wednesday </span>
// //                 <span className="block lg:hidden"> Wed </span>
// //               </th>
// //               <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
// //                 <span className="hidden lg:block"> Thursday </span>
// //                 <span className="block lg:hidden"> Thur </span>
// //               </th>
// //               <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
// //                 <span className="hidden lg:block"> Friday </span>
// //                 <span className="block lg:hidden"> Fri </span>
// //               </th>
// //               <th className="flex h-15 items-center justify-center rounded-tr-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
// //                 <span className="hidden lg:block"> Saturday </span>
// //                 <span className="block lg:hidden"> Sat </span>
// //               </th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {/* <!-- Line 1 --> */}
// //             <tr className="grid grid-cols-7">
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   1
// //                 </span>
// //                 <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
// //                   <span className="group-hover:text-primary md:hidden">
// //                     More
// //                   </span>
// //                   <div className="event invisible absolute left-2 z-99 mb-1 flex w-[200%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:w-[190%] md:opacity-100">
// //                     <span className="event-name text-sm font-semibold text-black dark:text-white">
// //                       Redesign Website
// //                     </span>
// //                     <span className="time text-sm font-medium text-black dark:text-white">
// //                       1 Dec - 2 Dec
// //                     </span>
// //                   </div>
// //                 </div>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   2
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   3
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   4
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   5
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   6
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   7
// //                 </span>
// //               </td>
// //             </tr>
// //             {/* <!-- Line 1 --> */}
// //             {/* <!-- Line 2 --> */}
// //             <tr className="grid grid-cols-7">
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   8
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   9
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   10
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   11
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   12
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   13
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   14
// //                 </span>
// //               </td>
// //             </tr>
// //             {/* <!-- Line 2 --> */}
// //             {/* <!-- Line 3 --> */}
// //             <tr className="grid grid-cols-7">
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   15
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   16
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   17
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   18
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   19
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   20
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   21
// //                 </span>
// //               </td>
// //             </tr>
// //             {/* <!-- Line 3 --> */}
// //             {/* <!-- Line 4 --> */}
// //             <tr className="grid grid-cols-7">
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   22
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   23
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   24
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   25
// //                 </span>
// //                 <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
// //                   <span className="group-hover:text-primary md:hidden">
// //                     More
// //                   </span>
// //                   <div className="event invisible absolute left-2 z-99 mb-1 flex w-[300%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:w-[290%] md:opacity-100">
// //                     <span className="event-name text-sm font-semibold text-black dark:text-white">
// //                       App Design
// //                     </span>
// //                     <span className="time text-sm font-medium text-black dark:text-white">
// //                       25 Dec - 27 Dec
// //                     </span>
// //                   </div>
// //                 </div>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   26
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   27
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   28
// //                 </span>
// //               </td>
// //             </tr>
// //             {/* <!-- Line 4 --> */}
// //             {/* <!-- Line 5 --> */}
// //             <tr className="grid grid-cols-7">
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   29
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   30
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   31
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   1
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   2
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   3
// //                 </span>
// //               </td>
// //               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
// //                 <span className="font-medium text-black dark:text-white">
// //                   4
// //                 </span>
// //               </td>
// //             </tr>
// //             {/* <!-- Line 5 --> */}
// //           </tbody>
// //         </table>
// //       </div>
// //       {/* <!-- ====== Calendar Section End ====== --> */}
// //     </>
// //   );
// // };

// // export default Calendar;


// import { useState } from "react";
// import { Calendar as BigCalendar, momentLocalizer, Event } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment } from "react";
// import { XMarkIcon } from "@heroicons/react/24/outline";

// const localizer = momentLocalizer(moment);

// const events = [
//   {
//     id: 1,
//     title: "Team Meeting",
//     start: new Date(2025, 1, 26, 10, 0),
//     end: new Date(2025, 1, 26, 11, 0),
//   },
//   {
//     id: 2,
//     title: "Project Deadline",
//     start: new Date(2025, 1, 28, 12, 0),
//     end: new Date(2025, 1, 28, 13, 0),
//   },
// ];

// const MyCalendar = () => {
//   const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleSelectEvent = (event: Event) => {
//     setSelectedEvent(event);
//     setIsOpen(true);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">📅 Event Calendar</h2>
//       <div className="bg-white shadow rounded-lg p-4">
//         <BigCalendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: 500 }}
//           onSelectEvent={handleSelectEvent}
//         />
//       </div>

//       {/* Modal for Event Details */}
//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
//           <div className="fixed inset-0 bg-black bg-opacity-30" />
//           <div className="fixed inset-0 flex items-center justify-center p-4">
//             <Dialog.Panel className="bg-white rounded-lg shadow-xl p-6 w-96">
//               <div className="flex justify-between items-center mb-4">
//                 <Dialog.Title className="text-lg font-bold">Event Details</Dialog.Title>
//                 <button onClick={() => setIsOpen(false)}>
//                   <XMarkIcon className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>
//               {selectedEvent && (
//                 <div>
//                   <p className="text-lg font-semibold">{selectedEvent.title}</p>
//                   <p className="text-gray-600">
//                     {moment(selectedEvent.start).format("MMMM Do YYYY, h:mm A")} -{" "}
//                     {moment(selectedEvent.end).format("h:mm A")}
//                   </p>
//                 </div>
//               )}
//             </Dialog.Panel>
//           </div>
//         </Dialog>
//       </Transition>
//     </div>
//   );
// };

// export default MyCalendar;


import { useState, useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Holidays from "date-holidays";

const localizer = momentLocalizer(moment);

const initialEvents = [
  {
    id: 1,
    title: "Team Meeting",
    start: new Date(2025, 1, 26, 10, 0),
    end: new Date(2025, 1, 26, 11, 0),
  },
  {
    id: 2,
    title: "Project Deadline",
    start: new Date(2025, 1, 28, 12, 0),
    end: new Date(2025, 1, 28, 13, 0),
  },
];

const MyCalendar = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch Holidays
  useEffect(() => {
    const hd = new Holidays("IN","OD"); // Change country code as needed (e.g., "IN" for India)
    const holidayList = hd.getHolidays(new Date().getFullYear());

    console.log("Fetched Holidays:", holidayList);

    const holidayEvents = holidayList.map((holiday, index) => ({
      id: `holiday-${index}`,
      title: holiday.name,
      start: new Date(holiday.date),
      end: new Date(holiday.date),
      allDay: true,
    }));

    console.log("Formatted Holiday Events:", holidayEvents);

    setEvents((prevEvents) => [...prevEvents, ...holidayEvents]);
  }, []);

   const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📅 Event Calendar</h2>
      <div className="bg-white shadow rounded-lg p-4">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
        />
      </div>

      {/* Modal for Event Details */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-lg shadow-xl p-6 w-96">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-lg font-bold">Event Details</Dialog.Title>
                <button onClick={() => setIsOpen(false)}>
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              {selectedEvent && (
                <div>
                  <p className="text-lg font-semibold">{selectedEvent.title}</p>
                  <p className="text-gray-600">
                    {moment(selectedEvent.start).format("MMMM Do YYYY, h:mm A")} -{" "}
                    {moment(selectedEvent.end).format("h:mm A")}
                  </p>
                </div>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MyCalendar;
