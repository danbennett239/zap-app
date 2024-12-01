import React from 'react';
import './SightingPopup.css';

// TODO on wide images fix X button overlapping

const SightingPopup = ({ sighting, onClose }) => {
  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sighting-details-title"
      >
        {/* Close Button */}
        <button className="close-btn" onClick={onClose} aria-label="Close">
          &times;
        </button>

        {/* Popup Content */}
        <div className="popup-grid">
          {/* Image Section */}
          <div className="popup-image">
            {sighting?.photo ? (
              <img src={sighting?.photo} alt="Sighting" />
            ) : (
              <div className="placeholder-photo">No Image Available</div>
            )}
          </div>

          {/* Information Section */}
          <div className="popup-info">
            <h3 id="sighting-details-title">Sighting Details</h3>
            <div className="info-row">
              <span className="info-title">Status:</span>
              <span className="info-value">{sighting?.status || 'N/A'}</span>
            </div>
            {/* Conditionally render fields */}
            {sighting?.status === 'Dead' && (
              <div className="info-row">
                <span className="info-title">Mortality Type:</span>
                <span className="info-value">{sighting?.mortality_type || 'N/A'}</span>
              </div>
            )}
            {sighting?.fence_type && (
              <div className="info-row">
                <span className="info-title">Fence Type:</span>
                <span className="info-value">{sighting?.fence_type || 'N/A'}</span>
              </div>
            )}
            {sighting?.road_type && (
              <div className="info-row">
                <span className="info-title">Road Type:</span>
                <span className="info-value">{sighting?.road_type || 'N/A'}</span>
              </div>
            )}
            {sighting?.additional_notes && (
              <div className="info-row">
                <span className="info-title">Additional Notes:</span>
                <span className="info-value">{sighting?.additional_notes || 'N/A'}</span>
              </div>
            )}
            <div className="info-row">
              <span className="info-title">Latitude:</span>
              <span className="info-value">{sighting?.latitude || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-title">Longitude:</span>
              <span className="info-value">{sighting?.longitude || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-title">Created At:</span>
              <span className="info-value">{formatDate(sighting?.created_at) || 'No Date Available'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SightingPopup;
