import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import useGeoLocation from '../hooks/useGeoLocation';
import PhotoOptions from './PhotoOptions';
import MortalitySelect from './MortalitySelect';
import { createSighting } from '../utils/api/sightingAPI.js';
import { sightingValidationSchema } from '../utils/SightingForm.js';
import './SightingForm.css';

const SightingForm = ({ handleSightingCreation }) => {
  const { location, locationError } = useGeoLocation();
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      photo: null,
      status: 'Dead',
      isChecked: false,
      mortalityType: '',
      customMortalityType: '',
      fenceType: '',
      roadType: '',
      additionalNotes: '',
      location: {
        latitude: '',
        longitude: '',
      },
      locationError: locationError,
    },
    validationSchema: sightingValidationSchema,
    onSubmit: async (values) => {
      const sightingData = {
        photo: values.photo,
        location: {
          latitude: locationError ? values.location.latitude : location?.latitude,
          longitude: locationError ? values.location.longitude : location?.longitude,
        },
        status: values.isChecked ? 'Alive' : 'Dead',
        mortalityType:
          values.mortalityType === 'Other' ? values.customMortalityType : values.mortalityType,
        additionalNotes: values.additionalNotes,
        metadata: {
          fenceType: values.fenceType || null,
          roadType: values.roadType || null,
        },
      };

      try {
        const createdSighting = await createSighting(sightingData);
        if (!createdSighting) {
          toast.error('Invalid response from the server. Please try again.');
        } else {
          toast.success('Sighting created successfully!');

          if (handleSightingCreation) {
            handleSightingCreation();
          }
        }
      } catch (error) {
        toast.error(`Error creating sighting: ${error.message}`);
      }
    },
  });

  // Handle toggle for Alive/Dead status
  const handleToggle = () => {
    const newIsChecked = !formik.values.isChecked;
    formik.setFieldValue('isChecked', newIsChecked);
    const newStatus = newIsChecked ? 'Alive' : 'Dead';
    formik.setFieldValue('status', newStatus);
    
    if (newIsChecked) {
      // If switched to 'Alive', reset mortality-related fields
      formik.setFieldValue('mortalityType', '');
      formik.setFieldValue('customMortalityType', '');
      formik.setFieldValue('fenceType', '');
      formik.setFieldValue('roadType', '');
    }
  };

  // Handle photo selection from PhotoOptions component
  const handlePhotoSelect = (photo) => {
    formik.setFieldValue('photo', photo);
    console.log("PhotoT", photo.data);
  };

  return (
    <div className="sighting-form">
      <form onSubmit={formik.handleSubmit}>
        <h2>Report a Sighting</h2>
        <button
          type="button"
          className="photo-options-button"
          onClick={() => {
            setShowPhotoOptions(!showPhotoOptions);
          }}
        >
          {formik.values.photo ? 'Change Photo' : 'Add Photo'}
        </button>

        {/* Show Photo Options (Upload or Camera) */}
        {showPhotoOptions && (
          <PhotoOptions
            setPhoto={handlePhotoSelect}
            setShowPhotoOptions={setShowPhotoOptions}
          />
        )}

        {formik.values.photo && (
          <div>
            <h4>Preview:</h4>
            <img src={formik.values.photo} alt="Captured"/>
          </div>
        )}
        {formik.touched.photo && formik.errors.photo && (
          <div className="error">{formik.errors.photo}</div>
        )}

        <label className="sighting-form-switch">
          <input
            type="checkbox"
            checked={formik.values.isChecked}
            onChange={handleToggle}
          />
          <span className="sighting-form-slider round">
            {formik.values.isChecked ? 'Alive' : 'Dead'}
          </span>
        </label>

        {!formik.values.isChecked && (
          <>
            <MortalitySelect
              value={formik.values.mortalityType}
              onChange={(e) => formik.setFieldValue('mortalityType', e.target.value)}
            />
            {formik.touched.mortalityType && formik.errors.mortalityType && (
              <div className="error">{formik.errors.mortalityType}</div>
            )}
          </>
        )}

        {formik.values.mortalityType === 'Other' && (
          <>
            <input
              type="text"
              placeholder="Enter Mortality Type"
              name="customMortalityType"
              value={formik.values.customMortalityType}
              onChange={formik.handleChange}
            />
            {formik.touched.customMortalityType && formik.errors.customMortalityType && (
              <div className="error">{formik.errors.customMortalityType}</div>
            )}
          </>
        )}

        {(formik.values.mortalityType === 'Fence Death: Electrocution' ||
          formik.values.mortalityType === 'Fence Death: Caught on non-electrified fence') && (
          <>
            <input
              type="text"
              placeholder="Enter Fence Type"
              name="fenceType"
              value={formik.values.fenceType}
              onChange={formik.handleChange}
            />
          </>
        )}

        {formik.values.mortalityType === 'Road Death' && (
          <>
            <input
              type="text"
              placeholder="Enter Road Type"
              name="roadType"
              value={formik.values.roadType}
              onChange={formik.handleChange}
            />
          </>
        )}

        {locationError && (
          <>
            <p className="error">Error with location detection: {locationError}</p>
            <p>Please enter latitude and longitude manually:</p>
            <label>Latitude:</label>
            <input
              type="text"
              placeholder="Enter Latitude"
              name="location.latitude"
              value={formik.values.location.latitude}
              onChange={formik.handleChange}
            />
            {formik.touched.location?.latitude && formik.errors.location?.latitude && (
              <div className="error">{formik.errors.location.latitude}</div>
            )}
            <label>Longitude:</label>
            <input
              type="text"
              placeholder="Enter Longitude"
              name="location.longitude"
              value={formik.values.location.longitude}
              onChange={formik.handleChange}
            />
            {formik.touched.location?.longitude && formik.errors.location?.longitude && (
              <div className="error">{formik.errors.location.longitude}</div>
            )}
          </>
        )}

        <label>Additional Notes:</label>
        <textarea
          placeholder="Enter any additional information here"
          name="additionalNotes"
          value={formik.values.additionalNotes}
          onChange={formik.handleChange}
          rows="4"
          cols="50"
        ></textarea>
        {formik.touched.additionalNotes && formik.errors.additionalNotes && (
          <div className="error">{formik.errors.additionalNotes}</div>
        )}

        <button type="submit">Submit Sighting</button>
      </form>
    </div>
  );
};

export default SightingForm;
