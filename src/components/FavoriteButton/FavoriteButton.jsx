import React from 'react';
import './FavoriteButton.css';

const FavoriteButton = ({ isFavorite, onToggle, movieTitle }) => {
  return (
    <button
      className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={
        isFavorite 
          ? `Remove ${movieTitle} from favorites` 
          : `Add ${movieTitle} to favorites`
      }
      aria-pressed={isFavorite}
    >
      {isFavorite ? (
    
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ) : (
    
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      )}
    </button>
  );
};

export default FavoriteButton;