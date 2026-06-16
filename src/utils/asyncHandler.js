  import { AppError } from "./AppError.js";

  export const asyncHandler = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch((err) => {
        next(new AppError(err.message, 500));
      });
    };
  };
