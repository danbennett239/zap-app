import React, { useRef, useState } from 'react';
import useGeoLocation from '../hooks/useGeoLocation';
import PhotoOptions from './PhotoOptions';
import './SightingForm.css';

const SightingForm = () => {
  const { location, error } = useGeoLocation();
  const [photo, setPhoto] = useState(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [canvasVisible, setCanvasVisible] = useState(false);
  const canvasRef = useRef(null);

  // Function to open photo options and reset canvas visibility
  const handleOpenPhotoOptions = () => {
    setCanvasVisible(true);  // Make sure the canvas is visible again
    setShowPhotoOptions(true);
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);  // Toggle the checkbox state
  };

  return (
    <form>
      {/* {error && <p>Error: {error}</p>} */}
      <label>Status: </label>

      {/* Add Photo Button */}
      {photo ? (
        <div>
          <button
            type='button'
            onClick={() => setShowPhotoOptions(!showPhotoOptions)}>
            Change Photo
          </button>
        </div>
      ) : (
        <div>
          <button
            type='button'
            onClick={() => setShowPhotoOptions(!showPhotoOptions)}
          >
            Add Photo
          </button>
        </div>
      )}


      {/* Show Photo Options (Upload or Camera) */}
      {showPhotoOptions && (
        <PhotoOptions setPhoto={setPhoto} setShowPhotoOptions={setShowPhotoOptions} setCanvasVisible={setCanvasVisible} canvasRef={canvasRef} />
      )}

      <div>
        {canvasVisible && <h4>Live Video:</h4>}
        {/* Render the canvas always, but hide it if a photo is captured */}
        <canvas
          ref={canvasRef}
          width="300"
          height="200"
          style={{ display: canvasVisible ? 'inline' : 'none' }}
        />
      </div>

      {photo && (
        <div>
          <h4>Preview:</h4>
          {/* Display the captured photo via an img tag */}
          <img src={photo} alt="Captured" width="300" height="200" />
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
