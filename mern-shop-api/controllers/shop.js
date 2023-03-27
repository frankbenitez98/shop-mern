const { response } = require("express");
const Product = require("../models/product");
const axios = require("axios");

const findAll = async (req, res = response) => {
  let list;
  try {
    list = await Product.find({}).select("-__v"); //no se devuelve el field __v
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "plase talk with the admin",
    });
  }
  res.status(200).json({
    ok: true,
    data: list,
  });
};

const uploadAProduct = async (req, res = response) => {
  const { title } = req.body;
  try {
    let product = await Product.findOne({ title });
    if (product) {
      return res.status(400).json({
        ok: false,
        msg: "the title is already registered",
      });
    }
    product = new Product(req.body);

    await product.save();

    return res.status(201).json({
      ok: true,
      msg: "product registered",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "plase talk with the admin",
    });
  }
};

const seed = async (req, res = response) => {
  try {
    await Product.deleteMany({});
    const { data } = await axios.get(
      "https://api.escuelajs.co/api/v1/products"
    );
    const list = data.map((product, index) => ({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.images[0],
    }));
    await Product.insertMany(list.slice(0, 30));
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "plase talk with the admin",
    });
  }

  res.status(200).json({
    ok: true,
    msg: "seed executed",
  });
};

module.exports = { findAll, uploadAProduct, seed };
