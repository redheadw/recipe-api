const validateRecipe = (req, res, next) => {
  const {
    name,
    description,
    category,
    ingredients,
    instructions,
    prepTime,
    cookTime,
    servings,
    difficulty
  } = req.body;

  const errors = [];

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("name is required and must contain at least 2 characters.");
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim().length < 5
  ) {
    errors.push(
      "description is required and must contain at least 5 characters."
    );
  }

  if (!category || typeof category !== "string") {
    errors.push("category is required.");
  }

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    errors.push("ingredients must be a non-empty array.");
  }

  if (!instructions || typeof instructions !== "string") {
    errors.push("instructions are required.");
  }

  if (!Number.isInteger(prepTime) || prepTime < 0) {
    errors.push("prepTime must be a non-negative integer.");
  }

  if (!Number.isInteger(cookTime) || cookTime < 0) {
    errors.push("cookTime must be a non-negative integer.");
  }

  if (!Number.isInteger(servings) || servings < 1) {
    errors.push("servings must be an integer of at least 1.");
  }

  const permittedDifficulties = ["Easy", "Medium", "Hard"];

  if (!permittedDifficulties.includes(difficulty)) {
    errors.push("difficulty must be Easy, Medium, or Hard.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Recipe validation failed.",
      details: errors
    });
  }

  return next();
};

const validateCategory = (req, res, next) => {
  const { name, description, color } = req.body;

  const errors = [];

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("name is required and must contain at least 2 characters.");
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim().length < 5
  ) {
    errors.push(
      "description is required and must contain at least 5 characters."
    );
  }

  if (!color || typeof color !== "string") {
    errors.push("color is required.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Category validation failed.",
      details: errors
    });
  }

  return next();
};

module.exports = {
  validateRecipe,
  validateCategory
};