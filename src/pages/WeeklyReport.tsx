// import React from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   ColumnDef,
//   flexRender,
// } from "@tanstack/react-table";
// import { weeklyReportData } from "../data/weeklyReportData";

// const columns: ColumnDef<any>[] = [
//   { accessorKey: "employee_id", header: "Employee ID" },
//   { accessorKey: "employee_name", header: "Employee Name" },
//   { accessorKey: "total_leave", header: "Total Leave" },
//   { accessorKey: "applied_leave", header: "Applied Leave" },
//   { accessorKey: "remaining_leave", header: "Remaining Leave" },
//   { accessorKey: "hours_clocked", header: "Hours Clocked" },
//   {
//     accessorKey: "absent",
//     header: "Absent",
//     cell: (info) => info.getValue(),
//   },
//   {
//     accessorKey: "halfday",
//     header: "Halfday",
//     cell: (info) => info.getValue(),
//   },
// ];

// const WeeklyReport = () => {
//   const [data] = React.useState(() => [...weeklyReportData]);
//   const [sorting, setSorting] = React.useState([]);
//   const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     state: { sorting, pagination },
//     onSortingChange: setSorting,
//     onPaginationChange: setPagination,
//   });

//   const currentMonthYear = new Date().toLocaleString("default", {
//     month: "long",
//     year: "numeric",
//   });

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-lg">
//     <div className="flex justify-between items-center mb-4">
//       <h2 className="text-2xl font-semibold text-gray-700">Employee Report</h2>
//       <h3 className="text-2xl font-semibold text-grey-700">{currentMonthYear}</h3>
//     </div>
//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-300 rounded-lg shadow-sm">
//           <thead className="bg-gray-200 text-gray-700">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id} className="text-left">
//                 {headerGroup.headers.map((header) => (
//                   <th key={header.id} className="border p-3 uppercase font-semibold text-sm">
//                     {flexRender(header.column.columnDef.header, header.getContext())}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map((row, index) => (
//               <tr
//                 key={row.id}
//                 className={`border ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="border p-3 text-center text-gray-700">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="mt-4 flex justify-between items-center">
//         <button
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Previous
//         </button>
//         <span className="text-gray-600">
//           Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//         </span>
//         <button
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WeeklyReport;



import React, { useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { saveAs } from "file-saver";
import { weeklyReportData } from "../data/weeklyReportData"; 

const MonthlyReportTable = () => {
  // Define table columns
  const columns = [
    { accessorKey: "Employee ID", header: "Employee ID" },
    { accessorKey: "Employee Name", header: "Employee Name" },
    { accessorKey: "Days Absent", header: "Days Absent" },
    { accessorKey: "Half Days", header: "Half Days" },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(weeklyReportData.length / rowsPerPage);

  // Paginate data
  const paginatedData = weeklyReportData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  // Create table instance
  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Function to convert data to CSV and trigger download
  const downloadCSV = () => {
    const csvHeader = columns.map(col => col.header).join(",") + "\n";
    const csvRows = weeklyReportData.map(row =>
      columns.map(col => row[col.accessorKey]).join(",")
    ).join("\n");

    const csvContent = "data:text/csv;charset=utf-8," + csvHeader + csvRows;
    const blob = new Blob([csvContent], { type: "text/csv" });
    saveAs(blob, "Monthly_Report.csv");
  };

  return (
    <div className="p-4">
      {/* Header with Download Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Monthly Employee Report</h2>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={downloadCSV}
        >
          Download CSV
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="border p-2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          className="px-3 py-1 border rounded mx-2 disabled:opacity-50"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          &lt;
        </button>
        <span>{currentPage + 1} / {totalPages}</span>
        <button
          className="px-3 py-1 border rounded mx-2 disabled:opacity-50"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MonthlyReportTable;
