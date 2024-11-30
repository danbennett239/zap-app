import React, { useState, useEffect } from 'react';
import ListView from '../ListView/ListView';
import SightingForm from '../SightingForm';
import CardView from '../CardView/CardView';
import './Home.css';

const Home = () => {
  const [currentView, setCurrentView] = useState('card');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshView, setRefreshView] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderView = () => {
    switch (currentView) {
      case 'card':
        return <CardView refreshTrigger={refreshView} />;
      case 'list':
      default:
        return <ListView refreshTrigger={refreshView} />;
    }
  };

  const handleSightingCreation = () => {
    setRefreshView((prev) => !prev); // Refresh the current view
    closeModal();
  };

  return (
    <div className="home-container">
      <button className="home-create-sighting-btn" onClick={openModal}>
        Create Sighting
      </button>
      <div className="home-view-switcher">
        <button
          className={currentView === 'card' ? 'active-view' : ''}
          onClick={() => setCurrentView('card')}
        >
          Card View
        </button>
        <button
          className={currentView === 'list' ? 'active-view' : ''}
          onClick={() => setCurrentView('list')}
        >
          List View
        </button>
      </div>

      {renderView()}

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
