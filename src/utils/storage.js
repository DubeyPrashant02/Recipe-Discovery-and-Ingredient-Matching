// Safe LocalStorage Utility Helpers

const PREFIX = 'RECIPE_APP_';

export const STORAGE_KEYS = {
  PANTRY: `${PREFIX}SELECTED_INGREDIENTS`,
  FAVORITES: `${PREFIX}FAVORITES`,
  SHOPPING_LIST: `${PREFIX}SHOPPING_LIST`,
  CUSTOM_INGREDIENTS: `${PREFIX}CUSTOM_INGREDIENTS`
};

export const storage = {
  get: (key, defaultValue) => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null || item === undefined) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.warn(`[LocalStorage] Error reading key "${key}":`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`[LocalStorage] Error writing key "${key}":`, error);
    }
  },

  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`[LocalStorage] Error removing key "${key}":`, error);
    }
  },

  clearAllAppData: () => {
    try {
      Object.values(STORAGE_KEYS).forEach((k) => window.localStorage.removeItem(k));
    } catch (error) {
      console.warn('[LocalStorage] Error clearing app data:', error);
    }
  }
};

