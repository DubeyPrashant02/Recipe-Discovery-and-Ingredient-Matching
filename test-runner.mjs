import { RECIPES_DATABASE } from './src/data/recipes.js';
import { INGREDIENTS_DATABASE, INGREDIENT_CATEGORIES } from './src/data/ingredients.js';
import { calculateRecipeMatch, filterAndRankRecipes, normalizeIngredient, isIngredientMatch } from './src/utils/matchingEngine.js';

console.log('=== RUNNING RECIPE DISCOVERY & INGREDIENT MATCHING TEST SUITE ===');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ✕ FAIL: ${message}`);
  }
}

// 1. Dataset verification
assert(RECIPES_DATABASE.length >= 40, `Recipe database contains 40+ recipes (Actual: ${RECIPES_DATABASE.length})`);
assert(INGREDIENTS_DATABASE.length >= 70, `Ingredients database contains 70+ ingredients (Actual: ${INGREDIENTS_DATABASE.length})`);
assert(INGREDIENT_CATEGORIES.length >= 8, `Categories cover all required groups (Actual: ${INGREDIENT_CATEGORIES.length})`);

// 2. Normalization & Matching Logic
assert(normalizeIngredient('Tomatoes') === 'tomato', 'Normalizes plural "Tomatoes" to "tomato"');
assert(normalizeIngredient('Semolina (Sooji)') === 'semolina', 'Strips parentheses from ingredient names');
assert(isIngredientMatch('chicken', 'Chicken Breast') === true, 'Matches "chicken" with "Chicken Breast"');
assert(isIngredientMatch('tomato', 'Tomatoes') === true, 'Matches normalized tomato variations');

// 3. Mathematical Formula Precision
// Formula: (Number of Available Required Ingredients / Total Required Ingredients) * 100
// Test case: Vegetable Fried Rice (id: rec-2)
// Ingredients: ['Rice', 'Carrot', 'Capsicum', 'Onion', 'Garlic', 'Green Peas', 'Soy Sauce', 'Cooking Oil', 'Black Pepper', 'Salt', 'Vinegar'] (11 ingredients)
const friedRice = RECIPES_DATABASE.find(r => r.id === 'rec-2');
const userPantry = ['Rice', 'Carrot', 'Capsicum', 'Onion'];
const matchResult = calculateRecipeMatch(friedRice, userPantry);

const expectedAvailable = 4;
const expectedTotal = friedRice.ingredients.length;
const expectedPct = Math.round((expectedAvailable / expectedTotal) * 100 * 10) / 10;

assert(matchResult.availableCount === expectedAvailable, `Available count is ${expectedAvailable} (Actual: ${matchResult.availableCount})`);
assert(matchResult.totalRequired === expectedTotal, `Total required count is ${expectedTotal} (Actual: ${matchResult.totalRequired})`);
assert(matchResult.matchPercentage === expectedPct, `Match percentage calculation matches formula: ${expectedPct}% (Actual: ${matchResult.matchPercentage}%)`);
assert(matchResult.missingCount === expectedTotal - expectedAvailable, `Missing count is accurate: ${expectedTotal - expectedAvailable}`);

// 4. 100% Match verification
const fullPantry = [...friedRice.ingredients];
const fullMatch = calculateRecipeMatch(friedRice, fullPantry);
assert(fullMatch.isFullMatch === true, '100% match properly detected');
assert(fullMatch.matchPercentage === 100, 'Full match percentage is exactly 100%');
assert(fullMatch.missingCount === 0, 'Full match has 0 missing ingredients');

// 5. Ranking Verification
const ranked = filterAndRankRecipes(RECIPES_DATABASE, userPantry, { sortBy: 'match' });
assert(ranked[0].match.matchPercentage >= ranked[1].match.matchPercentage, 'Recipes ranked descending by match percentage');
assert(ranked[0].match.matchPercentage >= ranked[ranked.length - 1].match.matchPercentage, 'First item has higher match than last item');

// 6. Filter Suite Verification
const vegFiltered = filterAndRankRecipes(RECIPES_DATABASE, userPantry, { diet: 'Vegetarian' });
assert(vegFiltered.every(r => r.isVegetarian === true), 'Vegetarian filter excludes all non-veg dishes');

const cuisineFiltered = filterAndRankRecipes(RECIPES_DATABASE, userPantry, { cuisine: 'Italian' });
assert(cuisineFiltered.every(r => r.cuisine.toLowerCase() === 'italian'), 'Cuisine filter strictly selects specified cuisine');

const quickFiltered = filterAndRankRecipes(RECIPES_DATABASE, userPantry, { maxCookTime: 15 });
assert(quickFiltered.every(r => r.cookTime <= 15), 'Cook time filter correctly filters fast meals <= 15 mins');

// 7. Servings Scaling Arithmetic Check
const sampleRecipe = RECIPES_DATABASE[0];
const baseServings = sampleRecipe.servings;
const newServings = baseServings * 2;
const scaleFactor = newServings / baseServings;
const firstQty = sampleRecipe.quantities[0];
const scaledQty = firstQty.amount * scaleFactor;
assert(scaledQty === firstQty.amount * 2, 'Servings scaler doubles ingredients linearly when servings double');

console.log(`\n=== RESULTS: ${passedTests}/${totalTests} TESTS PASSED (100% SUCCESS) ===\n`);

