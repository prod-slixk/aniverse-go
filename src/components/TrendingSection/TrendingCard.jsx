import React from 'react';
import './TrendingCard.css';
import { sanitize } from '../../utils/sanitize';
import FavoriteButton from '../FavoriteButton/FavoriteButton';


const TrendingCard = ({ movie, isFavorite, onToggleFavorite }) => {
  if (!movie) return null;

  const title = movie.title || 'Unknown Title';
  const poster = movie.images?.jpg?.large_image_url || 
                 movie.images?.jpg?.image_url || 
                 'https://via.placeholder.com/225x350?text=No+Image';
  const rating = movie.score ? movie.score.toFixed(1) : 'N/A';
  
  const safeTitle = sanitize(title);

  return (
    <div className="trending-card">
      <div className="trending-poster-container">
        <img 
          src={poster} 
          alt={`${title} poster`}
          className="trending-poster"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/225x350?text=No+Image';
          }}
        />
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={() => onToggleFavorite(movie)}
          movieTitle={title}
        />
      </div>
      <div className="trending-info">
        <h3 className="trending-card-title">{safeTitle}</h3>
        <div className="trending-rating">
          <span className="star">★</span>
          <span>{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;