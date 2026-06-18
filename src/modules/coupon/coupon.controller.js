import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { Coupon } from "../../../database/models/coupon.model.js";
import { deleteOne } from "../handlers/handler.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";

const addCoupon = asyncHandler(async (req, res, next) => {
  let isExist = await Coupon.findOne({ code: req.body.code });
  if (isExist) return next(new AppError("Coupon Exists"));
  let coupon = new Coupon(req.body);
  await coupon.save();
  res.status(201).json({ message: "Success", coupon });
});

const getAllCoupons = asyncHandler(async (req, res, next) => {
  let apiFeature = new ApiFeature(Coupon.find(), req.query)
    .pagination()
    .search()
    .filter()
    .fields()
    .sort();
  let coupons = await apiFeature.mongooseQuery;
  res.json({ message: "Success", page: apiFeature.pageNumber, coupons });
});

const getCoupon = asyncHandler(async (req, res, next) => {
  let coupon = await Coupon.findById(req.params.id);
  coupon || next(new AppError("coupon not found", 404));
  !coupon || res.json({ message: "Success", coupon });
});

const updateCoupon = asyncHandler(async (req, res, next) => {
  let coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  coupon || next(new AppError("coupon not found", 404));
  !coupon || res.json({ message: "Success", coupon });
});

const deleteCoupon = deleteOne(Coupon);

export { addCoupon, getAllCoupons, getCoupon, updateCoupon, deleteCoupon };
