import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { Brand } from "../../../database/models/brand.model.js";
import { deleteOne } from "../handlers/handler.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";
import { Cart } from "../../../database/models/cart.model.js";
import { Product } from "../../../database/models/product.model.js";
import { Coupon } from "../../../database/models/coupon.model.js";
import { Order } from "../../../database/models/order.model.js";
import Stripe from "stripe";
const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCashOrder = asyncHandler(async (req, res, next) => {
  //1-get user cart by cartId
  let cart = await Cart.findById(req.params.id);
  if (!cart) return next(new AppError("cart not found", 404));
  //2-total order Price
  let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice;
  //3-create order
  let order = new Order({
    user: req.user._id,
    orderItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
  });
  await order.save();
  //4-increment sold & decrement stock

  let options = cart.cartItems.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod.product },
        update: { $inc: { sold: prod.quantity, stock: -prod.quantity } },
      },
    };
  });
  await Product.bulkWrite(options);
  //5-clear user cart
  await Cart.findByIdAndDelete(cart._id);

  res.json({ message: "success", order });
});

const getUserOrders = asyncHandler(async (req, res, next) => {
  let orders = await Order.findOne({ user: req.user._id });
  res.json({ message: "success", orders });
});
const getAllOrders = asyncHandler(async (req, res, next) => {
  let orders = await Order.find({});
  res.json({ message: "success", orders });
});
const createCheckoutSession = asyncHandler(async (req, res, next) => {
  //1-get user cart by cartId
  let cart = await Cart.findById(req.params.id);
  if (!cart) return next(new AppError("cart not found", 404));

  let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice;
  //2-create checkout session
  let session = await stripeClient.checkout.sessions.create({
    line_items: cart.cartItems.map((item) => {
      return {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      };
    }),
    mode: "payment",
    success_url: "http://localhost:3000/api/orders",
    cancel_url: "http://localhost:3000/api/cart",

    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shippingAddress,
  });
  res.json({ message: "success", session });
});
export { createCashOrder, getUserOrders, getAllOrders, createCheckoutSession };
