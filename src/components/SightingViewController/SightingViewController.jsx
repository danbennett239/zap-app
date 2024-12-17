import React, { useEffect, useState } from 'react';
import useGeoLocation from '../../hooks/useGeoLocation';
import { listSightings } from '../../utils/api/sightingAPI';
import CardView from '../CardView/CardView';
import ListView from '../ListView/ListView';
import FilterComponent from '../Filter/FilterComponent';
import './SightingViewController.css'
import { toast } from 'react-toastify';

const SightingViewController = ({ refreshTrigger }) => {
  // View Selection
  const [selectedView, setSelectedView] = useState(
    localStorage.getItem('selectedView') || 'card');

  // Pagination
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { location, locationError } = useGeoLocation();

  // Fetch data from the API
  const fetchSightings = async () => {
    // Check if online before making API calls
    if (!navigator.onLine) {
      // Offline scenario: Do not call API and do not show error toasts.
      setLoading(false);
      setSightings([]);
      setTotalPages(0);
      return;
    }

    try {
      setLoading(true);
      const listSighting = await listSightings(
        limit,
        offset,
        sortField,
        sortDirection,
        filters
      );
      setSightings(listSighting.sightings);
      setTotalPages(Math.ceil(listSighting.totalCount / limit));
    } catch (error) {
      // Only show error if online (check again to avoid race conditions)
      if (navigator.onLine) {
        toast.error(`Error fetching sightings: ${error.message || 'Unknown error'}`)
      }
      console.error('Error fetching sightings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSightings();
  }, [limit, offset, sortField, sortDirection, filters]);

  useEffect(() => {
    setCurrentPage(1);
    setOffset(0);
    fetchSightings();
  }, [refreshTrigger]);

  // Handle pagination size change
  const handlePageSizeChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
    setOffset(0);
  };

  // Handle filter application
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setOffset(0);
  };

  // Handle sorting
  const handleSort = (field) => {
    const direction =
      sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setOffset((pageNumber - 1) * limit);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // Handle View Change
  const handleViewChange = (view) => {
    setSelectedView(view);
    localStorage.setItem('selectedView', view);
  };

  return (
    <div className="sighting-view-controller">
      {/* Buttons to switch between views */}
      <div className="view-buttons">
        <button
          onClick={() => handleViewChange('card')}
          disabled={selectedView === 'card'}
        >
          Card View
        </button>
        <button
          onClick={() => handleViewChange('list')}
          disabled={selectedView === 'list'}
        >
          List View
        </button>
      </div>

      <h2>Recent Sightings</h2>

      {/* Filter Component */}
      <FilterComponent onApplyFilters={handleApplyFilters} />

      {/* Render the selected view */}
      {selectedView === 'card' ? (
        <CardView
          sightings={sightings}
          loading={loading}
          location={location}
          locationError={locationError}
        />
      ) : (
        <ListView
          sightings={sightings}
          loading={loading}
          location={location}
          locationError={locationError}
          handleSort={handleSort}
        />
      )}

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <label htmlFor="pageSize">Records per page:</label>
        <select
          id="pageSize"
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          value={limit}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1 || totalPages === 0}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SightingViewController;
