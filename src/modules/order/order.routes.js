import { Router } from "express";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import {
  createCashOrder,
  createCheckoutSession,
  getAllOrders,
  getUserOrders,
} from "./order.controller.js";

const orderRouter = Router({ mergeParams: true });

orderRouter.route("/").get(protectedRoutes, allowedTo("user"), getAllOrders);

orderRouter.get(
  "/orders",
  protectedRoutes,
  allowedTo("user", "admin"),
  getUserOrders,
);
orderRouter
  .route("/:id")
  .post(protectedRoutes, allowedTo("user"), createCashOrder);

orderRouter
  .route("/checkout/:id")
  .post(protectedRoutes, allowedTo("user"), createCheckoutSession);

export default orderRouter;
