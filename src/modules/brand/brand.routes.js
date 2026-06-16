import { Router } from "express";
import {
  addBrand,
  deleteBrand,
  getAllBrands,
  getBrand,
  updateBrand,
} from "./brand.controller.js";
import { uploadSingleFile } from "../../utils/multer.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const brandRouter = Router();

brandRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("photo", "brands"),
    addBrand,
  )
  .get(getAllBrands);

brandRouter
  .route("/:id")
  .get(getBrand)
  .put(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("photo", "brands"),
    updateBrand,
  )
  .delete(protectedRoutes, allowedTo("admin"), deleteBrand);

export default brandRouter;
