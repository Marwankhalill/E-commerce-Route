import slugify from "slugify";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { Review } from "../../../database/models/review.model.js";
import { deleteOne } from "../handlers/handler.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";

const addReview = asyncHandler(async (req, res, next) => {
  req.body.user = req.user._id;
  let isExist = await Review.findOne({
    user: req.user._id,
    product: req.body.product,
  });
  if (isExist)
    return next(new AppError("you created a Review before ...", 409));
  let review = new Review(req.body);
  await review.save();
  res.status(201).json({ message: "Success", review });
});

const getAllReviews = asyncHandler(async (req, res, next) => {
  let apiFeature = new ApiFeature(Review.find(), req.query)
    .pagination()
    .search()
    .filter()
    .fields()
    .sort();
  let reviews = await apiFeature.mongooseQuery;
  res.json({ message: "Success", page: apiFeature.pageNumber, reviews });
});

const getReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  review || next(new AppError("review not found", 404));
  !review || res.json({ message: "Success", review });
});

const updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findByIdAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    {
      returnDocument: true,
    },
  );
  review || next(new AppError("review not found", 404));
  !review || res.json({ message: "Success", review });
});

const deleteReview = deleteOne(Review);

export { addReview, getAllReviews, getReview, updateReview, deleteReview };
