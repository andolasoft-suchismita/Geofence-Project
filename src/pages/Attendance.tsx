import React, { useState, useEffect } from 'react';
import AttendanceTable from '../components/attendancetable';
import { FaChevronLeft, FaChevronRight, FaSearch, FaCalendarAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducers';
import { useMemo } from 'react';
import { getAttendanceByDate, getAttendanceSummary } from '../api/services/attendanceService';
import Card from '../components/Card';
import PunchModal from '../components/PunchModal';

const Attendance: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [] = dateRange;
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState<string | null>(null);

  // Add function to check if selected date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const company_id = useSelector(
    (state: RootState) => state.authSlice.company_id
  );
  const user_id = useSelector((state: RootState) => state.authSlice.user_id);
  const userAttendance = useSelector(
    (state: RootState) => state.attendance[user_id] || []
  );
  const [summary, setSummary] = useState({
    total: 0,
    present: 0,
    absentees: 0,
    late: 0,
  });

  // Function to fetch attendance data
  const fetchAttendance = async () => {
    setLoading(true);
    setError(null);
    setAttendanceData([]); // Clear previous data before fetching
    // console.log('attendance main');
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

  const filteredData = useMemo(() => {
    if (!Array.isArray(attendanceData)) {
      return [];
    }

    const query = searchQuery?.trim().toLowerCase();
    if (!query) return attendanceData;

    const result = attendanceData.filter(
      (entry: any) =>
        typeof entry.name === 'string' &&
        entry.name.toLowerCase().includes(query)
    );

    return result;
  }, [searchQuery, attendanceData]);

  // Get Attendance Summary
  useEffect(() => {
    if (!company_id) return;

    const fetchSummary = async () => {
      setLoading(true);
      setError(null);
      setAttendanceData([]); // Clear previous data before fetching
      const attendance_date = format(selectedDate, 'yyyy-MM-dd');
      try {
        const data = await getAttendanceSummary(company_id, attendance_date);
        setSummary(data);
      } catch (error) {
        setAttendanceData([]); // Ensure no data when there's an error
        console.error('Failed to load attendance summary.');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [company_id, selectedDate]);

  return (
    <div className="p-2">
      {/* Date Selector & Buttons */}
      <div className="mb-6 flex items-center justify-between">
        <div className="ml-3 flex items-center  space-x-2">
          <FaChevronLeft
            onClick={() =>
              setSelectedDate(
                new Date(selectedDate.setDate(selectedDate.getDate() - 1))
              )
            }
            className="text-gray-600 cursor-pointer text-3xl hover:text-black"
          />
          <span className="text-lg font-bold">
            {format(selectedDate, 'EEEE, dd MMMM yyyy')}
          </span>
          <FaChevronRight
            onClick={() =>
              setSelectedDate(
                new Date(selectedDate.setDate(selectedDate.getDate() + 1))
              )
            }
            className="text-gray-600 cursor-pointer text-3xl hover:text-black "
          />
        </div>

        <div className="text-center mt-8">
          <PunchModal isInsideGeofence={true} loading={loading} isEnabled={isToday(selectedDate)} />
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="mb-6 ml-4 flex grid grid-cols-1 gap-4 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Employees */}
        <div>
          <Card title="Total Employee" count={summary.total} type="total" />
        </div>
        {/* Present */}
        <div>
          <Card
            title="Present Today"
            count={summary.present}
            type="present"
          />
        </div>
       
        {/* Late Employees */}
        <Card title="Absent Today"
         count={summary.absentees}
         type="late" />
      </div>

      {/* Filters Section */}
      <div className="mb-6 ml-4 flex  space-x-4">
        {/* Search Bar */}
        <div className="relative flex w-72 items-center rounded-lg shadow-md">
          <div className="relative flex w-72 items-center rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Search employee"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="w-full rounded-lg py-2 pl-3 pr-10 focus:outline-none"
            />
            <span className="text-gray-400 absolute right-3">
              <FaSearch />
            </span>
          </div>
        </div>

        {/* Date Range Dropdown */}
        <div className="relative flex cursor-pointer items-center rounded-lg bg-white px-4 py-2 shadow-md">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            isClearable
            className="bg-transparent focus:outline-none"
            placeholderText="Select Date"
          />
        </div>
      </div>

      <div className="p-4">
        {/* <AttendanceTable data={filteredData} /> */}
        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : !attendanceData || attendanceData.length === 0 ? (
          <p className="text-gray-500 text-center">
            No attendance data available.
          </p>
        ) : filteredData.length === 0 ? (
          <p className="text-gray-500 text-center">No user found.</p>
        ) : (
          <AttendanceTable data={filteredData} />
        )}
      </div>
    </div>
  );
};
export default Attendance;
