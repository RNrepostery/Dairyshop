const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ✅ Prevent overwriting the model
const ProductModel =  model("Product", productSchema);

module.exports = ProductModel;

// // Use a more descriptive model name
// const CategoryModel = model("Category", categorySchema);

// module.exports =CategoryModel;
// //67c4278142735c98601333ee
