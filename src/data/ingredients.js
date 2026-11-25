// Comprehensive Categorized Ingredients Dataset
export const INGREDIENT_CATEGORIES = [
  'All',
  'Vegetables',
  'Dairy & Eggs',
  'Grains & Staples',
  'Spices & Seasonings',
  'Pulses & Legumes',
  'Meat & Poultry',
  'Fruits',
  'Oils & Condiments'
];

export const POPULAR_INGREDIENTS = [
  'Tomato',
  'Onion',
  'Potato',
  'Garlic',
  'Ginger',
  'Rice',
  'Milk',
  'Paneer',
  'Cheese',
  'Egg',
  'Chicken',
  'Capsicum',
  'Butter',
  'Oil',
  'Salt',
  'Black Pepper',
  'Cumin',
  'Flour'
];

export const INGREDIENTS_DATABASE = [
  // Vegetables
  { id: 'ing-1', name: 'Tomato', category: 'Vegetables', popular: true, emoji: '🍅' },
  { id: 'ing-2', name: 'Onion', category: 'Vegetables', popular: true, emoji: '🧅' },
  { id: 'ing-3', name: 'Potato', category: 'Vegetables', popular: true, emoji: '🥔' },
  { id: 'ing-4', name: 'Garlic', category: 'Vegetables', popular: true, emoji: '🧄' },
  { id: 'ing-5', name: 'Ginger', category: 'Vegetables', popular: true, emoji: '🫚' },
  { id: 'ing-6', name: 'Capsicum', category: 'Vegetables', popular: true, emoji: '🫑' },
  { id: 'ing-7', name: 'Carrot', category: 'Vegetables', popular: true, emoji: '🥕' },
  { id: 'ing-8', name: 'Spinach', category: 'Vegetables', popular: true, emoji: '🥬' },
  { id: 'ing-9', name: 'Green Peas', category: 'Vegetables', popular: false, emoji: '🟢' },
  { id: 'ing-10', name: 'Cauliflower', category: 'Vegetables', popular: false, emoji: '🥦' },
  { id: 'ing-11', name: 'Broccoli', category: 'Vegetables', popular: false, emoji: '🥦' },
  { id: 'ing-12', name: 'Mushroom', category: 'Vegetables', popular: true, emoji: '🍄' },
  { id: 'ing-13', name: 'Cucumber', category: 'Vegetables', popular: false, emoji: '🥒' },
  { id: 'ing-14', name: 'Cabbage', category: 'Vegetables', popular: false, emoji: '🥬' },
  { id: 'ing-15', name: 'Green Chili', category: 'Vegetables', popular: true, emoji: '🌶️' },
  { id: 'ing-16', name: 'Coriander Leaves', category: 'Vegetables', popular: true, emoji: '🌿' },
  { id: 'ing-17', name: 'Mint Leaves', category: 'Vegetables', popular: false, emoji: '🍃' },
  { id: 'ing-18', name: 'Zucchini', category: 'Vegetables', popular: false, emoji: '🥒' },
  { id: 'ing-19', name: 'Eggplant', category: 'Vegetables', popular: false, emoji: '🍆' },
  { id: 'ing-20', name: 'Corn', category: 'Vegetables', popular: true, emoji: '🌽' },

  // Dairy & Eggs
  { id: 'ing-21', name: 'Milk', category: 'Dairy & Eggs', popular: true, emoji: '🥛' },
  { id: 'ing-22', name: 'Cheese', category: 'Dairy & Eggs', popular: true, emoji: '🧀' },
  { id: 'ing-23', name: 'Paneer', category: 'Dairy & Eggs', popular: true, emoji: '🧊' },
  { id: 'ing-24', name: 'Butter', category: 'Dairy & Eggs', popular: true, emoji: '🧈' },
  { id: 'ing-25', name: 'Yogurt', category: 'Dairy & Eggs', popular: true, emoji: '🍶' },
  { id: 'ing-26', name: 'Cream', category: 'Dairy & Eggs', popular: false, emoji: '🥣' },
  { id: 'ing-27', name: 'Egg', category: 'Dairy & Eggs', popular: true, emoji: '🥚' },
  { id: 'ing-28', name: 'Mozzarella', category: 'Dairy & Eggs', popular: false, emoji: '🧀' },
  { id: 'ing-29', name: 'Parmesan', category: 'Dairy & Eggs', popular: false, emoji: '🧀' },
  { id: 'ing-30', name: 'Ghee', category: 'Dairy & Eggs', popular: true, emoji: '🫙' },

  // Grains & Staples
  { id: 'ing-31', name: 'Rice', category: 'Grains & Staples', popular: true, emoji: '🍚' },
  { id: 'ing-32', name: 'Basmati Rice', category: 'Grains & Staples', popular: false, emoji: '🌾' },
  { id: 'ing-33', name: 'Flour', category: 'Grains & Staples', popular: true, emoji: '🌾' },
  { id: 'ing-34', name: 'Wheat Flour', category: 'Grains & Staples', popular: true, emoji: '🌾' },
  { id: 'ing-35', name: 'Pasta', category: 'Grains & Staples', popular: true, emoji: '🍝' },
  { id: 'ing-36', name: 'Noodles', category: 'Grains & Staples', popular: true, emoji: '🍜' },
  { id: 'ing-37', name: 'Bread', category: 'Grains & Staples', popular: true, emoji: '🍞' },
  { id: 'ing-38', name: 'Oats', category: 'Grains & Staples', popular: false, emoji: '🥣' },
  { id: 'ing-39', name: 'Semolina (Sooji)', category: 'Grains & Staples', popular: false, emoji: '🌾' },
  { id: 'ing-40', name: 'Tortilla', category: 'Grains & Staples', popular: false, emoji: '🫓' },

  // Spices & Seasonings
  { id: 'ing-41', name: 'Salt', category: 'Spices & Seasonings', popular: true, emoji: '🧂' },
  { id: 'ing-42', name: 'Black Pepper', category: 'Spices & Seasonings', popular: true, emoji: '🌶️' },
  { id: 'ing-43', name: 'Turmeric', category: 'Spices & Seasonings', popular: true, emoji: '🟡' },
  { id: 'ing-44', name: 'Cumin', category: 'Spices & Seasonings', popular: true, emoji: '🟤' },
  { id: 'ing-45', name: 'Red Chili Powder', category: 'Spices & Seasonings', popular: true, emoji: '🌶️' },
  { id: 'ing-46', name: 'Garam Masala', category: 'Spices & Seasonings', popular: true, emoji: '✨' },
  { id: 'ing-47', name: 'Coriander Powder', category: 'Spices & Seasonings', popular: false, emoji: '🌿' },
  { id: 'ing-48', name: 'Oregano', category: 'Spices & Seasonings', popular: true, emoji: '🍃' },
  { id: 'ing-49', name: 'Chili Flakes', category: 'Spices & Seasonings', popular: false, emoji: '🌶️' },
  { id: 'ing-50', name: 'Cinnamon', category: 'Spices & Seasonings', popular: false, emoji: '🪵' },
  { id: 'ing-51', name: 'Cardamom', category: 'Spices & Seasonings', popular: false, emoji: '🌱' },
  { id: 'ing-52', name: 'Cloves', category: 'Spices & Seasonings', popular: false, emoji: '🧷' },
  { id: 'ing-53', name: 'Sugar', category: 'Spices & Seasonings', popular: false, emoji: '🧊' },

  // Pulses & Legumes
  { id: 'ing-54', name: 'Lentils', category: 'Pulses & Legumes', popular: true, emoji: '🫘' },
  { id: 'ing-55', name: 'Yellow Moong Dal', category: 'Pulses & Legumes', popular: false, emoji: '🟡' },
  { id: 'ing-56', name: 'Chickpeas (Chana)', category: 'Pulses & Legumes', popular: true, emoji: '🫘' },
  { id: 'ing-57', name: 'Kidney Beans (Rajma)', category: 'Pulses & Legumes', popular: true, emoji: '🫘' },
  { id: 'ing-58', name: 'Black Lentils (Urad)', category: 'Pulses & Legumes', popular: false, emoji: '⚫' },
  { id: 'ing-59', name: 'Toor Dal', category: 'Pulses & Legumes', popular: false, emoji: '🟡' },

  // Meat & Poultry
  { id: 'ing-60', name: 'Chicken', category: 'Meat & Poultry', popular: true, emoji: '🍗' },
  { id: 'ing-61', name: 'Chicken Breast', category: 'Meat & Poultry', popular: false, emoji: '🥩' },
  { id: 'ing-62', name: 'Mutton / Lamb', category: 'Meat & Poultry', popular: false, emoji: '🍖' },
  { id: 'ing-63', name: 'Fish Fillet', category: 'Meat & Poultry', popular: false, emoji: '🐟' },
  { id: 'ing-64', name: 'Prawns / Shrimp', category: 'Meat & Poultry', popular: false, emoji: '🦐' },

  // Fruits
  { id: 'ing-65', name: 'Lemon', category: 'Fruits', popular: true, emoji: '🍋' },
  { id: 'ing-66', name: 'Apple', category: 'Fruits', popular: false, emoji: '🍎' },
  { id: 'ing-67', name: 'Banana', category: 'Fruits', popular: false, emoji: '🍌' },
  { id: 'ing-68', name: 'Mango', category: 'Fruits', popular: false, emoji: '🥭' },
  { id: 'ing-69', name: 'Avocado', category: 'Fruits', popular: false, emoji: '🥑' },
  { id: 'ing-70', name: 'Pomegranate', category: 'Fruits', popular: false, emoji: '🍎' },

  // Oils & Condiments
  { id: 'ing-71', name: 'Cooking Oil', category: 'Oils & Condiments', popular: true, emoji: '🫗' },
  { id: 'ing-72', name: 'Olive Oil', category: 'Oils & Condiments', popular: true, emoji: '🫒' },
  { id: 'ing-73', name: 'Mustard Oil', category: 'Oils & Condiments', popular: false, emoji: '🟡' },
  { id: 'ing-74', name: 'Soy Sauce', category: 'Oils & Condiments', popular: true, emoji: '🍶' },
  { id: 'ing-75', name: 'Vinegar', category: 'Oils & Condiments', popular: false, emoji: '🍾' },
  { id: 'ing-76', name: 'Tomato Ketchup', category: 'Oils & Condiments', popular: false, emoji: '🥫' },
  { id: 'ing-77', name: 'Mayonnaise', category: 'Oils & Condiments', popular: false, emoji: '🍶' },
  { id: 'ing-78', name: 'Honey', category: 'Oils & Condiments', popular: false, emoji: '🍯' },
  { id: 'ing-79', name: 'Sesame Seeds', category: 'Oils & Condiments', popular: false, emoji: '🌱' },
  { id: 'ing-80', name: 'Cashews', category: 'Oils & Condiments', popular: false, emoji: '🥜' }
];

