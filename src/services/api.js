const API_BASE = 'https://api.jikan.moe/v4';


export const getTopMovies = async (limit = 6, page = 1) => {
  try {
    const response = await fetch(
      `${API_BASE}/top/anime?type=movie&limit=${limit}&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching top movies:', error);
    throw error;
  }
};


export const searchAnime = async (query) => {
  try {
    const response = await fetch(
      `${API_BASE}/anime?q=${encodeURIComponent(query)}&type=movie&limit=12`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search anime');
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
};


export const getAnimeById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/anime/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch anime details');
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    throw error;
  }
};


export const getCurrentSeason = async (limit = 12) => {
  try {
  
    const response = await fetch(
      `${API_BASE}/seasons/now?type=movie&limit=${limit}`
    );
    
    if (!response.ok) {
    
      console.warn('Seasonal API unavailable, using top movies');
      return await getTopMovies(limit);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching seasonal anime, using fallback:', error);
  
    try {
      return await getTopMovies(limit);
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      return [];
    }
  }
};


export const getTopAiring = async (limit = 12) => {
  try {
    const response = await fetch(
      `${API_BASE}/top/anime?filter=airing&limit=${limit}&type=movie`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch top airing');
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching top airing:', error);
    throw error;
  }
};

export default {
  getTopMovies,
  searchAnime,
  getAnimeById,
  getCurrentSeason,
  getTopAiring
};






















