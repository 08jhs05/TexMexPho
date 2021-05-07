//-- GET - /orderplaced
const express = require("express");
const router = express.Router();
//require the tempDB from server.js
let { tempDB, restaurantMsg, confirmOrder } = require("../server");
const accountSid2 = process.env.TWILIO_ACCOUNT_SID2;
const authToken2 = process.env.TWILIO_AUTH_TOKEN2;
const client = require('twilio')(accountSid2, authToken2);

let orderNum = 0;

module.exports = (db) => {

  router.post("/", (req, res) => {

    //Add twilio functionality here - IM
    let restMsg = 'Hi TexMexPho, you received an order. Please refresh restuarant page';
    client.messages
    .create({
      body: restMsg,
      from: '+19122747603',
      to: '+16475028583'
    })
    .then(message => console.log(message.sid));

    console.log(restMsg);

    insertOrder = req.body.insertOrder;
    insertOrder_item = req.body.insertOrder_item;

    db.query(`INSERT INTO orders (time_placed, subtotal, tax, final_price, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *;`, [insertOrder.time_placed, insertOrder.subtotal, insertOrder.tax, insertOrder.final_price,insertOrder.phone])
    .then( result_orders => {
      const order_id = result_orders.rows[0].id;

      orderNum = order_id;

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
    res.render("orderplaced", { orderNum });
  });

  return router;
}
