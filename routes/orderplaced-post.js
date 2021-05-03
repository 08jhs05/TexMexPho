// -- POST - /orderplaced
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { tempDB, restaurantMsg, confirmOrder } = require("../server");

router.post("/orderplaced", (req, res) => {
  //console.log(req.body);
  console.log("POST- ORDER IS PLACED");
  const { phone } = req.body;
  tempDB.phone = phone;
  //console.log("Twilio: Hi Restaurant, you got an order. Refresh your page");
  res.redirect("/orderplaced");
});
module.exports = router;
