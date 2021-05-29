const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const ProductSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    productDesc: {
      type: String,
      required: true,
      trim: true,
    },
    productPrice: {
      type: Number,
      trim: true,
    },
    productCategory: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    productQty: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
