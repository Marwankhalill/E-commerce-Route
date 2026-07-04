import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { dbConnection } from "./database/dbConnection.js";
import { bootstrap } from "./src/modules/bootstrap.js";
import { AppError } from "./src/utils/AppError.js";
import { globalError } from "./src/middlewares/globalError.js";
import cors from "cors";
import { asyncHandler } from "./src/utils/asyncHandler.js";

const app = express();
const port = process.env.port;
app.use(cors());

dbConnection();

app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  asyncHandler((req, res) => {
    const sig = req.headers["stripe-signature"];
    let event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      whsec_fMI3ZebpjkvCQsRPovBmjsO2nulPGZqB,
    );
    let checkout;
    if (event.type == "checkout.session.completed") {
      checkout = event.data.object;
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
