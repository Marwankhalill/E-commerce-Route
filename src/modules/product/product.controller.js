import slugify from "slugify";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { Product } from "../../../database/models/product.model.js";
import { deleteOne } from "../handlers/handler.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";

const addProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  req.body.imgCover = req.files.imgCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);
  let product = new Product(req.body);
  await product.save();
  res.status(201).json({ message: "Success", product });
});

const getAllProducts = asyncHandler(async (req, res, next) => {
  let apiFeature = new ApiFeature(
    Product.find()
      .populate("brand", "name logo")
      .populate("category", "name img")
      .populate("subcategory", "name"),
    req.query,
  )
    .pagination()
    .fields()
    .filter()
    .search();

  let products = await apiFeature.mongooseQuery;
  res.json({ message: "Success", page: apiFeature.pageNumber, products });
});

const getProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id)
    .populate("brand", "name logo")
    .populate("category", "name img")
    .populate("subcategory", "name");
  product || next(new AppError("product not found", 404));
  !product || res.json({ message: "Success", product });
});

const updateProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = req.body.name && slugify(req.body.title);
  req.body.imgCover = req.files.imgCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .populate("brand", "name logo")
    .populate("category", "name img")
    .populate("subcategory", "name");
  product || next(new AppError("product not found", 404));
  !product || res.json({ message: "Success", product });
});

const deleteProduct = deleteOne(Product);

export { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct };
