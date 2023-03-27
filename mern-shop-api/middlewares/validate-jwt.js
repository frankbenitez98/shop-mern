const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "The token doesnt exist",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
    // save by reference the payload information for use in the controller, the req is passed by reference
    req.uid = payload.uid;
    req.name = payload.name;
    req.isAdmin = payload.isAdmin;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "the token is not valid",
    });
  }

  next();
};

module.exports = {
  validateJWT,
};
