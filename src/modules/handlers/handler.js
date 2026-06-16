import { AppError } from "../../utils/AppError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const deleteOne = (model) => {
  return asyncHandler(async (req, res, next) => {
    let document = await model.findByIdAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    document || next(new AppError("document not found", 404));
    !document || res.json({ message: "Success", document });
  });
};
