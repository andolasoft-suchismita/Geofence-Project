
// import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

// import DefaultLayout from "../../layout/DefaultLayout";
// const Calendar = () => {
//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="Calendar" />

//       {/* <!-- ====== Calendar Section Start ====== --> */}
//       <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <table className="w-full">
//           <thead>
//             <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
//               <th className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Sunday </span>
//                 <span className="block lg:hidden"> Sun </span>
//               </th>
//               <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Monday </span>
//                 <span className="block lg:hidden"> Mon </span>
//               </th>
//               <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Tuesday </span>
//                 <span className="block lg:hidden"> Tue </span>
//               </th>
//               <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Wednesday </span>
//                 <span className="block lg:hidden"> Wed </span>
//               </th>
//               <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Thursday </span>
//                 <span className="block lg:hidden"> Thur </span>
//               </th>
//               <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Friday </span>
//                 <span className="block lg:hidden"> Fri </span>
//               </th>
//               <th className="flex h-15 items-center justify-center rounded-tr-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Saturday </span>
//                 <span className="block lg:hidden"> Sat </span>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* <!-- Line 1 --> */}
//             <tr className="grid grid-cols-7">
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   1
//                 </span>
//                 <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
//                   <span className="group-hover:text-primary md:hidden">
//                     More
//                   </span>
//                   <div className="event invisible absolute left-2 z-99 mb-1 flex w-[200%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:w-[190%] md:opacity-100">
//                     <span className="event-name text-sm font-semibold text-black dark:text-white">
//                       Redesign Website
//                     </span>
//                     <span className="time text-sm font-medium text-black dark:text-white">
//                       1 Dec - 2 Dec
//                     </span>
//                   </div>
//                 </div>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   2
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   3
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   4
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   5
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   6
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   7
//                 </span>
//               </td>
//             </tr>
//             {/* <!-- Line 1 --> */}
//             {/* <!-- Line 2 --> */}
//             <tr className="grid grid-cols-7">
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   8
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   9
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   10
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   11
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   12
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   13
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   14
//                 </span>
//               </td>
//             </tr>
//             {/* <!-- Line 2 --> */}
//             {/* <!-- Line 3 --> */}
//             <tr className="grid grid-cols-7">
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   15
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   16
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   17
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   18
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   19
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   20
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   21
//                 </span>
//               </td>
//             </tr>
//             {/* <!-- Line 3 --> */}
//             {/* <!-- Line 4 --> */}
//             <tr className="grid grid-cols-7">
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   22
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   23
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   24
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   25
//                 </span>
//                 <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
//                   <span className="group-hover:text-primary md:hidden">
//                     More
//                   </span>
//                   <div className="event invisible absolute left-2 z-99 mb-1 flex w-[300%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:w-[290%] md:opacity-100">
//                     <span className="event-name text-sm font-semibold text-black dark:text-white">
//                       App Design
//                     </span>
//                     <span className="time text-sm font-medium text-black dark:text-white">
//                       25 Dec - 27 Dec
//                     </span>
//                   </div>
//                 </div>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   26
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   27
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   28
//                 </span>
//               </td>
//             </tr>
//             {/* <!-- Line 4 --> */}
//             {/* <!-- Line 5 --> */}
//             <tr className="grid grid-cols-7">
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   29
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   30
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   31
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   1
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   2
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   3
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   4
//                 </span>
//               </td>
//             </tr>
//             {/* <!-- Line 5 --> */}
//           </tbody>
//         </table>
//       </div>
//       {/* <!-- ====== Calendar Section End ====== --> */}
//     </DefaultLayout>
//   );
// };

// export default Calendar;


// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import DefaultLayout from '../../layout/DefaultLayout';
// const MyCalendar: React.FC = () => {
//   const [date, setDate] = useState<Date>(new Date());
//   const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);

//   const handleDateChange = (newDate: Date) => {
//     setDate(newDate);
//   };

//   const handleHighlightDate = (date: Date) => {
//     setHighlightedDates((prevDates) => [...prevDates, date]);
//   };

//   const tileClassName = ({ date, view }: { date: Date; view: string }): string | undefined => {
//     if (view === 'month') {
//       // Highlight selected dates
//       if (highlightedDates.some(d => d.getTime() === date.getTime())) {
//         return 'bg-yellow-300 text-black font-bold';
//       }
//       // Example: Highlight weekends (Sat, Sun)
//       if (date.getDay() === 0 || date.getDay() === 6) {
//         return 'bg-gray-200';
//       }
//     }
//   };

//   return (
//     <DefaultLayout>
//     <div className="p-6 max-w-xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">{date.getFullYear()} Calendar</h2>
//       <div className="bg-white shadow-lg rounded-lg p-4">
//         <Calendar
//           onChange={handleDateChange}
//           value={date}
//           tileClassName={tileClassName}
//           className="react-calendar rounded-lg shadow-inner"
//         />
//       </div>
//       <button
//         onClick={() => handleHighlightDate(date)}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//       >
//         Highlight Important Date
//       </button>
//     </div>
//     </DefaultLayout>
//   );
// };

// export default MyCalendar;


import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DefaultLayout from "../../layout/DefaultLayout";

const MyCalendar: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [today, setToday] = useState<Date>(new Date());

  const handleDateChange = (newDate: Date | Date[]) => {
    if (newDate instanceof Date) {
      setDate(newDate);
    }
  };

  const goToToday = () => {
    const currentDate = new Date();
    setDate(currentDate); // Set calendar to today's date
    setToday(currentDate); // Update today's reference
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }): string | undefined => {
    if (view === "month" && isSameDay(date, today)) {
      return "bg-red-500 text-white font-bold rounded-full"; // Highlight today's date
    }
  };

  return (
    <DefaultLayout>
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{date.getFullYear()} Calendar</h2>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileClassName={tileClassName}
            className="react-calendar rounded-lg shadow-inner"
          />
        </div>
        <button
          onClick={goToToday}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Today
        </button>
      </div>
    </DefaultLayout>
  );
};

export default MyCalendar;
