import React, { useEffect } from 'react';
import './Navbar.css';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({ onSearch, favoritesCount = 0, onFavoritesClick }) => {
  // DEBUG: Log when component renders
  useEffect(() => {
    console.log('🔍 NAVBAR - Favorites Count prop:', favoritesCount);
  }, [favoritesCount]);

  const handleLogoError = (e) => {
    console.warn('Logo failed to load, using fallback');
    e.target.style.display = 'none';
    const fallback = document.createElement('div');
    fallback.className = 'logo-fallback';
    fallback.textContent = 'A';
    e.target.parentElement.insertBefore(fallback, e.target);
  };

  const handleFavoritesClick = () => {
    console.log('🔍 NAVBAR - Favorites button clicked!');
    if (onFavoritesClick) {
      onFavoritesClick();
    } else {
      console.error('❌ NAVBAR - onFavoritesClick is undefined!');
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <div className="logo">
          <img 
            src="/assets/logo.png" 
            alt="AniVerse Logo" 
            className="logo-icon"
            onError={handleLogoError}
          />
          <span className="logo-text">
            <span className="logo-ani">Ani</span>Verse
          </span>
        </div>

        <div className="nav-right">
          <SearchBar onSearch={onSearch} />
          
          <button 
            className="favorites-link"
            onClick={handleFavoritesClick}
            aria-label={`View favorites (${favoritesCount} movies)`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {favoritesCount > 0 && (
              <span className="favorites-badge">
                {favoritesCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;