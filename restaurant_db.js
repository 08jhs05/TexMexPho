const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


const getUserOrder = function(orderID) {

  return pool
  .query(`
  SELECT menu_items.name, quantity, menu_items.price
  FROM order_items
  JOIN menu_items ON menu_items.id = menu_id
  WHERE order_id = $1;
  `, [orderID])
  .then((result) => {
    console.log(result.rows)
    return result.rows[0].name;
  })
  .catch((err) => {
    console.log(err.message);
  });
}


getUserOrder(1);

exports.getUserOrder = getUserOrder;

//module.exports = {getUserOrder}
