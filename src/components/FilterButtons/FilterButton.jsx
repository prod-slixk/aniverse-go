import React from 'react';
import './FilterButton.css';


const FilterButtons = ({ sortType, onSortByYear, onSortAlpha }) => {
  return (
    <div className="filter-buttons" role="group" aria-label="Sort options">
      <button
        onClick={onSortByYear}
        className={`filter-btn ${sortType === 'year' ? 'active' : ''}`}
        aria-pressed={sortType === 'year'}
        aria-label="Sort by year, newest first"
      >
        Sort by Year
      </button>
      <button
        onClick={onSortAlpha}
        className={`filter-btn ${sortType === 'alpha' ? 'active' : ''}`}
        aria-pressed={sortType === 'alpha'}
        aria-label="Sort alphabetically"
      >
        Sort A-Z
      </button>
    </div>
  );
};

export default FilterButtons;