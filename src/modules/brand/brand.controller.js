import slugify from "slugify";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { Brand } from "../../../database/models/brand.model.js";
import { deleteOne } from "../handlers/handler.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";

const addBrand = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.filename;
  let brand = new Brand(req.body);
  await brand.save();
  res.status(201).json({ message: "Success", brand });
});

const getAllBrands = asyncHandler(async (req, res, next) => {
  let apiFeature = new ApiFeature(Brand.find(), req.query)
    .pagination()
    .search()
    .filter()
    .fields()
    .sort();
  let brands = await apiFeature.mongooseQuery;
  res.json({ message: "Success", page: apiFeature.pageNumber, brands });
});

const getBrand = asyncHandler(async (req, res, next) => {
  let brand = await Brand.findById(req.params.id);
  brand || next(new AppError("brand not found", 404));
  !brand || res.json({ message: "Success", brand });
});

const updateBrand = asyncHandler(async (req, res, next) => {
  req.body.slug = req.body.name && slugify(req.body.name);
  if (req.file) req.body.logo = req.file.filename;
  let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  brand || next(new AppError("brand not found", 404));
  !brand || res.json({ message: "Success", brand });
});

const deleteBrand = deleteOne(Brand);

export { addBrand, getAllBrands, getBrand, updateBrand, deleteBrand };
