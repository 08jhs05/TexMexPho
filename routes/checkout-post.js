const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
//require the tempDB from server.js
const tempDB = require("../server");

// -- post routes for router
router.post("/checkout", function (req, res) {
  // Your code here
  // console.log(req.body);
  // let burger = req.body["burger"];
  // let hotdog = req.body["hotdog"];
  // let sandwich = req.body["sandwich"];

  // if (burger === "") {
  //   tempDB.push("BURGER ITEM");
  // }
  // if (hotdog === "") {
  //   tempDB.push("HOTDOG ITEM");
  // }
  // if (sandwich === "") {
  //   tempDB.push("SANDWICH ITEM");
  // }
  // console.log(tempDB);


  const {burritoCount, banhCount, baoCount} = req.body;

  tempDB.burrito = burritoCount;
  tempDB.banh = banhCount;
  tempDB.bao = baoCount;
  //console.log(tempDB)

  confirmOrder = `You ordered: ${tempDB.burrito} x Burrito \n${tempDB.banh} x Banh Mi \n${tempDB.bao} x Steamed Bao Taco`

  res.redirect("/checkout");
});

module.exports = router;
