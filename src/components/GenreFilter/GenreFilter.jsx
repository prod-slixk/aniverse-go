import React from 'react';
import './GenreFilter.css';

const GenreFilter = ({ genres, selectedGenres, onGenreToggle, onClearFilters }) => {
  const allGenres = ['All', ...genres];

  return (
    <div className="genre-filter">
      <div className="genre-buttons">
        {allGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => onGenreToggle(genre)}
            className={`genre-btn ${selectedGenres.includes(genre) || (genre === 'All' && selectedGenres.length === 0) ? 'active' : ''}`}
            aria-pressed={selectedGenres.includes(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
      {selectedGenres.length > 0 && (
        <button className="clear-filters" onClick={onClearFilters}>
          Clear Filters ({selectedGenres.length})
        </button>
      )}
    </div>
  );
};

export default GenreFilter;