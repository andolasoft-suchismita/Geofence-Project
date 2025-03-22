const DetailsModal = ({ event, setIsOpen }) => {
    if (!event) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-[1001]">
          <h2 className="text-lg font-bold mb-4">
            {event.type === "holiday" ? "Holiday Details" : "Event Details"}
          </h2>
  
          {/* Common Details */}
          <p><strong>Name:</strong> {event.title}</p>
          <p><strong>Date:</strong> {new Date(event.start).toLocaleDateString()}</p>
  
          {/* Holiday-Specific Details */}
          {event.type === "holiday" && (
            <>
              <p><strong>Day:</strong> {event.day}</p>
              <p><strong>Type:</strong> {event.type}</p>
            </>
          )}
  
          {/* Event-Specific Details */}
          {event.type === "event" && (
            <>
              <p><strong>Time:</strong> {new Date(event.start).toLocaleTimeString()} - {new Date(event.end).toLocaleTimeString()}</p>
              <p><strong>Type:</strong> {event.type}</p>
            </>
          )}
  
          {/* Description */}
          <p className="mt-1"><strong>Description:</strong> {event.description || "No Description"}</p>
  
          {/* Close Button */}
          <button onClick={() => setIsOpen(false)} className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md w-full">
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default DetailsModal;
  