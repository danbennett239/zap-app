import React, { useState } from 'react';
import { getDistanceInKm } from '../../utils/ListView';
import SightingPopup from '../SightingPopup/SightingPopup';
import './ListView.css';

const ListView = ({
  sightings,
  loading,
  location,
  locationError,
  handleSort,
}) => {
  const [selectedSighting, setSelectedSighting] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleRowClick = (sighting) => {
    setSelectedSighting(sighting);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedSighting(null);
  };

  // Format date to dd/mm/yy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="list-view">
      <div className="list-table">
        <div className="list-header">
          <span onClick={() => handleSort('status')}>Status</span>
          <span onClick={() => handleSort('mortality_type')}>Mortality Type</span>
          <span onClick={() => handleSort('additional_notes')}>
            Additional Notes
          </span>
          {!locationError && <span>Distance</span>}
          <span onClick={() => handleSort('created_at')}>Spotted date</span>
        </div>

        {loading ? (
          <div className="loading-container">
            <img src="loading.gif" alt="Loading..."></img>
          </div>
        ) : !navigator.onLine ? (
          // Offline scenario
          <div>No Sightings Available While Offline</div>
        ) : sightings?.length ? (
          sightings.map((sighting) => (
            <div
              key={sighting.id}
              className="list-row"
              onClick={() => handleRowClick(sighting)}
            >
              <span>{sighting.status}</span>
              <span>{sighting.mortality_type}</span>
              <span>{sighting.additional_notes}</span>
              {!locationError && (
                <span>
                  {getDistanceInKm(
                    location.latitude,
                    location.longitude,
                    sighting.latitude,
                    sighting.longitude
                  )}{' '}
                  KM
                </span>
              )}
              <span>{formatDate(sighting.created_at)}</span>
            </div>
          ))
        ) : (
          <div>No Sightings Available</div>
        )}
      </div>
      {isPopupOpen && selectedSighting && (
        <SightingPopup sighting={selectedSighting} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default ListView;
