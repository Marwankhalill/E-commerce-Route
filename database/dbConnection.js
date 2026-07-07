import mongoose from "mongoose";
console.log(process.env.DATABASE_URL);
console.log("DB URL exists:", !!process.env.DATABASE_URL);
console.log("DB URL starts with:", process.env.DATABASE_URL?.slice(0, 20));
export const dbConnection = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((err) => {
      console.log("Database Error:", err);
    });
};
