import slugify from "slugify";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { SubCategory } from "../../../database/models/subCategory.model.js";
import { deleteOne } from "../handlers/handler.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";

const addSubCategory = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  let subcategory = new SubCategory(req.body);
  await subcategory.save();
  res.status(201).json({ message: "Success", subcategory });
});

const getAllSubCategories = asyncHandler(async (req, res, next) => {
  let objFilter = {};
  if (req.params.categoryId) objFilter.category = req.params.categoryId;
  let apiFeature = new ApiFeature(
    SubCategory.find(objFilter).populate("category", "name img"),
    req.query,
  )
    .pagination()
    .fields()
    .search()
    .filter()
    .sort();
  let subcategories = await apiFeature.mongooseQuery;
  res.json({ message: "Success", page: apiFeature.pageNumber, subcategories });
});

const getSubCategory = asyncHandler(async (req, res, next) => {
  let subcategory = await SubCategory.findById(req.params.id).populate(
    "category",
    "name img",
  );
  subcategory || next(new AppError("subCategory not found", 404));
  !subcategory || res.json({ message: "Success", subcategory });
});

const updateSubCategory = asyncHandler(async (req, res, next) => {
  req.body.slug = req.body.name && slugify(req.body.name);
  let subcategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
  );
  subcategory || next(new AppError("subCategory not found", 404));
  !subcategory || res.json({ message: "Success", subcategory });
});

const deleteSubCategory = deleteOne(SubCategory);

export {
  addSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
