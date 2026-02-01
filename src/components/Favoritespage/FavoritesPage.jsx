import React from 'react';
import './FavoritesPage.css';
import MovieCard from '../MovieCard/MovieCard';


const FavoritesPage = ({ favorites, isFavorite, onToggleFavorite, onBackToHome }) => {
  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <button 
          className="back-btn"
          onClick={onBackToHome}
          aria-label="Back to home"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>
        
        <h1 className="favorites-title">My Favorites</h1>
        
        <p className="favorites-count">
          {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'}
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <h2>No favorites yet</h2>
          <p>Start adding movies to your favorites by clicking the + icon</p>
          <button className="browse-btn" onClick={onBackToHome}>
            Browse Movies
          </button>
        </div>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.mal_id}
              movie={movie}
              isFavorite={isFavorite(movie.mal_id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
