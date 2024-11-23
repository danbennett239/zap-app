import React, { useState } from 'react';
import './FilterComponent.css';

const FilterComponent = ({ onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Initial filter state
  const initialFilters = {
    status_eq: '',
    mortality_type_like: '',
    fence_type_eq: '',
    road_type_eq: '',
    additional_notes_like: '',
    latitude_gte: '',
    latitude_lte: '',
    longitude_gte: '',
    longitude_lte: '',
    created_at_gte: '',
    created_at_lte: '',
  };

  const [filters, setFilters] = useState(initialFilters);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    // Remove empty filters before applying
    const appliedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );
    console.log('Applied filters', appliedFilters);
    onApplyFilters(appliedFilters);
    setIsOpen(false); // Close the filter dropdown
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    onApplyFilters({}); // Reset filters
  };

  return (
    <div className="filter-component">
      <button className="toggle-filter" onClick={toggleFilter}>
        {isOpen ? '-' : '+'} Filter
      </button>
      <div className={`filter-dropdown ${isOpen ? 'open' : ''}`}>
        <div className="filter-form">
          {/* Status Filter */}
          <label>
            Status:
            <select
              name="status_eq"
              value={filters.status_eq}
              onChange={handleInputChange}
            >
              <option value="">All</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
            </select>
          </label>

          {/* Mortality Type Filter */}
          <label>
            Mortality Type:
            <input
              type="text"
              name="mortality_type_like"
              placeholder="e.g., Fence"
              value={filters.mortality_type_like}
              onChange={handleInputChange}
            />
          </label>

          {/* Fence Type Filter */}
          <label>
            Fence Type:
            <input
              type="text"
              name="fence_type_eq"
              placeholder="e.g., Electric"
              value={filters.fence_type_eq}
              onChange={handleInputChange}
            />
          </label>

          {/* Road Type Filter */}
          <label>
            Road Type:
            <input
              type="text"
              name="road_type_eq"
              placeholder="e.g., Highway"
              value={filters.road_type_eq}
              onChange={handleInputChange}
            />
          </label>

          {/* Additional Notes Filter */}
          <label>
            Notes Includes:
            <input
              type="text"
              name="additional_notes_like"
              placeholder="Search notes"
              value={filters.additional_notes_like}
              onChange={handleInputChange}
            />
          </label>

          {/* Latitude Filters */}
          <label>
            Latitude (&gt;=):
            <input
              type="number"
              name="latitude_gte"
              placeholder="Min Latitude"
              value={filters.latitude_gte}
              onChange={handleInputChange}
              step="any"
            />
          </label>
          <label>
            Latitude (&lt;=):
            <input
              type="number"
              name="latitude_lte"
              placeholder="Max Latitude"
              value={filters.latitude_lte}
              onChange={handleInputChange}
              step="any"
            />
          </label>

          {/* Longitude Filters */}
          <label>
            Longitude (&gt;=):
            <input
              type="number"
              name="longitude_gte"
              placeholder="Min Longitude"
              value={filters.longitude_gte}
              onChange={handleInputChange}
              step="any"
            />
          </label>
          <label>
            Longitude (&lt;=):
            <input
              type="number"
              name="longitude_lte"
              placeholder="Max Longitude"
              value={filters.longitude_lte}
              onChange={handleInputChange}
              step="any"
            />
          </label>

          {/* Created At Filters */}
          <label>
            Created At (&gt;=):
            <input
              type="date"
              name="created_at_gte"
              value={filters.created_at_gte}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Created At (&lt;=):
            <input
              type="date"
              name="created_at_lte"
              value={filters.created_at_lte}
              onChange={handleInputChange}
            />
          </label>

          {/* Apply and Clear Buttons */}
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
