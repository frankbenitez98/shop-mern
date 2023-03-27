const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

module.exports = model("Product", ProductSchema);
