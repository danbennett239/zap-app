import React, { useState, useEffect } from 'react';
import ListView from '../ListView/ListView';
// import MapView from './MapView'; // Example view component
// import GraphView from './GraphView'; // Example view component
import SightingForm from '../SightingForm';
import './Home.css';

const Home = () => {
  const [currentView, setCurrentView] = useState('list'); // Default to ListView
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshListView, setRefreshListView] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Disable scrolling of background content when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  
    // Clean up the effect when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);
  


  const renderView = () => {
    switch (currentView) {
      // case 'map':
      //   return <MapView />;
      // case 'graph':
      //   return <GraphView />;
      case 'list':
      default:
        return <ListView refreshTrigger={refreshListView}/>;
    }
  };

  const handleSightingCreation = () => {
    setRefreshListView((prev) => !prev);
    closeModal();
  };

  return (
    <div className="home-container">
        <button className="home-create-sighting-btn" onClick={openModal}>
          Create Sighting
        </button>
      <div className="home-view-switcher">
        <button onClick={() => setCurrentView('list')}>List View</button>
        {/* <button onClick={() => setCurrentView('map')}>Map View</button>
        <button onClick={() => setCurrentView('graph')}>Graph View</button> */}
      </div>


      {renderView()}

      {isModalOpen && (
        <div className="home-modal-overlay" onClick={closeModal}>
          <div className="home-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="home-close-btn" onClick={closeModal}>X</button>
            <SightingForm handleSightingCreation={handleSightingCreation}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;