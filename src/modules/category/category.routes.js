import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "./category.controller.js";
import { uploadSingleFile } from "../../utils/multer.js";
import subCategoryRouter from "../subcategory/subcategory.routes.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const CategoryRouter = Router();

CategoryRouter.use("/:categoryId/subcategories", subCategoryRouter);

CategoryRouter.route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("img", "categories"),
    addCategory,
  )
  .get( getAllCategories);

CategoryRouter.route("/:id")
  .get( getCategory)
  .put(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("img", "categories"),
    updateCategory,
  )
  .delete(protectedRoutes, allowedTo("admin"), deleteCategory);

export default CategoryRouter;
