import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

const schema = new Schema(
  {
    name: String,
    password: String,
    email: String,
    isBlocked: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    passwordChangedAt: Date,
  },
  { timestamps: true, versionKey: false },
);

schema.pre("save", function () {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(this.password, 8);
});
schema.pre("findOneAndUpdate", async function () {
  if (this._update.password)
    this._update.password = await bcrypt.hash(this._update.password, 8);
});
export const User = model("User", schema);
