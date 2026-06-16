import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";

import { deleteOne } from "../handlers/handler.js";
import { User } from "../../../database/models/user.model.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";

const addUser = asyncHandler(async (req, res, next) => {
  let user = new User(req.body);
  await user.save();
  res.status(201).json({ message: "Success", user });
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  let apiFeature = new ApiFeature(User.find(), req.query)
    .pagination()
    .search()
    .filter()
    .fields()
    .sort();
  let users = await apiFeature.mongooseQuery;
  res.json({ message: "Success", page: apiFeature.pageNumber, users });
});

const getUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  user || next(new AppError("user not found", 404));
  !user || res.json({ message: "Success", user });
});

const updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findByIdAndUpdate(req.params.id, req.body, {
    // new: true,
    returnDocument: "after",
  });
  user || next(new AppError("user not found", 404));
  !user || res.json({ message: "Success", user });
});

const deleteUser = deleteOne(User);

export { addUser, getAllUsers, getUser, updateUser, deleteUser };
