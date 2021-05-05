//-- GET - /restaurant
//  Secret restaurant page
const express = require("express");
const router = express.Router();
let { tempDB, restaurantMsg, confirmOrder } = require("../server");
// let { getUserOrder } = require("../restaurant_db")

const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const getUserOrder = function() {
  return pool
  .query(`
  SELECT order_id, menu_items.name, quantity, menu_items.price
  FROM order_items
  JOIN menu_items ON menu_items.id = menu_id
  ORDER BY order_id ASC;
  `)
  .then((result) => { 
    return result.rows;
  })
}

// THIS IS SOME TEST HARDCODED DATABASES

let otherOrder = [
  { order_id: 1, name: 'Nacho Chips', quantity: 3, price: 700 },
  { order_id: 1, name: 'Bun Cha', quantity: 1, price: 1299 },
  { order_id: 2, name: 'Empanada', quantity: 4, price: 1650 },
  { order_id: 3, name: 'Nacho Chips', quantity: 3, price: 700 },
  { order_id: 3, name: 'Bun Cha', quantity: 5, price: 1299 },
  { order_id: 3, name: 'Empanada', quantity: 4, price: 16500 }
]

module.exports = (db) => {
  router.get("/", (req, res) => {
    getUserOrder()
      .then((totalOrders) => {
        
        let tempId = 0;
        let arrObj = [[]];
        let arrObjIndex=0;
        let flag = true;
        
        //Change otherOrder to totalOrders in order to use real database
        //Must also comment out the post request as it is using the hardcoded db for now
        for (let objId of otherOrder) {
          if (flag) {
            tempId = objId['order_id'];
            flag = false;
           }
          
          if (tempId === objId['order_id']) {
            arrObj[arrObjIndex].push(objId);
          } else {
            arrObjIndex +=1;
            arrObj.push([]);
            arrObj[arrObjIndex].push(objId);
            tempId = objId['order_id']
          }   
        }

        res.render("restaurant", {  arrObj });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};


// THIS IS FOR HARDCODED DATABASE
router.post ("/", (req, res) => {

  const { order_to_delete, text, accept, reject } = req.body;
  tempArr = [];

  if(accept === '') {
    console.log(text);
    tempArr=[];
    for (let el of otherOrder) {
      console.log(el);
      if (el.order_id !== parseInt(order_to_delete)) {
        tempArr.push(el)
      }
    }
    otherOrder = tempArr;
  }

  res.redirect("/restaurant");
});
 
