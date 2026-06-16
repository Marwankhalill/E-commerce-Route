import slugify from "slugify";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { Brand } from "../../../database/models/brand.model.js";
import { deleteOne } from "../handlers/handler.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";
import { User } from "../../../database/models/user.model.js";

const addAddress = asyncHandler(async (req, res, next) => {
  let address = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { addresses: req.body } },
    {
      new: true,
    },
  );
  address || next(new AppError("address not found", 404));
  !address || res.json({ message: "Success", address: address.addresses });
});
const removeAddress = asyncHandler(async (req, res, next) => {
  let address = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { addresses: { _id: req.params.id } } },
    {
      new: true,
    },
  );
  address || next(new AppError("address not found", 404));
  !address || res.json({ message: "Success", address: address.addresses });
});
const getUserLoggedForAddresses = asyncHandler(async (req, res, next) => {
  let address = await User.findById(req.user._id);

  address || next(new AppError("address not found", 404));
  !address || res.json({ message: "Success", address: address.addresses });
});

export { addAddress, removeAddress, getUserLoggedForAddresses };
