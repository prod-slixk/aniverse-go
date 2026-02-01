import React from 'react';
import './MovieGrid.css';
import MovieCard from '../MovieCard/MovieCard';
import FilterButtons from '../FilterButtons/FilterButton';
import GenreFilter from '../GenreFilter/GenreFilter';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';


const MovieGrid = ({ 
  movies, 
  loading, 
  error, 
  sortType,
  onSortByYear,
  onSortAlpha,
  isFavorite,
  onToggleFavorite,
  availableGenres,
  selectedGenres,
  onGenreToggle,
  onClearFilters,
  onLoadMore,
  loadingMore,
  hasMore
}) => {
  if (loading) {
    return (
      <section className="movies-section">
        <p className="loading" role="status">Loading anime movies...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="movies-section">
        <p className="error" role="alert">{error}</p>
      </section>
    );
  }

  const validMovies = movies.filter(movie => movie != null);

  if (validMovies.length === 0) {
    return (
      <section className="movies-section">
        <p className="no-results" role="status">
          {selectedGenres.length > 0 
            ? `No movies found with selected genres.`
            : `No movies found.`
          }
        </p>
      </section>
    );
  }

  return (
    <section className="movies-section">
      <div className="section-header">
        <h2 className="section-title">Popular Anime Movies</h2>
        <FilterButtons
          sortType={sortType}
          onSortByYear={onSortByYear}
          onSortAlpha={onSortAlpha}
        />
      </div>

      <GenreFilter
        genres={availableGenres}
        selectedGenres={selectedGenres}
        onGenreToggle={onGenreToggle}
        onClearFilters={onClearFilters}
      />
      
      <div className="movies-grid" role="list">
        {validMovies.map((movie) => (
          <MovieCard 
            key={movie.mal_id} 
            movie={movie}
            isFavorite={isFavorite(movie.mal_id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      <LoadMoreButton
        onLoadMore={onLoadMore}
        loading={loadingMore}
        hasMore={hasMore}
      />
    </section>
  );
};

export default MovieGrid;