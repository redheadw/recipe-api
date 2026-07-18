const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

const getAll = async (req, res) => {
  try {
    const recipes = await mongodb
      .getDb()
      .collection("recipes")
      .find()
      .toArray();

    return res.status(200).json(recipes);
  } catch (error) {
    console.error("GET recipes error:", error);

    return res.status(500).json({
      error: "Unable to retrieve recipes."
    });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: "Invalid recipe ID."
      });
    }

    const recipe = await mongodb
      .getDb()
      .collection("recipes")
      .findOne({
        _id: new ObjectId(req.params.id)
      });

    if (!recipe) {
      return res.status(404).json({
        error: "Recipe not found."
      });
    }

    return res.status(200).json(recipe);
  } catch (error) {
    console.error("GET recipe error:", error);

    return res.status(500).json({
      error: "Unable to retrieve the recipe."
    });
  }
};

const createRecipe = async (req, res) => {
  try {
    const recipe = {
      name: req.body.name.trim(),
      description: req.body.description.trim(),
      category: req.body.category.trim(),
      ingredients: req.body.ingredients,
      instructions: req.body.instructions.trim(),
      prepTime: req.body.prepTime,
      cookTime: req.body.cookTime,
      servings: req.body.servings,
      difficulty: req.body.difficulty,
      createdBy: req.user?.username || "anonymous"
    };

    const result = await mongodb
      .getDb()
      .collection("recipes")
      .insertOne(recipe);

    return res.status(201).json({
      message: "Recipe created successfully.",
      id: result.insertedId
    });
  } catch (error) {
    console.error("POST recipe error:", error);

    return res.status(500).json({
      error: "Unable to create the recipe."
    });
  }
};

const updateRecipe = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: "Invalid recipe ID."
      });
    }

    const recipe = {
      name: req.body.name.trim(),
      description: req.body.description.trim(),
      category: req.body.category.trim(),
      ingredients: req.body.ingredients,
      instructions: req.body.instructions.trim(),
      prepTime: req.body.prepTime,
      cookTime: req.body.cookTime,
      servings: req.body.servings,
      difficulty: req.body.difficulty
    };

    const result = await mongodb
      .getDb()
      .collection("recipes")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: recipe }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Recipe not found."
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("PUT recipe error:", error);

    return res.status(500).json({
      error: "Unable to update the recipe."
    });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: "Invalid recipe ID."
      });
    }

    const result = await mongodb
      .getDb()
      .collection("recipes")
      .deleteOne({
        _id: new ObjectId(req.params.id)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Recipe not found."
      });
    }

    return res.status(200).json({
      message: "Recipe deleted successfully."
    });
  } catch (error) {
    console.error("DELETE recipe error:", error);

    return res.status(500).json({
      error: "Unable to delete the recipe."
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createRecipe,
  updateRecipe,
  deleteRecipe
};