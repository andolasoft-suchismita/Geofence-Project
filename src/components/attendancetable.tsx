import React, { useState, useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { format } from 'date-fns';

import {

  getAttendanceByUserId,

} from '../api/services/attendanceService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducers';
import Pagination from './UiElements/Pagination';
import { toast } from 'react-toastify';
import { punchOut} from '../redux/slices/attendanceSlice';
import { AppDispatch } from '../redux/store';

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

    const userId = employee.user_id.trim();
    setLoading(true);
    setError('');

    try {
      const attendanceData = await getAttendanceByUserId(userId);
      const filteredData = attendanceData.filter((item) => {

        const formattedDate = format(new Date(item.date), 'yyyy-MM');
        return formattedDate === selectedMonth;
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
    if (!timeString) return '-';

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
  onRefresh: () => void;
}
const AttendanceTable: React.FC<AttendanceTableProps> = ({ data, onRefresh }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [tableData, setTableData] = useState(data);
  
  const currentUser = useSelector(
    (state: RootState) => state.userSlice.userInfo
  );
  const isAdmin = currentUser?.is_superuser === true || currentUser?.roletype === "admin"; // Admin role check
  console.log({ isAdmin })

  
  const dispatch = useDispatch<AppDispatch>();

  // Add effect to update tableData when data prop changes
  useEffect(() => {
    setTableData(data);
  }, [data]);

  const formatTime = (decimalHours: number) => {
    if (!decimalHours || decimalHours <= 0) return '-';
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return `${hours}h ${minutes}m`;
  };
  const formatCheck = (timeString: string | null) => {
    if (!timeString) return '-';

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

  // Check if a date is today
  const isToday = (date: string) => {
    const today = new Date();
    const attendanceDate = new Date(date);
    return (
      attendanceDate.getDate() === today.getDate() &&
      attendanceDate.getMonth() === today.getMonth() &&
      attendanceDate.getFullYear() === today.getFullYear()
    );
  };

  // Update the updateAttendanceRecord function
  const updateAttendanceRecord = (updatedAttendance: any) => {
    // Update the table data with the new check-out time while preserving the original check-in time
    const updatedData = tableData.map((attendance) =>
      attendance.attendance_id === updatedAttendance.attendance_id
        ? {
          ...attendance,
          check_in: updatedAttendance.check_in || attendance.check_in, // Preserve original check-in time
          check_out: updatedAttendance.check_out,
          working_hours: updatedAttendance.working_hours,
          overtime: updatedAttendance.overtime
        }
        : attendance
    );
    setTableData(updatedData);
    
    // Trigger a refresh of the parent component's data
    onRefresh();
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
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const hasCheckOut = row.original.check_out;
        const hasCheckIn = row.original.check_in;
        const isTodayAttendance = isToday(row.original.date);
        
        return (
          <button
            onClick={() => {
              if (!hasCheckOut && hasCheckIn && isAdmin && !isTodayAttendance) {
                setEditingAttendance(row.original);
              }
            }}
            className={`px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
              hasCheckOut || !hasCheckIn || !isAdmin || isTodayAttendance
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            disabled={hasCheckOut || !hasCheckIn || !isAdmin || isTodayAttendance}
          >
            {hasCheckOut ? 'Completed' : !hasCheckIn ? 'No Check-in' : !isAdmin ? 'Admin Only' : isTodayAttendance ? 'Today\'s Record' : 'Edit'}
          </button>
        );
      },
    },
  ];
  // Update the paginatedData to use tableData instead of data prop
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return tableData.slice(startIndex, startIndex + rowsPerPage);
  }, [tableData, currentPage]);
  //  Initialize TanStack Table
  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


  return (
    <div className="relative">


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
                        setSelectedEmployee(row.original);
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
      {editingAttendance && (
        <EditAttendanceModal

          onClose={() => setEditingAttendance(null)}
          onUpdate={updateAttendanceRecord}
          editingAttendance={editingAttendance}
        />
      )}
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

// Add new EditAttendanceModal component
const EditAttendanceModal = ({onClose, onUpdate}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [checkOutTime, setCheckOutTime] = useState(() => {
    const now = new Date();
    return now.toTimeString().split(" ")[0]; // "HH:MM:SS"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const user_id = useSelector((state: RootState) => state.authSlice.user_id);
  const attendanceRecords = useSelector((state: RootState) => state.attendance.users[user_id] || []);
  const attendance_id = attendanceRecords.length > 0 ? attendanceRecords[attendanceRecords.length - 1].attendance_id : null;

  const currentUser = useSelector(
    (state: RootState) => state.userSlice.userInfo
  );
  const isAdmin = currentUser?.is_superuser === true || currentUser?.roletype === "admin";

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    if (!isAdmin) {
      setError('Only administrators can update check-out times');
      setLoading(false);
      return;
    }

    if (!attendance_id) {
      toast.error('No active attendance record found. Please try again.');
      setLoading(false);
      return;
    }

    // Convert selected time into proper ISO format
    const today = new Date();
    const [hours, minutes] = checkOutTime.split(":");
    today.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);

    try {
      await dispatch(
        punchOut({
          attendance_id: attendance_id, 
          check_out: today.toISOString(),  // Use the selected time
        })
      );
      toast.success("Check-out time updated successfully!");
      onUpdate({ attendance_id, check_out: today.toISOString() });  // Call the update function if needed
      onClose();  
    } catch (err) {
      setError('Failed to update check-out time');
      console.error('Error updating check-out:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 z-9999 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Update Check-out Time</h2>
        {!isAdmin && (
          <p className="mb-4 text-sm text-red-500">Only administrators can update check-out times</p>
        )}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Check-out Time
          </label>
          <input
            type="time"
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)}
            className="w-full rounded border p-2"
            disabled={!isAdmin}
          />
        </div>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !isAdmin}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;



