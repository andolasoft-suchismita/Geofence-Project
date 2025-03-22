import React, { useEffect, useState } from 'react';
 
const Base64ImageDisplay = () => {
  const [base64Image, setBase64Image] = useState('');
 
  useEffect(() => {
    // Fetch Base64 string from the backend (example using fetch)
    const fetchBase64Image = async () => {
      try {
        const response = await fetch('https://example.com/api/get-image');
        const data = await response.json();
        setBase64Image(data.base64Image); // Assuming the base64 string is in data.base64Image
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
 
    fetchBase64Image();
  }, []);
 
  return (
<div>
      {base64Image ? (
<img src={`data:image/jpeg;base64,${base64Image}`} alt="Fetched Image" />
      ) : (
<p>Loading image...</p>
      )}
</div>
  );
};
 
export default Base64ImageDisplay;