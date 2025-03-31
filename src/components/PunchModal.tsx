import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducers';
import {
  punchIn,
  punchOut,
  setPunchStatus,
} from '../redux/slices/attendanceSlice';
import { AppDispatch } from '../redux/store';

import { toast } from 'react-toastify';

interface PunchModalProps {
  isInsideGeofence: boolean;
  loading: boolean;
}

const PunchModal: React.FC<PunchModalProps> = ({
  isInsideGeofence,
  loading,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isPunchedIn = useSelector(
    (state: RootState) => state.attendance.isPunchedIn
  );
  // console.log('isPunchedIn dashboard', isPunchedIn);

  const user_id = useSelector((state: RootState) => state.authSlice.user_id);
  const attendanceRecords = useSelector(
    (state: RootState) => state.attendance?.[user_id] || []
  );

  const getCoordinates = async () => {
    console.log('called');
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log({ position });
          resolve({
            lat: parseFloat(position.coords.latitude.toFixed(6)),
            lng: parseFloat(position.coords.longitude.toFixed(6)),
          });
        },
        (error) => {
          console.error('Geolocation Error:', error);
          toast.error('Failed to get location. Please enable GPS and try again.');
          reject({ lat: 0, lng: 0 });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  };

  const handlePunchIn = async () => {
    try {
      const { lat, lng } = await getCoordinates();
      console.log('Punching In ->', { lat, lng });
      const check_in = new Date().toISOString();

      const response = await dispatch(punchIn({ lat, lng, check_in })).unwrap();

      dispatch(setPunchStatus(true));
      localStorage.setItem('attendance_id', response.id);
      toast.success('Successfully Punched In!');
    } catch (error) {
      toast.error(`Punch In Failed: ${JSON.stringify(error, null, 2)}`);
      // alert(`Punch In Failed: ${JSON.stringify(error, null, 2)}`);
    }
  };

  const handlePunchOut = async () => {
    try {
      const attendance_id = localStorage.getItem('attendance_id');
      if (!attendance_id) {
        toast.error('No active attendance record found. Please try again.');
        return;
      }

      const response = await dispatch(
        punchOut({
          attendance_id,
          check_out: new Date().toISOString(),
        })
      ).unwrap();

      dispatch(setPunchStatus(false));
      localStorage.removeItem('attendance_id'); // Clear the attendance_id from localStorage
      toast.success('Successfully Punched Out!');
      
      
    } catch (error) {
      console.error('Punch Out Error:', error);
      toast.error(`Punch Out Failed: ${JSON.stringify(error, null, 2)}`);
    }
  };

  return (
    <div className="relative mt-[-50px]">
      <button
        onClick={isPunchedIn ? handlePunchOut : handlePunchIn}
        disabled={!isInsideGeofence || loading}
        className={`flex h-14 w-40 items-center rounded-full px-2 shadow-lg transition-all duration-300
          ${
            isInsideGeofence
              ? 'cursor-pointer'
              : 'cursor-not-allowed opacity-50'
          }
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
