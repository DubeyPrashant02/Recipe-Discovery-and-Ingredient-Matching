import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import {
  Sparkles,
  ArrowRight,
  ChefHat,
  CheckCircle2,
  ListFilter,
  ShoppingBag,
  Flame,
  Award,
  BookOpen,
  Coffee,
  Sun,
  Moon,
  Cookie,
  Soup
} from 'lucide-react';

const CATEGORY_SHORTCUTS = [
  { name: 'Breakfast', icon: Coffee, desc: 'Energizing morning starts' },
  { name: 'Lunch', icon: Sun, desc: 'Wholesome midday meals' },
  { name: 'Dinner', icon: Moon, desc: 'Hearty evening comfort' },
  { name: 'Snack', icon: Cookie, desc: 'Crispy & quick bites' },
  { name: 'Soup', icon: Soup, desc: 'Warm nourishing broths' }
];

export default function Home() {
  const { recipes, selectedIngredients, matchedRecipes } = useRecipes();
  const navigate = useNavigate();

  // Top 6 featured recipes (prioritizing high match if ingredients selected)
  const featured = matchedRecipes.slice(0, 6);

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text-col">
            <div className="hero-tag">
              <Sparkles size={14} color="var(--olive-800)" />
              <span>Smart Ingredient Matching Engine</span>
            </div>

            <h1 className="hero-title">
              Turn Your Ingredients Into <span>Delicious Meals</span>
            </h1>

            <p className="hero-subtitle">
              Don't know what to cook with what's in your kitchen? Select your available vegetables,
              staples, and spices. Our intelligent matching engine calculates the exact recipe match,
              highlights missing items, and guides your cooking step by step.
            </p>

            <div className="hero-actions">
              <Link to="/ingredients" className="btn-primary">
                <ChefHat size={20} />
                <span>Find My Recipes</span>
                <ArrowRight size={18} />
              </Link>

              <Link to="/discover" className="btn-secondary">
                <BookOpen size={18} />
                <span>Browse All Recipes ({recipes.length})</span>
              </Link>
            </div>

            {/* Current Pantry Counter Highlight */}
            <div
              style={{
                marginTop: '2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'white',
                padding: '0.65rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: selectedIngredients.length > 0 ? '#2A9D8F' : '#D4A373'
                }}
              />
              <span style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>
                {selectedIngredients.length > 0 ? (
                  <>
                    <strong>{selectedIngredients.length} ingredients</strong> active in your pantry
                  </>
                ) : (
                  'No ingredients selected yet'
                )}
              </span>
              <button
                type="button"
                onClick={() => navigate('/ingredients')}
                style={{
                  color: 'var(--olive-700)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'underline'
                }}
              >
                Edit Pantry →
              </button>
            </div>
          </div>

          {/* Hero Visual Card with High-Res Image & Floating Badges */}
          <div className="hero-visual">
            <div className="hero-image-card">
              <img
                src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1000&q=80"
                alt="Delicious healthy bowl with fresh vegetables"
              />
            </div>

            {/* Floating Top Badge */}
            <div className="hero-float-badge badge-top">
              <div className="float-icon green">
                <Sparkles size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--olive-900)' }}>
                  100% Match Engine
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Mathematical precision
                </div>
              </div>
            </div>

            {/* Floating Bottom Badge */}
            <div className="hero-float-badge badge-bottom">
              <div className="float-icon gold">
                <Flame size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--olive-900)' }}>
                  Interactive Cook Mode
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Hands-free step navigation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="page-wrapper" style={{ paddingBottom: '3rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 800,
              color: 'var(--olive-600)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            Simple 3-Step Process
          </span>
          <h2 style={{ fontSize: '2.4rem', color: 'var(--olive-900)', marginTop: '0.4rem' }}>
            How Ingredient Matching Works
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem' }}>
            Transform random fridge contents into chef-worthy dishes in under 30 seconds.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}
        >
          {/* Step 1 */}
          <div
            style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              padding: '2.2rem 1.8rem',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--olive-100)',
                color: 'var(--olive-800)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: 800,
                marginBottom: '1.25rem'
              }}
            >
              1
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--olive-900)', marginBottom: '0.6rem' }}>
              Select Available Ingredients
            </h3>
            <p style={{ color: 'var(--text-body)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Pick what ingredients you already have at home—tomatoes, rice, spices, paneer, chicken,
              or add custom pantry items with zero restrictions.
            </p>
          </div>

          {/* Step 2 */}
          <div
            style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              padding: '2.2rem 1.8rem',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: 'var(--radius-md)',
                background: '#FFF5EB',
                color: 'var(--accent-amber)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: 800,
                marginBottom: '1.25rem'
              }}
            >
              2
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--olive-900)', marginBottom: '0.6rem' }}>
              Instant Match Scoring
            </h3>
            <p style={{ color: 'var(--text-body)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Our matching engine evaluates all recipes against your pantry. It calculates exact
              match percentages, identifies missing items, and ranks the easiest dishes.
            </p>
          </div>

          {/* Step 3 */}
          <div
            style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              padding: '2.2rem 1.8rem',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-green-light)',
                color: 'var(--accent-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: 800,
                marginBottom: '1.25rem'
              }}
            >
              3
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--olive-900)', marginBottom: '0.6rem' }}>
              Cook With Guided Assistant
            </h3>
            <p style={{ color: 'var(--text-body)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Scale servings dynamically to adjust ingredient portions. Then enter interactive
              Cook Mode for distraction-free step-by-step kitchen instructions!
            </p>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section style={{ background: 'var(--bg-surface)', padding: '4rem 1.5rem', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--olive-600)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Meal Types
              </span>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--olive-900)', marginTop: '0.3rem' }}>
                Explore by Category
              </h2>
            </div>

            <Link to="/discover" className="btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
              <span>View All Categories</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {CATEGORY_SHORTCUTS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={`/discover?category=${item.name}`}
                  style={{
                    background: 'var(--bg-cream)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.75rem 1.25rem',
                    textAlign: 'center',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.25s ease'
                  }}
                  className="cat-card"
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'white',
                      color: 'var(--olive-700)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--shadow-xs)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    <Icon size={26} />
                  </div>
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--olive-900)' }}>{item.name}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured / Matched Recipes Section */}
      <section className="page-wrapper">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--olive-600)', fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <Flame size={15} color="#D4A373" />
              <span>Recommended For You</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--olive-900)', marginTop: '0.3rem' }}>
              {selectedIngredients.length > 0 ? 'Top Matching Recipes' : 'Featured Kitchen Recipes'}
            </h2>
          </div>

          <Link to="/discover" className="btn-primary" style={{ padding: '0.75rem 1.4rem', fontSize: '0.92rem' }}>
            <span>Explore All ({recipes.length})</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="recipes-grid">
          {featured.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* College Project Highlights Banner */}
      <section style={{ background: 'var(--olive-100)', borderTop: '1px solid rgba(75, 127, 94, 0.2)', padding: '3.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', textAlign: 'center' }}>
          <span className="diet-pill veg" style={{ background: 'white', border: '1px solid var(--olive-300, #9CA89E)', marginBottom: '1rem' }}>
            🎓 GLA University Mini Project Demonstration
          </span>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--olive-900)', marginBottom: '1rem' }}>
            Engineered for Fast, Autonomous & Offline Performance
          </h2>
          <p style={{ color: 'var(--text-body)', maxWidth: '720px', margin: '0 auto 2.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
            Every interaction runs 100% locally on your computer with instantaneous state syncing in
            LocalStorage. No external APIs or database dependencies needed.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}
          >
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--olive-800)', fontFamily: 'var(--font-serif)' }}>
                45+
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                Curated Recipes
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Multi-cuisine database
              </div>
            </div>

            <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--olive-800)', fontFamily: 'var(--font-serif)' }}>
                80+
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                Categorized Ingredients
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Vegetables, spices, grains & more
              </div>
            </div>

            <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--olive-800)', fontFamily: 'var(--font-serif)' }}>
                100%
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                Local Execution
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Instant reactivity & persistence
              </div>
            </div>

            <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--olive-800)', fontFamily: 'var(--font-serif)' }}>
                Interactive
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                Cook Mode & Scaler
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Proportional serving scaling
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

