//-- GET - /restaurant
//  Secret restaurant page
const express = require("express");
const router = express.Router();
let { tempDB, restaurantMsg, confirmOrder } = require("../server");
module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        // res.json({ users });
        // res.render("restaurant");
        console.log("RESTAURANT PAGE");
        if (tempDB.phone) {
          restaurantMsg = `Customer ordered: ${tempDB.burrito} x Burrito ${tempDB.banh} x Banh Mi ${tempDB.bao} x Steamed Bao Taco. Sending Text`;

          //console.log(`Restaurant: Hi ${tempDB.phone}, your order will be ready in 10minutes`)
        }
        res.render("restaurant", { tempDB, restaurantMsg });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
