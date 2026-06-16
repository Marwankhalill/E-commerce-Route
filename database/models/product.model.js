import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    title: {
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
    desc: {
      type: String,
      required: true,
      minLength: 20,
      maxLength: 3000,
    },
    imgCover: String,
    images: [String],
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    priceAfterDiscount: {
      type: Number,
      required: true,
      min: 0,
    },
    sold: Number,
    stock: { type: Number, min: 0 },

    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
    subcategory: {
      type: Types.ObjectId,
      ref: "SubCategory",
    },
    brand: {
      type: Types.ObjectId,
      ref: "Brand",
    },
    rateAvg: {
      type: Number,
      min: 0,
      max: 5,
    },
    rateCount: Number,
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

schema.virtual("ProductReview", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});

schema.pre("findOne", function () {
  this.populate("ProductReview");
});

schema.post("init", function (doc) {
  if (doc.imgCover)
    doc.imgCover = "http://localhost:3000/uploads/products/" + doc.imgCover;

  if (doc.images)
    doc.images = doc.images.map(
      (img) => "http://localhost:3000/uploads/products/" + img,
    );
});

export const Product = model("Product", schema);
