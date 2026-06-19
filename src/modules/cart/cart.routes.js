import { Router } from "express";
import { uploadSingleFile } from "../../utils/multer.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import {
  addToCart,
  applyCoupon,
  clearUserCart,
  deleteCartItem,
  getLoggedUserCart,
  updateQuantity,
} from "./cart.controller.js";

const cartRouter = Router();

cartRouter
  .route("/")
  .post(protectedRoutes, allowedTo("user"), addToCart)
  .get(protectedRoutes, allowedTo("user"), getLoggedUserCart)
  .delete(protectedRoutes, allowedTo("user"), clearUserCart);

cartRouter
  .route("/:id")
  .put(protectedRoutes, allowedTo("user"), updateQuantity)
  .delete(protectedRoutes, allowedTo("user"), deleteCartItem);

cartRouter.post(
  "/apply-coupon",
  protectedRoutes,
  allowedTo("user"),
  applyCoupon,
);

export default cartRouter;
