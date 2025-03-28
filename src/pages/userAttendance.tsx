import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducers';
import { punchIn, punchOut } from '../redux/slices/attendanceSlice';
import { AppDispatch } from '../redux/store';
import { showToast } from '../utils/toast';
import {
  getAttendanceByDate,
  getAttendanceByUserId,
} from '../api/services/attendanceService';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
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
    <div className="realative  p-4">
      <div className="rounded-lg bg-white  shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between bg-gray p-4">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-xl font-semibold text-black">Attendance</h2>
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
              <thead className="bg-gray-200 text-black">
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

const Attendance: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
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

  //Get coordinates Function
  const getCoordinates = async () => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: parseFloat(position.coords.latitude.toFixed(6)), // Round to 6 decimals
            lng: parseFloat(position.coords.longitude.toFixed(6)),
          });
        },
        () => {
          alert('⚠️ Failed to get location. Please enable GPS and try again.');
          reject({ lat: 0, lng: 0 });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  };

  const [refreshData, setRefreshData] = useState(false);

  const triggerRefresh = () => {
    setRefreshData((prev) => !prev); // Toggle state to re-trigger effect in EmployeeDetail
  };

  ///////////////////
  // const isPunchedIn =
  //   userAttendance.length > 0 &&
  //   !userAttendance[userAttendance.length - 1].punchOut;

  const isPunchedIn = useSelector(
    (state: RootState) => state.attendance.isPunchedIn
  );

  const handlePunchIn = async () => {
    setLoading(true);
    try {
      const { lat, lng } = await getCoordinates();
      const check_in = new Date().toISOString(); // Ensure ISO format

      const response = await dispatch(punchIn({ lat, lng, check_in })).unwrap();
      showToast('Successfully Punched In!');
      localStorage.setItem('attendance_id', response.id);
      triggerRefresh();
    } catch (error) {
      alert(`Punch In Failed: ${JSON.stringify(error.detail, null, 2)}`);
    } finally {
      setLoading(false);
    }
  };

  ////////////////////
  const handlePunchOut = async () => {
    const attendance_id = localStorage.getItem('attendance_id');
    if (!attendance_id) return alert('⚠️ No active attendance record found!');

    setLoading(true);
    try {
      await dispatch(
        punchOut({
          attendance_id,
          check_out: new Date().toISOString(),
        })
      ).unwrap();
      showToast('Successfully Punched Out!');
      triggerRefresh();
    } catch (error) {
      console.error(' Punch Out Error:', error);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="p-2">
      {/* Date Selector & Buttons */}
      <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-5">
        <div className="ml-2 flex items-center space-x-2 text-xl font-semibold text-black">
          <img
            src={currentUser?.profile_pic || 'deafault user.avif'}
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
          <span>
            {firstname} {lastname}
          </span>
        </div>

        <div className="text-center">
          <button
            className={`flex items-center gap-2 rounded px-4 py-2 text-white ${
              isPunchedIn
                ? 'bg-[#b91c1c] hover:bg-[#dc2626]'
                : 'bg-black hover:bg-[#6b7280]'
            }`}
            onClick={isPunchedIn ? handlePunchOut : handlePunchIn}
          >
            {isPunchedIn ? (
              <FaArrowRightFromBracket />
            ) : (
              <FaArrowRightFromBracket />
            )}
            {isPunchedIn ? 'Punch Out' : 'Punch In'}
          </button>
        </div>
      </div>

      <div>{user_id && <EmployeeDetail refresh={refreshData} />}</div>
    </div>
  );
};
export default Attendance;
