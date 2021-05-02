const tempDB = [];
module.exports.tempDB = tempDB;
// exports.tempDB = [];

// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
//app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users"); // <--
const widgetsRoutes = require("./routes/widgets"); //<--

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db)); //<--
app.use("/api/widgets", widgetsRoutes(db)); // <--
// Note: mount other resources here, using the same pattern above
//----------------------------------------------------------------
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
//---- GET ROUTES ---

//Seperated routes for each get and post
const indexRoutes = require("./routes/index");
const menuRoutes = require("./routes/menu");
const orderplacedRoutes = require("./routes/orderplaced");
const restaurantRoutes = require("./routes/restaurant");
const checkoutRoutes = require("./routes/checkout");

app.use("/", indexRoutes(db));
app.use("/menu", menuRoutes(db));
app.use("/orderplaced", orderplacedRoutes(db));
app.use("/restaurant", restaurantRoutes(db));
app.use("/checkout", checkoutRoutes(db));

//-- post router still needs work
const checkoutPostRoutes = require("./routes/checkout-post");
app.use("/", checkoutPostRoutes);

// app.get("/", (req, res) => {
//   res.render("index");
// });

// // menu page
// app.get("/menu", (req, res) => {
//   res.render("menu");
// });
// confirmation page
// app.get("/checkout", (req, res) => {
//   console.log(req.body);
//   console.log("orderplaced");
//   res.render("orderplaced", { tempDB });
// });
// Secret restaurant page
// app.get("/restaurant", (req, res) => {
//   res.render("restaurant");
// });

// POST ROUTES -server

// app.post("/checkout", (req, res) => {
//   console.log(req.body);
//   let burger = req.body["burger"];
//   let hotdog = req.body["hotdog"];
//   let sandwich = req.body["sandwich"];
//   if (burger === "") {
//     tempDB.push("BURGER ITEM");
//   }
//   if (hotdog === "") {
//     tempDB.push("HOTDOG ITEM");
//   }
//   if (sandwich === "") {
//     tempDB.push("SANDWICH ITEM");
//   }
//   console.log(tempDB);
//   res.redirect("/checkout");
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
