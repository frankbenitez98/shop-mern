/*
   User Routes 
   host + /api/auth
*/

const express = require("express");
const { check } = require("express-validator");
const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../controllers/auth");
const { fieldValidate } = require("../middlewares/field-validators");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = express.Router();

router.post(
  "/new",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password should be of 6 characters").isLength({
      min: 6,
    }),
    check("isAdmin", "isAdmin is required").isBoolean(),
    fieldValidate,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "email is required").isEmail(),
    check("password", "password should be of 6 characters").isLength({
      min: 6,
    }),
    fieldValidate,
  ],
  loginUser
);

router.get("/renew", validateJWT, revalidateToken);

module.exports = router;
