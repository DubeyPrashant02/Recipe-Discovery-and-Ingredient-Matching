# 🍳 Recipe Discovery & Ingredient Matching
### GLA University — Department of Computer Science & Engineering | Mini Project

A modern, production-quality React.js web application designed to eliminate food waste and answer the everyday question: **"What can I cook with the ingredients I have right now?"**

Users select ingredients available in their kitchen pantry, and the intelligent matching engine calculates real-time match percentages, highlights missing ingredients, generates smart grocery shopping lists, scales recipe servings dynamically, and guides home chefs with an interactive hands-free Cook Mode.

---

## 🌟 Key Features

### 1. 🧺 Interactive Kitchen Pantry & Ingredient Selector
* **80+ Categorized Ingredients:** Vegetables, Dairy & Eggs, Grains & Staples, Spices & Seasonings, Pulses & Legumes, Meat & Poultry, Fruits, and Oils & Condiments.
* **Removable Chip Tags:** Selected ingredients are represented as removable chips with instant counters.
* **Instant Search & Category Filtering:** Quickly filter ingredients by typing or clicking category tabs.
* **Custom Ingredient Input:** Add custom ingredients not present in the default dataset.
* **Popular Quick-Picks:** One-click shortcuts for household staples (Tomato, Onion, Garlic, Rice, etc.).
* **LocalStorage Sync:** Pantry selections persist across page reloads and browser sessions.

### 2. ⚡ Precision Recipe Matching Engine
* **Mathematical Matching Formula:**
  $$\text{Match Percentage} = \left( \frac{\text{Number of Available Required Ingredients}}{\text{Total Required Ingredients}} \right) \times 100$$
* **Intelligent String Normalization:** Lowercases, trims whitespace, removes parenthetical descriptions (e.g. `Semolina (Sooji)` $\to$ `Semolina`), and handles singular/plural variants (`tomatoes` $\to$ `tomato`).
* **Instant Ranking:** Recipes are ranked dynamically in descending order of match percentage, with secondary sorting by lowest missing count.
* **100% Ready-to-Cook Badge:** Visually flags recipes where every required ingredient is already present in your pantry.

### 3. 🔍 Multi-Dimensional Recipe Discovery & Filtering
* **45+ Hand-Crafted Recipes:** Multi-cuisine dataset covering Indian, Italian, Chinese, American, Mexican, and Mediterranean dishes.
* **Filter Suite:**
  * **Cuisine:** Indian, Italian, Chinese, American, Mexican, Mediterranean, All
  * **Category:** Breakfast, Lunch, Dinner, Snack, Soup, Salad, All
  * **Diet:** Vegetarian (`🌱`), Non-Vegetarian (`🍗`), All
  * **Cooking Time:** Under 15m, 25m, 40m, or Any
  * **Difficulty:** Easy, Medium, Hard
  * **Sort By:** Highest Match %, Lowest Cooking Time, Least Missing Ingredients, Alphabetical (A-Z)
* **Global Search Bar:** Instant live searching by recipe title, cuisine, meal category, tags, or ingredients.

### 4. 🛒 Missing Ingredients & Smart Shopping List
* **Clear Visual Indicators:** Recipe cards and details show green badges for available items and amber alerts for missing items.
* **One-Click Shopping List:** Add individual missing items or all missing ingredients directly to your grocery list.
* **Interactive Shopping Management:**
  * Mark items as purchased with strikethrough styling.
  * Preserves the recipe source reference for each item.
  * Add custom shopping items manually.
  * One-click "Copy to Clipboard" and "Print Shopping List".
  * Clear purchased items or wipe list.
  * Persisted safely in `LocalStorage`.

### 5. ⚖️ Interactive Servings Scaler
* Adjust portion sizes directly with `+` and `−` buttons (1 to 20 servings).
* All ingredient quantities automatically scale in exact mathematical proportion to avoid culinary guesswork.

### 6. 👨‍🍳 Immersive Kitchen Cook Mode
* Full-screen, distraction-free assistant designed for cooking on tablets or laptops in the kitchen.
* Step-by-step instruction presentation with large, high-contrast typography.
* Integrated cooking stopwatch/timer with start, pause, and reset controls.
* Mark steps as completed with visual feedback.
* Arrow keys keyboard navigation (`←` previous, `→` next, `Esc` exit).

### 7. ❤️ Persistent Favorites Collection
* Bookmark recipes with one-click heart icon.
* Stored in `LocalStorage` and dynamically recalculates ingredient matches in real time.
* Dedicated favorites gallery with empty-state guidance.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React.js 18** | Modular component architecture, custom hooks, and state management |
| **React Router v6** | Declarative client-side routing (`/`, `/discover`, `/ingredients`, `/recipe/:id`, `/favorites`, `/shopping-list`) |
| **LocalStorage API** | Seamless, zero-backend offline persistence for pantry, favorites, and shopping list |
| **Pure Modern CSS3** | Custom design system using CSS variables, Flexbox, CSS Grid, and smooth keyframe animations |
| **Lucide React** | Clean, lightweight SVG iconography |
| **Vite 6** | Ultra-fast development server and optimized production bundler |

> **Note:** The application operates completely client-side without any backend or database requirements, making it 100% portable for local evaluation on any laptop.

---

## 📂 Project Directory Structure

```
recipe-discovery-app/
├── index.html                   # HTML entry point with Google Fonts preconnect
├── package.json                 # Dependencies and npm scripts
├── vite.config.js               # Vite build configuration
├── README.md                    # Project documentation & evaluation guide
│
└── src/
    ├── main.jsx                 # React root mounting and BrowserRouter
    ├── App.jsx                  # Top-level routes and global layout
    ├── index.css                # Complete responsive design system (Cream & Olive theme)
    │
    ├── context/
    │   └── RecipeContext.jsx    # Central global state provider (pantry, favorites, shopping)
    │
    ├── data/
    │   ├── ingredients.js       # 80+ categorized ingredients database
    │   └── recipes.js           # 45+ comprehensive recipes with nutrition, steps & quantities
    │
    ├── utils/
    │   ├── matchingEngine.js    # Normalization, match calculation & ranking logic
    │   └── storage.js           # Safe LocalStorage wrapper with JSON error handling
    │
    ├── components/
    │   ├── Navbar.jsx           # Responsive header with badges and search
    │   ├── Footer.jsx           # Footer with GLA University attribution
    │   ├── RecipeCard.jsx       # Rounded recipe cards with match progress and actions
    │   ├── MatchProgress.jsx    # Visual progress bar with color-coded score
    │   ├── FilterPanel.jsx      # Multi-criteria filter and sort controls
    │   ├── IngredientChip.jsx   # Removable selected ingredient chip
    │   ├── IngredientSelector.jsx # Categorized pantry browser & custom adder
    │   ├── CookMode.jsx         # Fullscreen step-by-step cooking assistant
    │   └── ScrollToTop.jsx      # Automatic scroll restoration on page change
    │
    └── pages/
        ├── Home.jsx             # Hero section, How It Works, categories, and highlights
        ├── Discover.jsx         # Full recipe catalog with live filters & search
        ├── Ingredients.jsx      # Dedicated kitchen pantry ingredient matcher
        ├── RecipeDetails.jsx    # Recipe view with servings scaler & nutrition facts
        ├── Favorites.jsx        # Bookmarked recipes gallery
        └── ShoppingList.jsx     # Smart grocery list with export & print
```

---

## 🚀 Getting Started & Local Execution

### Prerequisites
* **Node.js** (v18.0.0 or higher recommended, verified on v22.20.0)
* **npm** (v9.0.0 or higher)

### 1. Installation
Clone or navigate to the project directory:
```bash
npm install
```

### 2. Run Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```
*(or the port indicated in your terminal, e.g. `http://localhost:5173`)*

### 3. Build for Production
To generate an optimized production bundle:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 🧪 Verification & Feature Checklist

| # | Requirement | Implementation Status |
| :---: | :--- | :---: |
| 1 | Categorized Ingredient Selection | ✅ Implemented (80+ items across 8 categories) |
| 2 | Custom Ingredient Addition | ✅ Implemented with input validation & feedback |
| 3 | Remove & Clear All Chips | ✅ Implemented with animated chips & clear-all button |
| 4 | Exact Match Percentage Formula | ✅ Implemented: `(Available / Total) * 100` |
| 5 | String & Alias Normalization | ✅ Implemented (case-insensitive, singular/plural, parens) |
| 6 | 45+ Diverse Recipes | ✅ Implemented (45 rich recipes across 6 cuisines) |
| 7 | Recipe Filter & Sort Panel | ✅ Implemented (Cuisine, Category, Diet, Time, Sort By) |
| 8 | Missing Ingredients Indication | ✅ Implemented with clear visual indicators |
| 9 | Smart Grocery Shopping List | ✅ Implemented with checkbox, recipe origin & print |
| 10 | Interactive Servings Scaler | ✅ Implemented (+ / − controls proportionally scaling amounts) |
| 11 | Hands-Free Cook Mode | ✅ Implemented (Step-by-step, stopwatch, keyboard arrows) |
| 12 | Nutrition Facts Panel | ✅ Implemented (Calories, Protein, Carbs, Fat, Fiber) |
| 13 | LocalStorage Persistence | ✅ Implemented (Pantry, Favorites, Shopping List safely saved) |
| 14 | Responsive UI / UX | ✅ Implemented (Mobile, Tablet, and Desktop breakpoints) |
| 15 | College Mini Project Compliance | ✅ Implemented (GLA University Mini Project specs satisfied) |

---

## 🎓 Academic Attribution

* **Institution:** GLA University, Mathura
* **Project Type:** B.Tech Mini Project
* **Course:** Web Development & Full-Stack Interactive Systems
* **Application:** Recipe Discovery & Ingredient Matching Web Application

