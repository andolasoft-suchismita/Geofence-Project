import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { weeklyReportData } from "../data/weeklyReportData";

const columns: ColumnDef<any>[] = [
  { accessorKey: "employee_id", header: "Employee ID" },
  { accessorKey: "employee_name", header: "Employee Name" },
  { accessorKey: "total_leave", header: "Total Leave" },
  { accessorKey: "applied_leave", header: "Applied Leave" },
  { accessorKey: "remaining_leave", header: "Remaining Leave" },
  { accessorKey: "hours_clocked", header: "Hours Clocked" },
  {
    accessorKey: "absent",
    header: "Absent",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "halfday",
    header: "Halfday",
    cell: (info) => info.getValue(),
  },
];

const WeeklyReport = () => {
  const [data] = React.useState(() => [...weeklyReportData]);
  const [sorting, setSorting] = React.useState([]);
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
  });

  const currentMonthYear = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold text-gray-700">Employee Report</h2>
      <h3 className="text-2xl font-semibold text-grey-700">{currentMonthYear}</h3>
    </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gray-200 text-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="text-left">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border p-3 uppercase font-semibold text-sm">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`border ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border p-3 text-center text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WeeklyReport;



