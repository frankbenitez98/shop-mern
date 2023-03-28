const express = require("express");
const { check } = require("express-validator");
const { findAll, uploadAProduct, seed } = require("../controllers/shop");
const { fieldValidate } = require("../middlewares/field-validators");

const router = express.Router();

router.get("/", findAll);

router.post(
  "/new",
  [
    check("title", "title is required").not().isEmpty(),
    check("price", "price is required").isFloat(),
    check("description", "description is required").isLength({
      min: 5,
    }),
    check("image", "url of image is required").not().isEmpty(),
    check("category", "category is required").not().isEmpty(),
    fieldValidate,
  ],
  uploadAProduct
);

router.get("/seed", seed); //

module.exports = router;
