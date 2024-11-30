import React, { useState } from 'react';
import { getDistanceInKm } from '../../utils/ListView';
import './CardView.css';

const CardView = ({ sightings, loading, location, locationError }) => {
  const [imageError, setImageError] = useState(false);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className="card-view-container">
      {/* Cards */}
      <div className="card-grid">
        {loading ? (
          <div>Loading...</div>
        ) : sightings?.length > 0 ? (
          sightings.map((sighting, index) => (
            <div key={index} className="card">
              <div className="card-photo">
                {imageError || !sighting.photo ? (
                  <div className="placeholder-photo">
                    {imageError ? 'Image error' : 'No image'}
                  </div>
                ) : (
                  <img
                    src={sighting.photo}
                    alt={`Sighting ${index + 1}`}
                    onError={() => {
                      setImageError(true);
                    }}
                  />
                )}
              </div>
              <div className={`card-status ${sighting.status.toLowerCase()}`}>
                {sighting.status}
              </div>
              <div className="card-details">
                <p>
                  <strong>Mortality Type:</strong>{' '}
                  {sighting.mortalityType || 'Unknown'}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(sighting.createdAt)}
                </p>
                {!locationError && sighting.location && (
                  <p>
                    <strong>Distance:</strong>{' '}
                    {getDistanceInKm(
                      location.latitude,
                      location.longitude,
                      sighting.location.latitude,
                      sighting.location.longitude
                    )}{' '}
                    KM
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No Sightings Available</div>
        )}
      </div>
    </div>
  );
};

export default CardView;
