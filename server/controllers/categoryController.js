import Category from "../models/categoryModel.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ message: "Category exists" });

    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};
