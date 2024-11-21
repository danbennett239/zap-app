import React, { useState } from 'react';
import './FilterComponent.css'; // Add styles for the dropdown and transitions

const FilterComponent = ({ onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    mortalityType: '',
    latitudeGte: '',
    latitudeLte: '',
    createdAtGte: '',
    createdAtLte: '',
  });

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters); // Pass filters back to parent component
    setIsOpen(false); // Close the filter dropdown
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      mortalityType: '',
      latitudeGte: '',
      latitudeLte: '',
      createdAtGte: '',
      createdAtLte: '',
    });
    onApplyFilters({}); // Reset filters
  };

  return (
    <div className="filter-component">
      <button className="toggle-filter" onClick={toggleFilter}>
        {isOpen ? '-' : '+'} Filter
      </button>
      <div className={`filter-dropdown ${isOpen ? 'open' : ''}`}>
        <div className="filter-form">
          <label>
            Status:
            <select name="status" value={filters.status} onChange={handleInputChange}>
              <option value="">All</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
            </select>
          </label>
          <label>
            Mortality Type:
            <input
              type="text"
              name="mortalityType"
              placeholder="e.g., Fence"
              value={filters.mortalityType}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Latitude (&gt;=):
            <input
              type="number"
              name="latitudeGte"
              placeholder="Min Latitude"
              value={filters.latitudeGte}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Latitude (&lt;=):
            <input
              type="number"
              name="latitudeLte"
              placeholder="Max Latitude"
              value={filters.latitudeLte}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Created At (&gt;=):
            <input
              type="date"
              name="createdAtGte"
              value={filters.createdAtGte}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Created At (&lt;=):
            <input
              type="date"
              name="createdAtLte"
              value={filters.createdAtLte}
              onChange={handleInputChange}
            />
          </label>
          <div className="filter-buttons">
            <button className="apply-button" onClick={handleApplyFilters}>
              Apply Filters
            </button>
            <button className="clear-button" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
