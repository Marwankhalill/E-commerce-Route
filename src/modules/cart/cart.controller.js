import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { Brand } from "../../../database/models/brand.model.js";
import { deleteOne } from "../handlers/handler.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";
import { Cart } from "../../../database/models/cart.model.js";
import { Product } from "../../../database/models/product.model.js";
import { Coupon } from "../../../database/models/coupon.model.js";

function calcTotalPrice(cartIsExist) {
  cartIsExist.totalCartPrice = cartIsExist.cartItems.reduce((prev, newItem) => {
    return (prev += newItem.price * newItem.quantity);
  }, 0);

  if (cartIsExist.discount)
    cartIsExist.totalPriceAfterDiscount =
      cartIsExist.totalCartPrice -
      (cartIsExist.totalCartPrice * cartIsExist.discount) / 100;
}

const addToCart = asyncHandler(async (req, res, next) => {
  let cartIsExist = await Cart.findOne({ user: req.user._id });

  let product = await Product.findById(req.body.product);

  if (!product) return next(new AppError("Product not found", 404));

  if (req.body.quantity > product.stock)
    return next(new AppError("Sold Out", 400));

  req.body.price = product.price;

  if (!cartIsExist) {
    let cart = new Cart({
      user: req.user._id,
      cartItems: [req.body],
    });
    calcTotalPrice(cart);

    await cart.save();

    return res.status(201).json({ message: "Success", cart });
  }

  let item = cartIsExist.cartItems.find(
    (item) => item.product == req.body.product,
  );

  if (item) {
    if (item.quantity + req.body.quantity > product.stock) {
      return next(new AppError("Sold Out", 400));
    }
    item.quantity += req.body.quantity;
  } else {
    cartIsExist.cartItems.push(req.body);
  }
  calcTotalPrice(cartIsExist);
  await cartIsExist.save();

  res.status(200).json({ message: "Success", cart: cartIsExist });
});

const updateQuantity = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id });
  let item = cart.cartItems.find((item) => item.product == req.params.id);
  if (!item) return next(new AppError("Product not found", 404));

  let product = await Product.findById(req.params.id);
  if (req.body.quantity > product.stock)
    return next(new AppError("Sold Out", 400));

  item.quantity = req.body.quantity;
  calcTotalPrice(cart);
  await cart.save();
  res.json({ message: "quantity updated", cart });
});

const deleteCartItem = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.id } } },
    {
      new: true,
    },
  );
  calcTotalPrice(cart);
  await cart.save();
  cart || next(new AppError("cart not found", 404));
  !cart || res.json({ message: "Success", cart });
});

const getLoggedUserCart = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id });
  cart || next(new AppError("this user has no cart", 404));
  res.json({ message: "Success", cart });
});
const clearUserCart = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOneAndDelete({ user: req.user._id });
  cart || next(new AppError("this user has no cart", 404));
  res.json({ message: "Cart Deleted", cart });
});

const applyCoupon = asyncHandler(async (req, res, next) => {
  let coupon = await Coupon.findOne({
    code: req.body.coupon,
    expires: { $gte: Date.now() },
  });
  if (!coupon) return next(new AppError("Oops, Coupon is invalid.", 404));
  let cart = await Cart.findOne({ user: req.user._id });

  cart.discount = coupon.discount;
  calcTotalPrice(cart);
  await cart.save();
  res.json({ message: "Success", cart });
});

export {
  addToCart,
  updateQuantity,
  deleteCartItem,
  getLoggedUserCart,
  clearUserCart,
  applyCoupon,
};
