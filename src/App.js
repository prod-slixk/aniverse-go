import React, { useState } from 'react';
import './style.css';
import Navbar from './components/Navbar/Navbar';
import TrendingSection from './components/TrendingSection/TrendingSection';
import MovieGrid from './components/MovieGrid/MovieGrid';
import FavoritesPage from './components/Favoritespage/FavoritesPage';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { useMovies } from './hooks/useMovies';
import { useFavorites } from './hooks/useFavorites';
import { useGenreFilter } from './hooks/useGenreFilter';
import { useTrending } from './hooks/useTrending';

/**
 * App - Session 4 with Trending Section
 */
function App() {
  const {
    movies,
    loading,
    error,
    sortType,
    searchMovies,
    sortByYear,
    sortAlphabetically,
    loadMore,
    loadingMore,
    hasMore
  } = useMovies();

  const {
    favorites,
    isFavorite,
    toggleFavorite,
    favoritesCount
  } = useFavorites();

  const {
    selectedGenres,
    availableGenres,
    filteredMovies,
    toggleGenre,
    clearFilters
  } = useGenreFilter(movies);

  const {
    trending,
    loading: trendingLoading
  } = useTrending();

  const [currentView, setCurrentView] = useState('home');

  return (
    <ErrorBoundary>
      <div className="App">
        <Navbar 
          onSearch={searchMovies}
          favoritesCount={favoritesCount}
          onFavoritesClick={() => setCurrentView('favorites')}
        />
        
        <main className="main-content">
          <ErrorBoundary>
            {currentView === 'home' ? (
              <>
                <TrendingSection
                  trendingMovies={trending}
                  loading={trendingLoading}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                />
                
                <MovieGrid
                  movies={filteredMovies}
                  loading={loading}
                  error={error}
                  sortType={sortType}
                  onSortByYear={sortByYear}
                  onSortAlpha={sortAlphabetically}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                  availableGenres={availableGenres}
                  selectedGenres={selectedGenres}
                  onGenreToggle={toggleGenre}
                  onClearFilters={clearFilters}
                  onLoadMore={loadMore}
                  loadingMore={loadingMore}
                  hasMore={hasMore}
                />
              </>
            ) : (
              <FavoritesPage
                favorites={favorites}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                onBackToHome={() => setCurrentView('home')}
              />
            )}
          </ErrorBoundary>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;