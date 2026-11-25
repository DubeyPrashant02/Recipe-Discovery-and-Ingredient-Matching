import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

const CUISINES = ['All', 'Indian', 'Italian', 'Chinese', 'American', 'Mexican', 'Mediterranean'];
const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Soup', 'Salad'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];

export default function FilterPanel({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults
}) {
  return (
    <div className="filter-bar-container">
      <div className="filter-main-row">
        {/* Results Counter */}
        <div className="filter-results-count">
          Showing <strong>{totalResults}</strong> recipes matching criteria
        </div>

        {/* Sorting Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Sort By:
          </span>
          <select
            className="custom-select"
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
          >
            <option value="match">Highest Match %</option>
            <option value="time">Lowest Cooking Time</option>
            <option value="missing">Least Missing Ingredients</option>
            <option value="name">Recipe Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Selectors Group */}
      <div className="filter-selectors-group">
        {/* Cuisine Select */}
        <select
          className="custom-select"
          value={filters.cuisine}
          onChange={(e) => onFilterChange('cuisine', e.target.value)}
          title="Select Cuisine"
        >
          {CUISINES.map((c) => (
            <option key={c} value={c}>
              {c === 'All' ? 'All Cuisines' : `${c} Cuisine`}
            </option>
          ))}
        </select>

        {/* Category Select */}
        <select
          className="custom-select"
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          title="Select Meal Category"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Meal Categories' : cat}
            </option>
          ))}
        </select>

        {/* Difficulty Select */}
        <select
          className="custom-select"
          value={filters.difficulty}
          onChange={(e) => onFilterChange('difficulty', e.target.value)}
          title="Select Difficulty"
        >
          {DIFFICULTIES.map((diff) => (
            <option key={diff} value={diff}>
              {diff === 'All' ? 'All Difficulties' : `${diff} Level`}
            </option>
          ))}
        </select>

        {/* Diet Toggle */}
        <div className="filter-pill-toggles">
          <button
            type="button"
            className={`pill-toggle-btn ${filters.diet === 'All' ? 'active' : ''}`}
            onClick={() => onFilterChange('diet', 'All')}
          >
            All
          </button>
          <button
            type="button"
            className={`pill-toggle-btn ${filters.diet === 'Vegetarian' ? 'active' : ''}`}
            onClick={() => onFilterChange('diet', 'Vegetarian')}
          >
            🌱 Veg
          </button>
          <button
            type="button"
            className={`pill-toggle-btn ${filters.diet === 'Non-Vegetarian' ? 'active' : ''}`}
            onClick={() => onFilterChange('diet', 'Non-Vegetarian')}
          >
            🍗 Non-Veg
          </button>
        </div>

        {/* Max Cook Time Quick Filter */}
        <select
          className="custom-select"
          value={filters.maxCookTime || ''}
          onChange={(e) => onFilterChange('maxCookTime', e.target.value || null)}
          title="Maximum Cook Time"
        >
          <option value="">Any Cook Time</option>
          <option value="15">Under 15 Mins</option>
          <option value="25">Under 25 Mins</option>
          <option value="40">Under 40 Mins</option>
        </select>

        {/* Reset Filter Button */}
        <button
          type="button"
          onClick={onResetFilters}
          className="btn-clear-text"
          style={{ marginLeft: 'auto', padding: '0.4rem 0.6rem' }}
          title="Reset all filters to default"
        >
          <RotateCcw size={14} />
          Reset Filters
        </button>
      </div>
    </div>
  );
}

