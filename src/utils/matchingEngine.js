// Recipe Matching Engine & Normalization Utilities

/**
 * Normalizes an ingredient name for flexible matching:
 * - Converts to lower case
 * - Strips punctuation, parentheses content, and extra spaces
 * - Handles common plurals (e.g. tomatoes -> tomato)
 */
export function normalizeIngredient(name) {
  if (!name || typeof name !== 'string') return '';
  
  let normalized = name
    .toLowerCase()
    // remove text in parentheses e.g. "Chickpeas (Chana)" -> "Chickpeas"
    .replace(/\(.*?\)/g, '')
    // remove punctuation except letters and spaces
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  // Common singularizations / canonical mappings
  const aliases = {
    'tomatoes': 'tomato',
    'potatoes': 'potato',
    'onions': 'onion',
    'eggs': 'egg',
    'mushrooms': 'mushroom',
    'carrots': 'carrot',
    'capsicums': 'capsicum',
    'bell peppers': 'capsicum',
    'bell pepper': 'capsicum',
    'green chillies': 'green chili',
    'green chilies': 'green chili',
    'chillies': 'green chili',
    'chilies': 'green chili',
    'lemons': 'lemon',
    'limes': 'lemon',
    'cloves': 'clove',
    'oat': 'oats',
    'noodles': 'noodle',
    'tortillas': 'tortilla',
    'breads': 'bread',
    'shrimps': 'shrimp',
    'prawns': 'shrimp',
    'prawn': 'shrimp',
    'prawns shrimp': 'shrimp',
    'cottage cheese': 'paneer',
    'atta': 'wheat flour',
    'all purpose flour': 'flour',
    'maida': 'flour',
    'cheeses': 'cheese'
  };

  if (aliases[normalized]) {
    return aliases[normalized];
  }

  return normalized;
}

// These describe a cut or form of the same pantry ingredient. Arbitrary word
// containment is unsafe: for example, "oil" must not satisfy "olive oil".
const compatibleIngredientForms = new Set([
  'chicken|chicken breast'
]);

/**
 * Checks if a user's selected ingredient matches a recipe required ingredient
 */
export function isIngredientMatch(userIngredient, recipeIngredient) {
  const normUser = normalizeIngredient(userIngredient);
  const normRecipe = normalizeIngredient(recipeIngredient);

  if (!normUser || !normRecipe) return false;

  // Exact match
  if (normUser === normRecipe) return true;

  return compatibleIngredientForms.has(`${normUser}|${normRecipe}`) ||
    compatibleIngredientForms.has(`${normRecipe}|${normUser}`);
}

/**
 * Calculates matching score and ingredient breakdown for a single recipe
 * Formula specified in prompt:
 * Match Percentage = (Number of Available Required Ingredients / Total Required Ingredients) * 100
 */
export function calculateRecipeMatch(recipe, selectedIngredients = []) {
  const requiredIngredients = Array.isArray(recipe?.ingredients) ? recipe.ingredients : [];
  const pantryIngredients = Array.isArray(selectedIngredients) ? selectedIngredients : [];
  const totalRequired = requiredIngredients.length;
  if (!totalRequired) {
    return {
      matchPercentage: 0,
      availableIngredients: [],
      missingIngredients: [],
      totalRequired: 0,
      availableCount: 0,
      missingCount: 0,
      isFullMatch: false
    };
  }

  // If user hasn't selected any ingredients yet, treat as 0% match but show all required
  if (pantryIngredients.length === 0) {
    return {
      matchPercentage: 0,
      availableIngredients: [],
      missingIngredients: [...requiredIngredients],
      totalRequired,
      availableCount: 0,
      missingCount: totalRequired,
      isFullMatch: false
    };
  }

  const availableIngredients = [];
  const missingIngredients = [];

  requiredIngredients.forEach((recipeIng) => {
    const isAvailable = pantryIngredients.some((userIng) =>
      isIngredientMatch(userIng, recipeIng)
    );

    if (isAvailable) {
      availableIngredients.push(recipeIng);
    } else {
      missingIngredients.push(recipeIng);
    }
  });

  const availableCount = availableIngredients.length;
  const missingCount = missingIngredients.length;
  // Exact formula: (Available / Total) * 100
  const rawPercentage = (availableCount / totalRequired) * 100;
  // Round to 1 decimal place or whole integer
  const matchPercentage = Math.round(rawPercentage * 10) / 10;
  const isFullMatch = availableCount === totalRequired;

  return {
    matchPercentage,
    availableIngredients,
    missingIngredients,
    totalRequired,
    availableCount,
    missingCount,
    isFullMatch
  };
}

/**
 * Process and filter all recipes with matching results and user filters
 */
export function filterAndRankRecipes(recipes, selectedIngredients = [], filters = {}) {
  const {
    searchQuery = '',
    cuisine = 'All',
    category = 'All',
    diet = 'All', // 'All', 'Vegetarian', 'Non-Vegetarian'
    maxCookTime = null, // in minutes
    difficulty = 'All', // 'Easy', 'Medium', 'Hard'
    sortBy = 'match' // 'match', 'time', 'missing', 'name'
  } = filters;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  // First enrich with match calculation
  const enriched = recipes.map((recipe) => {
    const match = calculateRecipeMatch(recipe, selectedIngredients);
    return {
      ...recipe,
      match
    };
  });

  // Apply filters
  const filtered = enriched.filter((recipe) => {
    // 1. Text Search Filter (name, cuisine, category, ingredients, tags)
    if (normalizedQuery) {
      const matchName = recipe.name.toLowerCase().includes(normalizedQuery);
      const matchCuisine = recipe.cuisine.toLowerCase().includes(normalizedQuery);
      const matchCategory = recipe.category.toLowerCase().includes(normalizedQuery);
      const matchIngredients = recipe.ingredients.some((ing) =>
        ing.toLowerCase().includes(normalizedQuery)
      );
      const matchTags = recipe.tags && recipe.tags.some((tag) =>
        tag.toLowerCase().includes(normalizedQuery)
      );

      if (!matchName && !matchCuisine && !matchCategory && !matchIngredients && !matchTags) {
        return false;
      }
    }

    // 2. Cuisine Filter
    if (cuisine !== 'All' && recipe.cuisine.toLowerCase() !== cuisine.toLowerCase()) {
      return false;
    }

    // 3. Category Filter
    if (category !== 'All' && recipe.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    // 4. Diet Filter
    if (diet === 'Vegetarian' && !recipe.isVegetarian) {
      return false;
    }
    if (diet === 'Non-Vegetarian' && recipe.isVegetarian) {
      return false;
    }

    // 5. Max Cooking Time Filter
    if (maxCookTime && recipe.cookTime > Number(maxCookTime)) {
      return false;
    }

    // 6. Difficulty Filter
    if (difficulty !== 'All' && recipe.difficulty.toLowerCase() !== difficulty.toLowerCase()) {
      return false;
    }

    return true;
  });

  // Sort results
  filtered.sort((a, b) => {
    if (sortBy === 'match') {
      // Primary: match percentage descending
      if (b.match.matchPercentage !== a.match.matchPercentage) {
        return b.match.matchPercentage - a.match.matchPercentage;
      }
      // Secondary: fewer missing ingredients
      if (a.match.missingCount !== b.match.missingCount) {
        return a.match.missingCount - b.match.missingCount;
      }
      // Tertiary: cooking time ascending
      return a.cookTime - b.cookTime;
    }

    if (sortBy === 'time') {
      return (a.cookTime + a.prepTime) - (b.cookTime + b.prepTime);
    }

    if (sortBy === 'missing') {
      return a.match.missingCount - b.match.missingCount;
    }

    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }

    return 0;
  });

  return filtered;
}

