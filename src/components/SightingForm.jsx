import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useGeoLocation from '../hooks/useGeoLocation';
import PhotoOptions from './PhotoOptions';
import MortalitySelect from './MortalitySelect';
import { createSighting } from '../utils/api/sightingAPI.js'
import './SightingForm.css';

const SightingForm = ({ handleSightingCreation }) => {
  const { location, locationError } = useGeoLocation();
  const [photo, setPhoto] = useState(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [mortalityType, setMortalityType] = useState('');
  const [customMortalityType, setCustomMortalityType] = useState('');
  const [fenceType, setFenceType] = useState('');
  const [roadType, setRoadType] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [manualLatitude, setManualLatitude] = useState('');
  const [manualLongitude, setManualLongitude] = useState('');


  useEffect(() => {
    console.log('Location', location.latitude);
    console.log('Location Error', locationError);
  }, [isChecked]);

  const resetMortalityFields = () => {
    setMortalityType('');
    setCustomMortalityType('');
    setFenceType('');
    setRoadType('');
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      resetMortalityFields();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sightingData = {
      photo: photo,
      location: {
        latitude: locationError ? manualLatitude : location?.latitude,
        longitude: locationError ? manualLongitude : location?.longitude,
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
      if (!createdSighting) {
        toast.error('Invalid response from the server. Please try again.')
      } else {
        toast.success('Sighting created successfully!');

        if (handleSightingCreation) {
          handleSightingCreation();
        }
      }

    } catch (error) {
      toast.error('Error creating sighting', error);
    }
  }

  return (
    <div className='sighting-form'>
      <form>
        <h2>Report a Sighting</h2>
        <button
          type='button'
          className='photo-options-button'
          onClick={() => { setShowPhotoOptions(!showPhotoOptions) }}
        >
          {photo ? 'Change Photo' : 'Add Photo'}
        </button>


        {/* Show Photo Options (Upload or Camera) */}
        {showPhotoOptions && (
          <PhotoOptions
            setPhoto={setPhoto}
            setShowPhotoOptions={setShowPhotoOptions}
          />
        )}

        {photo && (
          <div>
            <h4>Preview:</h4>
            {/* Display the captured photo via an img tag */}
            {/* TODO remove width and height - uploaded img need to be scaled here*/}
            <img src={photo} alt="Captured" width="300" height="200" />
          </div>
        )}

        <label className="sighting-form-switch">
          <input type="checkbox" checked={isChecked} onChange={handleToggle} />
          <span className="sighting-form-slider round">
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

        {locationError && (
          <>
            {/* TODO Add max width for location error and make error red */}
            <p>Error with location detection: {locationError}</p>
            <p>Please enter latitude and longitude manually:</p>
            <label>Latitude:</label>
            <input type='text' placeholder='Enter Latitude' onChange={(e) => setManualLatitude(e.target.value)}></input>
            <label>Longitude:</label>
            <input type='text' placeholder='Enter Longitude' onChange={(e) => setManualLongitude(e.target.value)}></input>
          </>
        )}

        <label>Additional Notes:</label>
        <textarea placeholder='Enter any additional information here' value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} rows='4' cols='50'></textarea>

        <button type='submit' onClick={(e) => handleSubmit(e)}>Submit Sighting</button>
      </form>
    </div>
  );
}

export default SightingForm;
