// TODO
// Add way to filter by new / updated or new routes for new / updated
// Clean up error handing by passing object back -> can then create toast
// Add .env

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

export const listSightings = async (limit = 10, offset = 0) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sightings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to list sightings');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error listing sighting', error);
  }
}

export const getSighting = async (sightingId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sighting/${sightingId}`);
    if (!response.ok) throw new Error('Failed to list sightings');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting sighting', error);
  }
}