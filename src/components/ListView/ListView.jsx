// Distance -> current location to spotting
// Mobile Status Mortality Type and Spotted Date
// Arrows next to column headers which corrolate to asc/desc
// Ability to expand number, 25, 50, 75, 100
// Pagination
// Filtering can be component
// Filtering i.e. mortality type = fence

// Pop up up using GET to give more information on spotting
// Within this workout the nearest town ?


import React, { useEffect, useState } from 'react';
import useGeoLocation from '../../hooks/useGeoLocation';
import { listSightings } from '../../utils/api/sightingAPI';
import { getDistanceInKm } from '../../utils/ListView';
import './ListView.css';

const ListView = () => {
  const { location, error } = useGeoLocation();
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const fetchSightings = async () => {
      try {
        const listSighting = await listSightings(25, 0);
        setSightings(listSighting.sightings);
      } catch (error) {
        console.error("Error fetching sightings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSightings();
  }, []);

  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);

    const sortedData = [...sightings].sort((a, b) => {
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSightings(sortedData);
  };

  // Format date to dd/mm/yy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };


  if (loading) return <p>Loading...</p>; // Loading gif

  return (
    <div className="list-view">
      <h2>Recent Sightings</h2>
      <div className="list-table">
        <div className="list-header">
          <span onClick={() => handleSort('status')}>Status</span>
          <span onClick={() => handleSort('mortality_type')}>Mortality Type</span>
          <span onClick={() => handleSort('additional_notes')}>Additional Notes</span>
          {!error && (
            <span>Distance</span> // Handle sort
          )}
          <span onClick={() => handleSort('created_at')}>Spotted date</span>
        </div>
        {sightings.map((sighting) => (
          <div className="list-row" key={sighting.id}>
            <span>{sighting.status}</span>
            <span>{sighting.mortality_type}</span>
            <span>{sighting.additional_notes}</span>
            {!error && (
              <span>{getDistanceInKm(location.latitude, location.longitude, sighting.latitude, sighting.longitude)} KM</span>
            )}
            <span>{formatDate(sighting.created_at)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListView;
