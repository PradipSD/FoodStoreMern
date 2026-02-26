const Recipe = require("../models/Recipe");

const normalizePayload = (payload) => {
  const normalized = { ...payload };

  if (typeof normalized.ingredients === "string") {
    normalized.ingredients = normalized.ingredients
      .split(",")
      .map((ingredient) => ingredient.trim())
      .filter(Boolean);
  }

  if (normalized.time !== undefined) {
    normalized.time = Number(normalized.time);
  }

  if (normalized.servings !== undefined) {
    normalized.servings = Number(normalized.servings);
  }

  if (typeof normalized.vegetarian === "string") {
    normalized.vegetarian = normalized.vegetarian === "true";
  }

  return normalized;
};

const buildFilters = ({ search, cuisine, difficulty, vegetarian }) => {
  const filters = {};

  if (search) {
    const regex = new RegExp(search.trim(), "i");
    filters.$or = [
      { title: regex },
      { cuisine: regex },
      { ingredients: regex },
      { instructions: regex },
    ];
  }

  if (cuisine && cuisine !== "All") {
    filters.cuisine = new RegExp(`^${cuisine}$`, "i");
  }

  if (difficulty && difficulty !== "All") {
    filters.difficulty = difficulty;
  }

  if (vegetarian === "true") {
    filters.vegetarian = true;
  } else if (vegetarian === "false") {
    filters.vegetarian = false;
  }

  return filters;
};

const getRecipes = async (req, res, next) => {
  try {
    const filters = buildFilters(req.query);
    const recipes = await Recipe.find(filters).sort({ createdAt: -1 });
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.create(normalizePayload(req.body));
    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      normalizePayload(req.body),
      {
        new: true,
        runValidators: true,
      },
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
