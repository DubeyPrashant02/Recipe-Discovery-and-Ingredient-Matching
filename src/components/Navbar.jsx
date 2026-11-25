import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import {
  UtensilsCrossed,
  Search,
  Compass,
  Sparkles,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChefHat
} from 'lucide-react';

export default function Navbar() {
  const {
    selectedIngredients,
    favorites,
    shoppingList,
    globalSearch,
    setGlobalSearch
  } = useRecipes();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      navigate('/discover');
    }
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo & Name */}
        <Link to="/" className="navbar-brand" onClick={closeMobile}>
          <div className="brand-icon-box">
            <ChefHat size={26} strokeWidth={2.2} />
          </div>
          <div className="brand-text-group">
            <span className="brand-name">RecipeDiscovery</span>
            <span className="brand-badge">Ingredient Matcher</span>
          </div>
        </Link>

        {/* Global Search Bar (Desktop) */}
        <form onSubmit={handleSearchSubmit} className="nav-search-bar">
          <Search className="nav-search-icon" size={16} />
          <input
            type="text"
            className="nav-search-input"
            placeholder="Search recipes, ingredients..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
          />
        </form>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="navbar-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link-item ${isActive ? 'active' : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/discover"
                className={({ isActive }) =>
                  `nav-link-item ${isActive ? 'active' : ''}`
                }
              >
                <Compass size={17} />
                Discover
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ingredients"
                className={({ isActive }) =>
                  `nav-link-item ${isActive ? 'active' : ''}`
                }
              >
                <Sparkles size={17} />
                By Ingredients
                {selectedIngredients.length > 0 && (
                  <span className="nav-badge-pill">
                    {selectedIngredients.length}
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `nav-link-item ${isActive ? 'active' : ''}`
                }
              >
                <Heart size={17} />
                Favorites
                {favorites.length > 0 && (
                  <span className="nav-badge-pill">{favorites.length}</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shopping-list"
                className={({ isActive }) =>
                  `nav-link-item ${isActive ? 'active' : ''}`
                }
              >
                <ShoppingCart size={17} />
                Shopping
                {shoppingList.length > 0 && (
                  <span className="nav-badge-pill">
                    {shoppingList.filter((i) => !i.checked).length}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <form onSubmit={handleSearchSubmit} style={{ marginBottom: '0.75rem' }}>
          <div style={{ position: 'relative' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
            />
            <input
              type="text"
              className="nav-search-input"
              placeholder="Search recipes, ingredients..."
              style={{ width: '100%', paddingLeft: '2.5rem' }}
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
            />
          </div>
        </form>

        <NavLink
          to="/"
          className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
          onClick={closeMobile}
        >
          Home
        </NavLink>
        <NavLink
          to="/discover"
          className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
          onClick={closeMobile}
        >
          <Compass size={18} /> Discover Recipes
        </NavLink>
        <NavLink
          to="/ingredients"
          className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
          onClick={closeMobile}
        >
          <Sparkles size={18} /> Find by Ingredients ({selectedIngredients.length})
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
          onClick={closeMobile}
        >
          <Heart size={18} /> Favorites ({favorites.length})
        </NavLink>
        <NavLink
          to="/shopping-list"
          className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
          onClick={closeMobile}
        >
          <ShoppingCart size={18} /> Shopping List ({shoppingList.length})
        </NavLink>
      </div>
    </header>
  );
}

