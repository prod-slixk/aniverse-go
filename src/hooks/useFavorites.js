import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    // Initialize state from localStorage immediately
    try {
      const stored = localStorage.getItem('aniverse_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  });


  const [isFirstRender, setIsFirstRender] = useState(true);
  
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    
    try {
      localStorage.setItem('aniverse_favorites', JSON.stringify(favorites));
      console.log('💾 Saved to localStorage:', favorites.length, 'favorites');
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites, isFirstRender]);


  const addFavorite = (movie) => {
    if (!isFavorite(movie.mal_id)) {
      setFavorites(prev => [...prev, movie]);
    }
  };


  const removeFavorite = (movieId) => {
    setFavorites(prev => prev.filter(m => m.mal_id !== movieId));
  };


  const toggleFavorite = (movie) => {
    if (isFavorite(movie.mal_id)) {
      removeFavorite(movie.mal_id);
    } else {
      addFavorite(movie);
    }
  };


  const isFavorite = (movieId) => {
    return favorites.some(m => m.mal_id === movieId);
  };


  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  };
};






















