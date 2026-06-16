import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import { User } from "../../../database/models/user.model.js";
import jwt from "jsonwebtoken";

const signup = asyncHandler(async (req, res, next) => {
  let user = new User(req.body);

  await user.save();

  res.status(201).json({ message: "Success", user });
});
const signin = asyncHandler(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );
    return res.status(201).json({ message: "Success", token });
  }
  next(new AppError("Email or password is wrong", 401));
});
const changePassword = asyncHandler(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
    if (req.body.oldPassword == req.body.newPassword)
      return next(new AppError("New password is the same old password", 409));

    await User.findOneAndUpdate(
      { email: req.body.email },
      { password: req.body.newPassword, passwordChangedAt: Date.now() },
    );
    let token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );
    return res.status(201).json({ message: "Success", token });
  }
  next(new AppError("Email or password is wrong", 401));
});
const protectedRoutes = asyncHandler(async (req, res, next) => {
  let { token } = req.headers;
  let userPayload = null;
  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) return next(new AppError(err, 401));
    userPayload = payload;
    // console.log(payload);
  });
  let user = await User.findById(userPayload.userId);
  if (!user) return next(new AppError("user not found", 401));
  if (user.passwordChangedAt) {
    let time = parseInt(user.passwordChangedAt.getTime() / 1000);
    if (time > userPayload.iat)
      return next(new AppError("token invalid ... login again", 401));
  }
  req.user = user;
  next();
});

const allowedTo = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }
    next(new AppError("Your are not allowed to access this endpoint", 401));
  });
};

export { signup, signin, changePassword, protectedRoutes, allowedTo };
