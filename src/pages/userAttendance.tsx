import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducers';
import { AppDispatch } from '../redux/store';

import {
  getAttendanceByDate,
  getAttendanceByUserId,
} from '../api/services/attendanceService';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import PunchModal from '../components/PunchModal';
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
const EmployeeDetail = ({ refresh }: { refresh: boolean }) => {
  const userId: string | null = useSelector(
    (state: RootState) => state.authSlice.user_id
  );
  const [selectedMonth, setSelectedMonth] = useState(
    format(new Date(), 'yyyy-MM')
  );
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fetchAttendanceData = async () => {
    if (!userId) return;

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
  }, [selectedMonth, userId, refresh]);

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
    <div className="relative">
      <div className="rounded-lg bg-white shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center bg-gray-50 p-6 border-b">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Monthly Attendance</h2>
            </div>
          </div>
          <div>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-gray-700 rounded-lg border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {getMonthOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="max-h-[600px] overflow-auto p-6">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500 text-lg">Loading...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : attendanceData.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500 text-lg">No data available for this month.</p>
            </div>
          ) : (
            <table className="w-full rounded-md">
              <thead className="bg-gray-50 text-gray-700">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="p-4 text-center font-semibold border-b"
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
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-4 text-center border-b">
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

const Attendance: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const company_id = useSelector(
    (state: RootState) => state.authSlice.company_id
  );
  const user_id = useSelector((state: RootState) => state.authSlice.user_id);
  const userAttendance = useSelector(
    (state: RootState) => state.attendance[user_id] || []
  );

  const [refreshData, setRefreshData] = useState(false);

  const triggerRefresh = () => {
    setRefreshData((prev) => !prev); // Toggle state to re-trigger effect in EmployeeDetail
  };

  // Function to fetch attendance data
  const fetchAttendance = async () => {
    setLoading(true);
    setError(null);
    setAttendanceData([]); // Clear previous data before fetching
    console.log('attendance main');
    const attendance_date = format(selectedDate, 'yyyy-MM-dd');

    try {
      const data = await getAttendanceByDate(
        attendance_date,
        company_id.toString()
      );

      setAttendanceData(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setAttendanceData([]); // Ensure no data when there's an error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [selectedDate]);

  //  Fetch currentUser from Redux
  const currentUser = useSelector(
    (state: RootState) => state.userSlice.userInfo
  );
  const firstname = currentUser?.first_name;
  const lastname = currentUser?.last_name;
  const profilepic = currentUser?.last_name;
  return (
    <div className="p-4">
      {/* Date Selector & Buttons */}
      <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-6 shadow-md">
        <div className="flex items-center space-x-4">
          <img
            src={currentUser?.profile_pic || 'deafault user.avif'}
            alt="Profile"
            className="h-14 w-14 rounded-full object-cover border-2 border-gray-200"
          />

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {firstname} {lastname}
            </h2>
            <p className="text-gray-600">Employee Attendance</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-14">
          <PunchModal isInsideGeofence={true} loading={loading} />
        </div>
      </div>

      <div className="mt-6">
        {user_id && <EmployeeDetail refresh={refreshData} />}
      </div>
    </div>
  );
};
export default Attendance;
