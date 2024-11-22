import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <img
        src={'/pangolin.png'}
        alt="Pangolin Icon"
        className="banner-icon"
      />
      <h1 className="banner-title">Pangolens</h1>
    </div>
  );
};

export default Banner;
