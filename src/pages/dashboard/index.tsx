import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheckInData } from "../../redux/slices/Attendanceslice";
import { RootState } from "../../redux/store";
import { checkIn } from "../../api/services/attendanceService";

function DashboardHome() {
  const dispatch = useDispatch();
  const checkInData = useSelector((state: RootState) => state.attendance.checkInData);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!checkInData) {
      dispatch(setCheckInData(null));
    }
  }, [dispatch, checkInData]);
  
  const handleClockIn = async () => {
    setIsLoading(true);
    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const currentTime = new Date().toISOString(); // Full timestamp

    const checkInData = {
      date:currentDate,
      check_in:currentTime
    }

    try {
      console.log("Sending Check-in Request...");
      const responseData = await checkIn(checkInData);
      
      dispatch(setCheckInData(responseData)); // Store in Redux
      console.log("Successfully stored in Redux:", responseData);
      setMessage(" Check-in successful!");
    } catch (error) {
      setMessage("Check-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative p-5">
      <h2 className="text-xl font-semibold">Dashboard Home</h2>
      <button
        onClick={handleClockIn}
        disabled={isLoading || checkInData !== null}
        className="absolute top-5 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
      >
        {isLoading ? "Checking In..." : "Clock-In"}
      </button>
      {message && <p className="mt-4 text-lg">{message}</p>}
      {checkInData && (
        <div className="mt-2 text-sm text-gray-700">
          <p>✅ Checked in at: {new Date(checkInData.check_in).toLocaleTimeString()}</p>
          <p>📅 Date: {checkInData.date}</p>
          <p>📌 Status: {checkInData.status}</p>
        </div>
      )}
    </div>
  );
}

export default DashboardHome;
