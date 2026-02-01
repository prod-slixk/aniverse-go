import { useState, useEffect, useCallback } from 'react';
import { getTopMovies, searchAnime } from '../services/api';


export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchMovies = async (pageNum = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const data = await getTopMovies(6, pageNum);
      
      if (!data || data.length === 0) {
        setHasMore(false);
      } else {
        setMovies(prev => append ? [...prev, ...data] : data);
        setPage(pageNum);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchMovies(page + 1, true);
    }
  }, [page, loadingMore, hasMore]);

  const searchMovies = async (query) => {
    if (!query.trim()) {
      setPage(1);
      setHasMore(true);
      fetchMovies();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await searchAnime(query);
      setMovies(data);
      setHasMore(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sortByYear = () => {
    const sorted = [...movies].sort((a, b) => 
      (b.year || 0) - (a.year || 0)
    );
    setMovies(sorted);
    setSortType('year');
  };

  const sortAlphabetically = () => {
    const sorted = [...movies].sort((a, b) => 
      (a.title || '').localeCompare(b.title || '')
    );
    setMovies(sorted);
    setSortType('alpha');
  };

  return {
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
  };
};
























