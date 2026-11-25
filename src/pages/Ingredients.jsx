import React from 'react';
import IngredientSelector from '../components/IngredientSelector';
import { Sparkles, Utensils } from 'lucide-react';

export default function Ingredients() {
  return (
    <div className="ingredients-page page-wrapper animate-fade-in">
      <header style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--olive-600)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <Sparkles size={16} />
          <span>Ingredient Matching Module</span>
        </div>
        <h1 style={{ fontSize: '2.6rem', color: 'var(--olive-900)', marginTop: '0.3rem' }}>
          What's in Your Kitchen?
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '0.4rem', maxWidth: '780px' }}>
          Select the ingredients you currently have at home. Our algorithm calculates instant recipe match
          percentages and sorts all 45+ dishes so you can cook delicious meals without extra grocery runs.
        </p>
      </header>

      {/* Main Ingredient Selector Component */}
      <IngredientSelector />
    </div>
  );
}

