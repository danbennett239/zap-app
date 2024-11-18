import React, { useEffect, useState } from 'react';
import { getSighting } from '../../utils/api/sightingAPI';
// import './SightingPopup.css';

const SightingPopup = ({ id }) => {
  const [sighting, setSighting] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSighting = async () => {
      try {
        const data = await getSighting(id);
        console.log(JSON.stringify(data));
        setSighting(data);
      } catch (error) {
        console.error("Error fetching sighting details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSighting();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="popup">
      <h3>Sighting Details</h3>
      {sighting.photo ? (
        <img src={sighting.photo} alt="Sighting" style={{ width: '100%', height: 'auto' }} />
        ) : (
          <p>No image available</p>
          )}
      <p>Mortality Type: {sighting.mortality_type}</p>
      <p>Lat: {sighting.latitude}</p>
      <p>Long: {sighting.longitude}</p>
      <p>Fence Type: {sighting.fence_type}</p>
      <p>Road Type: {sighting.road_type}</p>
      <p>Status: {sighting.status}</p>
      <p>Additional Notes: {sighting.addition_notes}</p>
      <p>Created At: {sighting.created_at}</p>
    </div>
  );
};

export default SightingPopup;
