import { useState, useCallback } from 'react';


export const usePagination = (fetchFunction) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const result = await fetchFunction(nextPage);
      
      if (!result || result.length === 0) {
        setHasMore(false);
      } else {
        setPage(nextPage);
      }
    } catch (error) {
      console.error('Error loading more:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [page, loadingMore, hasMore, fetchFunction]);

  const reset = useCallback(() => {
    setPage(1);
    setHasMore(true);
    setLoadingMore(false);
  }, []);

  return {
    page,
    hasMore,
    loadingMore,
    loadMore,
    reset
  };
};






















