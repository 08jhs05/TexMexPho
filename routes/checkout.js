// -- GET - /checkout
// confirmation page -- where confirmOrder was being passed to ejs
const express = require("express");
const router = express.Router();
//require the tempDB from server.js
const { tempDB, restaurantMsg, confirmOrder } = require("../server");

let cart = {};

module.exports = (db) => {
  router.post("/", (req, res) => {
    cart = req.body;
    res.redirect("/checkout")
  })
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        res.render("checkout", {cart});
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
