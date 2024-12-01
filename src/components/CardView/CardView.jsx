import React, { useState } from 'react';
import SightingPopup from '../SightingPopup/SightingPopup';
import { getDistanceInKm } from '../../utils/ListView';
import './CardView.css';

const CardView = ({ sightings, loading, location, locationError }) => {
  const [errorImages, setErrorImages] = useState({});
  const [selectedSighting, setSelectedSighting] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleCardClick = (sighting) => {
    setSelectedSighting(sighting);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedSighting(null);
  };

  const handleImageError = (id) => {
    setErrorImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="card-view-container">
      {/* Cards */}
      <div className="card-grid">
        {loading ? (
          <div>Loading...</div>
        ) : sightings?.length > 0 ? (
          sightings.map((sighting, index) => (
            <div
              key={sighting?.id}
              className="card"
              onClick={() => handleCardClick(sighting)}
            >
              <div className="card-photo">
                {errorImages[sighting?.id] || !sighting?.photo ? (
                  <div className="placeholder-photo">
                    {errorImages[sighting?.id] ? 'Image error' : 'No image'}
                  </div>
                ) : (
                  <img
                    src={sighting.photo}
                    alt={`Sighting ${index}`}
                    onError={() => handleImageError(sighting?.id)}
                  />
                )}
              </div>
              <div className={`card-status ${sighting?.status.toLowerCase()}`}>
                {sighting?.status}
              </div>
              <div className="card-details">
                <p>
                  <strong>Mortality Type:</strong>{' '}
                  {sighting?.mortality_type || 'Unknown'}
                </p>
                {!locationError && sighting?.latitude && sighting?.longitude && (
                  <p>
                    <strong>Distance:</strong>{' '}
                    {getDistanceInKm(
                      location?.latitude,
                      location?.longitude,
                      sighting?.latitude,
                      sighting?.longitude
                    )}{' '}
                    KM
                  </p>
                )}
                <p>
                  <strong>Date:</strong> {formatDate(sighting.created_at)}
                </p>
              </div>
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

export default CardView;
