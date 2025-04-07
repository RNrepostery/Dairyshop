const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  
    
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      role: {
        type: Number,
        default: 0,
      },
    },
    { timestamps: true }
);

// Use a more descriptive model name
const UserModel = model("User", userSchema);

module.exports = UserModel;
