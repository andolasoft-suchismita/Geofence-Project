import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducers';
import { punchIn, punchOut } from '../redux/slices/attendanceSlice';
import { MdCancel } from 'react-icons/md';
import { AppDispatch } from '../redux/store';
import { showToast } from '../utils/toast';
const PunchModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); //  Type dispatch with AppDispatch
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

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

  const user_id = useSelector((state: RootState) => state.authSlice.user_id);
  const userAttendance = useSelector(
    (state: RootState) => state.attendance[user_id] || []
  );

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

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative rounded-lg bg-white p-6 text-center shadow-lg">
          <button
            className="text-gray-600 hover:text-gray-900 absolute right-3 top-3 text-xl"
            onClick={() => setShowModal(false)}
          >
            <MdCancel />
          </button>

          <h2 className="mb-4 text-xl font-semibold">Punch Attendance</h2>
          <button
            className={`rounded px-4 py-2 text-white ${
              isPunchedIn ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'
            }`}
            disabled={isPunchedIn || loading}
            onClick={handlePunchIn}
          >
            {loading ? 'Processing...' : 'Punch In'}
          </button>
          <button
            className={`ml-4 rounded px-4 py-2 text-white ${
              !isPunchedIn ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'
            }`}
            disabled={!isPunchedIn || loading}
            onClick={handlePunchOut}
          >
            {loading ? 'Processing...' : 'Punch Out'}
          </button>
        </div>
      </div>
    )
  );
};

export default PunchModal;
