import React, { useEffect } from 'react';
import './MovieDetailModal.css';
import { sanitize } from '../../utils/sanitize';


const MovieDetailModal = ({ movie, onClose, isFavorite, onToggleFavorite }) => {
  // HOOKS MUST COME FIRST - before any early returns
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Early return AFTER hooks
  if (!movie) return null;

  const title = movie.title || 'Unknown Title';
  const poster = movie.images?.jpg?.large_image_url || movie.images?.jpg?.image_url;
  const rating = movie.score ? movie.score.toFixed(1) : 'N/A';
  const synopsis = movie.synopsis || 'No synopsis available.';
  const year = movie.year || movie.aired?.prop?.from?.year || 'N/A';
  const episodes = movie.episodes || 'N/A';
  const duration = movie.duration || 'N/A';
  const status = movie.status || 'Unknown';
  const rank = movie.rank || 'N/A';
  const popularity = movie.popularity || 'N/A';
  const trailer = movie.trailer?.youtube_id;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal-header">
          <div className="modal-poster">
            <img src={poster} alt={`${title} poster`} />
            <button
              className={`modal-favorite-btn ${isFavorite ? 'favorited' : ''}`}
              onClick={() => onToggleFavorite(movie)}
            >
              {isFavorite ? '✓ In Favorites' : '+ Add to Favorites'}
            </button>
          </div>

          <div className="modal-info">
            <h2 className="modal-title">{sanitize(title)}</h2>
            
            <div className="modal-meta">
              <span className="modal-rating">
                <span className="star">★</span> {rating}
              </span>
              <span className="modal-year">{year}</span>
              <span className="modal-status">{status}</span>
            </div>

            <div className="modal-stats">
              <div className="stat-item">
                <span className="stat-label">Rank</span>
                <span className="stat-value">#{rank}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Popularity</span>
                <span className="stat-value">#{popularity}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Episodes</span>
                <span className="stat-value">{episodes}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Duration</span>
                <span className="stat-value">{duration}</span>
              </div>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="modal-genres">
                {movie.genres.map((genre) => (
                  <span key={genre.mal_id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="modal-body">
          <h3>Synopsis</h3>
          <p className="modal-synopsis">{sanitize(synopsis)}</p>

          {trailer && (
            <div className="modal-trailer">
              <h3>Trailer</h3>
              <div className="trailer-container">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer}`}
                  title={`${title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {movie.studios && movie.studios.length > 0 && (
            <div className="modal-studios">
              <h3>Studios</h3>
              <div className="studios-list">
                {movie.studios.map((studio) => (
                  <span key={studio.mal_id} className="studio-tag">
                    {studio.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;