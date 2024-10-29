import React, { useEffect, useState } from 'react';
import { listSightings } from '../../utils/api/sightingAPI';

const ListView = () => {
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSightings = async () => {
      try {
        const listSighting = await listSightings(25, 0);
        setSightings(listSighting); // Set the sightings data
      } catch (error) {
        console.error("Error fetching sightings:", error);
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchSightings();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="list-view">
      <h2>Recent Sightings</h2>
      <ul>
        {sightings.map((sighting) => (
          <li key={sighting.id}>
            <p><strong>Location:</strong> {sighting.location.latitude}, {sighting.location.longitude}</p>
            <p><strong>Status:</strong> {sighting.status}</p>
            <p><strong>Mortality Type:</strong> {sighting.mortalityType}</p>
            <p><strong>Notes:</strong> {sighting.additionalNotes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
