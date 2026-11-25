import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import { Heart, Compass, Sparkles } from 'lucide-react';

export default function Favorites() {
  const { favoriteRecipes, favorites } = useRecipes();

  return (
    <div className="favorites-page page-wrapper animate-fade-in">
      <header style={{ marginBottom: '2.2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#E63946', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <Heart size={16} fill="#E63946" />
          <span>Saved Collection</span>
        </div>
        <h1 style={{ fontSize: '2.6rem', color: 'var(--olive-900)', marginTop: '0.3rem' }}>
          My Favorite Recipes
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '0.4rem', maxWidth: '780px' }}>
          All your bookmarked recipes safely stored in LocalStorage. Their ingredient match percentages
          are computed dynamically against your active pantry.
        </p>
      </header>

      {favoriteRecipes.length > 0 ? (
        <div className="recipes-grid">
          {favoriteRecipes.map((recipe) => (
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
            maxWidth: '600px',
            margin: '2rem auto'
          }}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>❤️</div>
          <h3 style={{ fontSize: '1.6rem', color: 'var(--olive-900)', marginBottom: '0.6rem' }}>
            No Favorites Saved Yet
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            You haven't bookmarked any recipes yet. Browse our delicious catalog and click the heart
            icon on any recipe to save it here for quick access!
          </p>
          <Link to="/discover" className="btn-primary" style={{ margin: '0 auto' }}>
            <Compass size={18} />
            <span>Discover Recipes</span>
          </Link>
        </div>
      )}
    </div>
  );
}

