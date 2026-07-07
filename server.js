import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { dbConnection } from "./database/dbConnection.js";
import { bootstrap } from "./src/modules/bootstrap.js";
import { AppError } from "./src/utils/AppError.js";
import { globalError } from "./src/middlewares/globalError.js";
import cors from "cors";
import { asyncHandler } from "./src/utils/asyncHandler.js";
import Stripe from "stripe";
import { Cart } from "./database/models/cart.model.js";
import { Order } from "./database/models/order.model.js";
import { Product } from "./database/models/product.model.js";
import { User } from "./database/models/user.model.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT;
app.use(cors());

dbConnection();

app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  asyncHandler(async (req, res) => {
    const sig = req.headers["stripe-signature"].toString();
    let event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
    let checkout;
    if (event.type == "checkout.session.completed") {
      checkout = event.data.object;
      //1-get user cart by cartId
      let cart = await Cart.findById(checkout.client_reference_id);
      if (!cart) return next(new AppError("cart not found", 404));

      let user = await User.findOne({ email: checkout.customer_email });

      //3-create order
      let order = new Order({
        user: req.user._id,
        orderItems: cart.cartItems,
        shippingAddress: checkout.metadata,
        totalOrderPrice: checkout.amount_total / 100,
        paymentType: "card",
        isPaid: true,
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
    }

    res.status(200).json({ message: "success", checkout });
  }),
);

app.set("query parser", "extended");
app.use(express.json());
app.use("/uploads/", express.static("uploads"));

bootstrap(app);

app.use("/{*splat}", (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});
app.use(globalError);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
