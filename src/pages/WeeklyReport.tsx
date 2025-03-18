import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { saveAs } from "file-saver";
import { getAttendanceReports } from "../api/services/reportService";

const MonthlyReportTable = () => {
  const columns = [
    { accessorKey: "employee_id", header: "Employee ID" },
    { accessorKey: "name", header: "Employee Name" }, 
    { accessorKey: "days_absent", header: "Days Absent" },
    { accessorKey: "half_days", header: "Half Days" },
    { accessorKey: "deficit_hours", header: "Deficit Hours" },
  ];

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportData = await getAttendanceReports(42); // Fetching data from API
        setData(reportData);
      } catch (error) {
        console.error("Failed to load reports");
      }
    };

    fetchReports();
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

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
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={downloadCSV}
        >
          Download CSV
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-[#4B5563] text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2 text-center">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
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

      {/* Pagination Controls */}
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
    </div>
  );
};

export default MonthlyReportTable;
