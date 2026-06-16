import addressRouter from "./addresses/addresses.routes.js";
import authRouter from "./auth/auth.routes.js";
import brandRouter from "./brand/brand.routes.js";
import CategoryRouter from "./category/category.routes.js";
import productRouter from "./product/product.routes.js";
import reviewRouter from "./review/review.routes.js";
import subCategoryRouter from "./subcategory/subcategory.routes.js";
import userRouter from "./user/user.routes.js";
import wishlistRouter from "./wishlist/wishlist.routes.js";

export const bootstrap = (app) => {
  app.use("/api/categories", CategoryRouter);
  app.use("/api/subcategories", subCategoryRouter);
  app.use("/api/brands", brandRouter);
  app.use("/api/products", productRouter);
  app.use("/api/users", userRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/reviews", reviewRouter);
  app.use("/api/wishlist", wishlistRouter);
  app.use("/api/addresses", addressRouter);
};
