import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { isIngredientMatch } from '../utils/matchingEngine';
import CookMode from '../components/CookMode';
import MatchProgress from '../components/MatchProgress';
import {
  Clock,
  Flame,
  Users,
  Heart,
  ChefHat,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  Sparkles,
  ArrowLeft,
  Share2,
  Check
} from 'lucide-react';

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    recipes,
    selectedIngredients,
    isFavorite,
    toggleFavorite,
    calculateMatchForRecipe,
    addToShoppingList,
    addMultipleToShoppingList
  } = useRecipes();

  // Find recipe
  const recipe = recipes.find((r) => r.id === id);

  // Servings Scaler state
  const [servings, setServings] = useState(recipe ? recipe.servings : 4);
  const [cookModeOpen, setCookModeOpen] = useState(false);
  const [toastMessage, setToastFeedback] = useState('');
  // Reset recipe-specific state when navigating to another recipe
useEffect(() => {
  setServings(recipe ? recipe.servings : 4);
  setCookModeOpen(false);
  setToastFeedback('');
}, [id, recipe?.servings]);

  if (!recipe) {
    return (
      <div className="page-wrapper" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <h2>Recipe Not Found</h2>
        <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
          The requested recipe doesn't exist or may have been removed.
        </p>
        <Link to="/discover" className="btn-primary">
          Back to Recipes
        </Link>
      </div>
    );
  }

  // Calculate live match with active pantry
  const match = calculateMatchForRecipe(recipe);
  const favorite = isFavorite(recipe.id);

  // Scale ratio for ingredient amounts
  const scaleRatio = servings / recipe.servings;

  const handleServingsChange = (delta) => {
    setServings((prev) => Math.max(1, Math.min(20, prev + delta)));
  };

  const showToast = (msg) => {
    setToastFeedback(msg);
    setTimeout(() => setToastFeedback(''), 3000);
  };

  const handleAddAllMissing = () => {
    if (match.missingIngredients.length === 0) {
      showToast('You already have all ingredients ready!');
      return;
    }
    const count = addMultipleToShoppingList(
      match.missingIngredients,
      recipe.name,
      recipe.id
    );
    showToast(`Added ${count} missing item(s) to your shopping list!`);
  };

  const handleAddSingleItem = (ingName) => {
    addToShoppingList(ingName, recipe.name, recipe.id);
    showToast(`Added "${ingName}" to your shopping list!`);
  };

  return (
    <div className="recipe-details-page page-wrapper animate-fade-in">
      {/* Back button & Toast */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-secondary"
          style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem' }}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        {toastMessage && (
          <div
            style={{
              background: 'var(--olive-800)',
              color: 'white',
              padding: '0.6rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.88rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <Check size={16} />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      <div className="recipe-details-grid">
        {/* Left Column: Visuals, Match status & Ingredients */}
        <div>
          {/* Main Hero Card */}
          <div className="details-hero-card">
            <div className="details-image-banner">
              <img src={recipe.image} alt={recipe.name} />

              <div className="details-image-overlay-badges">
                <span className="card-category-badge">{recipe.category}</span>
                <span className="card-category-badge" style={{ background: 'rgba(56, 102, 75, 0.9)' }}>
                  {recipe.cuisine}
                </span>
                <span className={`diet-pill ${recipe.isVegetarian ? 'veg' : 'non-veg'}`}>
                  {recipe.isVegetarian ? '● Vegetarian' : '▲ Non-Veg'}
                </span>
              </div>

              {/* Favorite Button */}
              <button
                type="button"
                className={`favorite-btn-overlay ${favorite ? 'active' : ''}`}
                onClick={() => toggleFavorite(recipe.id)}
                title={favorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart size={20} fill={favorite ? '#E63946' : 'none'} strokeWidth={2.2} />
              </button>
            </div>

            <div className="details-body">
              <div className="details-header">
                <h1 className="details-title">{recipe.name}</h1>
                <p className="details-desc">{recipe.description}</p>
              </div>

              {/* Live Match Progress Panel */}
              <div style={{ marginBottom: '1.75rem' }}>
                <MatchProgress match={match} />
              </div>

              {/* Key Cooking Stats */}
              <div className="details-meta-grid">
                <div className="meta-box">
                  <Clock className="meta-box-icon" size={20} />
                  <span className="meta-box-label">Prep Time</span>
                  <span className="meta-box-value">{recipe.prepTime} mins</span>
                </div>

                <div className="meta-box">
                  <Flame className="meta-box-icon" size={20} />
                  <span className="meta-box-label">Cook Time</span>
                  <span className="meta-box-value">{recipe.cookTime} mins</span>
                </div>

                <div className="meta-box">
                  <ChefHat className="meta-box-icon" size={20} />
                  <span className="meta-box-label">Difficulty</span>
                  <span className="meta-box-value">{recipe.difficulty}</span>
                </div>

                <div className="meta-box">
                  <Users className="meta-box-icon" size={20} />
                  <span className="meta-box-label">Servings</span>
                  <span className="meta-box-value">{servings} People</span>
                </div>
              </div>

              {/* Interactive Action Row: Start Cooking & Add Missing to Shopping List */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setCookModeOpen(true)}
                  style={{ flex: 1, justifyContent: 'center', padding: '1rem' }}
                >
                  <ChefHat size={20} />
                  <span>Start Cooking (Step-by-Step)</span>
                </button>

                {match.missingCount > 0 && (
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleAddAllMissing}
                    title="Add all missing ingredients to your shopping list"
                  >
                    <ShoppingBag size={18} />
                    <span>Add {match.missingCount} Missing Items to Shopping List</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Servings Scaler, Ingredients breakdown, Nutrition & Instructions */}
        <div>
          {/* Servings Scaler Component */}
          <div className="servings-scaler-card">
            <div className="scaler-info">
              <span className="scaler-title">Portion & Servings Scaler</span>
              <span className="scaler-subtitle">
                Ingredient quantities adjust automatically
              </span>
            </div>

            <div className="scaler-controls">
              <button
                type="button"
                className="scaler-btn"
                onClick={() => handleServingsChange(-1)}
                disabled={servings <= 1}
                aria-label="Decrease servings"
              >
                <Minus size={16} />
              </button>

              <span className="scaler-display-num">{servings}</span>

              <button
                type="button"
                className="scaler-btn"
                onClick={() => handleServingsChange(1)}
                disabled={servings >= 20}
                aria-label="Increase servings"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Detailed Ingredients Breakdown List */}
          <div className="ingredients-detail-section">
            <div className="section-title-row">
              <h2 className="section-heading">
                <span>Ingredients</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                  ({recipe.ingredients.length} items)
                </span>
              </h2>

              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--olive-700)' }}>
                {match.availableCount} of {match.totalRequired} in pantry
              </span>
            </div>

            <ul className="ingredient-detail-list">
              {recipe.quantities.map((item, idx) => {
                const isAvail = selectedIngredients.some((userIng) =>
                  isIngredientMatch(userIng, item.ingredient)
                );

                // Scale numeric amount if present
                const scaledAmount = item.amount
                  ? Math.round(item.amount * scaleRatio * 10) / 10
                  : '';

                return (
                  <li
                    key={idx}
                    className={`ingredient-detail-item ${isAvail ? 'available' : 'missing'}`}
                  >
                    <div className="item-left-info">
                      <div className={`avail-status-icon ${isAvail ? 'avail' : 'miss'}`}>
                        {isAvail ? (
                          <CheckCircle2 size={15} />
                        ) : (
                          <AlertCircle size={15} />
                        )}
                      </div>

                      <div>
                        <span className="item-name-str">{item.ingredient}</span>
                        {item.notes && (
                          <span className="item-notes-str">({item.notes})</span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="item-qty-badge">
                        {scaledAmount} {item.unit}
                      </span>

                      {!isAvail && (
                        <button
                          type="button"
                          onClick={() => handleAddSingleItem(item.ingredient)}
                          title="Add to shopping list"
                          style={{
                            color: 'var(--accent-amber)',
                            padding: '0.2rem',
                            display: 'flex'
                          }}
                        >
                          <ShoppingBag size={16} />
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Nutrition Facts Panel */}
          {recipe.nutrition && (
            <div className="nutrition-card">
              <h3 style={{ fontSize: '1.25rem', color: 'var(--olive-900)' }}>
                Nutrition Information (Per Serving)
              </h3>
              <div className="nutrition-bars-grid">
                <div className="nutrition-col">
                  <div className="nutri-val">{recipe.nutrition.calories}</div>
                  <div className="nutri-label">Calories</div>
                </div>

                <div className="nutrition-col">
                  <div className="nutri-val">{recipe.nutrition.protein}g</div>
                  <div className="nutri-label">Protein</div>
                </div>

                <div className="nutrition-col">
                  <div className="nutri-val">{recipe.nutrition.carbs}g</div>
                  <div className="nutri-label">Carbs</div>
                </div>

                <div className="nutrition-col">
                  <div className="nutri-val">{recipe.nutrition.fat}g</div>
                  <div className="nutri-label">Fat</div>
                </div>

                <div className="nutrition-col">
                  <div className="nutri-val">{recipe.nutrition.fiber}g</div>
                  <div className="nutri-label">Fiber</div>
                </div>
              </div>
            </div>
          )}

          {/* Step-by-Step Cooking Instructions */}
          <div className="instructions-section">
            <h2 className="section-heading" style={{ marginBottom: '1.5rem' }}>
              Cooking Instructions
            </h2>

            <div className="instructions-timeline">
              {recipe.instructions.map((step, idx) => (
                <div key={idx} className="instruction-step-card">
                  <div className="step-num-circle">{idx + 1}</div>
                  <div className="step-text-body">{step}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setCookModeOpen(true)}
              >
                <ChefHat size={20} />
                <span>Launch Interactive Cook Mode</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Cook Mode Full-Screen Assistant */}
      {cookModeOpen && (
        <CookMode
          recipe={recipe}
          onClose={() => setCookModeOpen(false)}
        />
      )}
    </div>
  );
}

