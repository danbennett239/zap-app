// Distance -> current location to spotting
// Mobile Status Mortality Type and Spotted Date
// Arrows next to column headers which corrolate to asc/desc
// Ability to expand number, 25, 50, 75, 100
// Pagination
// Filtering can be component
// Filtering i.e. mortality type = fence

// Pop up up using GET to give more information on spotting
// Within this workout the nearest town ?


import React, { useEffect, useState } from 'react';
import useGeoLocation from '../../hooks/useGeoLocation';
import { listSightings } from '../../utils/api/sightingAPI';
import { getDistanceInKm } from '../../utils/ListView';
import SightingPopup from '../SightingPopup/SightingPopup';
import FilterComponent from '../Filter/FilterComponent';
import Pagination from '../Pagination/Pagination';
import './ListView.css';



const ListView = ({ refreshTrigger }) => {
  // Pagination
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({});

  const [selectedSightingId, setSelectedSightingId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { location, locationError } = useGeoLocation();
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // TODO: api call made twice on initial load
  useEffect(() => {
    const fetchSightings = async () => {
      try {
        setLoading(true);
        console.log('Fetching Sighting with Filters', filters);
        const listSighting = await listSightings(limit, offset, sortField, sortDirection, filters);
        setSightings(listSighting.sightings);
        setTotalPages(Math.ceil(listSighting.totalCount / limit));
      } catch (error) {
        console.error("Error fetching sightings:", error);
      } finally {
        setLoading(false);
      }
    };
    console.log("Making API call");
    fetchSightings();
  }, [limit, offset, sortField, sortDirection, filters, refreshTrigger]);

  const handlePageSizeChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
    setOffset(0);
  };

  const handleRowClick = (sightingId) => {
    setSelectedSightingId(sightingId);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedSightingId(null);
  };

  const handleApplyFilters = (newFilters) => {
    console.log('Received Filters in ListView', newFilters);
    setFilters(newFilters);
    setCurrentPage(1);
    setOffset(0);
  }

  // TODO - sorts current page, sort all data
  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);

    const sortedData = [...sightings].sort((a, b) => {
      if (field === 'distance' && location && !locationError) {
        const distanceA = getDistanceInKm(location.latitude, location.longitude, a.latitude, a.longitude);
        const distanceB = getDistanceInKm(location.latitude, location.longitude, b.latitude, b.longitude);
        return direction === 'asc' ? distanceA - distanceB : distanceB - distanceA;
      }
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSightings(sortedData);
  };

  // Format date to dd/mm/yy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

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

  // TODO add no sightings available
  // TODO loading gif causing stutters


  // if (loading) return <img src='../public/loading.gif' alt='Loading...'></img>;

  return (
    <div className="list-view">
      <h2>Recent Sightings</h2>
      <FilterComponent onApplyFilters={handleApplyFilters} />
      <div className="list-table">
        <div className="list-header">
          <span onClick={() => handleSort('status')}>Status</span>
          <span onClick={() => handleSort('mortality_type')}>Mortality Type</span>
          <span onClick={() => handleSort('additional_notes')}>Additional Notes</span>
          {!locationError && (
            <span onClick={() => handleSort('distance')}>Distance</span>
          )}
          <span onClick={() => handleSort('created_at')}>Spotted date</span>
        </div>
        {sightings.map((sighting) => (
          <div key={sighting.id} className="list-row" onClick={() => handleRowClick(sighting.id)}>
            <span>{sighting.status}</span>
            <span>{sighting.mortality_type}</span>
            <span>{sighting.additional_notes}</span>
            {!locationError && (
              <span>{getDistanceInKm(location.latitude, location.longitude, sighting.latitude, sighting.longitude)} KM</span>
            )}
            <span>{formatDate(sighting.created_at)}</span>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSize={limit}
      />
      {isPopupOpen && selectedSightingId && (
        <div className="modal-overlay" onClick={handleClosePopup}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleClosePopup}>X</button>
            <SightingPopup id={selectedSightingId} />
          </div>
        </div>
      )}
    </div>

  );
};

export default ListView;
