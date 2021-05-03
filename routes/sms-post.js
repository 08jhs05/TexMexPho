//-- POST - /sms
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { tempDB, restaurantMsg, confirmOrder } = require("../server");

router.post("/sms", (req, res) => {
  //console.log(req.body);
  console.log("POST- SMS CONFIRMATION");
  const twiml = new MessagingResponse();
  // console.log(req.body);
  twiml.message("The Robots are coming! Head for the hills!");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});
module.exports = router;
