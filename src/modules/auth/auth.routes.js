import { Router } from "express";
import { changePassword, signin, signup } from "./auth.controller.js";
import { checkEmail } from "../../middlewares/checkEmail.js";

const authRouter = Router();

authRouter
  .post("/signup", checkEmail, signup)
  .post("/signin", signin)
  .patch("/change-password", changePassword);

export default authRouter;
