//-- GET - /restaurant
//  Secret restaurant page
const express = require("express");
const router = express.Router();
let { tempDB, restaurantMsg, confirmOrder } = require("../server");
// let { getUserOrder } = require("../restaurant_db")

// let newOrder = getUserOrder(1);
// console.log('THIS IS in restaurant.js' + newOrder)



// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'labber',
//   password: 'labber',
//   host: 'localhost',
//   database: 'midterm'
// });


// const getUserOrder = function(orderID) {
//   return pool
//   .query(`
//   SELECT menu_items.name, quantity
//   FROM order_items
//   JOIN menu_items ON menu_items.id = menu_id
//   WHERE order_id = $1;
//   `, [orderID])
//   .then((result) => {
//     console.log(result.rows[0].name)
//     return result.rows[0].name;
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// }

// let newOrder = getUserOrder(1);

let newOrder = [
  { name: 'Nacho Chips', quantity: 3, price: 700 },
  { name: 'Bun Cha', quantity: 1, price: 1299 }
];

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((newOrder))
      
      .then((data) => {
        const users = data.rows;
        // res.json({ users });
        // res.render("restaurant");
        console.log("RESTAURANT PAGE");
        if (tempDB.phone) {
          restaurantMsg = `Customer ordered: ${tempDB.burrito} x Burrito ${tempDB.banh} x Banh Mi ${tempDB.bao} x Steamed Bao Taco. Sending Text`;

          //console.log(`Restaurant: Hi ${tempDB.phone}, your order will be ready in 10minutes`)
        }
        res.render("restaurant", { tempDB, restaurantMsg, newOrder });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
