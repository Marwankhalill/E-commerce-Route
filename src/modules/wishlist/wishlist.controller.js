import slugify from "slugify";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { Brand } from "../../../database/models/brand.model.js";
import { deleteOne } from "../handlers/handler.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";
import { User } from "../../../database/models/user.model.js";

const addToWishlist = asyncHandler(async (req, res, next) => {
  let wishlist = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { wishlist: req.body.product } },
    {
      new: true,
    },
  );
  wishlist || next(new AppError("wishList not found", 404));
  !wishlist || res.json({ message: "Success", wishlist: wishlist.wishlist });
});
const removeFromWishlist = asyncHandler(async (req, res, next) => {
  let wishlist = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishlist: req.params.id } },
    {
      new: true,
    },
  );
  wishlist || next(new AppError("wishList not found", 404));
  !wishlist || res.json({ message: "Success", wishlist: wishlist.wishlist });
});
const getUserLoggedForWishlist = asyncHandler(async (req, res, next) => {
  let wishlist = await User.findById(req.user._id).populate("wishlist");
  wishlist || next(new AppError("wishList not found", 404));
  !wishlist || res.json({ message: "Success", wishlist: wishlist.wishlist });
});

export { addToWishlist, removeFromWishlist, getUserLoggedForWishlist };
