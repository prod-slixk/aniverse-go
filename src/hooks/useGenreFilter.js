import { useState, useMemo } from 'react';

export const useGenreFilter = (movies) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const availableGenres = useMemo(() => {
    const genreSet = new Set();
    movies.forEach(movie => {
      movie.genres?.forEach(g => genreSet.add(g.name));
    });
    return Array.from(genreSet).sort();
  }, [movies]);

  const filteredMovies = useMemo(() => {
    if (selectedGenres.length === 0) return movies;
    
    return movies.filter(movie =>
      selectedGenres.every(selectedGenre =>
        movie.genres?.some(g => g.name === selectedGenre)
      )
    );
  }, [movies, selectedGenres]);

  const toggleGenre = (genre) => {
    if (genre === 'All') {
      setSelectedGenres([]);
    } else {
      setSelectedGenres(prev =>
        prev.includes(genre)
          ? prev.filter(g => g !== genre)
          : [...prev, genre]
      );
    }
  };

  const clearFilters = () => setSelectedGenres([]);

  return {
    selectedGenres,
    availableGenres,
    filteredMovies,
    toggleGenre,
    clearFilters
  };
};






















