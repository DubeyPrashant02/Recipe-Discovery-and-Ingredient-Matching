import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { INGREDIENT_CATEGORIES, POPULAR_INGREDIENTS } from '../data/ingredients';
import IngredientChip from './IngredientChip';
import {
  Search,
  Plus,
  Trash2,
  Sparkles,
  Check,
  ChefHat,
  ArrowRight,
  Flame
} from 'lucide-react';

export default function IngredientSelector() {
  const {
    allIngredients,
    selectedIngredients,
    toggleIngredient,
    addCustomIngredient,
    removeIngredient,
    clearAllIngredients,
    isIngredientSelected
  } = useRecipes();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [customFeedback, setCustomFeedback] = useState('');

  const navigate = useNavigate();

  // Filter ingredients by category and search
  const filteredIngredients = useMemo(() => {
    return allIngredients.filter((ing) => {
      const matchesCategory =
        activeCategory === 'All' || ing.category === activeCategory;
      const matchesSearch =
        !searchTerm.trim() ||
        ing.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allIngredients, activeCategory, searchTerm]);

  const handleCustomAdd = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const added = addCustomIngredient(customInput.trim());
    if (added) {
      setCustomFeedback(`Added "${customInput.trim()}"!`);
      setCustomInput('');
      setTimeout(() => setCustomFeedback(''), 2500);
    }
  };

  return (
    <div className="ingredient-page-grid">
      {/* Sticky Left Sidebar: Selected Ingredients Summary */}
      <aside className="pantry-sticky-sidebar">
        <div className="pantry-sidebar-header">
          <div className="pantry-title">
            <span>My Kitchen Pantry</span>
            <span className="pantry-counter-pill">
              {selectedIngredients.length}
            </span>
          </div>

          {selectedIngredients.length > 0 && (
            <button
              type="button"
              className="btn-clear-text"
              onClick={clearAllIngredients}
              title="Clear all selected ingredients"
            >
              <Trash2 size={14} />
              Clear All
            </button>
          )}
        </div>

        {/* Selected Chips Box */}
        {selectedIngredients.length === 0 ? (
          <div className="empty-pantry-hint">
            <div className="empty-pantry-icon">🧺</div>
            <p style={{ fontWeight: 600, color: 'var(--olive-900)', marginBottom: '0.25rem' }}>
              Your pantry is empty
            </p>
            <p style={{ fontSize: '0.85rem' }}>
              Select items from the right or type your own ingredients to discover matching recipes!
            </p>
          </div>
        ) : (
          <div className="chips-container">
            {selectedIngredients.map((ingName) => (
              <IngredientChip
                key={ingName}
                name={ingName}
                onRemove={removeIngredient}
              />
            ))}
          </div>
        )}

        {/* Popular Quick Suggestions */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem', fontSize: '0.82rem', fontWeight: 800, color: 'var(--olive-800)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Flame size={14} color="#D4A373" />
            <span>Popular Quick Adds</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {POPULAR_INGREDIENTS.slice(0, 10).map((pop) => {
              const selected = isIngredientSelected(pop);
              return (
                <button
                  key={pop}
                  type="button"
                  onClick={() => toggleIngredient(pop)}
                  style={{
                    fontSize: '0.78rem',
                    padding: '0.3rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    background: selected ? 'var(--olive-800)' : 'var(--bg-muted)',
                    color: selected ? 'white' : 'var(--text-body)',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  {selected && <Check size={12} />}
                  <span>{pop}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Find Matching Recipes CTA */}
        <div style={{ marginTop: '1.75rem' }}>
          <button
            type="button"
            className="btn-find-recipes-cta"
            onClick={() => navigate('/discover')}
          >
            <span>Find Matching Recipes</span>
            <ArrowRight size={17} />
          </button>
        </div>
      </aside>

      {/* Main Ingredient Browser (Right Pane) */}
      <main className="ingredient-browser-card">
        {/* Search & Custom Add Row */}
        <div className="ingredient-search-row">
          <div className="input-with-icon">
            <Search className="input-icon" size={18} />
            <input
              type="text"
              placeholder="Search vegetables, spices, meats, dairy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Custom Ingredient Add Form */}
          <form onSubmit={handleCustomAdd} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Custom ingredient..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              style={{
                padding: '0.85rem 1rem',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-cream)',
                fontSize: '0.9rem',
                minWidth: '160px'
              }}
            />
            <button type="submit" className="btn-custom-add">
              <Plus size={16} />
              <span>Add</span>
            </button>
          </form>
        </div>

        {customFeedback && (
          <div style={{ fontSize: '0.85rem', color: '#2D6A4F', fontWeight: 600, marginBottom: '1rem' }}>
            ✓ {customFeedback}
          </div>
        )}

        {/* Category Pills Bar */}
        <div className="category-pills-bar">
          {INGREDIENT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-pill-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Ingredient Clickable Grid */}
        <div className="ingredient-selectable-grid">
          {filteredIngredients.map((item) => {
            const selected = isIngredientSelected(item.name);
            return (
              <div
                key={item.id || item.name}
                className={`ingredient-item-box ${selected ? 'selected' : ''}`}
                onClick={() => toggleIngredient(item.name)}
                role="checkbox"
                aria-checked={selected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleIngredient(item.name);
                  }
                }}
              >
                {selected && (
                  <span className="item-check-icon">
                    <Check size={11} strokeWidth={3} />
                  </span>
                )}
                <span className="item-emoji">{item.emoji || '🥗'}</span>
                <span className="item-name">{item.name}</span>
                <span className="item-category">{item.category}</span>
              </div>
            );
          })}
        </div>

        {filteredIngredients.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--olive-900)', marginBottom: '0.5rem' }}>
              No ingredients found matching "{searchTerm}"
            </p>
            <p style={{ fontSize: '0.9rem' }}>
              You can easily add it as a custom ingredient using the box above!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

