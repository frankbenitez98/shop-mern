const express = require("express");
const { dbConnection } = require("./DB/config");
const cors = require("cors");

require("dotenv").config();

const app = express();

dbConnection();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.use("/api/shop", require("./routes/shop"));

app.listen(process.env.PORT, () =>
  console.log(`running un port ${process.env.PORT}`)
);
