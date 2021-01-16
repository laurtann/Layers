const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const stemsRouter = require("./src/routes/stems");
const usersRouter = require("./src/routes/users");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/stems", stemsRouter);
app.use("/api/users", usersRouter);

module.exports = app;
