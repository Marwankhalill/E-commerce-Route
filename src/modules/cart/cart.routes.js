import { Router } from "express";
import { uploadSingleFile } from "../../utils/multer.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addToCart } from "./cart.controller.js";

const cartRouter = Router();

cartRouter.route("/").post(protectedRoutes, allowedTo("user"), addToCart);
// .get(getAllBrands);

// cartRouter
//   .route("/:id")
//   .get(getBrand)
//   .put(
//     protectedRoutes,
//     allowedTo("admin"),
//     uploadSingleFile("photo", "brands"),
//     updateBrand,
//   )
//   .delete(protectedRoutes, allowedTo("admin"), deleteBrand);

export default cartRouter;
