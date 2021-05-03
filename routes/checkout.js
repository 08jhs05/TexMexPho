// -- GET - /checkout
// confirmation page -- where confirmOrder was being passed to ejs
const express = require("express");
const router = express.Router();
//require the tempDB from server.js
const { tempDB, restaurantMsg, confirmOrder } = require("../server");

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        // res.json({ users });
        //TO DO: check if these values ccan be accessed within respective ejs files
        const templateVariables = {
          temporaryData: tempDB,
          restoMsg: restaurantMsg,
          confirmation: confirmOrder,
          burritoCount: tempDB.burrito,
          banhCount: tempDB.ban,
          baoCount: tempDB.bao,
        };
        res.render("checkout", templateVariables);
        // console.log("CHECK OUT PAGE");
        console.log("CONFIRM ORDER -->", confirmOrder);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
