import React, { useEffect, useState } from 'react';
import useGeoLocation from '../../hooks/useGeoLocation';
import { listSightings } from '../../utils/api/sightingAPI';
import { getDistanceInKm } from '../../utils/ListView';
import FilterComponent from '../Filter/FilterComponent';
import './CardView.css';

const CardView = ({ refreshTrigger }) => {
  // Pagination
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const { location, locationError } = useGeoLocation();

  // Fetch data from the API
  useEffect(() => {
    const fetchSightings = async () => {
      try {
        setLoading(true);
        const listSighting = await listSightings(limit, offset, sortField, sortDirection, filters);
        setSightings(listSighting.sightings);
        setTotalPages(Math.ceil(listSighting.totalCount / limit));
      } catch (error) {
        console.error('Error fetching sightings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSightings();
  }, [limit, offset, sortField, sortDirection, filters, refreshTrigger]);

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
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className="card-view-container">
      <h2>Recent Sightings</h2>
      <FilterComponent onApplyFilters={handleApplyFilters} />

      {/* Cards */}
      <div className="card-grid">
        {loading ? (
          <div>Loading...</div>
        ) : sightings.length > 0 ? (
          sightings.map((sighting, index) => (
            <div key={index} className="card">
              <div className="card-photo">
                {imageError || !sighting.photo ? (
                  <div className="placeholder-photo">{imageError ? 'Image error' : 'No image'}</div>
                  
                ) : (
                  <img
                    src={sighting.photo}
                    alt={`Sighting ${index + 1}`}
                    onError={(e) => { setImageError(true) }}
                  />
                )}
              </div>
              <div className={`card-status ${sighting.status.toLowerCase()}`}>
                {sighting.status}
              </div>
              <div className="card-details">
                <p>
                  <strong>Mortality Type:</strong> {sighting.mortalityType || 'Unknown'}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(sighting.createdAt)}
                </p>
                {!locationError && sighting.location && (
                  <p>
                    <strong>Distance:</strong>{' '}
                    {getDistanceInKm(
                      location.latitude,
                      location.longitude,
                      sighting.location.latitude,
                      sighting.location.longitude
                    )}{' '}
                    KM
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No Sightings Available</div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <label htmlFor="pageSize">Records per page:</label>
        <select
          id="pageSize"
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          value={limit}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => {
              setCurrentPage(index + 1);
              setOffset(index * limit);
            }}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardView;
