import React, { useRef, useState } from 'react';
import useGeoLocation from '../hooks/useGeoLocation';
import PhotoOptions from './PhotoOptions';
import MortalitySelect from './MortalitySelect';
import './SightingForm.css';

const SightingForm = () => {
  const { location, error } = useGeoLocation();
  const [photo, setPhoto] = useState(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [canvasVisible, setCanvasVisible] = useState(false);
  const canvasRef = useRef(null);

  const [mortalityType, setMortalityType] = useState('');
  const [customMortalityType, setCustomMortalityType] = useState('');

  const handleToggle = () => {
    setIsChecked(!isChecked);  // Toggle the checkbox state
  };

  return (
    <form>
      {/* {error && <p>Error: {error}</p>} */}
      <label>Status: </label>
      <button
        type='button'
        onClick={() => { setShowPhotoOptions(!showPhotoOptions) }}
      >
        {photo ? 'Change Photo' : 'Add Photo'}
      </button>


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

      {!isChecked && (
        <MortalitySelect value={mortalityType} onChange={(e) => setMortalityType(e.target.value)} />
      )}

      {mortalityType === 'Other' && (
        <>
          <input type="text" placeholder="Mortality Type" onChange={(e) => setCustomMortalityType(e.target.value)} />
          <p>{customMortalityType}</p>
        </>
      )}

      {(mortalityType === 'Fence Death: Electrocution' || mortalityType === 'Fence Death: Caught on non-electrified fence') && (
        <>
          <input type="text" placeholder="Fence Type" />
        </>
      )}

      {mortalityType === 'Road Death' && (
        <>
          <input type="text" placeholder="Road Type" />
        </>
      )}

    </form>
  );
}

export default SightingForm;
