import React from 'react';
import { MORTALITY_OPTIONS } from '../utils/mortalityOptions';

const MortalitySelect = ({ value, onChange }) => {
  return (
    <>
      <label>Mortality Type:</label>
      <select value={value} onChange={onChange}>
        {MORTALITY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default MortalitySelect;