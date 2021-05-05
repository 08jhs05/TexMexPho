const tempDB = { burrito: 0, banh: 0, bao: 0 };
let restaurantMsg = "";
let confirmOrder = "";
module.exports = { tempDB, restaurantMsg, confirmOrder };

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

const TWILIO_ACCOUNT_SID = "AC547ac2535ae2016f2605a3536468b6e1";
const TWILIO_AUTH_TOKEN = "0de15ac8fa5d67aa9183168bd7a16ca7";

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

const text = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const MessagingResponse = require("twilio").twiml.MessagingResponse;

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

//---- GET ROUTER ROUTES ---
//Seperated routes for each get and post
const indexRoutes = require("./routes/index");
const menuRoutes = require("./routes/menu");
const orderplacedRoutes = require("./routes/orderplaced");
const restaurantRoutes = require("./routes/restaurant");
const checkoutRoutes = require("./routes/checkout");
const locationRoute = require("./routes/location");
const aboutUsRoute = require("./routes/aboutus");
const ordersentRoute = require("./routes/ordersent");

app.use("/", indexRoutes(db));
app.use("/menu", menuRoutes(db));
app.use("/orderplaced", orderplacedRoutes(db));
app.use("/restaurant", restaurantRoutes(db));
app.use("/checkout", checkoutRoutes(db));
app.use("/location", locationRoute(db));
app.use("/about_us", aboutUsRoute(db));
app.use("/ordersent", ordersentRoute(db));

//--- POST ROUTER ROUTES
const checkoutPostRoutes = require("./routes/checkout-post");
const orderPlacedPostRoutes = require("./routes/orderplaced-post");
const smsPostRoutes = require("./routes/sms-post");

app.use("/", checkoutPostRoutes);
app.use("/", orderPlacedPostRoutes);
app.use("/", smsPostRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
