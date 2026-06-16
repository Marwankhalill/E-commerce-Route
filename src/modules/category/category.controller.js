import { Category } from "../../../database/models/category.model.js";
import slugify from "slugify";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/handler.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";

const addCategory = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.img = req.file.filename;
  let category = new Category(req.body);
  await category.save();
  res.status(201).json({ message: "Success", category });
});

const getAllCategories = asyncHandler(async (req, res, next) => {
  let apiFeature = new ApiFeature(Category.find(), req.query)
    .pagination()
    .fields()
    .search()
    .filter()
    .sort();

  let categories = await apiFeature.mongooseQuery;

  res.json({
    message: "Success",
    page: apiFeature.pageNumber,
    categories,
  });
});

const getCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  category || next(new AppError("Category not found", 404));
  !category || res.json({ message: "Success", category });
});

const updateCategory = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  if (req.file) req.body.img = req.file.filename;
  let category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  category || next(new AppError("Category not found", 404));
  !category || res.json({ message: "Success", category });
});

const deleteCategory = deleteOne(Category);

export {
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
