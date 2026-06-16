import { User } from "../../database/models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const checkEmail = async (req, res, next) => {
    try {
     
      const isFound = await User.findOne({ email: req.body.email });
      if (isFound)
        return res.status(409).json({
          message: "This email already exist",
        });

      next();
    } catch (err) {
    next(err); 
  }
};