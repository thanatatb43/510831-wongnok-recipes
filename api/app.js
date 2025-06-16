const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
// const mysql = require("mysql");
const cors = require("cors");

//enable dotenv
require("dotenv").config();

const indexRouter = require("./routes/index");
const recipesRouter = require("./routes/recipes");
const usersRouter = require('./routes/users');
const ratingRouter = require('./routes/rating');

const app = express();
app.use(cors());

app.use(logger("dev"));
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//connect db
// mysql.createConnection({
//   host: process.env.DB_URL,
//   user: "root",
//   password: null,
//   database: "510831_wongnok_recipes",
// });

//init passportjs
passport.initialize();

app.use("/", indexRouter); // localhost:3000
app.use("/recipes", recipesRouter); // localhost:3000/recipes
app.use('/user', usersRouter);// localhost:3000/user
app.use('/rating', ratingRouter);// localhost:3000/rating

module.exports = app;
