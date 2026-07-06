import { Router } from "express";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "./user.controller.js";
import { checkEmail } from "../../middlewares/checkEmail.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import orderRouter from "../order/order.routes.js";

const userRouter = Router();

userRouter.use("/:orderId/", orderRouter);

userRouter
  .route("/")
  .post(protectedRoutes, allowedTo("admin"), checkEmail, addUser)
  .get(protectedRoutes, allowedTo("admin"), getAllUsers);

userRouter
  .route("/:id")
  .get(protectedRoutes, allowedTo("admin"), getUser)
  .put(protectedRoutes, allowedTo("admin"), updateUser)
  .delete(protectedRoutes, allowedTo("admin"), deleteUser);

export default userRouter;
