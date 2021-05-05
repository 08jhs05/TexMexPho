//-- GET - /orderplaced
const express = require("express");
const router = express.Router();
//require the tempDB from server.js
let { tempDB, restaurantMsg, confirmOrder } = require("../server");

let newOrder = {}

module.exports = (db) => {

  router.post("/", (req, res) => {

    insertOrder = req.body.insertOrder;
    insertOrder_item = req.body.insertOrder_item;

    db.query(`INSERT INTO orders (time_placed, subtotal, tax, final_price, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *;`, [insertOrder.time_placed, insertOrder.subtotal, insertOrder.tax, insertOrder.final_price,insertOrder.phone])
    .then( result_orders => {
      const order_id = result_orders.rows[0].id;

      const promises = [];

      for(const item in insertOrder_item) {
        promises.push(db.query(`INSERT INTO order_items (quantity, menu_id, order_id) VALUES ($1, $2, $3) RETURNING *;`, [insertOrder_item[item].quantity, insertOrder_item[item].menu_id, order_id]));
      }

      Promise.all(promises)
      .then( result_order_items => {
        newOrder = {result_orders, result_order_items}
        res.redirect("/orderplaced")
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  })

  router.get("/", (req, res) => {
    res.render("orderplaced", newOrder);
  });

  return router;
}
