import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import {
  ShoppingCart,
  Check,
  Trash2,
  Plus,
  Printer,
  Copy,
  Sparkles,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

export default function ShoppingList() {
  const {
    shoppingList,
    addToShoppingList,
    toggleShoppingItem,
    removeShoppingItem,
    clearCheckedShoppingItems,
    clearAllShoppingList
  } = useRecipes();

  const [newItemName, setNewItemName] = useState('');
  const [copyFeedback, setCopyFeedback] = useState(false);

  const pendingCount = shoppingList.filter((item) => !item.checked).length;
  const completedCount = shoppingList.filter((item) => item.checked).length;

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    addToShoppingList(newItemName.trim(), 'Custom Grocery Item');
    setNewItemName('');
  };

  const handleCopyToClipboard = () => {
    if (shoppingList.length === 0) return;
    const text = shoppingList
      .map((item) => `${item.checked ? '[✓]' : '[ ]'} ${item.name} (${item.recipeName})`)
      .join('\n');
    navigator.clipboard.writeText(`🛒 Recipe Shopping List:\n${text}`);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="shopping-list-page page-wrapper animate-fade-in">
      <div className="shopping-page-layout">
        <header style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--olive-600)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <ShoppingCart size={16} />
            <span>Smart Grocery Assistant</span>
          </div>
          <h1 style={{ fontSize: '2.6rem', color: 'var(--olive-900)', marginTop: '0.3rem' }}>
            Shopping List
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '0.4rem' }}>
            Easily manage missing ingredients from your discovered recipes. Mark items off as you shop
            or export the list to take with you to the grocery store.
          </p>
        </header>

        <div className="shopping-card">
          {/* Header Row */}
          <div className="shopping-header-row">
            <div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--olive-900)' }}>
                {pendingCount} Pending Items
              </span>
              {completedCount > 0 && (
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                  ({completedCount} completed)
                </span>
              )}
            </div>

            <div className="shopping-actions-group">
              {shoppingList.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={handleCopyToClipboard}
                    className="btn-secondary"
                    style={{ padding: '0.5rem 0.95rem', fontSize: '0.85rem' }}
                    title="Copy shopping list to clipboard"
                  >
                    <Copy size={15} />
                    <span>{copyFeedback ? 'Copied!' : 'Copy'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="btn-secondary"
                    style={{ padding: '0.5rem 0.95rem', fontSize: '0.85rem' }}
                    title="Print shopping list"
                  >
                    <Printer size={15} />
                    <span>Print</span>
                  </button>

                  {completedCount > 0 && (
                    <button
                      type="button"
                      onClick={clearCheckedShoppingItems}
                      className="btn-secondary"
                      style={{ padding: '0.5rem 0.95rem', fontSize: '0.85rem' }}
                      title="Clear completed items"
                    >
                      Clear Purchased
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={clearAllShoppingList}
                    className="btn-clear-text"
                    style={{ padding: '0.5rem' }}
                    title="Clear entire shopping list"
                  >
                    <Trash2 size={15} />
                    <span>Clear All</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Add Custom Item Input */}
          <form onSubmit={handleAddItem} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem' }}>
            <input
              type="text"
              placeholder="Add an item to your shopping list (e.g. Olive Oil, Garlic, Basil)..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              style={{
                flex: 1,
                padding: '0.85rem 1.1rem',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-cream)',
                fontSize: '0.95rem'
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.85rem 1.4rem' }}>
              <Plus size={18} />
              <span>Add Item</span>
            </button>
          </form>

          {/* List of Items */}
          {shoppingList.length > 0 ? (
            <div className="shopping-items-list">
              {shoppingList.map((item) => (
                <div
                  key={item.id}
                  className={`shopping-item-row ${item.checked ? 'checked' : ''}`}
                >
                  <div className="item-checkbox-wrap">
                    <div
                      className="custom-checkbox"
                      onClick={() => toggleShoppingItem(item.id)}
                      role="checkbox"
                      aria-checked={item.checked}
                      tabIndex={0}
                    >
                      {item.checked && <Check size={14} strokeWidth={3} />}
                    </div>

                    <div>
                      <div
                        className="item-title"
                        style={{
                          fontWeight: 700,
                          fontSize: '1rem',
                          color: 'var(--text-main)',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleShoppingItem(item.id)}
                      >
                        {item.name}
                      </div>

                      {item.recipeName && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                          For:{' '}
                          {item.recipeId ? (
                            <Link
                              to={`/recipe/${item.recipeId}`}
                              style={{ color: 'var(--olive-700)', textDecoration: 'underline' }}
                            >
                              {item.recipeName}
                            </Link>
                          ) : (
                            item.recipeName
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-remove-item"
                    onClick={() => removeShoppingItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🛒</div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--olive-900)', marginBottom: '0.5rem' }}>
                Your Shopping List is Empty
              </h3>
              <p style={{ fontSize: '0.92rem', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
                When viewing recipes with missing ingredients, click "Add Missing Items" to populate
                your smart grocery list automatically!
              </p>
              <Link to="/discover" className="btn-primary" style={{ margin: '0 auto' }}>
                <span>Explore Recipes</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

