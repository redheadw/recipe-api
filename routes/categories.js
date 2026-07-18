const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categories");
const { validateCategory } = require("../middleware/validation");
const { requireAuth } = require("../middleware/auth");

router.get("/", categoriesController.getAll);
router.get("/:id", categoriesController.getSingle);

router.post(
  "/",
  requireAuth,
  validateCategory,
  categoriesController.createCategory
);

router.put(
  "/:id",
  requireAuth,
  validateCategory,
  categoriesController.updateCategory
);

router.delete(
  "/:id",
  requireAuth,
  categoriesController.deleteCategory
);

module.exports = router;