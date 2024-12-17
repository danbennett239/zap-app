import React, { useState } from 'react';
import SightingForm from '../SightingForm';
import SightingViewController from '../SightingViewController/SightingViewController';
import './Home.css';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshView, setRefreshView] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const handleSightingCreation = () => {
    if (navigator.onLine) {
      setRefreshView((prev) => !prev); // Refresh the current view
    }
    closeModal();
  };

  return (
    <div className="home-container">
      <button className="home-create-sighting-btn" onClick={openModal}>
        Create Sighting
      </button>
      
      <SightingViewController refreshTrigger={refreshView}/>

      {isModalOpen && (
        <div className="home-modal-overlay" onClick={closeModal}>
          <div className="home-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="home-close-btn" onClick={closeModal}>
              X
            </button>
            <SightingForm handleSightingCreation={handleSightingCreation} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
