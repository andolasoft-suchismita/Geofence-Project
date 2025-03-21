import React, { useState, useEffect } from 'react';
import AttendanceTable from '../components/attendancetable';
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaCalendarAlt,
} from 'react-icons/fa';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducers';
import { punchIn, punchOut } from '../redux/slices/attendanceSlice';
import { AppDispatch } from '../redux/store';
import { showToast } from '../utils/toast';
import { useMemo } from 'react';
import {
  getAttendanceByDate,
  getAttendanceSummary,
} from '../api/services/attendanceService';
import Card from '../components/Card';
const Attendance: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); //  Type dispatch with AppDispatch
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  // const [startDate, endDate] = dateRange;
  const [attendanceData, setAttendanceData] = useState([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setShowModal(true);
  }, []);

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
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // High accuracy mode
      );
    });
  };

  ///////////////////
  const isPunchedIn =
    userAttendance.length > 0 &&
    !userAttendance[userAttendance.length - 1].punchOut;

  const handlePunchIn = async () => {
    setLoading(true);
    try {
      const { lat, lng } = await getCoordinates();
      const check_in = new Date().toISOString(); // Ensure ISO format

      console.log('Punch In Request:', {
        check_in,
        latitude: lat,
        longitude: lng,
      }); // Log the request

      const response = await dispatch(punchIn({ lat, lng, check_in })).unwrap();
      showToast('Successfully Punched In!');
      showToast('Have a Good day!');
      console.log('Punch In Success:', response);
      localStorage.setItem('attendance_id', response.id);
    } catch (error) {
      console.error('Punch In Error:', error);
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
      console.log(' Punch Out Success');
      showToast('Successfully Punched Out!');
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

    const attendance_date = format(selectedDate, 'yyyy-MM-dd');

    try {
      const data = await getAttendanceByDate(
        attendance_date,
        company_id.toString()
      );
      console.log('Fetched Attendance Data:', data);

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
    console.log('Raw Attendance Data:', attendanceData);

    if (!Array.isArray(attendanceData)) {
      console.error('attendanceData is not an array:', attendanceData);
      return [];
    }

    const query = searchQuery?.trim().toLowerCase();
    if (!query) return attendanceData;

    const result = attendanceData.filter(
      (entry: any) =>
        typeof entry.name === 'string' &&
        entry.name.toLowerCase().includes(query)
    );

    console.log('Filtered Data:', result);
    return result;
  }, [searchQuery, attendanceData]);

  useEffect(() => {
    console.log('Fetched Attendance Data:', attendanceData);
  }, [attendanceData]);

  // Get Attendance Summary
  useEffect(() => {
    if (!company_id) return;

    const fetchSummary = async () => {
      try {
        const data = await getAttendanceSummary(company_id);
        setSummary(data);
      } catch (error) {
        console.error('Failed to load attendance summary.');
      }
    };

    fetchSummary();
  }, [company_id]);

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
        {/*  Show Punch In/Out Button if modal was canceled */}
        <div className=" text-center">
          <button
            className={`rounded px-4 py-2 text-white ${
              isPunchedIn ? 'bg-gray-400' : 'bg-black'
            }`}
            disabled={isPunchedIn}
            onClick={handlePunchIn}
          >
            Punch In
          </button>
          <button
            className={`ml-4 rounded px-4 py-2 text-white ${
              !isPunchedIn ? 'bg-gray-400' : 'bg-black'
            }`}
            disabled={!isPunchedIn}
            onClick={handlePunchOut}
          >
            Punch Out
          </button>
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
            title="Present Summary"
            count={summary.present}
            type="present"
          />
        </div>
        {/* Absentees */}
        <Card
          title="Absent Summary"
          count={summary.absentees}
          type="absentees"
        />

        {/* Late Employees */}
        <Card title="Late Comings" count={summary.late} type="late" />
      </div>

      {/* Filters Section */}
      <div className="mb-6 ml-4 flex  space-x-4">
        {/* Search Bar */}
        <div className="relative flex w-72 items-center rounded-lg shadow-md">
          <div className="relative flex w-72 items-center rounded-lg shadow-md">
            <span className="text-gray-400 absolute pl-4">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search employee"
              value={searchQuery}
              onChange={(e) => {
                console.log('Search Query:', e.target.value); // Debugging log
                setSearchQuery(e.target.value);
              }}
              className="w-full rounded-lg py-2 pl-10 pr-10 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-gray-400 hover:text-gray-600 absolute right-3"
              >
                ✕
              </button>
            )}
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
