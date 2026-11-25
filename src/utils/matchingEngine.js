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
    'cottage cheese': 'paneer',
    'atta': 'wheat flour',
    'all purpose flour': 'flour',
    'maida': 'flour',
    'cheeses': 'cheese'
  };

  if (aliases[normalized]) {
    return aliases[normalized];
  }

  // Basic plural stripping if ends with 's' and not ending with 'ss'
  if (normalized.endsWith('s') && !normalized.endsWith('ss') && normalized.length > 3) {
    const singular = normalized.slice(0, -1);
    if (aliases[singular]) return aliases[singular];
  }

  return normalized;
}

/**
 * Checks if a user's selected ingredient matches a recipe required ingredient
 */
export function isIngredientMatch(userIngredient, recipeIngredient) {
  const normUser = normalizeIngredient(userIngredient);
  const normRecipe = normalizeIngredient(recipeIngredient);

  if (!normUser || !normRecipe) return false;

  // Exact match
  if (normUser === normRecipe) return true;

  // Word substring containment (e.g. "chicken" matches "chicken breast", "rice" matches "basmati rice")
  if (normRecipe.includes(normUser) || normUser.includes(normRecipe)) {
    return true;
  }

  return false;
}

/**
 * Calculates matching score and ingredient breakdown for a single recipe
 * Formula specified in prompt:
 * Match Percentage = (Number of Available Required Ingredients / Total Required Ingredients) * 100
 */
export function calculateRecipeMatch(recipe, selectedIngredients = []) {
  const totalRequired = recipe.ingredients.length;
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
  if (!selectedIngredients || selectedIngredients.length === 0) {
    return {
      matchPercentage: 0,
      availableIngredients: [],
      missingIngredients: [...recipe.ingredients],
      totalRequired,
      availableCount: 0,
      missingCount: totalRequired,
      isFullMatch: false
    };
  }

  const availableIngredients = [];
  const missingIngredients = [];

  recipe.ingredients.forEach((recipeIng) => {
    const isAvailable = selectedIngredients.some((userIng) =>
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

