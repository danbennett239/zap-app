import React, { useState } from 'react';
import useGeoLocation from '../hooks/useGeoLocation';
import PhotoOptions from './PhotoOptions';
import './SightingForm.css';

const SightingForm = () => {
  const [photo, setPhoto] = useState(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);

  const { location, error } = useGeoLocation();
  const [isChecked, setIsChecked] = useState(false);



  const handleToggle = () => {
    setIsChecked(!isChecked);  // Toggle the checkbox state
  };

  return (
    <form>
      {/* {error && <p>Error: {error}</p>} */}
      <label>Status: </label>

      {/* Add Photo Button */}
      <div>
        <button
          type="button"
          onClick={() => setShowPhotoOptions(!showPhotoOptions)}
        >
          Add Photo
        </button>
      </div>

      {/* Show Photo Options (Upload or Camera) */}
      {showPhotoOptions && (
        <PhotoOptions setPhoto={setPhoto} />
      )}

      {/* Display the captured or uploaded photo */}
      {photo && (
        <div>
          <h4>Preview:</h4>
          <img src={photo} alt="Captured" width="300" />
        </div>
      )}



      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={handleToggle} />
        <span className="slider round">
          {isChecked ? 'Alive' : 'Dead'}
        </span>
      </label>

      {isChecked && (
        <>
          <label> Mortality Type:</label>
          <select>
            <option value="1"></option>
            <option value="1"></option>
            <option value="1"></option>
            <option value="1"></option>
          </select>
        </>
      )}
    </form>
  );
}

export default SightingForm;
