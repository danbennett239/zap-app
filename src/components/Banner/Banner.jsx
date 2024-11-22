import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={`banner ${menuOpen ? 'banner--menu-open' : ''}`}>
      <div className="banner__content">
        <div className="banner__logo">
          <img
            src="/pangolin.png"
            alt="Pangolin Icon"
            className="banner__icon"
          />
          <h1 className="banner__title">Pangolens</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="banner__nav">
          <ul className="banner__nav-links">
            <li className="banner__nav-item">
              <Link to="/" className="banner__nav-link">Home</Link>
            </li>
            <li className="banner__nav-item">
              <Link to="/api-docs" className="banner__nav-link">API Documentation</Link>
            </li>
            <li className="banner__nav-item">
              <Link to="/about" className="banner__nav-link">About Pangolins</Link>
            </li>
          </ul>
        </nav>

        {/* Hamburger Menu Button */}
        <button className="banner__hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <span className="banner__hamburger-icon"></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="banner__mobile-nav">
          <ul className="banner__mobile-nav-links">
            <li className="banner__mobile-nav-item">
              <Link to="/" className="banner__mobile-nav-link" onClick={toggleMenu}>Home</Link>
            </li>
            <li className="banner__mobile-nav-item">
              <Link to="/api-docs" className="banner__mobile-nav-link" onClick={toggleMenu}>API Documentation</Link>
            </li>
            <li className="banner__mobile-nav-item">
              <Link to="/about" className="banner__mobile-nav-link" onClick={toggleMenu}>About Pangolins</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Banner;
