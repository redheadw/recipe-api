const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categories");
const { validateCategory } = require("../middleware/validation");
const { requireAuth } = require("../middleware/auth");

router.get("/", categoriesController.getAll);
router.get("/:id", categoriesController.getSingle);

/*
  #swagger.tags = ["Categories"]
  #swagger.summary = "Create a new category"
  #swagger.description = "Creates a new recipe category."
  #swagger.security = [{ "githubOAuth": [] }]

  #swagger.parameters["body"] = {
    in: "body",
    description: "Category information.",
    required: true,
    schema: {
      $ref: "#/definitions/CategoryInput"
    }
  }

  #swagger.responses[201] = {
    description: "Category created successfully."
  }

  #swagger.responses[400] = {
    description: "Category validation failed.",
    schema: {
      $ref: "#/definitions/ValidationError"
    }
  }

  #swagger.responses[401] = {
    description: "Authentication is required."
  }

  #swagger.responses[500] = {
    description: "Unable to create the category."
  }
*/
router.post(
  "/",
  requireAuth,
  validateCategory,
  categoriesController.createCategory
);

/*
  #swagger.tags = ["Categories"]
  #swagger.summary = "Update a category"
  #swagger.description = "Updates a recipe category using its MongoDB ObjectId."
  #swagger.security = [{ "githubOAuth": [] }]

  #swagger.parameters["id"] = {
    in: "path",
    description: "MongoDB ObjectId of the category to update.",
    required: true,
    type: "string"
  }

  #swagger.parameters["body"] = {
    in: "body",
    description: "Updated category information.",
    required: true,
    schema: {
      $ref: "#/definitions/CategoryInput"
    }
  }

  #swagger.responses[204] = {
    description: "Category updated successfully."
  }

  #swagger.responses[400] = {
    description: "Invalid category ID or category validation failed."
  }

  #swagger.responses[401] = {
    description: "Authentication is required."
  }

  #swagger.responses[404] = {
    description: "Category not found."
  }

  #swagger.responses[500] = {
    description: "Unable to update the category."
  }
*/
router.put(
  "/:id",
  requireAuth,
  validateCategory,
  categoriesController.updateCategory
);

/*
  #swagger.tags = ["Categories"]
  #swagger.summary = "Delete a category"
  #swagger.description = "Deletes a category."
  #swagger.security = [{ "githubOAuth": [] }]

  #swagger.parameters["id"] = {
    in: "path",
    required: true,
    type: "string"
  }

  #swagger.responses[200] = {
    description: "Category deleted successfully."
  }

  #swagger.responses[400] = {
    description: "Invalid category ID."
  }

  #swagger.responses[401] = {
    description: "Authentication is required."
  }

  #swagger.responses[404] = {
    description: "Category not found."
  }

  #swagger.responses[500] = {
    description: "Unable to delete the category."
  }
*/

router.delete(
  "/:id",
  requireAuth,
  categoriesController.deleteCategory
);

module.exports = router;