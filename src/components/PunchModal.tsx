import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducers';
import {
  punchIn,
  punchOut,
  setPunchStatus,
} from '../redux/slices/attendanceSlice';
import { AppDispatch } from '../redux/store';
import { showToast } from '../utils/toast';

interface PunchModalProps {
  isInsideGeofence: boolean;
  loading: boolean;
}

const PunchModal: React.FC<PunchModalProps> = ({ isInsideGeofence, loading }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isPunchedIn = useSelector((state: RootState) => state.attendance.isPunchedIn);
  const user_id = useSelector((state: RootState) => state.authSlice.user_id);
  const attendanceRecords = useSelector((state: RootState) => state.attendance?.[user_id] || []);

  // console.log('Redux State ->', { isPunchedIn, attendanceRecords });

  const getCoordinates = async () => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: parseFloat(position.coords.latitude.toFixed(6)),
            lng: parseFloat(position.coords.longitude.toFixed(6)),
          });
        },
        (error) => {
          console.error('Geolocation Error:', error);
          alert('⚠️ Failed to get location. Please enable GPS and try again.');
          reject({ lat: 0, lng: 0 });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  };

  const handlePunchIn = async () => {
    try {
      const { lat, lng } = await getCoordinates();
      const check_in = new Date().toISOString();

      console.log('Punching In ->', { lat, lng, check_in });

      const response = await dispatch(punchIn({ lat, lng, check_in })).unwrap();
      console.log('Punch In Response:', response);

      dispatch(setPunchStatus(true));
      showToast('Successfully Punched In!');
    } catch (error) {
      console.error('Punch In Error:', error);
      alert(`Punch In Failed: ${JSON.stringify(error, null, 2)}`);
    }
  };

  const handlePunchOut = async () => {
    try {
      if (!attendanceRecords || attendanceRecords.length === 0) {
        alert('⚠️ No attendance record found. Please try again.');
        return;
      }

      // Ensure latest record is fetched correctly
      const latestAttendance = [...attendanceRecords].sort((a, b) => 
        new Date(b.check_in).getTime() - new Date(a.check_in).getTime()
      )[0];

      if (!latestAttendance) {
        alert('⚠️ No valid attendance record found.');
        return;
      }

      console.log('Punching Out ->', latestAttendance);

      await dispatch(punchOut({ attendance_id: latestAttendance.attendance_id, check_out: new Date().toISOString() })).unwrap();

      dispatch(setPunchStatus(false));
      showToast('Successfully Punched Out!');
    } catch (error) {
      console.error('Punch Out Error:', error);
      alert(`Punch Out Failed: ${JSON.stringify(error, null, 2)}`);
    }
  };

  return (
   
   
    <div className="relative mt-[-50px]">
     
      <button
        onClick={isPunchedIn ? handlePunchOut : handlePunchIn}
        disabled={!isInsideGeofence || loading}
        className={`flex h-14 w-40 items-center rounded-full px-2 shadow-lg transition-all duration-300
          ${isInsideGeofence ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
          ${isPunchedIn ? 'bg-[#f7832b]' : 'bg-green-600'}
        `}
      >
        <div
          className={`h-10 w-10 rounded-full bg-white shadow-md transition-transform duration-300 
            ${isPunchedIn ? 'translate-x-[110px]' : 'translate-x-0'}
          `}
        />
        <span className="absolute left-1/2 -translate-x-1/2 transform whitespace-nowrap text-sm font-bold text-white">
          {isPunchedIn ? 'Punch Out' : 'Punch In'}
        </span>
      </button>
    </div>
  
  );
};

export default PunchModal;

