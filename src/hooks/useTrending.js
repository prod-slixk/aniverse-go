import { useState, useEffect } from 'react';
import { getCurrentSeason } from '../services/api';


export const useTrending = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
    
        await new Promise(resolve => setTimeout(resolve, 500));
        const data = await getCurrentSeason(12);
        setTrending(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching trending:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return { trending, loading, error };
};












































