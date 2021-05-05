const express = require("express");
const router = express.Router();
let { tempDB, restaurantMsg, confirmOrder } = require("../server");


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        // console.log("ORDER PLACED");
        // if (tempDB.phone) {
        //   restaurantMsg = `Customer ordered: ${tempDB.burrito} x Burrito, ${tempDB.banh} x Banh Mi, ${tempDB.bao} x Steamed Bao Taco`;

        //   text.messages
        //     .create({
        //       body: restaurantMsg,
        //       from: "+18326484365",
        //       to: tempDB.phone,
        //     })
        //     .then((message) => console.log("sent text: customer to restaurant"))
        //     .catch((err) => console.log(err));
        // }

        res.render("ordersent");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};



