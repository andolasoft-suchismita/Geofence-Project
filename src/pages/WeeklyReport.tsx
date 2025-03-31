// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { getAttendanceReports } from "../api/services/reportService";
// import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
// import { flexRender } from "@tanstack/react-table";
// import { saveAs } from "file-saver";
// import { RootState } from "../redux/store";

// const MonthlyReportTable = () => {
//   const [data, setData] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState(3); // Default: March
//   const [selectedYear, setSelectedYear] = useState(2025); // Default: 2024
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(0);
//   const rowsPerPage = 10;

//   // Get company ID from Redux
//   const companyId = useSelector((state: RootState) => state.authSlice?.company_id);

//   useEffect(() => {
//     if (!companyId) return; // Ensure companyId exists before fetching

//     const fetchReports = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const reportData = await getAttendanceReports(companyId, selectedMonth, selectedYear);
//         setData(reportData);
//       } catch (err) {
//         setError("Failed to fetch reports.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, [companyId, selectedMonth, selectedYear]);

//   // Pagination
//   const totalPages = Math.ceil(data.length / rowsPerPage);
//   const paginatedData = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

//   const columns = [
//     { header: "Employee ID", accessorKey: "employee_id" },
//     { header: "Name", accessorKey: "name" },
//     { header: "Days Absent", accessorKey: "days_absent" },
//     { header: "Half Days", accessorKey: "half_days" },
//     { header: "Deficit Hours", accessorKey: "deficit_hours" },
//   ];

//   const table = useReactTable({
//     data: paginatedData,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     manualPagination: true,
//     state: {
//       pagination: {
//         pageIndex: currentPage,
//         pageSize: rowsPerPage,
//       },
//     },
//   });

//   const downloadCSV = () => {
//     const csvHeader = columns.map((col) => col.header).join(",") + "\n";
//     const csvRows = data
//       .map((row) => columns.map((col) => row[col.accessorKey]).join(","))
//       .join("\n");

//     const csvContent = "data:text/csv;charset=utf-8," + csvHeader + csvRows;
//     const blob = new Blob([csvContent], { type: "text/csv" });
//     saveAs(blob, "Monthly_Report.csv");
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Monthly Employee Report</h2>

//         <div className="flex gap-4 items-center">
//           {/* Month Selector */}
//           <select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(Number(e.target.value))}
//             className="px-3 py-2 border rounded"
//           >
//             <option value={1}>January</option>
//             <option value={2}>February</option>
//             <option value={3}>March</option>
//             <option value={4}>April</option>
//             <option value={5}>May</option>
//             <option value={6}>June</option>
//             <option value={7}>July</option>
//             <option value={8}>August</option>
//             <option value={9}>September</option>
//             <option value={10}>October</option>
//             <option value={11}>November</option>
//             <option value={12}>December</option>
//           </select>

//           {/* Year Selector */}
//           <select
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(Number(e.target.value))}
//             className="px-3 py-2 border rounded"
//           >
//             <option value={2023}>2023</option>
//             <option value={2024}>2024</option>
//             <option value={2025}>2025</option>
//           </select>

//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={downloadCSV}
//             disabled={loading || data.length === 0}
//           >
//             Download CSV
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-300">
//           <thead className="bg-[#4B5563] text-white">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th key={header.id} className="border p-2 text-center">
//                     {flexRender(header.column.columnDef.header, header.getContext())}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map((row) => (
//               <tr key={row.id} className="border">
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="border p-2 text-center whitespace-nowrap">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Pagination Controls */}
//       {!loading && data.length > 0 && (
//       <div className="flex justify-center items-center mt-4">
//         <button
//           className="px-3 py-1 border rounded mx-2 disabled:opacity-50"
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
//           disabled={currentPage === 0}
//         >
//           &lt;
//         </button>
//         <span>
//           Page {currentPage + 1} of {totalPages}
//         </span>
//         <button
//           className="px-3 py-1 border rounded mx-2 disabled:opacity-50"
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
//           disabled={currentPage === totalPages - 1}
//         >
//           &gt;
//         </button>
//       </div>
//       )}
//     </div>
//   );
// };

// export default MonthlyReportTable;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAttendanceReports } from "../api/services/reportService";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { saveAs } from "file-saver";
import { RootState } from "../redux/store";

const MonthlyReportTable = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(3); // Default: March
  const [selectedYear, setSelectedYear] = useState(2025); // Default: 2025
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  // Get company ID from Redux
  const companyId = useSelector((state: RootState) => state.authSlice?.company_id);

  useEffect(() => {
    if (!companyId) return; // Ensure companyId exists before fetching

    const fetchReports = async () => {
      setLoading(true);
      setError(null);
      try {
        const reportData = await getAttendanceReports(companyId, selectedMonth, selectedYear);
      
        setData(reportData);
        setLoading(false);
    
      } catch (err) {
        setError("Failed to fetch reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [companyId, selectedMonth, selectedYear]);

  // Pagination
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  const columns = [
    { header: "Employee ID", accessorKey: "employee_id" },
    { header: "Name", accessorKey: "name" },
    { header: "Days Absent", accessorKey: "days_absent" },
    { header: "Half Days", accessorKey: "half_days" },
    { header: "Deficit Hours", accessorKey: "deficit_hours" },
  ];

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: currentPage,
        pageSize: rowsPerPage,
      },
    },
  });

  const downloadCSV = () => {
    const csvHeader = columns.map((col) => col.header).join(",") + "\n";
    const csvRows = data
      .map((row) => columns.map((col) => row[col.accessorKey]).join(","))
      .join("\n");

    const csvContent = "data:text/csv;charset=utf-8," + csvHeader + csvRows;
    const blob = new Blob([csvContent], { type: "text/csv" });
    saveAs(blob, "Monthly_Report.csv");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Monthly Employee Report</h2>

        <div className="flex gap-4 items-center">
          {/* Month Selector */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="px-3 py-2 border rounded"
          >
            {[...Array(12)].map((_, index) => (
              <option key={index} value={index + 1}>
                {new Date(0, index).toLocaleString("en", { month: "long" })}
              </option>
            ))}
          </select>

          {/* Year Selector */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-3 py-2 border rounded"
          >
            {[2023, 2024, 2025].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={downloadCSV}
          >
            Download CSV
          </button>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-[#4B5563] text-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="border p-2 text-center">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border p-2 text-center whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls (only when not loading and data exists) */}
          {data.length > 0 && (
            <div className="flex justify-center items-center mt-4">
              <button
                className="px-3 py-1 border rounded mx-2 disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
              >
                &lt;
              </button>
              <span>
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                className="px-3 py-1 border rounded mx-2 disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                disabled={currentPage === totalPages - 1}
              >
                &gt;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MonthlyReportTable;

