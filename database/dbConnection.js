import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/E-Commerce")
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((err) => {
      console.log("Database Error:", err);
    });
};
//"mongodb+srv://MarwanKhalil:rysrBJPVQZc7lHG9@e-commerce.nsucxfg.mongodb.net/E-Commerce"
