import React from 'react';
import './TrendingSection.css';
import TrendingCard from './TrendingCard';


const TrendingSection = ({ 
  trendingMovies, 
  loading, 
  isFavorite, 
  onToggleFavorite,
  onMovieClick
}) => {
  if (loading) {
    return (
      <section className="trending-section">
        <h2 className="trending-title">🔥 Trending Now</h2>
        <p className="trending-loading">Loading trending anime...</p>
      </section>
    );
  }

  if (!trendingMovies || trendingMovies.length === 0) {
    return null;
  }

  return (
    <section className="trending-section">
      <h2 className="trending-title">🔥 Trending Now</h2>
      <div className="trending-scroll">
        {trendingMovies.map((movie) => (
          <TrendingCard
            key={movie.mal_id}
            movie={movie}
            isFavorite={isFavorite(movie.mal_id)}
            onToggleFavorite={onToggleFavorite}
            onClick={() => onMovieClick(movie)}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;