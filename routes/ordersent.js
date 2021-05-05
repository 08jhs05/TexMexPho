const express = require("express");
const router = express.Router();
let { tempDB, restaurantMsg, confirmOrder } = require("../server");


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        res.render("ordersent");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};



