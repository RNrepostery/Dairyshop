const { Schema, model } = require("mongoose");
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

// Use a more descriptive model name
const CategoryModel = model("Category", categorySchema);

module.exports =CategoryModel;
//67c4278142735c98601333ee