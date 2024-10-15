import React, { useState } from 'react';
import useGeoLocation from '../hooks/useGeoLocation';
import './SightingForm.css';

const SightingForm = () => {
  const { location, error } = useGeoLocation();
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);  // Toggle the checkbox state
  };

  return (
    <form>
      {/* {error && <p>Error: {error}</p>} */}
      <label>Status: </label>
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
