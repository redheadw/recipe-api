const express = require("express");
const router = express.Router();

const recipesController = require("../controllers/recipes");
const { validateRecipe } = require("../middleware/validation");
const { requireAuth } = require("../middleware/auth");

router.get("/", recipesController.getAll);
/*
  #swagger.tags = ["Recipes"]
  #swagger.summary = "Get all recipes"
  #swagger.description = "Returns every recipe stored in the recipes collection."

  #swagger.responses[200] = {
    description: "Recipes retrieved successfully.",
    schema: [{
      $ref: "#/definitions/RecipeResponse"
    }]
  }

  #swagger.responses[500] = {
    description: "Unable to retrieve recipes.",
    schema: {
      $ref: "#/definitions/ServerError"
    }
  }
*/

router.get("/:id", recipesController.getSingle);
/*
  #swagger.tags = ["Recipes"]
  #swagger.summary = "Get a recipe by ID"
  #swagger.description = "Returns one recipe using its MongoDB ObjectId."

  #swagger.parameters["id"] = {
    in: "path",
    description: "MongoDB ObjectId of the recipe.",
    required: true,
    type: "string"
  }

  #swagger.responses[200] = {
    description: "Recipe retrieved successfully.",
    schema: {
      $ref: "#/definitions/RecipeResponse"
    }
  }

  #swagger.responses[400] = {
    description: "Invalid recipe ID."
  }

  #swagger.responses[404] = {
    description: "Recipe not found."
  }

  #swagger.responses[500] = {
    description: "Unable to retrieve the recipe."
  }
*/

router.post(
  "/",
  requireAuth,
  validateRecipe,
  recipesController.createRecipe
);
/*
  #swagger.tags = ["Recipes"]
  #swagger.summary = "Create a new recipe"
  #swagger.description = "Creates a recipe after validating all required fields."

  #swagger.parameters["body"] = {
    in: "body",
    description: "Recipe information.",
    required: true,
    schema: {
      $ref: "#/definitions/RecipeInput"
    }
  }

  #swagger.responses[201] = {
    description: "Recipe created successfully.",
    schema: {
      message: "Recipe created successfully.",
      id: "64c285a87db761333e18d1d5"
    }
  }

  #swagger.responses[400] = {
    description: "Recipe validation failed.",
    schema: {
      $ref: "#/definitions/ValidationError"
    }
  }

  #swagger.responses[401] = {
    description: "Authentication is required."
  }

  #swagger.responses[500] = {
    description: "Unable to create the recipe."
  }
*/

router.put(
  "/:id",
  requireAuth,
  validateRecipe,
  recipesController.updateRecipe
);
/*
  #swagger.tags = ["Recipes"]
  #swagger.summary = "Update a recipe"
  #swagger.description = "Updates a recipe using its MongoDB ObjectId."

  #swagger.parameters["id"] = {
    in: "path",
    description: "MongoDB ObjectId of the recipe to update.",
    required: true,
    type: "string"
  }

  #swagger.parameters["body"] = {
    in: "body",
    description: "Updated recipe information.",
    required: true,
    schema: {
      $ref: "#/definitions/RecipeInput"
    }
  }

  #swagger.responses[204] = {
    description: "Recipe updated successfully."
  }

  #swagger.responses[400] = {
    description: "Invalid recipe ID or recipe validation failed."
  }

  #swagger.responses[401] = {
    description: "Authentication is required."
  }

  #swagger.responses[404] = {
    description: "Recipe not found."
  }

  #swagger.responses[500] = {
    description: "Unable to update the recipe."
  }
*/

router.delete(
  "/:id",
  requireAuth,
  recipesController.deleteRecipe
);
/*
  #swagger.tags = ["Recipes"]
  #swagger.summary = "Delete a recipe"
  #swagger.description = "Deletes a recipe using its MongoDB ObjectId."

  #swagger.parameters["id"] = {
    in: "path",
    description: "MongoDB ObjectId of the recipe to delete.",
    required: true,
    type: "string"
  }

  #swagger.responses[200] = {
    description: "Recipe deleted successfully.",
    schema: {
      message: "Recipe deleted successfully."
    }
  }

  #swagger.responses[400] = {
    description: "Invalid recipe ID."
  }

  #swagger.responses[401] = {
    description: "Authentication is required."
  }

  #swagger.responses[404] = {
    description: "Recipe not found."
  }

  #swagger.responses[500] = {
    description: "Unable to delete the recipe."
  }
*/

module.exports = router;