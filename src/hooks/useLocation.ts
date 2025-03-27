import { useState, useEffect } from 'react';

export const getCoordinates = async (): Promise<{
  lat: number;
  lng: number;
}> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: parseFloat(position.coords.latitude.toFixed(6)), // Round to 6 decimals
          lng: parseFloat(position.coords.longitude.toFixed(6)),
        });
      },
      (error) => {
        console.error('⚠️ Failed to get location:', error);
        reject({ lat: 20.5937, lng: 78.9629 }); // Default to India if GPS fails
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
};

export const useLocation = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    getCoordinates()
      .then(({ lat, lng }) => setPosition([lat, lng]))
      .catch(({ lat, lng }) => setPosition([lat, lng])); // Default location if error
  }, []);

  return position;
};
