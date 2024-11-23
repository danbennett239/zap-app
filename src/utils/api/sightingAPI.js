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

// export const listSightings = async (limit = 10, offset = 0) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/sightings?limit=${limit}&offset=${offset}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     // Check if the response is JSON
//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       const errorText = await response.text(); // Get raw error text
//       throw new Error(`Unexpected response: ${errorText}`);
//     }
//     if (!response.ok) throw new Error('Failed to list sightings');
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error listing sighting', error);
//   }
// }

export const listSightings = async (limit, offset, sortField, sortDirection, filters) => {
  try {
    const params = new URLSearchParams();

    // Pagination parameters
    params.append('limit', limit);
    params.append('offset', offset);

    // Sorting parameters
    if (sortField) {
      params.append('sortField', sortField);
      params.append('sortDirection', sortDirection);
    }

    // Append filters
    for (const [key, value] of Object.entries(filters)) {
      if (value !== '') {
        params.append(key, value);
      }
    }

    const url = `${API_BASE_URL}/sightings?${params.toString()}`;
    console.log('API Request URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const errorText = await response.text(); // Get raw error text
      throw new Error(`Unexpected response: ${errorText}`);
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch sightings: ${errorData.error || response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching sightings', error);
    throw error;
  }
};

export const getSighting = async (sightingId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sightings/${sightingId}`);
    if (!response.ok) throw new Error('Failed to list sightings');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting sighting', error);
  }
}