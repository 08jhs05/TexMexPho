const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


const getUserOrder = function(number) {

  // Our query using node-postgres. The $ sign formatting is to prevent SQL injection which
  // is followed by a second parameter as an array of the query item to actually look for
  // [email] in this case
  return pool
  .query(`
  SELECT menu_id
  FROM order_items
  WHERE order_id = $1;
  `, [number])
  .then((result) => {
    console.log(result.rows)
    //return result.rows[0] || null;
  })
  .catch((err) => {
    console.log(err.message);
  });


}

getUserOrder(1);