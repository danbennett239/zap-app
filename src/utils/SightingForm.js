// // SightingForm.js

// // Define the base URL for the API
const API_BASE_URL = 'http://localhost/zap-app/api';

// Function to create a new sighting (POST request)
export const createSighting = async (sightingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sightings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sightingData),
    });
    if (!response.ok) throw new Error('Failed to create sighting');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating sighting:', error);
  }
};

// export const createSighting = async (sightingData) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/sightings`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(sightingData),
//     });

//     // Check if the response is JSON
//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       const errorText = await response.text();
//       throw new Error(`Unexpected response: ${errorText}`);
//     }

//     if (!response.ok) throw new Error('Failed to create sighting');

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error creating sighting:', error);
//     throw error;
//   }
// };
