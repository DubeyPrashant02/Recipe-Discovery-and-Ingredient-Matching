import React from 'react';
import { X } from 'lucide-react';

export default function IngredientChip({ name, onRemove, emoji }) {
  return (
    <span className="ingredient-chip animate-fade-in">
      {emoji && <span style={{ fontSize: '1rem', lineHeight: 1 }}>{emoji}</span>}
      <span>{name}</span>
      {onRemove && (
        <button
          type="button"
          className="chip-remove-btn"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(name);
          }}
          aria-label={`Remove ${name}`}
        >
          <X size={12} strokeWidth={2.5} />
        </button>
      )}
    </span>
  );
}

