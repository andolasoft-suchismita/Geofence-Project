// import  { useState } from "react";

// const CompanySettings = () => {
//   const [logo, setLogo] = useState(null);

//   // Handle logo upload
//   const handleLogoChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onload = () => setLogo(reader.result);
//       reader.readAsDataURL(file);
//     } else {
//       alert("Please select a valid image file (PNG, JPG, JPEG)");
//     }
//   };

//   return (
//     <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg w-full max-w-6xl">
//       {/* Top Section */}
//       <div className="flex justify-between items-center mb-8">
//         <div className="w-2/3">
//           <label className="block text-lg text-black">Company Name</label>
//           <input
//             type="text"
//             className="w-full p-3 border border-gray-700 rounded-lg focus:outline-blue-500"
//           />
//         </div>
//         <div className="w-1/3 flex justify-end">
//           <label htmlFor="logo-upload" className="cursor-pointer">
//             <div className="border border-gray-300 rounded-full w-24 h-24 flex items-center justify-center bg-gray-100 text-gray-600 overflow-hidden">
//               {logo ? (
//                 <img src={logo} alt="Company Logo" className="w-full h-full object-cover rounded-full" />
//               ) : (
//                 "Upload Logo"
//               )}
//             </div>
//           </label>
//           <input
//             id="logo-upload"
//             type="file"
//             accept="image/png, image/jpeg, image/jpg"
//             className="hidden"
//             onChange={handleLogoChange}
//           />
//         </div>
//       </div>

//       {/* Email and Contact */}
//       <div className="grid grid-cols-2 gap-6 mb-8">
//         <div>
//           <label className="block text-lg text-black">Email</label>
//           <input
//             type="email"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-lg text-black">Contact</label>
//           <input
//             type="text"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500"
//           />
//         </div>
//       </div>

//       {/* Address Section */}
//       <div className="mb-8">
//         <h2 className="text-xl mb-3 text-black">Address</h2>
//         <div className="grid grid-cols-2 gap-6 mb-4">
//           <div>
//             <label className="block text-lg text-black">Address Line 1</label>
//             <input
//               type="text"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-lg text-black">Address Line 2</label>
//             <input
//               type="text"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500"
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-4 gap-6">
//           <div>
//             <label className="block text-lg text-black">Country</label>
//             <input
//               type="text"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-lg text-black">State</label>
//             <input
//               type="text"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-lg text-black">City</label>
//             <input
//               type="text"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-lg text-black">Zip Code</label>
//             <input
//               type="text"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Map Section */}
//       <div className="mb-8">
//         <h2 className="text-xl mb-3 text-black">Location</h2>
//         <div className="w-full h-52 bg-gray-200 flex items-center justify-center border border-gray-300 rounded-lg">
//           Map Placeholder
//         </div>
//       </div>

//       {/* Save and Cancel Buttons */}
//       <div className="flex justify-end gap-4">
//         <button className="px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-500">
//           Cancel
//         </button>
//         <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CompanySettings;

//---------------------------------------------------------------------------------------------------------------------------------------------------------------//

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-control-geocoder";
import { getCompanyDetails } from "../api/services/companyService";
import { updateCompanyLocationAPI } from "../api/services/companyService";


// ✅ Define a custom Leaflet icon
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// ✅ Component to handle map clicks and update position
const LocationMarker = ({ position, setPosition, setLocation }: {
  position: { lat: number; lng: number };
  setPosition: (pos: { lat: number; lng: number }) => void;
  setLocation: (location: string) => void;
}) => {
  const map = useMapEvents({
    click(e) {
      const newPosition = { lat: e.latlng.lat, lng: e.latlng.lng };
      setPosition(newPosition);

      // Reverse Geocode
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newPosition.lat}&lon=${newPosition.lng}`)
        .then((res) => res.json())
        .then((data) => setLocation(data.display_name))
        .catch(() => alert("Failed to get address"));
    },
  });

  useEffect(() => {
    if (position && map) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);


  return position ? <Marker position={position} icon={customIcon} draggable /> : null;
};


const CompanySettings = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const [position, setPosition] = useState<{ lat: number; lng: number }>({ lat: 28.6139, lng: 77.209 });
  const [location, setLocation] = useState<string>("");

  const companyId = 22; // Change dynamically if needed
  // Fetch company details when component mounts or companyId changes
  useEffect(() => {
    getCompanyDetails(companyId)
      .then((data) => {
        setCompanyName(data.company_name);
        setEmail(data.email);
        setPosition({ lat: data.latitude || 28.6139, lng: data.longitude || 77.209 });
        setLogo(data.logo_url || null);
      })
      .catch((error) => console.error("Error:", error));
  }, [companyId]); // Dependency array ensures re-run if companyId changes

  // ✅ Handle logo upload
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file (PNG, JPG, JPEG)");
    }
  };

  // ✅ Handle location search
  // ✅ Handle location search
  const handleSearch = () => {
    const input = (document.getElementById("search-input") as HTMLInputElement).value;
    if (!input) {
      alert("Please enter a location!");
      return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const newPosition = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
          console.log(" New Position from Search:", newPosition);
          setPosition(newPosition);
          setLocation(data[0].display_name);
        } else {
          alert("Location not found");
        }
      })
      .catch(() => alert("Error fetching location"));
  };

  const handleSaveLocation = async () => {
    try {
      if (!position.lat || !position.lng) {
        alert("Please select a valid location");
        return;
      }

      // ✅ Save location to the database
      await updateCompanyLocationAPI(companyId,position.lat, position.lng);

      alert(`Location Saved!\nLatitude: ${position.lat}\nLongitude: ${position.lng}`);
    } catch (error) {
      alert("Failed to save location. Please try again.");
      console.error("Error saving location:", error);
    }
  };


  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg w-full max-w-6xl">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="w-2/3">
          <label className="block text-lg text-black">Company Name</label>
          <input type="text" placeholder="Enter company name" className="w-full p-3 border border-gray-700 rounded-lg focus:outline-blue-500" />
        </div>

        {/* Logo Upload */}
        <div className="w-1/3 flex justify-end">
          <label htmlFor="logo-upload" className="cursor-pointer relative">
            {/* Circular Logo Container */}
            <div className="border border-gray-300 rounded-full w-24 h-24 flex items-center justify-center bg-gray-100 text-gray-600 overflow-hidden relative">
              {logo ? (
                <img src={logo} alt="Company Logo" className="w-full h-full object-cover rounded-full" />
              ) : (
                <span className="text-xs text-center">Upload Logo</span> // Centered text when no logo
              )}

              {/* Plus Sign
      <div className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-lg border-2 border-white shadow-md translate-x-1/2 translate-y-1/2">
        +
      </div> */}
            </div>
          </label>

          <input id="logo-upload" type="file" accept="image/png, image/jpeg, image/jpg" className="hidden" onChange={handleLogoChange} />
        </div>

      </div>

      {/* Email and Contact */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-lg text-black">Email</label>
          <input type="email" placeholder="Enter email address" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500" />
        </div>
        <div>
          <label className="block text-lg text-black">Contact</label>
          <input type="text" placeholder="Enter contact number" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500" />
        </div>
      </div>

      {/* Address Section */}
      <div className="mb-8">
        <h2 className="text-xl mb-3 text-black">Address</h2>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-lg text-black">Address Line 1</label>
            <input type="text" placeholder="Address Line 1" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500" />
          </div>
          <div>
            <label className="block text-lg text-black">Address Line 2</label>
            <input type="text" placeholder="Address Line 2" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <label className="block text-lg text-black">Country</label>
            <input type="text" placeholder="Enter country" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500" />
          </div>
          <div>
            <label className="block text-lg text-black">State</label>
            <input type="text" placeholder="Enter state" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500" />
          </div>
          <div>
            <label className="block text-lg text-black">City</label>
            <input type="text" placeholder="Enter city" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500" />
          </div>
          <div>
            <label className="block text-lg text-black">Zip Code</label>
            <input type="text" placeholder="Enter zip code" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500" />
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mb-8 relative">
        <h2 className="text-xl mb-3 text-black">Location</h2>

        {/* 🔍 Search Input */}
        <div className="flex gap-2 mb-4">
          <input id="search-input" type="text"
            placeholder="Search location..."
            className="p-3 text-sm border w-3/4 rounded-lg focus:outline-blue-500" />
          <button onClick={handleSearch} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm ">Search</button>
          {/* console.log("Search button clicked!") */}
          <button
            onClick={handleSaveLocation}
            className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm"
          >
            Save Location
          </button>
        </div>

        {/* 🗺️ Map */}
        <MapContainer center={position} zoom={12} style={{ height: "250px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker position={position} setPosition={setPosition} setLocation={setLocation} />
        </MapContainer>


        {/* Save and Cancel Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button type="button" className="px-6 py-3 bg-red text-white rounded-lg hover:bg-red-600">Cancel</button>
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
        </div>
      </div>
    </div>

  );
};

export default CompanySettings;



