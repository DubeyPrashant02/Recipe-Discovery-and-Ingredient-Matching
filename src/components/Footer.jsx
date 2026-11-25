import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Heart, Sparkles, GraduationCap, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
              <ChefHat size={28} color="#8FA876" />
              <h3 style={{ margin: 0, color: 'white', fontFamily: 'var(--font-serif)' }}>
                RecipeDiscovery
              </h3>
            </div>
            <p>
              Smart recipe recommendation and ingredient-matching platform. Turn your pantry
              ingredients into mouth-watering home-cooked meals with intelligent match scoring.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <span className="diet-pill veg" style={{ background: 'rgba(75, 127, 94, 0.25)', color: '#8FA876', border: '1px solid #4B7F5E' }}>
                45+ Curated Recipes
              </span>
              <span className="diet-pill" style={{ background: 'rgba(212, 163, 115, 0.25)', color: '#D4A373', border: '1px solid #D4A373' }}>
                Cook Mode Included
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/discover">Discover All Recipes</Link></li>
              <li><Link to="/ingredients">Pantry Ingredient Matcher</Link></li>
              <li><Link to="/favorites">My Favorite Dishes</Link></li>
              <li><Link to="/shopping-list">Smart Grocery Shopping List</Link></li>
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h4 className="footer-heading">Popular Cuisines</h4>
            <ul className="footer-links-list">
              <li><Link to="/discover">Indian Curries & Biryani</Link></li>
              <li><Link to="/discover">Italian Pastas & Pizza</Link></li>
              <li><Link to="/discover">Chinese Wok & Noodles</Link></li>
              <li><Link to="/discover">Mexican Quesadillas & Bowls</Link></li>
              <li><Link to="/discover">American Grills & Burgers</Link></li>
            </ul>
          </div>

          {/* College Project Badge */}
          <div>
            <h4 className="footer-heading">Academic Project</h4>
            <div className="college-badge-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <GraduationCap size={20} color="#8FA876" />
                <span className="college-name">GLA University</span>
              </div>
              <p className="college-tagline">B.Tech Mini Project</p>
              <p className="college-meta">
                Course: Web Development & Interactive Systems<br />
                Tech: React.js, LocalStorage, ES6+ Algorithm<br />
                Architecture: Client-Side Single Page Application
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            &copy; {new Date().getFullYear()} Recipe Discovery & Ingredient Matching. Built for GLA University Mini Project.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Crafted with</span>
            <Heart size={15} color="#E63946" fill="#E63946" />
            <span>using React.js & Lucide Icons</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
