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
import SightingPopup from '../SightingPopup/SightingPopup';
import './ListView.css';



const ListView = ({ refreshTrigger }) => {
  // Pagination
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);

  const [selectedSightingId, setSelectedSightingId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { location, locationError } = useGeoLocation();
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // TODO: api call made twice on initial load
  useEffect(() => {
    const fetchSightings = async () => {
      try {
        const listSighting = await listSightings(limit, offset);
        setSightings(listSighting.sightings);
      } catch (error) {
        console.error("Error fetching sightings:", error);
      } finally {
        setLoading(false);
      }
    };
    console.log("Making API call");
    fetchSightings();
  }, [limit, offset, refreshTrigger]);

  const handleRowClick = (sightingId) => {
    setSelectedSightingId(sightingId);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedSightingId(null);
  };

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

  const nextPage = () => {
    setOffset(offset + limit);
  }

  const previousPage = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
    }
  }

  const checkLastPage = () => { }


  if (loading) return <img src='../public/loading.gif' alt='Loading...'></img>; 

  return (
    <div className="list-view">
      <h2>Recent Sightings</h2>
      <div className="list-table">
        <div className="list-header">
          <span onClick={() => handleSort('status')}>Status</span>
          <span onClick={() => handleSort('mortality_type')}>Mortality Type</span>
          <span onClick={() => handleSort('additional_notes')}>Additional Notes</span>
          {!locationError && (
            <span>Distance</span> // Handle sort
          )}
          <span onClick={() => handleSort('created_at')}>Spotted date</span>
        </div>
        {sightings.map((sighting) => (
          <div key={sighting.id} className="list-row" onClick={() => handleRowClick(sighting.id)}>
            <span>{sighting.status}</span>
            <span>{sighting.mortality_type}</span>
            <span>{sighting.additional_notes}</span>
            {!locationError && (
              <span>{getDistanceInKm(location.latitude, location.longitude, sighting.latitude, sighting.longitude)} KM</span>
            )}
            <span>{formatDate(sighting.created_at)}</span>
          </div>
        ))}
      </div>
      {/* Need an ID or a Name */}
      <select onChange={(e) => setLimit(e.target.value)}>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="75">75</option>
        <option value="100">100</option>
      </select>
      {/* Maybe grey out instead? */}
      {offset != 0 &&
        <button>Previous Page</button>
      }
      {/* Check len of return and make sure there is a next page */}
      <button onClick={(e) => nextPage()}>Next Page</button>

      {/* {isPopupOpen && selectedSightingId && (
        <SightingPopup id={selectedSightingId} onClose={handleClosePopup} />
      )} */}
      {isPopupOpen && selectedSightingId && (
        <div className="modal-overlay" onClick={handleClosePopup}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleClosePopup}>X</button>
            <SightingPopup id={selectedSightingId} onClose={handleClosePopup} />
          </div>
        </div>
      )}
    </div>

  );
};

export default ListView;
