import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { Brand } from "../../../database/models/brand.model.js";
import { deleteOne } from "../handlers/handler.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";
import { Cart } from "../../../database/models/cart.model.js";

const addToCart = asyncHandler(async (req, res, next) => {
  let cartIsExist = await Cart.findOne({ user: req.user._id });
  if (!cartIsExist) {
    let cart = new Cart({
      user: req.user._id,
      cartItems: req.body,
    });
    await cart.save();
    res.status(201).json({ message: "Success", cart });
  }
  else {
    

    res.json({ message: "else"});
  }
});

export { addToCart };
