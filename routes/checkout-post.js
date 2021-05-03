// -- POST - /checkout
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

//require the tempDB from server.js
let { tempDB, restaurantMsg, confirmOrder } = require("../server");
// -- post routes for router
router.post("/checkout", function (req, res) {
  const { burritoCount, banhCount, baoCount } = req.body;
  tempDB.burrito = burritoCount;
  tempDB.banh = banhCount;
  tempDB.bao = baoCount;
  console.log("THIS IS TEMP DB-->", tempDB);

  confirmOrder = `You ordered: ${tempDB.burrito} x Burrito \n${tempDB.banh} x Banh Mi \n${tempDB.bao} x Steamed Bao Taco`;

  res.redirect("/checkout");
});

module.exports = router;
