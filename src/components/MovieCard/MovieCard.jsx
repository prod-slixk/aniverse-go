import React from 'react';
import './MovieCard.css';
import { sanitize } from '../../utils/sanitize';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {

  if (!movie) {
    console.warn('MovieCard received undefined movie prop');
    return null;
  }


  const title = movie.title || 'Unknown Title';
  const poster = movie.images?.jpg?.large_image_url || 
                 movie.images?.jpg?.image_url || 
                 'https://via.placeholder.com/300x400?text=No+Image';
  const rating = movie.score ? movie.score.toFixed(1) : 'N/A';
  const synopsis = movie.synopsis || 'No description available.';
  

  const safeTitle = sanitize(title);
  const safeSynopsis = sanitize(synopsis);

  return (
    <article className="movie-card">
      <div className="movie-poster-container">
        <img 
          src={poster} 
          alt={`${title} poster`}
          className="movie-poster"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
        
        {/* Favorite Button - Plus icon in corner */}
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={() => onToggleFavorite(movie)}
          movieTitle={title}
        />
      </div>

      <div className="movie-info">
        <h3 className="movie-title">
          {safeTitle}
        </h3>
        <div className="movie-rating" aria-label={`Rating: ${rating} out of 10`}>
          <span className="star" aria-hidden="true">★</span>
          <span>{rating}</span>
        </div>
        <p className="movie-description">
          {safeSynopsis}
        </p>
      </div>
    </article>
  );
};

export default MovieCard;