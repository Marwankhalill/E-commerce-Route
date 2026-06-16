import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "./product.controller.js";
import { uploadMixOfFiles } from "../../utils/multer.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const productRouter = Router();

productRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadMixOfFiles(
      [
        { name: "imgCover", maxCount: 1 },
        { name: "images", maxCount: 10 },
      ],
      "products",
    ),
    addProduct,
  )
  .get(getAllProducts);

productRouter
  .route("/:id")
  .get(getProduct)
  .put(
    protectedRoutes,
    allowedTo("admin"),
    uploadMixOfFiles(
      [
        { name: "imgCover", maxCount: 1 },
        { name: "images", maxCount: 10 },
      ],
      "products",
    ),
    updateProduct,
  )
  .delete(protectedRoutes, allowedTo("admin"), deleteProduct);

export default productRouter;
