import React, { useState } from 'react';
import useGeoLocation from '../hooks/useGeoLocation';
import PhotoOptions from './PhotoOptions';
import MortalitySelect from './MortalitySelect';
import { createSighting } from '../utils/api/sightingAPI.js'
import './SightingForm.css';

const SightingForm = () => {
  const { location, locationError } = useGeoLocation();
  const [photo, setPhoto] = useState(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [mortalityType, setMortalityType] = useState('');
  const [customMortalityType, setCustomMortalityType] = useState('');
  const [fenceType, setFenceType] = useState('');
  const [roadType, setRoadType] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const resetMortalityFields = () => {
    setMortalityType('');
    setCustomMortalityType('');
    setFenceType('');
    setRoadType('');
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);  // Toggle the checkbox state
    if (!isChecked) {
      resetMortalityFields();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit the sighting data
    const sightingData = {
      photo: photo,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      status: isChecked ? 'Alive' : 'Dead',
      mortalityType: mortalityType === 'Other' ? customMortalityType : mortalityType,
      additionalNotes: additionalNotes,
      metadata: {
        fenceType: fenceType || null,
        roadType: roadType || null,
      }
    }
    console.log(sightingData);

    try {
      const createdSighting = await createSighting(sightingData);
      console.log('Sighting created successfully', createdSighting);
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <form>
      <h2>Report a Sighting</h2>
      {locationError && <p>Error: {locationError}</p>}
      <button
        type='button'
        onClick={() => { setShowPhotoOptions(!showPhotoOptions) }}
      >
        {photo ? 'Change Photo' : 'Add Photo'}
      </button>


      {/* Show Photo Options (Upload or Camera) */}
      {showPhotoOptions && (
        <PhotoOptions setPhoto={setPhoto} setShowPhotoOptions={setShowPhotoOptions} />
      )}

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
          <input type="text" placeholder="Enter Mortality Type" onChange={(e) => setCustomMortalityType(e.target.value)} />
        </>
      )}

      {(mortalityType === 'Fence Death: Electrocution' || mortalityType === 'Fence Death: Caught on non-electrified fence') && (
        <>
          <input type="text" placeholder="Enter Fence Type" onChange={(e) => setFenceType(e.target.value)} />
        </>
      )}

      {mortalityType === 'Road Death' && (
        <>
          <input type="text" placeholder="Enter Road Type" onChange={(e) => setRoadType(e.target.value)} />
        </>
      )}

      <label>Additional Notes:</label>
      <textarea placeholder='Enter any additional information here' value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} rows='4' cols='50'></textarea>

      <button type='submit' onClick={(e) => handleSubmit(e)}>Submit Sighting</button>
    </form>
  );
}

export default SightingForm;
