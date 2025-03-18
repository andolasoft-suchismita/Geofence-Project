import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducers';
import { punchIn, punchOut } from '../redux/slices/attendanceSlice';
import { MdCancel } from 'react-icons/md';
import { AppDispatch } from '../redux/store';
import Cookies from 'js-cookie';

const PunchModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // ✅ Type dispatch with AppDispatch
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  // const getCoordinates = async () => {
  //   return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) =>
  //         resolve({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         }),
  //       () => {
  //         alert('⚠️ Failed to get location. Please enable GPS and try again.');
  //         reject({ lat: 0, lng: 0 });
  //       }
  //     );
  //   });
  // };
const getCoordinates = async () => {
  return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // ✅ Store coordinates in cookies for 1 day
        Cookies.set('lat', coords.lat.toString(), { expires: 1 });
        Cookies.set('lng', coords.lng.toString(), { expires: 1 });

        resolve(coords);
        console.log(coords)
      },
      () => {
        alert('⚠️ Failed to get location. Please enable GPS and try again.');
        reject({ lat: 0, lng: 0 });
      }
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

  // const handlePunchIn = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await dispatch(punchIn()).unwrap();
  //     console.log(' Punch In Success:', response);
  //     localStorage.setItem('attendance_id', response.id); //  Store attendance_id
  //   } catch (error) {
  //     console.error(' Punch In Error:', error);
  //     alert(`Punch In Failed: ${JSON.stringify(error, null, 2)}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const handlePunchIn = async () => {
  setLoading(true);
  try {
    const { lat, lng } = await getCoordinates(); // ✅ Get coordinates before punching in

    // ✅ Store coordinates in cookies
    Cookies.set('lat', lat.toString());
    Cookies.set('lng', lng.toString());
    console.log(lat,lng)
    const response = await dispatch(punchIn()).unwrap();
    console.log(' Punch In Success:', response);
    localStorage.setItem('attendance_id', response.id); // Store attendance_id
  } catch (error) {
    console.error(' Punch In Error:', error);
    alert(`Punch In Failed: ${JSON.stringify(error, null, 2)}`);
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
  } catch (error) {
    console.error(' Punch Out Error:', error);
  } finally {
    setLoading(false);
  }
};

  

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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
