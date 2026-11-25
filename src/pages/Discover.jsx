import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { filterAndRankRecipes } from '../utils/matchingEngine';
import RecipeCard from '../components/RecipeCard';
import FilterPanel from '../components/FilterPanel';
import { Search, Compass, RotateCcw, Sparkles } from 'lucide-react';

export default function Discover() {
  const { recipes, selectedIngredients, globalSearch, setGlobalSearch } = useRecipes();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter state
  const [filters, setFilters] = useState(() => ({
    searchQuery: globalSearch || '',
    cuisine: searchParams.get('cuisine') || 'All',
    category: searchParams.get('category') || 'All',
    diet: searchParams.get('diet') || 'All',
    maxCookTime: searchParams.get('maxCookTime') || null,
    difficulty: searchParams.get('difficulty') || 'All',
    sortBy: 'match'
  }));

  // Sync global search into filters when changed from navbar
  useEffect(() => {
    if (globalSearch !== filters.searchQuery) {
      setFilters((prev) => ({ ...prev, searchQuery: globalSearch }));
    }
  }, [globalSearch]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      cuisine: 'All',
      category: 'All',
      diet: 'All',
      maxCookTime: null,
      difficulty: 'All',
      sortBy: 'match'
    });
    setGlobalSearch('');
    setSearchParams({});
  };

  // Run filtering & ranking algorithm
  const filteredRecipes = useMemo(() => {
    return filterAndRankRecipes(recipes, selectedIngredients, filters);
  }, [recipes, selectedIngredients, filters]);

  return (
    <div className="discover-page page-wrapper animate-fade-in">
      {/* Page Title & Intro */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--olive-600)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <Compass size={17} />
          <span>Recipe Catalogue</span>
        </div>
        <h1 style={{ fontSize: '2.6rem', color: 'var(--olive-900)', marginTop: '0.3rem' }}>
          Discover Recipes
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '0.4rem', maxWidth: '780px' }}>
          Explore our collection of 45+ delicious dishes from world cuisines. Recipes are sorted by
          highest ingredient match based on your kitchen pantry.
        </p>

        {selectedIngredients.length > 0 && (
          <div
            style={{
              marginTop: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--olive-100)',
              color: 'var(--olive-900)',
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.88rem',
              fontWeight: 600
            }}
          >
            <Sparkles size={15} color="var(--olive-700)" />
            <span>
              Matching against your <strong>{selectedIngredients.length} pantry items</strong>
            </span>
          </div>
        )}
      </div>

      {/* Filter Panel */}
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalResults={filteredRecipes.length}
      />

      {/* Recipe Grid or Empty State */}
      {filteredRecipes.length > 0 ? (
        <div className="recipes-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div
          style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            maxWidth: '640px',
            margin: '2rem auto'
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ fontSize: '1.6rem', color: 'var(--olive-900)', marginBottom: '0.6rem' }}>
            No Matching Recipes Found
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            We couldn't find any recipes matching your current combination of filters and search term.
            Try resetting your filters or broadening your search.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={handleResetFilters}
            style={{ margin: '0 auto' }}
          >
            <RotateCcw size={16} />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}

