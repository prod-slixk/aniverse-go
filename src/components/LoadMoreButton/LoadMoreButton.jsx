import React from 'react';
import './LoadMoreButton.css';


const LoadMoreButton = ({ onLoadMore, loading, hasMore }) => {
  if (!hasMore) {
    return (
      <div className="load-more-container">
        <p className="end-message">You've reached the end!</p>
      </div>
    );
  }

  return (
    <div className="load-more-container">
      <button
        className="load-more-btn"
        onClick={onLoadMore}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Loading...
          </>
        ) : (
          'Load More Movies'
        )}
      </button>
    </div>
  );
};

export default LoadMoreButton;