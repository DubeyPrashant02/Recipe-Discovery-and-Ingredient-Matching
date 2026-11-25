import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { RECIPES_DATABASE } from '../data/recipes';
import { INGREDIENTS_DATABASE } from '../data/ingredients';
import { calculateRecipeMatch, filterAndRankRecipes } from '../utils/matchingEngine';
import { storage, STORAGE_KEYS } from '../utils/storage';

const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  // 1. Selected Ingredients State (Persistent)
  const [selectedIngredients, setSelectedIngredients] = useState(() => {
    return storage.get(STORAGE_KEYS.PANTRY, ['Tomato', 'Onion', 'Garlic', 'Potato']);
  });

  // Custom User Ingredients (Persistent)
  const [customIngredients, setCustomIngredients] = useState(() => {
    return storage.get(STORAGE_KEYS.CUSTOM_INGREDIENTS, []);
  });

  // 2. Favorites (Array of recipe IDs, Persistent)
  const [favorites, setFavorites] = useState(() => {
    return storage.get(STORAGE_KEYS.FAVORITES, ['rec-1', 'rec-3']);
  });

  // 3. Shopping List (Array of item objects, Persistent)
  const [shoppingList, setShoppingList] = useState(() => {
    return storage.get(STORAGE_KEYS.SHOPPING_LIST, [
      {
        id: 'shop-demo-1',
        name: 'Heavy Cream',
        recipeName: 'Paneer Butter Masala',
        recipeId: 'rec-1',
        checked: false,
        addedAt: Date.now() - 3600000
      },
      {
        id: 'shop-demo-2',
        name: 'Parmesan Cheese',
        recipeName: 'Creamy Garlic Tomato Pasta',
        recipeId: 'rec-3',
        checked: true,
        addedAt: Date.now() - 7200000
      }
    ]);
  });

  // 4. Global Search query
  const [globalSearch, setGlobalSearch] = useState('');

  // Save selected ingredients to localStorage on change
  useEffect(() => {
    storage.set(STORAGE_KEYS.PANTRY, selectedIngredients);
  }, [selectedIngredients]);

  // Save custom ingredients
  useEffect(() => {
    storage.set(STORAGE_KEYS.CUSTOM_INGREDIENTS, customIngredients);
  }, [customIngredients]);

  // Save favorites
  useEffect(() => {
    storage.set(STORAGE_KEYS.FAVORITES, favorites);
  }, [favorites]);

  // Save shopping list
  useEffect(() => {
    storage.set(STORAGE_KEYS.SHOPPING_LIST, shoppingList);
  }, [shoppingList]);

  // Ingredient Helpers
  const toggleIngredient = (name) => {
    if (!name) return;
    const trimmed = name.trim();
    setSelectedIngredients((prev) => {
      const exists = prev.some((i) => i.toLowerCase() === trimmed.toLowerCase());
      if (exists) {
        return prev.filter((i) => i.toLowerCase() !== trimmed.toLowerCase());
      } else {
        return [...prev, trimmed];
      }
    });
  };

  const addCustomIngredient = (name) => {
    if (!name) return false;
    const trimmed = name.trim();
    if (!trimmed) return false;

    // Check if already in selected
    const alreadySelected = selectedIngredients.some(
      (i) => i.toLowerCase() === trimmed.toLowerCase()
    );

    if (!alreadySelected) {
      setSelectedIngredients((prev) => [...prev, trimmed]);
    }

    // Add to custom list if not already in main DB or custom list
    const inMainDb = INGREDIENTS_DATABASE.some(
      (i) => i.name.toLowerCase() === trimmed.toLowerCase()
    );
    const inCustom = customIngredients.some(
      (i) => i.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (!inMainDb && !inCustom) {
      const newCustom = {
        id: `custom-${Date.now()}`,
        name: trimmed,
        category: 'Others',
        popular: false,
        emoji: '✨',
        isCustom: true
      };
      setCustomIngredients((prev) => [...prev, newCustom]);
    }

    return true;
  };

  const removeIngredient = (name) => {
    const trimmed = name.trim().toLowerCase();
    setSelectedIngredients((prev) => prev.filter((i) => i.toLowerCase() !== trimmed));
  };

  const clearAllIngredients = () => {
    setSelectedIngredients([]);
  };

  const isIngredientSelected = (name) => {
    if (!name) return false;
    const trimmed = name.trim().toLowerCase();
    return selectedIngredients.some((i) => i.toLowerCase() === trimmed);
  };

  // Favorites Helpers
  const toggleFavorite = (recipeId) => {
    setFavorites((prev) => {
      if (prev.includes(recipeId)) {
        return prev.filter((id) => id !== recipeId);
      } else {
        return [...prev, recipeId];
      }
    });
  };

  const isFavorite = (recipeId) => {
    return favorites.includes(recipeId);
  };

  // Shopping List Helpers
  const addToShoppingList = (ingredientName, recipeName = 'Custom Item', recipeId = null) => {
    if (!ingredientName) return;
    const trimmed = ingredientName.trim();
    setShoppingList((prev) => {
      const exists = prev.some(
        (item) => item.name.toLowerCase() === trimmed.toLowerCase() && !item.checked
      );
      if (exists) return prev; // Avoid duplicate unpurchased items
      return [
        {
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          name: trimmed,
          recipeName,
          recipeId,
          checked: false,
          addedAt: Date.now()
        },
        ...prev
      ];
    });
  };

  const addMultipleToShoppingList = (ingredientNames, recipeName = 'Recipe', recipeId = null) => {
    if (!ingredientNames || ingredientNames.length === 0) return 0;
    let addedCount = 0;
    setShoppingList((prev) => {
      const newItems = [];
      ingredientNames.forEach((name) => {
        const trimmed = name.trim();
        const exists = prev.some(
          (item) => item.name.toLowerCase() === trimmed.toLowerCase() && !item.checked
        );
        if (!exists) {
          newItems.push({
            id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}-${addedCount}`,
            name: trimmed,
            recipeName,
            recipeId,
            checked: false,
            addedAt: Date.now()
          });
          addedCount++;
        }
      });
      return [...newItems, ...prev];
    });
    return addedCount;
  };

  const toggleShoppingItem = (id) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const removeShoppingItem = (id) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCheckedShoppingItems = () => {
    setShoppingList((prev) => prev.filter((item) => !item.checked));
  };

  const clearAllShoppingList = () => {
    setShoppingList([]);
  };

  // All Ingredients (Default DB + User Custom additions)
  const allIngredients = useMemo(() => {
    return [...INGREDIENTS_DATABASE, ...customIngredients];
  }, [customIngredients]);

  // Matched and Ranked Recipes computed dynamically
  const matchedRecipes = useMemo(() => {
    return filterAndRankRecipes(RECIPES_DATABASE, selectedIngredients, {
      searchQuery: globalSearch
    });
  }, [selectedIngredients, globalSearch]);

  const value = {
    // Database
    recipes: RECIPES_DATABASE,
    allIngredients,
    customIngredients,
    // Pantry Ingredients
    selectedIngredients,
    toggleIngredient,
    addCustomIngredient,
    removeIngredient,
    clearAllIngredients,
    isIngredientSelected,
    // Favorites
    favorites,
    toggleFavorite,
    isFavorite,
    favoriteRecipes: RECIPES_DATABASE.filter((r) => favorites.includes(r.id)),
    // Shopping List
    shoppingList,
    addToShoppingList,
    addMultipleToShoppingList,
    toggleShoppingItem,
    removeShoppingItem,
    clearCheckedShoppingItems,
    clearAllShoppingList,
    // Global Search
    globalSearch,
    setGlobalSearch,
    // Computed matching
    matchedRecipes,
    calculateMatchForRecipe: (recipe) => calculateRecipeMatch(recipe, selectedIngredients)
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
}

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
}

