import React, { useState, useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { format } from 'date-fns';
// import { attendanceData } from "../data/attendanceData";
import {
  getAttendanceByDate,
  getAttendanceByUserId,
} from '../api/services/attendanceService';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducers';
import Pagination from './UiElements/Pagination';
const getMonthOptions = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentYear = new Date().getFullYear();
  return months.map((month, index) => ({
    label: `${month} ${currentYear}`,
    value: `${currentYear}-${String(index + 1).padStart(2, '0')}`,
  }));
};

const EmployeeDetailsModal = ({ employee, onClose }) => {
  const [selectedMonth, setSelectedMonth] = useState(
    format(new Date(), 'yyyy-MM')
  );
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAttendanceData = async () => {
    if (!employee?.user_id) {
      return;
    }

    const userId = employee.user_id.trim(); // Fetch based on selected employee
    setLoading(true);
    setError('');

    try {
      const attendanceData = await getAttendanceByUserId(userId); // API fetches based on employee ID
      const filteredData = attendanceData.filter((item) => {
        // console.log('Checking date:', item.date, 'against', selectedMonth);
        // return item.date.startsWith(selectedMonth);
        const formattedDate = format(new Date(item.date), 'yyyy-MM'); // Convert item.date to 'YYYY-MM'
        return formattedDate === selectedMonth; // Compare formatted date with selected month
      });
      setAttendanceData(filteredData);
    } catch (err) {
      setError('Failed to fetch attendance data.');
      console.error('Error fetching data:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when modal opens or selected month/employee changes
  useEffect(() => {
    fetchAttendanceData();
  }, [selectedMonth, employee?.user_id]);

  const formatTime = (decimalHours: number) => {
    if (!decimalHours || decimalHours <= 0) return '-';
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return `${hours}h ${minutes}m`;
  };
  const formatCheck = (timeString: string | null) => {
    if (!timeString) return '-'; // Handle missing data

    // Convert "HH:mm:ss.SSSSSS" to Date object
    const [hours, minutes, seconds] = timeString.split(':');
    const date = new Date();
    date.setHours(
      parseInt(hours, 10),
      parseInt(minutes, 10),
      parseInt(seconds, 10)
    );

    // Format to 12-hour time with AM/PM
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  const columns = useMemo(
    () => [
      { accessorKey: 'date', header: 'Date' },
      {
        accessorKey: 'check_in',
        header: 'Check-In',
        cell: ({ getValue }) => formatCheck(getValue() as string),
      },
      {
        accessorKey: 'check_out',
        header: 'Check-Out',
        cell: ({ getValue }) => formatCheck(getValue() as string),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const status = getValue() as string;
          return status
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        },
      },
      {
        accessorKey: 'overtime',
        header: 'Overtime',
        cell: ({ getValue }) => {
          const value = getValue() as number;
          return formatTime(value);
        },
      },
      {
        accessorKey: 'working_hours',
        header: 'Working Hours',
        cell: ({ getValue }) => {
          const value = getValue() as number;
          return formatTime(value);
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: attendanceData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="fixed inset-0 z-50 z-9999 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="h-auto max-h-[90vh] w-11/12 max-w-5xl overflow-y-auto rounded-lg bg-white  shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between bg-gray p-4">
          <div className="flex items-center gap-3">
            {/* <img
              src={employee.profile}
              alt={employee.name}
              className="h-12 w-12 rounded-full shadow-md"
            /> */}
            <div>
              <h2 className="text-xl font-semibold text-black">
                {employee.name}
              </h2>
              <p className="text-gray-500 text-sm">{employee.designation}</p>
            </div>
          </div>
          <div>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-gray-700 rounded border bg-white p-2"
            >
              {getMonthOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-2xl"
          >
            ✖
          </button>
        </div>

        {/* Attendance Table */}
        <div className="max-h-[400px] overflow-auto p-4">
          {loading ? (
            <p className="text-gray-500 text-center">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : attendanceData.length === 0 ? (
            <p className="text-gray-500 text-center">
              No data available for this month.
            </p>
          ) : (
            <table className="w-full rounded-md">
              <thead className="bg-gray-200 text-gray-700">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="p-4 text-center font-semibold"
                      >
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
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-4 text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};


interface AttendanceTableProps {
  data: any[];
}
const AttendanceTable: React.FC<AttendanceTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Display 10 rows per page
  const totalPages = Math.ceil(data.length / rowsPerPage); // Calculate total pages

  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  //  Get user & company details from Redux
  const user_id = useSelector((state: RootState) => state.authSlice.user_id);
  const company_id = useSelector(
    (state: RootState) => state.authSlice.company_id
  );
  const attendance_date = new Date().toISOString().split('T')[0]; //  Current date

  //  Fetch attendance when date or company changes
  // const fetchAttendance = async () => {
  //   setLoading(true);
  //   console.log('attendance in table');
  //   try {
  //     const data = await getAttendanceByDate(
  //       attendance_date,
  //       company_id.toString()
  //     );
  //     setAttendanceData(data);
  //   } catch (error) {
  //     console.error('Failed to load attendance data');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   if (!attendance_date || !company_id) return;
  //   fetchAttendance();
  // }, [attendance_date, company_id]);

  const formatTime = (decimalHours: number) => {
    if (!decimalHours || decimalHours <= 0) return '-';
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return `${hours}h ${minutes}m`;
  };
  const formatCheck = (timeString: string | null) => {
    if (!timeString) return '-'; // Handle missing data

    // Convert "HH:mm:ss.SSSSSS" to Date object
    const [hours, minutes, seconds] = timeString.split(':');
    const date = new Date();
    date.setHours(
      parseInt(hours, 10),
      parseInt(minutes, 10),
      parseInt(seconds, 10)
    );

    // Format to 12-hour time with AM/PM
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const columns = [
    { accessorKey: 'name', header: 'Employee' },
    {
      accessorKey: 'check_in',
      header: 'Check-In',
      cell: ({ getValue }) => formatCheck(getValue() as string),
    },
    {
      accessorKey: 'check_out',
      header: 'Check-Out',
      cell: ({ getValue }) => formatCheck(getValue() as string),
    },
    {
      accessorKey: 'working_hours',
      header: 'Working Hours',
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return formatTime(value);
      },
    },
    {
      accessorKey: 'overtime',
      header: 'Overtime',
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return formatTime(value);
      },
    },
  ];
  // Slice data based on pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  }, [data, currentPage]);

  //  Initialize TanStack Table
  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative">
      {/* {loading && <p>Loading...</p>} */}

      <table className="w-full border-collapse rounded-lg shadow-lg">
        <thead className="bg-[#4B5563] text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-4 text-center text-sm font-semibold"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white">
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="even:bg-gray-100 hover:bg-gray-50 transition duration-200"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="text-gray-800 p-4 text-center"
                    onClick={() => {
                      if (cell.column.id === 'name') {
                        setSelectedEmployee(row.original); // Just open modal with selected data
                      }
                    }}
                    style={
                      cell.column.id === 'name'
                        ? {
                            cursor: 'pointer',
                            color: '#2563EB',
                            fontWeight: 'bold',
                          }
                        : {}
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center">
                No attendance data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedEmployee && (
        <EmployeeDetailsModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AttendanceTable;
