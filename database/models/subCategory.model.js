import { model, Schema, Types } from "mongoose";
const schema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "name is required"],
      required: true,
      trim: true,
      minLength: [2, "too short for category name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false },
);

export const SubCategory = model("SubCategory", schema);
