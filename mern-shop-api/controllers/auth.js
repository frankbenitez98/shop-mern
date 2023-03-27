const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "the email is already registered",
      });
    }
    user = new User(req.body);

    // encrypt the password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // generate token
    const token = await generateJWT(user.id, user.name, user.isAdmin);

    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "plase talk with the admin",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "the user doesn't exist with that email",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "password is wrong",
      });
    }
    // generate token
    const token = await generateJWT(user.id, user.name, user.isAdmin);

    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "plase talk with the admin",
    });
  }
};

const revalidateToken = async (req, res = response) => {
  const { uid, name, isAdmin } = req;
  const token = await generateJWT(uid, name, isAdmin);

  res.status(200).json({
    ok: true,
    uid,
    name,
    isAdmin,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
};
