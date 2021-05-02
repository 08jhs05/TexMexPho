const express = require("express");
const router = express.Router();
//require the tempDB from server.js
const tempDB = require("../server");

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        // res.json({ users });
        console.log(req.body);
        console.log("ORDER PLACED");
        res.render("orderplaced", { tempDB });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
