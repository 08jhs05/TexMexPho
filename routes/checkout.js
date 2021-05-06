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

    const promises = [];

    for(const item in cart) {
      promises.push(db.query(`SELECT * FROM menu_items WHERE id = $1;`, [cart[item].menu_id]))
    }

    Promise.all(promises).then(values => {
      let templatevars = {};
      for (const item of values) {
        templatevars[item.rows[0].name] = { photo_url: item.rows[0].photo_url, price: item.rows[0].price, quantity: cart[item.rows[0].name].quantity, menu_id: cart[item.rows[0].name].menu_id};
      }
      res.render("checkout", { templatevars });
    }).catch((err) => {
          res.status(500).json({ error: err.message });
        });
  });
  return router;
};
