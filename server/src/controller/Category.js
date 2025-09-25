import CategoryModel from "../models/Category.js";
import slug from "slugify";
import Post from "../models/Post.js";

// CREATE
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = await new CategoryModel({
      name,
      slug: slug(name, { lower: true }),
    }).save();

    return res.status(201).send({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error while creating category",
      error,
    });
  }
};

// GET ALL
export const getAllCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find({}).sort({ name: 1 });
    return res.status(200).send({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error while fetching categories",
      error,
    });
  }
};

// UPDATE
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slug(name, { lower: true }) },
      { new: true }
    );

    if (!category) return res.status(404).send({ message: "Category not found" });

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error while updating category",
      error,
    });
  }
};

// DELETE
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // remove category reference from posts
    await Post.updateMany({ category: id }, { $unset: { category: "" } });

    await CategoryModel.findByIdAndDelete(id);

    return res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};

// SINGLE CATEGORY WITH POSTS
export const singleCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).send({ success: false, message: "Category not found" });
    }

    const posts = await Post.find({ category: category._id }).populate("category");

    return res.status(200).send({
      success: true,
      message: "Single category fetched successfully",
      category,
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting single category",
      error,
    });
  }
};

