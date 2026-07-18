const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

const getAll = async (req, res) => {
  try {
    const categories = await mongodb
      .getDb()
      .collection("categories")
      .find()
      .toArray();

    return res.status(200).json(categories);
  } catch (error) {
    console.error("GET categories error:", error);

    return res.status(500).json({
      error: "Unable to retrieve categories."
    });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: "Invalid category ID."
      });
    }

    const category = await mongodb
      .getDb()
      .collection("categories")
      .findOne({
        _id: new ObjectId(req.params.id)
      });

    if (!category) {
      return res.status(404).json({
        error: "Category not found."
      });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error("GET category error:", error);

    return res.status(500).json({
      error: "Unable to retrieve the category."
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = {
      name: req.body.name.trim(),
      description: req.body.description.trim(),
      color: req.body.color.trim()
    };

    const result = await mongodb
      .getDb()
      .collection("categories")
      .insertOne(category);

    return res.status(201).json({
      message: "Category created successfully.",
      id: result.insertedId
    });
  } catch (error) {
    console.error("POST category error:", error);

    return res.status(500).json({
      error: "Unable to create the category."
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: "Invalid category ID."
      });
    }

    const category = {
      name: req.body.name.trim(),
      description: req.body.description.trim(),
      color: req.body.color.trim()
    };

    const result = await mongodb
      .getDb()
      .collection("categories")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: category }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Category not found."
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("PUT category error:", error);

    return res.status(500).json({
      error: "Unable to update the category."
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: "Invalid category ID."
      });
    }

    const result = await mongodb
      .getDb()
      .collection("categories")
      .deleteOne({
        _id: new ObjectId(req.params.id)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Category not found."
      });
    }

    return res.status(200).json({
      message: "Category deleted successfully."
    });
  } catch (error) {
    console.error("DELETE category error:", error);

    return res.status(500).json({
      error: "Unable to delete the category."
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCategory,
  updateCategory,
  deleteCategory
};