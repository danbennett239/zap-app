import React, { useEffect, useState } from 'react';
import { getSighting } from '../../utils/api/sightingAPI';
// import './SightingPopup.css';

const SightingPopup = ({ id, onClose }) => {
  const [sighting, setSighting] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSighting = async () => {
      try {
        const data = await getSighting(id);
        console.log("SightingID", id);
        console.log("Data", data);
        setSighting(data);
      } catch (error) {
        console.error("Error fetching sighting details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSighting();
    console.log("Base64 image data:", sighting?.photo);
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="popup">
      <button onClick={onClose}>Close</button>
      <h3>Sighting Details</h3>
      {sighting.photo ? (
        <img src={sighting.photo} alt="Sighting" style={{ width: '100%', height: 'auto' }} />
        ) : (
          <p>No image available</p>
          )}
      <p>Mortality Type: {sighting.mortality_type}</p>
      {/* Add more details if needed */}
    </div>
  );
};

export default SightingPopup;
