// THIS IS CURRENTLY FOR TESTINF

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
    console.log(result.rows)
    return result.rows[0].name;
  })
  .catch((err) => {
    console.log(err.message);
  });
}


getUserOrder();

exports.getUserOrder = getUserOrder;

//module.exports = {getUserOrder}


// .query(`
// SELECT menu_items.name, quantity, menu_items.price
// FROM order_items
// JOIN menu_items ON menu_items.id = menu_id
// WHERE order_id = $1;
// `, [orderID])


SELECT menu_items.name, quantity, menu_items.price
FROM order_items
JOIN menu_items ON menu_items.id = menu_id
WHERE order_id = $1;
`, [orderID])