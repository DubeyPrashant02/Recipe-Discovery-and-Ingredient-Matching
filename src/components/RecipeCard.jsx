import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import MatchProgress from './MatchProgress';
import {
  Clock,
  Flame,
  Users,
  Heart,
  ArrowRight,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';

export default function RecipeCard({ recipe }) {
  const { isFavorite, toggleFavorite, calculateMatchForRecipe, addToShoppingList } = useRecipes();
  const [imgSrc, setImgSrc] = useState(recipe.image || FALLBACK_IMAGE);
  const [hasError, setHasError] = useState(false);

  // Compute live match based on active pantry ingredients
  const match = recipe.match || calculateMatchForRecipe(recipe);
  const favorite = isFavorite(recipe.id);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(FALLBACK_IMAGE);
    }
  };

  return (
    <div className="recipe-card animate-fade-in">
      {/* Top Image & Overlays */}
      <div className="card-image-wrap">
        <img
          src={imgSrc}
          alt={recipe.name}
          className="card-image"
          onError={handleImageError}
          loading="lazy"
        />

        {/* Category Badge */}
        <span className="card-category-badge">
          {recipe.category}
        </span>

        {/* Favorite Button */}
        <button
          className={`favorite-btn-overlay ${favorite ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(recipe.id);
          }}
          title={favorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-label="Toggle favorite"
        >
          <Heart size={18} fill={favorite ? '#E63946' : 'none'} strokeWidth={2.2} />
        </button>

        {/* 100% Match Ribbon */}
        {match.isFullMatch && (
          <div className="full-match-ribbon">
            <Sparkles size={13} />
            <span>100% Ready to Cook</span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="card-content">
        <div className="card-header-row">
          <span className="cuisine-tag">{recipe.cuisine}</span>
          <span className={`diet-pill ${recipe.isVegetarian ? 'veg' : 'non-veg'}`}>
            {recipe.isVegetarian ? '● Vegetarian' : '▲ Non-Veg'}
          </span>
        </div>

        <h3 className="card-title">{recipe.name}</h3>
        <p className="card-desc">{recipe.description}</p>

        {/* Match Progress Bar */}
        <MatchProgress match={match} />

        {/* Metadata info */}
        <div className="card-meta-row">
          <div className="meta-item" title="Cooking time">
            <Clock size={15} color="var(--olive-600)" />
            <span>{recipe.cookTime} mins</span>
          </div>

          <div className="meta-item" title="Difficulty level">
            <Flame size={15} color="#D4A373" />
            <span>{recipe.difficulty}</span>
          </div>

          <div className="meta-item" title="Servings">
            <Users size={15} color="var(--olive-600)" />
            <span>{recipe.servings} Servings</span>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="card-actions-row">
          <Link to={`/recipe/${recipe.id}`} className="btn-card-view">
            <span>View Recipe</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

